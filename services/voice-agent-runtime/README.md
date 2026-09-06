# QubeSight generic voice-agent runtime

This image implements the technical pattern proven by Matilda without copying
its identity, catalogue, prompts, notification text or production files. Every
identity and behavior field comes from the private per-agent configuration.

It provides:

- `POST /incoming-call`, `/recording`, and `/timeout` with Twilio signature validation;
- `GET /health` for the provisioner;
- OpenAI-compatible LLM calls;
- self-hosted Whisper and Supertonic integrations;
- an isolated SQLite database and generated audio directory per agent;
- HMAC-authenticated call ingestion into the QubeSight dashboard;
- a unique derived ingestion credential for each agent container;
- SSRF protection for Twilio recording downloads;
- idempotent call finalization.

The image does not contain API keys, customer data, Matilda/Tem code, `.env`
files, databases, recordings or prompts.
