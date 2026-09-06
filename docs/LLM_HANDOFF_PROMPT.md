# Prompt for another AI agent

Copy this prompt and replace only `[OBJECTIVE]`.

```text
Work on the canonical repository qubesight-ai/qubesight.

Objective:
[OBJECTIVE]

Before acting:
1. Read AGENTS.md and docs/CONTINUITY_INDEX.md completely.
2. Read the linked documents relevant to the objective.
3. Fetch origin; identify current main SHA and open PRs; inspect relevant code, migrations, Edge Functions and tests.
4. Separate verified state from historical notes and unmerged proposals.
5. State scope, exclusions, trust boundaries, threats, tests and rollback.

Rules:
- Use a dedicated branch from current main; never edit main directly.
- Use TypeScript. Centralize routes; keep pages URL-level and domain work in feature modules, hooks and services.
- Do not add responsibilities to src/pages/Dashboard.tsx.
- Never expose keys, service-role credentials, Twilio secrets, HMAC keys, JWTs or private infrastructure in browser code, VITE variables, Git, tests, logs or chat.
- Strictly validate server input; authenticate; authorize organization membership server-side; preserve RLS; rate-limit expensive work.
- Never trust browser-supplied organization IDs, paths, hostnames, ports or commands without server-side resolution/allowlisting.
- External mutations and callbacks are idempotent, auditable, bounded and replay-resistant.
- Mock Twilio, Groq, Lovable/Supabase production, n8n, WAHA, DNS and VPS in tests.
- Do not access or modify production, Lovable, Supabase, Twilio, DNS, n8n, WAHA, Caddy, systemd, Docker, Matilda, Tem or VPS unless explicitly authorized.
- Do not commit, push, open a PR, merge or deploy beyond current authorization.

Validate:
npm ci
npm run validate
node scripts/architecture-check.mjs
git diff --check

For provisioning, also run its documented Python/shell checks.

Report branch/base/result SHA; files/reasons; completed/excluded scope; exact tests; migrations created versus applied; required secret names only; deployments performed versus pending; security risks; rollback; next action.

Current context:
- PR #19 secure Twilio connection: merged.
- PR #20 security/TypeScript/streaming/quality: merged.
- PR #21 Agent Provisioning Layer: open and not production truth.
- Dashboard modularization and nested routes remain pending.
- A Git merge does not imply Lovable publication, migration, function deployment or VPS rollout.

Begin with read-only inspection. Do not implement until current state and plan are confirmed.
```
