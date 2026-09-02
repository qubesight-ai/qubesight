import json
import tempfile
import unittest
import uuid
from pathlib import Path

from runtime.config import AgentConfig, ConfigurationError
from runtime.security import UnsafeRecordingUrl, clean_transcript_text, validate_twilio_recording_url


class RuntimeSecurityTests(unittest.TestCase):
    def test_allows_only_the_expected_twilio_recording(self):
        account = "AC" + "a" * 32
        recording = "RE" + "b" * 32
        url = f"https://api.twilio.com/2010-04-01/Accounts/{account}/Recordings/{recording}"
        self.assertEqual(validate_twilio_recording_url(url, account), url)

    def test_rejects_recording_ssrf(self):
        account = "AC" + "a" * 32
        with self.assertRaises(UnsafeRecordingUrl):
            validate_twilio_recording_url("https://attacker.example/recording.mp3", account)

    def test_cleans_transcript_control_characters(self):
        self.assertEqual(clean_transcript_text(" hola\x00  mundo\n"), "hola mundo")

    def test_loads_identity_only_from_configuration(self):
        agent_id = str(uuid.uuid4())
        data = {
            "agent_id": agent_id,
            "revision": 1,
            "name": "Agente de prueba",
            "voice_name": "F1",
            "language": "Español",
            "objective": "Atender",
            "greeting": "Hola",
            "system_prompt": "Ayuda al cliente.",
            "runtime_base_url": f"https://voice.example.com/agents/{agent_id}",
            "twilio_account_sid": "AC" + "a" * 32,
            "twilio_auth_token": "b" * 32,
            "twilio_phone": "+15065550123",
            "call_ingest_hmac_secret": "d" * 64,
        }
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "config.json"
            path.write_text(json.dumps(data), encoding="utf-8")
            config = AgentConfig.load(path)
        self.assertEqual(config.name, "Agente de prueba")
        self.assertNotIn("Matilda", json.dumps(data))

    def test_rejects_missing_identity(self):
        with tempfile.TemporaryDirectory() as directory:
            path = Path(directory) / "config.json"
            path.write_text("{}", encoding="utf-8")
            with self.assertRaises(ConfigurationError):
                AgentConfig.load(path)


if __name__ == "__main__":
    unittest.main()
