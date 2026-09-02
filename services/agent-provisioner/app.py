#!/usr/bin/env python3
"""Restricted QubeSight VPS control plane.

The service accepts only HMAC-authenticated, schema-validated agent lifecycle
operations. It never accepts shell commands, image names, paths, ports or unit
names from a caller.
"""

from __future__ import annotations

import hashlib
import hmac
import json
import os
import re
import subprocess
import tempfile
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
import uuid
from dataclasses import dataclass
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from typing import Any


MAX_BODY_BYTES = 1_048_576
UUID_PATTERN = re.compile(r"^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$")
SAFE_TEXT_LIMITS = {
    "name": 120,
    "voice_name": 120,
    "language": 80,
    "objective": 2_000,
    "greeting": 2_000,
    "system_prompt": 20_000,
    "twilio_phone": 20,
    "twilio_auth_token": 64,
}


class ProvisioningError(Exception):
    def __init__(self, status: int, message: str):
        super().__init__(message)
        self.status = status


@dataclass(frozen=True)
class Settings:
    hmac_secret: str
    agents_root: Path = Path("/var/lib/qubesight-agents")
    requests_root: Path = Path("/var/lib/qubesight-provisioner/requests")
    caddy_routes_file: Path = Path("/etc/caddy/qubesight-agents.caddy")
    service_template: str = "qubesight-agent@{agent_id}.service"
    port_start: int = 11000
    port_end: int = 12999
    health_timeout_seconds: float = 12.0
    runtime_uid: int = 10001
    runtime_gid: int = 10001

    @classmethod
    def from_env(cls) -> "Settings":
        secret = os.environ.get("AGENT_PROVISIONER_HMAC_SECRET", "")
        if len(secret) < 32 or secret.startswith("replace-with"):
            raise RuntimeError("AGENT_PROVISIONER_HMAC_SECRET must contain at least 32 characters")
        return cls(
            hmac_secret=secret,
            agents_root=Path(os.environ.get("AGENTS_ROOT", "/var/lib/qubesight-agents")),
            requests_root=Path(
                os.environ.get("PROVISIONER_REQUESTS_ROOT", "/var/lib/qubesight-provisioner/requests")
            ),
            caddy_routes_file=Path(
                os.environ.get("CADDY_AGENT_ROUTES_FILE", "/etc/caddy/qubesight-agents.caddy")
            ),
            port_start=int(os.environ.get("AGENT_PORT_START", "11000")),
            port_end=int(os.environ.get("AGENT_PORT_END", "12999")),
            runtime_uid=int(os.environ.get("AGENT_RUNTIME_UID", "10001")),
            runtime_gid=int(os.environ.get("AGENT_RUNTIME_GID", "10001")),
        )


class CommandRunner:
    def run(self, args: list[str], check: bool = True) -> subprocess.CompletedProcess[str]:
        return subprocess.run(
            args,
            check=check,
            capture_output=True,
            text=True,
            timeout=30,
            env={"PATH": "/usr/sbin:/usr/bin:/sbin:/bin"},
        )


def atomic_write(path: Path, content: str, mode: int = 0o600) -> None:
    path.parent.mkdir(parents=True, exist_ok=True, mode=0o700)
    fd, temporary = tempfile.mkstemp(prefix=f".{path.name}.", dir=path.parent)
    try:
        os.fchmod(fd, mode)
        with os.fdopen(fd, "w", encoding="utf-8") as stream:
            stream.write(content)
            stream.flush()
            os.fsync(stream.fileno())
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def validate_agent_id(value: Any) -> str:
    if not isinstance(value, str):
        raise ProvisioningError(400, "agent_id is required")
    try:
        normalized = str(uuid.UUID(value))
    except (ValueError, AttributeError) as exc:
        raise ProvisioningError(400, "agent_id must be a UUID") from exc
    if not UUID_PATTERN.fullmatch(normalized):
        raise ProvisioningError(400, "agent_id must be a UUIDv4")
    return normalized


def validate_config(value: Any) -> dict[str, str]:
    if not isinstance(value, dict):
        raise ProvisioningError(400, "config is required for reconcile")
    clean: dict[str, str] = {}
    for field, limit in SAFE_TEXT_LIMITS.items():
        item = value.get(field, "")
        if not isinstance(item, str) or len(item) > limit:
            raise ProvisioningError(400, f"invalid config field: {field}")
        clean[field] = item.strip()
    if not clean["name"] or not clean["system_prompt"]:
        raise ProvisioningError(400, "name and system_prompt are required")
    if not re.fullmatch(r"\+[1-9][0-9]{6,14}", clean["twilio_phone"]):
        raise ProvisioningError(400, "invalid Twilio phone number")
    if not re.fullmatch(r"[0-9A-Fa-f]{32}", clean["twilio_auth_token"]):
        raise ProvisioningError(400, "invalid Twilio Auth Token")
    return clean


def validate_runtime_url(value: Any, agent_id: str) -> str:
    if not isinstance(value, str) or len(value) > 500:
        raise ProvisioningError(400, "runtime_base_url is required")
    parsed = urllib.parse.urlparse(value)
    expected_path = f"/agents/{agent_id}"
    if (
        parsed.scheme != "https"
        or not parsed.hostname
        or not re.fullmatch(r"[A-Za-z0-9.-]+", parsed.hostname)
        or parsed.port not in (None, 443)
        or parsed.username
        or parsed.password
        or parsed.query
        or parsed.fragment
    ):
        raise ProvisioningError(400, "runtime_base_url must be HTTPS")
    if parsed.path.rstrip("/") != expected_path:
        raise ProvisioningError(400, "runtime_base_url path does not match agent")
    return value.rstrip("/")


class AgentManager:
    def __init__(self, settings: Settings, runner: CommandRunner | None = None):
        self.settings = settings
        self.runner = runner or CommandRunner()
        self._lock = threading.Lock()
        self.settings.agents_root.mkdir(parents=True, exist_ok=True, mode=0o700)
        self.settings.requests_root.mkdir(parents=True, exist_ok=True, mode=0o700)

    def _agent_dir(self, agent_id: str) -> Path:
        return self.settings.agents_root / agent_id

    def _deployment_path(self, agent_id: str) -> Path:
        return self._agent_dir(agent_id) / "deployment.json"

    def _read_deployment(self, agent_id: str) -> dict[str, Any] | None:
        path = self._deployment_path(agent_id)
        if not path.exists():
            return None
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
            return data if isinstance(data, dict) else None
        except (OSError, json.JSONDecodeError):
            return None

    def _allocate_port(self, agent_id: str) -> int:
        current = self._read_deployment(agent_id)
        if current and isinstance(current.get("port"), int):
            return current["port"]
        span = self.settings.port_end - self.settings.port_start + 1
        if span < 1:
            raise ProvisioningError(500, "invalid agent port range")
        used = {
            int(record["port"])
            for path in self.settings.agents_root.glob("*/deployment.json")
            if (record := self._read_deployment(path.parent.name))
            and isinstance(record.get("port"), int)
        }
        start_offset = int(uuid.UUID(agent_id)) % span
        for offset in range(span):
            candidate = self.settings.port_start + ((start_offset + offset) % span)
            if candidate not in used:
                return candidate
        raise ProvisioningError(503, "no runtime ports available")

    def _service(self, agent_id: str) -> str:
        return self.settings.service_template.format(agent_id=agent_id)

    def _health(self, port: int) -> tuple[bool, str]:
        try:
            with urllib.request.urlopen(f"http://127.0.0.1:{port}/health", timeout=2) as response:
                body = response.read(4096).decode("utf-8", "replace")
                return response.status == 200, body[:500]
        except (urllib.error.URLError, TimeoutError, OSError) as exc:
            return False, type(exc).__name__

    def _is_active(self, service: str) -> bool:
        result = self.runner.run(["/usr/bin/systemctl", "is-active", service], check=False)
        return result.returncode == 0 and result.stdout.strip() == "active"

    def _wait_health(self, port: int) -> tuple[bool, str]:
        deadline = time.monotonic() + self.settings.health_timeout_seconds
        last = "not ready"
        while time.monotonic() < deadline:
            healthy, last = self._health(port)
            if healthy:
                return True, last
            time.sleep(0.5)
        return False, last

    def _write_runtime_files(
        self, agent_id: str, revision: int, port: int, runtime_url: str, config: dict[str, str]
    ) -> None:
        directory = self._agent_dir(agent_id)
        directory.mkdir(parents=True, exist_ok=True, mode=0o700)
        runtime_config = {
            "schema_version": 1,
            "agent_id": agent_id,
            "revision": revision,
            "runtime_base_url": runtime_url,
            **config,
        }
        config_path = directory / "config.json"
        atomic_write(config_path, json.dumps(runtime_config, ensure_ascii=False), 0o600)
        os.chown(config_path, self.settings.runtime_uid, self.settings.runtime_gid)
        env = f"AGENT_ID={agent_id}\nAGENT_PORT={port}\n"
        atomic_write(directory / "runtime.env", env, 0o600)

    def _rebuild_caddy(self) -> None:
        active = []
        for path in self.settings.agents_root.glob("*/deployment.json"):
            record = self._read_deployment(path.parent.name)
            if record and record.get("active") is True:
                active.append(record)

        if not active:
            content = "# Managed by QubeSight Agent Provisioner. No active agents.\n"
        else:
            origins = {
                urllib.parse.urlparse(str(record["runtime_base_url"])).netloc for record in active
            }
            if len(origins) != 1:
                raise ProvisioningError(500, "all agents must share one runtime origin")
            origin = next(iter(origins))
            lines = [
                "# Managed by QubeSight Agent Provisioner. Do not edit.",
                f"https://{origin} {{",
            ]
            for record in sorted(active, key=lambda item: str(item["agent_id"])):
                agent_id = str(record["agent_id"])
                port = int(record["port"])
                lines.extend(
                    [
                        f"  handle_path /agents/{agent_id}/* {{",
                        f"    reverse_proxy 127.0.0.1:{port}",
                        "  }",
                    ]
                )
            lines.extend(["  respond 404", "}"])
            content = "\n".join(lines) + "\n"

        atomic_write(self.settings.caddy_routes_file, content, 0o640)
        self.runner.run(
            ["/usr/bin/caddy", "validate", "--config", "/etc/caddy/Caddyfile"], check=True
        )
        self.runner.run(["/usr/bin/systemctl", "reload", "caddy"], check=True)

    def reconcile(self, payload: dict[str, Any]) -> dict[str, Any]:
        agent_id = validate_agent_id(payload.get("agent_id"))
        revision = payload.get("revision")
        if not isinstance(revision, int) or revision < 1:
            raise ProvisioningError(400, "revision must be a positive integer")
        runtime_url = validate_runtime_url(payload.get("runtime_base_url"), agent_id)
        config = validate_config(payload.get("config"))

        with self._lock:
            port = self._allocate_port(agent_id)
            self._write_runtime_files(agent_id, revision, port, runtime_url, config)
            service = self._service(agent_id)
            self.runner.run(["/usr/bin/systemctl", "enable", "--now", service])
            self.runner.run(["/usr/bin/systemctl", "restart", service])
            active = self._is_active(service)
            healthy, detail = self._wait_health(port) if active else (False, "systemd inactive")
            deployment = {
                "agent_id": agent_id,
                "revision": revision,
                "port": port,
                "runtime_base_url": runtime_url,
                "service_name": service,
                "active": active,
                "updated_at": int(time.time()),
            }
            atomic_write(self._deployment_path(agent_id), json.dumps(deployment), 0o600)
            self._rebuild_caddy()
        state = "running" if active and healthy else "degraded"
        return {
            "state": state,
            "service_name": service,
            "health": {"systemd_active": active, "runtime_healthy": healthy, "detail": detail},
        }

    def status(self, payload: dict[str, Any]) -> dict[str, Any]:
        agent_id = validate_agent_id(payload.get("agent_id"))
        deployment = self._read_deployment(agent_id)
        if not deployment:
            return {"state": "stopped", "service_name": self._service(agent_id), "health": None}
        service = self._service(agent_id)
        active = self._is_active(service)
        healthy, detail = self._health(int(deployment["port"])) if active else (False, "inactive")
        state = "running" if active and healthy else "degraded" if active else "stopped"
        return {
            "state": state,
            "service_name": service,
            "health": {"systemd_active": active, "runtime_healthy": healthy, "detail": detail},
        }

    def restart(self, payload: dict[str, Any]) -> dict[str, Any]:
        agent_id = validate_agent_id(payload.get("agent_id"))
        if not self._read_deployment(agent_id):
            raise ProvisioningError(409, "agent has not been deployed")
        self.runner.run(["/usr/bin/systemctl", "restart", self._service(agent_id)])
        return self.status(payload)

    def stop(self, payload: dict[str, Any]) -> dict[str, Any]:
        agent_id = validate_agent_id(payload.get("agent_id"))
        with self._lock:
            service = self._service(agent_id)
            self.runner.run(["/usr/bin/systemctl", "disable", "--now", service], check=False)
            deployment = self._read_deployment(agent_id)
            if deployment:
                deployment["active"] = False
                deployment["updated_at"] = int(time.time())
                atomic_write(self._deployment_path(agent_id), json.dumps(deployment), 0o600)
                self._rebuild_caddy()
        return {"state": "stopped", "service_name": service, "health": None}

    def execute(self, payload: dict[str, Any]) -> dict[str, Any]:
        action = payload.get("action")
        actions = {
            "reconcile": self.reconcile,
            "restart": self.restart,
            "status": self.status,
            "stop": self.stop,
        }
        if action not in actions:
            raise ProvisioningError(400, "unsupported action")
        return actions[action](payload)

    def execute_idempotent(self, request_id: str, payload: dict[str, Any]) -> dict[str, Any]:
        validate_agent_id(request_id)
        cache_path = self.settings.requests_root / f"{request_id}.json"
        if cache_path.exists():
            try:
                cached = json.loads(cache_path.read_text(encoding="utf-8"))
                if isinstance(cached, dict):
                    return cached
            except (OSError, json.JSONDecodeError):
                pass
        result = self.execute(payload)
        atomic_write(cache_path, json.dumps(result), 0o600)
        return result


class ProvisionerHandler(BaseHTTPRequestHandler):
    manager: AgentManager

    def log_message(self, format_string: str, *args: object) -> None:
        # Do not log request bodies or secrets. The reverse proxy can log metadata.
        print(f"provisioner {self.client_address[0]} {format_string % args}")

    def _json(self, status: int, body: dict[str, Any]) -> None:
        encoded = json.dumps(body).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(encoded)))
        self.send_header("Cache-Control", "no-store")
        self.end_headers()
        self.wfile.write(encoded)

    def do_GET(self) -> None:  # noqa: N802
        if self.path == "/health":
            self._json(200, {"status": "ok"})
        else:
            self._json(404, {"error": "not found"})

    def do_POST(self) -> None:  # noqa: N802
        if self.path != "/v1/agents":
            self._json(404, {"error": "not found"})
            return
        try:
            length = int(self.headers.get("Content-Length", "0"))
            if length < 2 or length > MAX_BODY_BYTES:
                raise ProvisioningError(413, "invalid request size")
            raw = self.rfile.read(length)
            timestamp_text = self.headers.get("X-QubeSight-Timestamp", "")
            signature = self.headers.get("X-QubeSight-Signature", "")
            request_id = self.headers.get("X-QubeSight-Request-Id", "")
            try:
                timestamp = int(timestamp_text)
            except ValueError as exc:
                raise ProvisioningError(401, "invalid signature timestamp") from exc
            if abs(int(time.time()) - timestamp) > 300:
                raise ProvisioningError(401, "expired signature")
            expected = hmac.new(
                self.manager.settings.hmac_secret.encode(),
                timestamp_text.encode() + b"." + raw,
                hashlib.sha256,
            ).hexdigest()
            if not hmac.compare_digest(expected, signature):
                raise ProvisioningError(401, "invalid signature")
            try:
                payload = json.loads(raw)
            except json.JSONDecodeError as exc:
                raise ProvisioningError(400, "invalid JSON") from exc
            if not isinstance(payload, dict):
                raise ProvisioningError(400, "JSON object required")
            result = self.manager.execute_idempotent(request_id, payload)
            self._json(200, result)
        except ProvisioningError as exc:
            self._json(exc.status, {"error": str(exc)})
        except (OSError, subprocess.SubprocessError) as exc:
            print(f"provisioner operation failed: {type(exc).__name__}")
            self._json(500, {"error": "host operation failed"})
        except Exception as exc:  # defensive boundary; never expose internals
            print(f"provisioner unexpected failure: {type(exc).__name__}")
            self._json(500, {"error": "unexpected provisioner failure"})


def main() -> None:
    settings = Settings.from_env()
    ProvisionerHandler.manager = AgentManager(settings)
    host = os.environ.get("PROVISIONER_BIND_HOST", "127.0.0.1")
    port = int(os.environ.get("PROVISIONER_BIND_PORT", "8090"))
    server = ThreadingHTTPServer((host, port), ProvisionerHandler)
    print(f"QubeSight provisioner listening on {host}:{port}")
    server.serve_forever()


if __name__ == "__main__":
    main()
