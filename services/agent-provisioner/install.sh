#!/usr/bin/env bash
set -euo pipefail

if [[ "${EUID}" -ne 0 ]]; then
  echo "Run this installer as root." >&2
  exit 1
fi

SOURCE_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"

install -d -m 0755 /opt/qubesight-agent-provisioner
install -m 0755 "${SOURCE_DIR}/app.py" /opt/qubesight-agent-provisioner/app.py
install -m 0644 "${SOURCE_DIR}/qubesight-agent@.service" /etc/systemd/system/qubesight-agent@.service
install -m 0644 "${SOURCE_DIR}/qubesight-agent-provisioner.service" /etc/systemd/system/qubesight-agent-provisioner.service
install -d -m 0700 /var/lib/qubesight-agents /var/lib/qubesight-provisioner/requests
install -d -m 0750 /etc/qubesight
if [[ ! -f /etc/caddy/qubesight-agents.caddy ]]; then
  printf '%s\n' '# Managed by QubeSight Agent Provisioner. No active agents.' \
    > /etc/caddy/qubesight-agents.caddy
  # This file contains routes only, never credentials. Caddy commonly runs as
  # an unprivileged user and must be able to read the imported configuration.
  chmod 0644 /etc/caddy/qubesight-agents.caddy
fi

if [[ ! -f /etc/qubesight/provisioner.env ]]; then
  install -m 0600 "${SOURCE_DIR}/provisioner.env.example" /etc/qubesight/provisioner.env
fi
if [[ ! -f /etc/qubesight/agent-runtime.env ]]; then
  install -m 0600 "${SOURCE_DIR}/agent-runtime.env.example" /etc/qubesight/agent-runtime.env
fi
if [[ ! -f /etc/qubesight/agent-runtime-secrets.env ]]; then
  install -m 0600 "${SOURCE_DIR}/agent-runtime-secrets.env.example" \
    /etc/qubesight/agent-runtime-secrets.env
fi

systemctl daemon-reload
echo "Files installed. Configure /etc/qubesight/*.env and Caddy before enabling the service."
