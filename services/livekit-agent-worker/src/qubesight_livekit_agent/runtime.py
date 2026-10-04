from __future__ import annotations

import json
import os
import urllib.error
import urllib.request
from dataclasses import dataclass
from typing import Any
from uuid import UUID


class RuntimeContractError(ValueError):
    """Raised when dispatch metadata or runtime data violates the contract."""


class RuntimeServiceError(RuntimeError):
    """Raised when the private QubeSight runtime endpoint cannot be reached."""


def _uuid(value: object, field: str) -> str:
    if not isinstance(value, str):
        raise RuntimeContractError(f"{field} is required")
    try:
        return str(UUID(value))
    except ValueError as exc:
        raise RuntimeContractError(f"{field} is invalid") from exc


def _text(value: object, field: str, maximum: int, *, minimum: int = 1) -> str:
    if not isinstance(value, str):
        raise RuntimeContractError(f"{field} is required")
    cleaned = value.strip()
    if not minimum <= len(cleaned) <= maximum:
        raise RuntimeContractError(f"{field} has an invalid length")
    return cleaned


def _optional(value: object, maximum: int) -> str:
    return value.strip()[:maximum] if isinstance(value, str) else ""


def _mapping(value: object) -> dict[str, Any] | None:
    return value if isinstance(value, dict) and value else None


@dataclass(frozen=True)
class DispatchMetadata:
    agent_id: str
    organization_id: str
    room_name: str
    runtime_token: str

    @classmethod
    def parse(cls, raw: str, room_name: str) -> DispatchMetadata:
        try:
            data = json.loads(raw)
        except (TypeError, json.JSONDecodeError) as exc:
            raise RuntimeContractError("dispatch metadata is invalid") from exc
        if not isinstance(data, dict) or data.get("mode") != "browser_test":
            raise RuntimeContractError("dispatch mode is invalid")
        normalized_room = _text(room_name, "room_name", 200)
        if not normalized_room.startswith("qs-test-"):
            raise RuntimeContractError("room_name is invalid")
        return cls(
            agent_id=_uuid(data.get("voice_agent_id") or data.get("agent_id"), "voice_agent_id"),
            organization_id=_uuid(data.get("organization_id"), "organization_id"),
            room_name=normalized_room,
            runtime_token=_text(data.get("runtime_token"), "runtime_token", 4096, minimum=32),
        )


@dataclass(frozen=True)
class AgentRuntimeConfig:
    agent_id: str
    name: str
    language: str
    voice_name: str
    greeting: str
    system_prompt: str
    revision: int
    agent_type: str = ""
    business_name: str = ""
    business_description: str = ""
    assistant_description: str = ""
    capabilities: dict[str, Any] | None = None
    behavior: dict[str, Any] | None = None
    escalation_rules: dict[str, Any] | None = None

    @classmethod
    def parse(cls, payload: object, metadata: DispatchMetadata) -> AgentRuntimeConfig:
        if not isinstance(payload, dict) or not isinstance(payload.get("agent"), dict):
            raise RuntimeContractError("runtime response is invalid")
        agent = payload["agent"]
        session = payload.get("session")
        if not isinstance(session, dict) or session.get("room_name") != metadata.room_name:
            raise RuntimeContractError("runtime room does not match")
        agent_id = _uuid(agent.get("id"), "agent.id")
        if agent_id != metadata.agent_id:
            raise RuntimeContractError("runtime agent does not match")
        revision = agent.get("revision")
        if not isinstance(revision, int) or revision < 0:
            raise RuntimeContractError("agent.revision is invalid")
        return cls(
            agent_id=agent_id,
            name=_text(agent.get("name"), "agent.name", 200),
            language=_text(agent.get("language"), "agent.language", 40),
            voice_name=_text(agent.get("voice_name"), "agent.voice_name", 120),
            greeting=_text(agent.get("greeting"), "agent.greeting", 500),
            system_prompt=_text(
                agent.get("system_prompt"), "agent.system_prompt", 6000, minimum=20
            ),
            revision=revision,
            agent_type=_optional(agent.get("agent_type"), 80),
            business_name=_optional(agent.get("business_name"), 200),
            business_description=_optional(agent.get("business_description"), 2000),
            assistant_description=_optional(agent.get("assistant_description"), 2000),
            capabilities=_mapping(agent.get("capabilities")),
            behavior=_mapping(agent.get("behavior")),
            escalation_rules=_mapping(agent.get("escalation_rules")),
        )

    def instructions(self) -> str:
        sections = [self.system_prompt, f"Tu nombre es {self.name}."]
        labeled = [
            ("Tipo de agente", self.agent_type),
            ("Negocio", self.business_name),
            ("Descripción del negocio", self.business_description),
            ("Rol del asistente", self.assistant_description),
        ]
        sections += [f"{label}: {value}" for label, value in labeled if value]
        for label, value in (
            ("Capacidades", self.capabilities),
            ("Comportamiento", self.behavior),
            ("Reglas de escalamiento", self.escalation_rules),
        ):
            if value:
                sections.append(f"{label}: {json.dumps(value, ensure_ascii=False)[:2000]}")
        return "\n".join(sections)


class RuntimeClient:
    def __init__(self, endpoint: str | None = None, timeout_seconds: float = 10.0):
        configured = endpoint or os.environ.get("QUBESIGHT_RUNTIME_URL", "")
        self.endpoint = configured.strip()
        if not self.endpoint.startswith("https://"):
            raise RuntimeContractError("QUBESIGHT_RUNTIME_URL must use HTTPS")
        self.timeout_seconds = timeout_seconds

    def _post(self, token: str, payload: dict[str, Any]) -> object:
        request = urllib.request.Request(
            self.endpoint,
            data=json.dumps(payload, separators=(",", ":")).encode("utf-8"),
            headers={
                "Authorization": f"Bearer {token}",
                "Content-Type": "application/json",
                "User-Agent": "qubesight-livekit-agent/0.1",
            },
            method="POST",
        )
        try:
            with urllib.request.urlopen(request, timeout=self.timeout_seconds) as response:
                return json.loads(response.read().decode("utf-8"))
        except (urllib.error.HTTPError, urllib.error.URLError, TimeoutError) as exc:
            raise RuntimeServiceError("QubeSight runtime request failed") from exc
        except json.JSONDecodeError as exc:
            raise RuntimeServiceError("QubeSight runtime returned invalid JSON") from exc

    def fetch_config(self, metadata: DispatchMetadata) -> AgentRuntimeConfig:
        payload = self._post(metadata.runtime_token, {"action": "config"})
        return AgentRuntimeConfig.parse(payload, metadata)

    def complete(
        self,
        metadata: DispatchMetadata,
        *,
        status: str,
        started_at: str,
        ended_at: str,
        transcript: list[dict[str, str]],
    ) -> None:
        if status not in {"completed", "failed"}:
            raise RuntimeContractError("completion status is invalid")
        self._post(
            metadata.runtime_token,
            {
                "action": "complete",
                "status": status,
                "started_at": started_at,
                "ended_at": ended_at,
                "transcript": transcript[:100],
            },
        )
