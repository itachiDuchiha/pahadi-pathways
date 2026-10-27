#!/usr/bin/env bash
# Deploy the site on the server: install, migrate, seed, build, restart.
# This is the only supported way to deploy; the build reads the live database,
# so prerendered pages always match what editors have published.
set -euo pipefail

cd "$(dirname "${BASH_SOURCE[0]}")/.."

# Load the server's environment file when present. It is executed as shell,
# so keep values to simple KEY=value lines (no unquoted ; & spaces backticks
# or $), and remember that whoever can write it can run code as this user.
if [[ -f .env.local ]]; then
  # Refuse values the shell would expand or run: any $ or backtick, and a
  # ; or & in a value that does not start with a quote. Only line numbers
  # and names are printed, never values.
  expands='^[^#]*[$`]'
  unquoted='^[[:space:]]*(export[[:space:]]+)?[A-Za-z_][A-Za-z0-9_]*=[^"'"'"'][^#]*[;&]'
  if bad="$(grep -nE -e "$expands" -e "$unquoted" .env.local)"; then
    echo "deploy: refusing to run; .env.local is read by the shell, so values must not" >&2
    echo "deploy: contain \$ or a backtick, or an unquoted ; or &. Fix these lines:" >&2
    cut -d= -f1 <<<"$bad" >&2
    exit 1
  fi
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

# SQLite: create the database directory and back up the current file
# (the newest three backups are kept). Create the media directory too.
if [[ "$DATABASE_URL" == file:* ]]; then
  db_path="${DATABASE_URL#file:}"
  db_path="${db_path#//}"
  mkdir -p "$(dirname "$db_path")"
  if [[ -f "$db_path" ]]; then
    backup="$db_path.bak-$(date +%Y%m%d-%H%M%S)"
    cp -p "$db_path" "$backup"
    echo "deploy: backed up the database to $backup"
    mapfile -t old_backups < <(ls -1t "$db_path".bak-* 2>/dev/null | tail -n +4)
    for old in "${old_backups[@]}"; do
      rm -f -- "$old"
    done
  fi
fi
if [[ -n "${MEDIA_DIR:-}" ]]; then
  mkdir -p "$MEDIA_DIR"
fi

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
