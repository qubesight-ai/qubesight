from __future__ import annotations

import json
import os
import re
import uuid
from dataclasses import dataclass
from pathlib import Path
from typing import Any


class ConfigurationError(RuntimeError):
    pass


def _required_env(name: str) -> str:
    value = os.environ.get(name, "").strip()
    if not value:
        raise ConfigurationError(f"missing server configuration: {name}")
    return value


def _text(data: dict[str, Any], name: str, maximum: int, required: bool = True) -> str:
    value = data.get(name, "")
    if not isinstance(value, str):
        raise ConfigurationError(f"invalid agent configuration: {name}")
    value = value.strip()
    if len(value) > maximum or (required and not value):
        raise ConfigurationError(f"invalid agent configuration: {name}")
    return value


@dataclass(frozen=True)
class AgentConfig:
    agent_id: str
    revision: int
    name: str
    voice_name: str
    language: str
    objective: str
    greeting: str
    system_prompt: str
    runtime_base_url: str
    twilio_account_sid: str
    twilio_auth_token: str
    twilio_phone: str
    call_ingest_hmac_secret: str

    @classmethod
    def load(cls, path: Path) -> "AgentConfig":
        try:
            data = json.loads(path.read_text(encoding="utf-8"))
        except (OSError, json.JSONDecodeError) as exc:
            raise ConfigurationError("agent configuration cannot be read") from exc
        if not isinstance(data, dict):
            raise ConfigurationError("agent configuration must be an object")
        agent_id = _text(data, "agent_id", 36)
        revision = data.get("revision")
        runtime_base_url = _text(data, "runtime_base_url", 500).rstrip("/")
        account_sid = _text(data, "twilio_account_sid", 34)
        auth_token = _text(data, "twilio_auth_token", 64)
        phone = _text(data, "twilio_phone", 20)
        ingest_secret = _text(data, "call_ingest_hmac_secret", 64)
        try:
            normalized_agent_id = str(uuid.UUID(agent_id))
        except ValueError as exc:
            raise ConfigurationError("invalid agent_id") from exc
        if normalized_agent_id != agent_id:
            raise ConfigurationError("invalid agent_id")
        if not isinstance(revision, int) or revision < 1:
            raise ConfigurationError("invalid revision")
        if not runtime_base_url.startswith("https://"):
            raise ConfigurationError("runtime_base_url must use HTTPS")
        if not re.fullmatch(r"AC[0-9A-Fa-f]{32}", account_sid):
            raise ConfigurationError("invalid Twilio Account SID")
        if not re.fullmatch(r"[0-9A-Fa-f]{32}", auth_token):
            raise ConfigurationError("invalid Twilio Auth Token")
        if not re.fullmatch(r"\+[1-9][0-9]{6,14}", phone):
            raise ConfigurationError("invalid Twilio phone number")
        if not re.fullmatch(r"[0-9a-f]{64}", ingest_secret):
            raise ConfigurationError("invalid call ingest credential")
        return cls(
            agent_id=agent_id,
            revision=revision,
            name=_text(data, "name", 120),
            voice_name=_text(data, "voice_name", 120),
            language=_text(data, "language", 80),
            objective=_text(data, "objective", 2_000, False),
            greeting=_text(data, "greeting", 2_000),
            system_prompt=_text(data, "system_prompt", 20_000),
            runtime_base_url=runtime_base_url,
            twilio_account_sid=account_sid,
            twilio_auth_token=auth_token,
            twilio_phone=phone,
            call_ingest_hmac_secret=ingest_secret,
        )


@dataclass(frozen=True)
class ServerConfig:
    openai_api_key: str
    openai_base_url: str
    llm_model: str
    whisper_url: str
    whisper_api_key: str
    supertonic_url: str
    supertonic_api_key: str
    call_ingest_url: str
    data_dir: Path

    @classmethod
    def from_env(cls) -> "ServerConfig":
        data_dir = Path(os.environ.get("AGENT_DATA_DIR", "/data"))
        data_dir.mkdir(parents=True, exist_ok=True)
        return cls(
            openai_api_key=_required_env("OPENAI_API_KEY"),
            openai_base_url=_required_env("OPENAI_BASE_URL"),
            llm_model=os.environ.get("LLM_MODEL", "openai/gpt-oss-20b"),
            whisper_url=_required_env("WHISPER_URL"),
            whisper_api_key=os.environ.get("WHISPER_API_KEY", "").strip(),
            supertonic_url=_required_env("SUPERTONIC_URL"),
            supertonic_api_key=os.environ.get("SUPERTONIC_API_KEY", "").strip(),
            call_ingest_url=_required_env("CALL_INGEST_URL"),
            data_dir=data_dir,
        )
