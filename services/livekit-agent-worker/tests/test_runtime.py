from __future__ import annotations

import json
from unittest.mock import patch
from uuid import uuid4

import pytest

from qubesight_livekit_agent.runtime import (
    AgentRuntimeConfig,
    DispatchMetadata,
    RuntimeClient,
    RuntimeContractError,
)


def valid_metadata() -> tuple[DispatchMetadata, str]:
    agent_id = str(uuid4())
    organization_id = str(uuid4())
    room_name = f"qs-test-{agent_id}-{uuid4()}"
    raw = json.dumps(
        {
            "agent_id": agent_id,
            "organization_id": organization_id,
            "mode": "browser_test",
            "runtime_token": "a" * 64,
        }
    )
    return DispatchMetadata.parse(raw, room_name), room_name


def test_dispatch_metadata_rejects_untrusted_mode() -> None:
    raw = json.dumps(
        {
            "agent_id": str(uuid4()),
            "organization_id": str(uuid4()),
            "mode": "production",
            "runtime_token": "a" * 64,
        }
    )
    with pytest.raises(RuntimeContractError, match="mode"):
        DispatchMetadata.parse(raw, f"qs-test-{uuid4()}")


def test_runtime_config_must_match_dispatched_agent_and_room() -> None:
    metadata, room_name = valid_metadata()
    payload = {
        "agent": {
            "id": metadata.agent_id,
            "name": "Agente de prueba",
            "language": "Español",
            "voice_name": "Sofia",
            "greeting": "Hola, ¿cómo puedo ayudarte?",
            "system_prompt": "Ayuda al cliente con respuestas breves y seguras.",
            "revision": 4,
        },
        "session": {"room_name": room_name, "mode": "browser_test"},
    }
    config = AgentRuntimeConfig.parse(payload, metadata)
    assert config.agent_id == metadata.agent_id
    assert config.revision == 4

    payload["session"]["room_name"] = "qs-test-another-room"
    with pytest.raises(RuntimeContractError, match="room"):
        AgentRuntimeConfig.parse(payload, metadata)


def test_completion_sends_only_bounded_runtime_contract() -> None:
    metadata, _ = valid_metadata()
    client = RuntimeClient("https://backend.example/functions/v1/voice-agent-runtime")
    with patch.object(client, "_post", return_value={"stored": True}) as post:
        client.complete(
            metadata,
            status="completed",
            started_at="2026-09-28T10:00:00+00:00",
            ended_at="2026-09-28T10:00:15+00:00",
            transcript=[{"role": "user", "text": "Hola"}],
        )
    post.assert_called_once_with(
        metadata.runtime_token,
        {
            "action": "complete",
            "status": "completed",
            "started_at": "2026-09-28T10:00:00+00:00",
            "ended_at": "2026-09-28T10:00:15+00:00",
            "transcript": [{"role": "user", "text": "Hola"}],
        },
    )


def test_voice_agent_id_selects_agent_and_builds_its_own_instructions() -> None:
    agent_id = str(uuid4())
    room_name = f"qs-test-{agent_id}-{uuid4()}"
    raw = json.dumps({"voice_agent_id": agent_id, "organization_id": str(uuid4()),
                      "mode": "browser_test", "runtime_token": "a" * 64})
    metadata = DispatchMetadata.parse(raw, room_name)
    assert metadata.agent_id == agent_id
    config = AgentRuntimeConfig.parse({
        "agent": {"id": agent_id, "name": "Lucía", "language": "Español", "voice_name": "Sofia",
                  "greeting": "Hola, soy Lucía", "system_prompt": "Atiende a clientes de la clínica.",
                  "revision": 1, "business_name": "Clínica Sol",
                  "escalation_rules": {"emergency": True}},
        "session": {"room_name": room_name},
    }, metadata)
    text = config.instructions()
    assert "Lucía" in text and "Clínica Sol" in text and "emergency" in text
    assert "Matilda" not in text
