#!/usr/bin/env bash
# Deploy the site on the server: install, migrate, seed, build, restart.
# This is the only supported way to deploy; the build reads the live database,
# so prerendered pages always match what editors have published.
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

# Load the server's environment file when present.
if [[ -f .env.local ]]; then
  set -a
  source .env.local
  set +a
fi

missing=()
for name in PAYLOAD_SECRET DATABASE_URL NEXT_PUBLIC_SITE_URL; do
  if [[ -z "${!name:-}" ]]; then
    missing+=("$name")
  fi
done
if (( ${#missing[@]} > 0 )); then
  echo "deploy: refusing to run; set ${missing[*]} in the environment or .env.local" >&2
  exit 1
fi

# Use the Node version pinned in .nvmrc when nvm is installed.
nvm_script="${NVM_DIR:-$HOME/.nvm}/nvm.sh"
if [[ -s "$nvm_script" ]]; then
  # nvm is not written for `set -u`.
  set +u
  source "$nvm_script"
  nvm use
  set -u
fi

# Never let a script push the schema; committed migrations are the source of truth.
export PAYLOAD_DB_PUSH=false

npm ci
npm run payload migrate
# Fills only empty collections and creates the first admin when there are no users.
npm run cms:seed
npm run build

# Restart the running server. The default assumes a systemd user unit named
# "thc"; set APP_RESTART_CMD for another process manager, for example
# APP_RESTART_CMD="pm2 reload thc".
restart_cmd="${APP_RESTART_CMD:-systemctl --user restart thc}"
echo "deploy: restarting with: $restart_cmd"
bash -c "$restart_cmd"

echo "deploy: done"
