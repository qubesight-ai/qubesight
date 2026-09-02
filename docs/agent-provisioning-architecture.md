# Agent Provisioning Layer

## Request flow

1. An authenticated organization owner saves a `voice_agents` configuration.
2. A database trigger increments `deployment_revision` when runtime fields change.
3. The dashboard invokes the JWT-protected `agent-provisioning` Edge Function.
4. The Edge Function checks ownership, rate limits user and IP, loads the agent and
   selected Twilio number server-side, and creates an idempotent audit operation.
5. It sends a timestamped HMAC request to the VPS provisioner. Provider credentials
   and the HMAC secret never reach the browser.
6. The provisioner writes private configuration, reconciles the systemd/Docker
   runtime, checks `/health`, generates the Caddy route and returns observed state.
7. Only after a valid runtime response, the Edge Function configures Twilio's
   `VoiceUrl` and records the assignment.
8. Runtime and webhook state are returned to the dashboard through RLS-protected rows.

## Failure behavior

- Duplicate reconcile requests for one revision return the original result.
- A failed or timed-out VPS call marks the operation and agent as `error`.
- Twilio is not updated until the runtime has been reconciled.
- `stop` first stops the runtime and then removes the Twilio webhook and assignment.
- A configuration edit marks a previously deployed agent as having pending changes.

## Required production decisions

- Publish an immutable QubeSight voice runtime image implementing the documented contract.
- Choose the dedicated provisioner and voice-runtime hostnames.
- Store all three Supabase secrets and the matching VPS HMAC secret.
- Import the managed Caddy route file and deploy the new database migration/functions.
- Reconnect each legacy Twilio connection once to add its Auth Token.
