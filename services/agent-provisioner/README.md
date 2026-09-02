# QubeSight Agent Provisioner

This service is the restricted control plane between the authenticated Supabase
Edge Function and the voice-agent host. The browser never contacts it directly.

## Security contract

- Binds to `127.0.0.1:8090` by default.
- Requires an HMAC-SHA256 signature and a timestamp no older than five minutes.
- Caches results by request UUID to make retries idempotent.
- Accepts only `reconcile`, `restart`, `status`, and `stop`; it never accepts shell commands.
- Derives service names, directories and ports from a validated UUID.
- Stores agent configuration as mode `0600` and never logs request bodies.
- Runs each runtime in a read-only Docker container with dropped capabilities,
  resource limits and `no-new-privileges`, supervised by systemd.
- Generates only its dedicated Caddy route file and validates Caddy before reload.

## Runtime image contract

`AGENT_RUNTIME_IMAGE` must be a reviewed, immutable image that:

1. runs as UID/GID `10001`;
2. reads JSON from `AGENT_CONFIG_PATH`;
3. listens on the supplied `PORT` using host networking;
4. exposes `GET /health` and returns HTTP 200 only when dependencies are ready;
5. exposes `POST /incoming-call`, `/recording` and `/timeout`, and validates
   `X-Twilio-Signature` with the
   `twilio_auth_token` and the configured `runtime_base_url` in the private
   configuration (Caddy strips the per-agent route prefix before proxying);
6. exposes any subsequent Twilio HTTP/WebSocket routes below the same root;
7. writes call records to Supabase through a server-only credential or a narrowly
   scoped ingestion endpoint—not with the public browser key.

The implementation lives in `services/voice-agent-runtime`. It follows the
Matilda request flow and endpoint contract while loading all identity, objective,
greeting and prompt data from the per-agent configuration.

The provisioner does not turn Matilda's existing source tree into that image.
The image must be built and published separately under a release tag or digest.

## VPS installation

```bash
cd services/agent-provisioner
python3 -m unittest -v test_app.py
sudo bash ./install.sh
sudoedit /etc/qubesight/provisioner.env
sudoedit /etc/qubesight/agent-runtime.env
sudoedit /etc/qubesight/agent-runtime-secrets.env
```

Add these top-level Caddy sites. Use a dedicated hostname for each plane:

```caddyfile
provisioner.example.com {
    reverse_proxy 127.0.0.1:8090
}

import /etc/caddy/qubesight-agents.caddy
```

The provisioner hostname must not expose any other VPS application. Firewall and
Cloudflare rules should restrict it further where possible. Then validate and start:

```bash
sudo caddy validate --config /etc/caddy/Caddyfile
sudo systemctl reload caddy
sudo systemctl enable --now qubesight-agent-provisioner
curl --fail http://127.0.0.1:8090/health
```

## Supabase configuration

Use the same random HMAC secret on both sides:

```bash
openssl rand -hex 32
supabase secrets set \
  AGENT_PROVISIONER_URL=https://provisioner.example.com \
  AGENT_RUNTIME_PUBLIC_BASE_URL=https://voice.example.com \
  AGENT_PROVISIONER_HMAC_SECRET=the-generated-value \
  AGENT_CALL_INGEST_HMAC_SECRET=a-second-independent-random-value
supabase db push
supabase functions deploy twilio-connection
supabase functions deploy agent-provisioning
supabase functions deploy call-ingest --no-verify-jwt
```

Existing Twilio connections contain only the API Key Secret. Reconnect them once
from the dashboard so Vault stores the Auth Token required for webhook signature
validation.
