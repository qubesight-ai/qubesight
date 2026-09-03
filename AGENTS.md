# QubeSight agent operating guide

Read this file before editing code, migrations, infrastructure, or documentation.

## Source of truth

- Canonical repository: `qubesight-ai/qubesight`.
- The former `qubesight-bit/qubesight` redirects here; do not use it in new docs.
- Begin from a clean, current `origin/main` and record `git rev-parse HEAD`.
- Repository code and migrations override historical ZIPs or handoff notes.
- Read `docs/CONTINUITY_INDEX.md` before substantial work.

## Product boundary

QubeSight is a multi-tenant React/TypeScript dashboard backed by Lovable Cloud/Supabase. It includes authentication, organizations and RLS, voice-agent configuration, calls, chatbot configuration/Groq streaming, and a secure Twilio connection MVP.

A `voice_agents` row is desired configuration, not proof of a running agent. Runtime provisioning is a separate security-sensitive system.

## Mandatory workflow

1. Inspect HEAD, open PRs, relevant migrations, Edge Functions, tests and docs.
2. State scope, exclusions, trust boundaries, risks, validation and rollback.
3. Work on a dedicated branch from current `main`; never develop on `main`.
4. Preserve unrelated changes and make the smallest coherent change.
5. Run:

   ```bash
   npm ci
   npm run validate
   node scripts/architecture-check.mjs
   git diff --check
   ```

6. Mock external providers in automated tests and test every behavior change.
7. Review the diff for secrets, tenant leaks, destructive SQL and PII logging.
8. Do not commit, push, open a PR, merge or deploy beyond the user's explicit authorization.
9. Report files, test results, migrations, required secret names, rollout and rollback.

## Architecture rules

- Application code is TypeScript (`.ts`/`.tsx`).
- Routes are centralized; pages correspond to URLs; feature modules own domain UI, hooks, schemas, types and services.
- `src/pages/Dashboard.tsx` is still too large. New work must not enlarge it; extract a feature before extending it.
- Browser code calls only QubeSight/Supabase boundaries, never Groq, OpenRouter, ElevenLabs, Twilio administrative APIs, the provisioner or VPS directly.
- Validate every server boundary with Zod or an equivalent strict schema.
- Authorize in PostgreSQL/Edge Functions, not only UI. Resolve tenant membership server-side; never trust browser-supplied `organization_id` alone.
- Tenant tables require `organization_id` and tested RLS.
- Sensitive/expensive endpoints require authentication as applicable, rate limiting, bounded input/output, timeouts, safe errors and auditability.
- Retried operations must be idempotent. Provisioning and callbacks require replay protection.
- Prefer streaming for conversational AI and support cancellation.

## Secrets

Never place credentials, JWTs, service-role keys, Twilio secrets, HMAC keys, private URLs or production `.env` values in source, issues, PR text, tests, logs, screenshots or chat.

- `VITE_*` is public browser configuration only.
- Server secrets belong in Lovable Cloud/Supabase Secrets.
- Per-tenant Twilio secrets belong in Supabase Vault and never return to the browser.
- Rotate any secret exposed in conversation or logs.

## Database safety

- Never rewrite an applied migration; add a forward migration.
- Inspect the migration ledger before applying SQL. Never rerun blindly.
- Review RLS, grants, `SECURITY DEFINER`, `search_path` and RPC permissions.
- Test isolation using two organizations before production.

## Production and infrastructure

Repository work does not authorize operations in Lovable, Supabase production, Twilio, DNS, n8n, WAHA, Caddy, systemd, Docker or the VPS.

- Do not buy numbers or change Twilio Voice URLs without explicit approval and a captured rollback value.
- Do not modify or restart Matilda or Tem.
- Never interpolate user content into shell commands, paths, units, containers or Caddy.
- Provisioner operations must be signed, timestamped, replay-resistant, allowlisted, idempotent and auditable.
- New agents require isolated resources and an immutable reviewed runtime image.

## Current status

- PR #19, secure Twilio connection MVP: merged.
- PR #20, security/TypeScript/streaming/quality gates: merged.
- PR #21, Agent Provisioning Layer: open; not production truth.
- Lovable publication, database migrations, Edge Function deployment and Git merge are separate states.
- Next safe architecture task: modularize the dashboard and add nested dashboard routes without changing behavior.
- Provisioning rollout requires independent verification of image, DNS, HMAC secrets, migration, functions, staging, health and rollback.

## Required handoff

Finish with repository, branch/base/result SHA; completed and excluded scope; changed files; exact validations; migrations created/applied; required secret names only; deployments performed/pending; risks; rollback; and one recommended next action.
