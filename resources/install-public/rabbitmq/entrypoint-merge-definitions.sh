#!/usr/bin/env bash
# Junta definitions.json (filas/vhosts) com user/permissions vindos do .env.
set -euo pipefail

_trim() {
  printf '%s' "${1:-}" | tr -d '\r' | sed -e 's/^[[:space:]]*//' -e 's/[[:space:]]*$//'
}

LOGIN="$(_trim "${RABBITMQ_LOGIN:-petrvs}")"
PASS="$(_trim "${RABBITMQ_PASSWORD:-petrvs}")"
VH="$(_trim "${RABBITMQ_VHOST:-/}")"
[ -n "$LOGIN" ] || LOGIN="petrvs"
[ -n "$PASS" ] || PASS="petrvs"
[ -n "$VH" ] || VH="/"

if [ ! -f /etc/rabbitmq/definitions.json ]; then
  echo "entrypoint-merge-definitions: falta /etc/rabbitmq/definitions.json" >&2
  exit 1
fi

USER_JSON="$(jq -n \
  --arg u "$LOGIN" \
  --arg p "$PASS" \
  --arg vh "$VH" \
  '{users: [{name: $u, password: $p, tags: "administrator"}], permissions: [{user: $u, vhost: $vh, configure: ".*", write: ".*", read: ".*"}]}')"

jq -s '.[0] * .[1]' /etc/rabbitmq/definitions.json <(echo "$USER_JSON") > /tmp/rabbitmq-merged-definitions.json

printf 'management.load_definitions = /tmp/rabbitmq-merged-definitions.json\n' \
  > /etc/rabbitmq/conf.d/20-merged-definitions.conf

exec docker-entrypoint.sh "$@"
