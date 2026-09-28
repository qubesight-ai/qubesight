# QubeSight LiveKit agent worker

This is one shared, stateless Python worker for every QubeSight voice agent. It
does not contain customer prompts or credentials. For each explicitly dispatched
browser test it:

1. validates the LiveKit job metadata;
2. exchanges the short-lived, room-bound runtime token for that agent's current
   QubeSight configuration;
3. runs a LiveKit Inference STT-LLM-TTS session;
4. sends a bounded transcript and result back to QubeSight when the room closes.

The dashboard and database remain the source of truth. This worker never accepts
an agent configuration from the browser and never receives a Supabase service
role key.

## Local checks

```bash
uv sync
uv run ruff check .
uv run pytest
```

Copy `.env.example` to `.env.local` only for local development. Never commit
`.env.local`. Use `lk agent dev` for a connected development worker and
`lk agent create` only after the Edge Functions and shared secret are deployed.

## Required deployment configuration

- LiveKit worker secret: `QUBESIGHT_RUNTIME_URL`.
- Optional worker settings: `LIVEKIT_AGENT_NAME`, `LIVEKIT_STT_MODEL`,
  `LIVEKIT_LLM_MODEL`, `LIVEKIT_TTS_MODEL`, and `LIVEKIT_TTS_VOICE`.
- Supabase secret shared only by the two Edge Functions:
  `VOICE_AGENT_RUNTIME_TOKEN_SECRET` (at least 32 random characters).
- `LIVEKIT_AGENT_NAME` in `voice-agent-test-session` must equal the worker's
  `LIVEKIT_AGENT_NAME`.

LiveKit Cloud supplies `LIVEKIT_URL`, `LIVEKIT_API_KEY`, and
`LIVEKIT_API_SECRET` to a deployed agent.

This first slice covers browser Test Call only. DIDWW SIP, production publishing,
telephone calls, external actions, local STT/TTS, and customer-specific servers
are intentionally out of scope.
