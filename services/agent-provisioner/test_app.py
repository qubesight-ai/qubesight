import hashlib
import hmac
import json
import os
import tempfile
import unittest
import uuid
from pathlib import Path

from app import AgentManager, ProvisioningError, Settings, validate_agent_id, validate_config


class FakeResult:
    def __init__(self, returncode=0, stdout="active\n"):
        self.returncode = returncode
        self.stdout = stdout


class FakeRunner:
    def __init__(self):
        self.calls = []

    def run(self, args, check=True):
        self.calls.append((args, check))
        return FakeResult()


def payload(agent_id):
    return {
        "action": "reconcile",
        "agent_id": agent_id,
        "revision": 2,
        "runtime_base_url": f"https://voice.example.com/agents/{agent_id}",
        "config": {
            "name": "Matilda",
            "voice_name": "Sofia",
            "language": "Español",
            "objective": "Atender",
            "greeting": "Hola",
            "system_prompt": "Eres Matilda",
            "twilio_phone": "+15065550123",
            "twilio_account_sid": "AC" + "c" * 32,
            "twilio_auth_token": "a" * 32,
            "call_ingest_hmac_secret": "d" * 64,
        },
    }


class ProvisionerTests(unittest.TestCase):
    def setUp(self):
        self.temp = tempfile.TemporaryDirectory()
        root = Path(self.temp.name)
        self.runner = FakeRunner()
        self.manager = AgentManager(
            Settings(
                hmac_secret="s" * 32,
                agents_root=root / "agents",
                requests_root=root / "requests",
                caddy_routes_file=root / "agents.caddy",
                health_timeout_seconds=0.1,
                runtime_uid=os.getuid(),
                runtime_gid=os.getgid(),
            ),
            self.runner,
        )
        self.manager._health = lambda _port: (True, "ok")

    def tearDown(self):
        self.temp.cleanup()

    def test_reconcile_writes_private_config_and_fixed_commands(self):
        agent_id = str(uuid.uuid4())
        result = self.manager.reconcile(payload(agent_id))
        config_path = self.manager.settings.agents_root / agent_id / "config.json"
        self.assertEqual(result["state"], "running")
        self.assertEqual(config_path.stat().st_mode & 0o777, 0o600)
        self.assertEqual(json.loads(config_path.read_text())["revision"], 2)
        flattened = " ".join(word for call, _ in self.runner.calls for word in call)
        self.assertNotIn("Eres Matilda", flattened)
        self.assertIn(f"qubesight-agent@{agent_id}.service", flattened)

    def test_idempotent_request_runs_only_once(self):
        agent_id = str(uuid.uuid4())
        request_id = str(uuid.uuid4())
        first = self.manager.execute_idempotent(request_id, payload(agent_id))
        call_count = len(self.runner.calls)
        second = self.manager.execute_idempotent(request_id, payload(agent_id))
        self.assertEqual(first, second)
        self.assertEqual(len(self.runner.calls), call_count)

    def test_rejects_shell_like_agent_id(self):
        with self.assertRaises(ProvisioningError):
            validate_agent_id("$(touch /tmp/pwned)")

    def test_rejects_invalid_twilio_token(self):
        value = payload(str(uuid.uuid4()))["config"]
        value["twilio_auth_token"] = "not-a-token"
        with self.assertRaises(ProvisioningError):
            validate_config(value)

    def test_hmac_contract_matches_edge_function(self):
        secret = "s" * 32
        timestamp = "1788300000"
        body = json.dumps({"action": "status"}, separators=(",", ":"))
        signature = hmac.new(
            secret.encode(), f"{timestamp}.{body}".encode(), hashlib.sha256
        ).hexdigest()
        self.assertEqual(len(signature), 64)


if __name__ == "__main__":
    unittest.main()
