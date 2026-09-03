# QubeSight operations runbook

Updated: 2026-09-03

Git, Lovable publication, database migration, Edge Function deployment, provider mutation and VPS rollout are separate states.

## Release ledger

| Area | Evidence |
| --- | --- |
| Git | PR URL, merge SHA, CI |
| Database | Environment, migration, time, result |
| Edge Function | Name, version/commit, JWT mode, smoke test |
| Frontend | Published version/time and public smoke test |
| Secrets | Names and rotation date, never values |
| Provider | Masked resource, operation and rollback |
| VPS | Image/service version, health and rollback artifact |

## Repository gate

```bash
git fetch origin
git switch main
git pull --ff-only origin main
git status --short
git rev-parse HEAD
npm ci
npm run validate
node scripts/architecture-check.mjs
git diff --check
```

Do not release a dirty tree. Inspect the final diff and GitHub CI.

## Lovable/Supabase migration

1. Confirm project/environment and recovery point.
2. Inspect migration history before applying anything.
3. Review SQL, especially destructive statements, grants, RLS, triggers and `SECURITY DEFINER`.
4. Apply pending migrations once in filename order.
5. Capture the result without secrets or user data.
6. Verify objects, RLS, grants and RPC accessibility.
7. Test two tenants and relevant auth roles.
8. On partial failure, stop and inspect actual state before retrying.

Never rewrite an applied migration or rerun SQL blindly.

## Edge Functions

1. Verify required secret names exist; never show values.
2. Confirm `verify_jwt` in `supabase/config.toml`.
3. Deploy from the approved merge SHA.
4. Test missing/invalid/valid auth, schema rejection, tenant authorization, rate limit, provider failure and timeout.
5. Inspect sanitized logs and record deployed version separately.

Known server-side secret names include `GROQ_API_KEY` and `RATE_LIMIT_HASH_SECRET`. Provisioning names from PR #21 apply only after merge. Per-tenant Twilio credentials belong in Vault, not shared project secrets.

## Frontend

1. Confirm Lovable synchronized the intended `main` SHA.
2. Build/test that SHA and publish without code regeneration.
3. Smoke-test public/auth routes and every protected dashboard child route.
4. Verify direct refresh/SPA fallback.
5. Verify non-owners cannot execute owner-only actions.

## Twilio mutation gate

Before any mutation verify account, ownership and number SID; use revocable credentials; capture current Voice URL/method; verify replacement HTTPS health; and obtain explicit approval. Afterward, place a controlled call and restore the previous value if anything fails. Number purchase requires separate approval.

## Provisioner/VPS gate

Repository work does not authorize VPS access. Before rollout verify:

- immutable image pinned by digest;
- request authentication, HMAC and replay protection;
- DNS/TLS;
- known Matilda/Tem state and backups;
- collision-proof ports/names/directories/domains;
- unprivileged, bounded, loopback-only runtime behind Caddy;
- health, logs, cleanup and rollback.

First rollout uses a disposable tenant/number or disabled state. Never convert Matilda or Tem in place.

## Stop conditions

Stop on secret exposure, ambiguous migration state, cross-tenant access, auth bypass, unsanitized infrastructure identifiers, uncertain Twilio target/rollback, possible modification of an existing agent, tests contacting production, or unknown deployed commit. Rotate, restore and document before continuing.
