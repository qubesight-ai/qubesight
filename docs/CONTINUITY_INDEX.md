# QubeSight continuity index

Updated: 2026-09-03

## Start here

1. Read root `AGENTS.md`.
2. Resolve current state:

   ```bash
   git fetch origin
   git switch main
   git pull --ff-only origin main
   git status --short
   git rev-parse HEAD
   ```

3. Inspect open PRs before creating overlapping work.
4. Treat historical guides as context, not current truth.

## Canonical systems

| Item             | Location                 | Meaning                                     |
| ---------------- | ------------------------ | ------------------------------------------- |
| Repository       | `qubesight-ai/qubesight` | Canonical source                            |
| Frontend         | Lovable                  | Must be published separately after Git sync |
| Database/backend | Lovable Cloud/Supabase   | Migrations/functions deploy separately      |
| Voice runtimes   | Hostinger VPS            | Matilda and Tem; no incidental changes      |
| Provisioning     | GitHub PR #21            | Proposed until merged and deployed          |

## Completed

### Foundation

- React 18, Vite, TypeScript, React Router and Supabase.
- Auth, protected dashboard, organization onboarding and RLS.
- Voice-agent configuration, call views and chatbot configuration.
- Groq-backed chatbot generation/simulation and Matilda public demo controls.

### PR #19: secure Twilio connection

- Per-organization connection and number models.
- Per-tenant API Key Secret stored through Supabase Vault.
- Authenticated owner-only Edge Function.
- Credential verification, number listing/reconciliation/selection and user/IP rate limits.
- No number purchase or Voice URL mutation in this MVP.

### PR #20: audit implementation

- Public-only `.env.example`; production `.env` excluded.
- Strict TypeScript, Zod validation, Groq SSE streaming and cancellation.
- `useDashboardData` and `useChatStream`.
- Prettier, ESLint, Husky, lint-staged, Vitest, build/typecheck.
- GitHub quality workflow, Gitleaks and architecture policy script.
- Lazy routes, vendor chunks and selected WebP assets.

Therefore the old claim that QubeSight is JavaScript-only, lacks CI or exposes provider keys from the browser is obsolete.

## Limitations and pending work

- `src/pages/Dashboard.tsx` still contains multiple sections/editors; full feature modularization and nested routing remain pending.
- A voice-agent DB row is not a verified runtime.
- Git merge, Lovable publication, migration application, function deployment, DNS and VPS rollout must be tracked independently.
- Payment functions are not trusted for production until server-owned pricing, signature verification, persistence and idempotency are complete.
- Chatbots are not generally published to WhatsApp/WAHA/n8n.
- Production tenant-isolation, retention, backup and rollback drills need evidence.

## PR #21 gate

PR #21 proposes deployment state, signed provisioning operations, a restricted VPS provisioner, Twilio Voice URL changes and runtime operations. It remains open.

Before merge/production:

1. Rebase/review against current `main` and pass CI.
2. Review the immutable runtime image and contract.
3. Verify provisioner/voice DNS and TLS.
4. Configure matching HMAC secrets without exposing values.
5. Install without changing Matilda or Tem.
6. Stage migrations and Edge Functions.
7. Use a disposable agent to test provision, health, restart, stop and rollback.
8. Capture the previous Twilio Voice URL before mutation.
9. Obtain explicit authorization separately for merge and production rollout.

## Documentation

- `AGENTS.md`: mandatory contributor rules.
- `docs/AUDIT_IMPLEMENTATION_2026-09.md`: PR #20 record.
- `docs/ARCHITECTURE_AND_ROADMAP.md`: current/target architecture.
- `docs/OPERATIONS_RUNBOOK.md`: release and production gates.
- `docs/LLM_HANDOFF_PROMPT.md`: reusable continuation prompt.
- PR #21 docs are authoritative only on its branch until merged.
