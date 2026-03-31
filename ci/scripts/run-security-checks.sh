#!/usr/bin/env bash
set -eu

STEP="${1:-}"
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/../.." && pwd)"
REPORTS_DIR="${ROOT_DIR}/reports/security"
CODEQL_BIN="${CODEQL_BIN:-/opt/codeql/codeql/codeql}"

mkdir -p "${REPORTS_DIR}"

log() {
  printf '\n[%s] %s\n' "$(date '+%F %T')" "$1"
}

run_backend_audit() {
  log "Iniciando Backend SCA (Composer Audit)..."
  cd "${ROOT_DIR}/back-end"

  if [ ! -f "composer.lock" ]; then
    echo "ERRO: composer.lock não encontrado em back-end/"
    exit 1
  fi

  composer audit --locked --no-interaction --format=json > "${REPORTS_DIR}/composer-audit.json"

  log "Backend SCA finalizado."
}

run_frontend_audit() {
  log "Iniciando Frontend SCA (npm audit)..."
  cd "${ROOT_DIR}/front-end"

  if [ ! -f "package-lock.json" ]; then
    echo "ERRO: package-lock.json não encontrado em front-end/"
    exit 1
  fi

  npm audit --omit=dev --audit-level=high --package-lock-only --json > "${REPORTS_DIR}/npm-audit.json"

  log "Frontend SCA finalizado."
}

run_secrets_scan() {
  log "Iniciando Secret Scan (Gitleaks)..."
  cd "${ROOT_DIR}"

  gitleaks detect \
    --source=. \
    --no-git \
    --report-format json \
    --report-path "${REPORTS_DIR}/gitleaks-report.json" \
    --verbose

  log "Secret Scan finalizado."
}

run_codeql() {
  log "Iniciando SAST com CodeQL..."
  cd "${ROOT_DIR}"

  if [ ! -x "${CODEQL_BIN}" ]; then
    echo "ERRO: CodeQL não encontrado em ${CODEQL_BIN}"
    exit 1
  fi

  rm -rf "${REPORTS_DIR}/codeql-db"
  mkdir -p "${REPORTS_DIR}"

  "${CODEQL_BIN}" database create "${REPORTS_DIR}/codeql-db" \
    --language=javascript-typescript \
    --source-root="${ROOT_DIR}/front-end"

  "${CODEQL_BIN}" database analyze "${REPORTS_DIR}/codeql-db" \
    codeql/javascript-queries:codeql-suites/javascript-security-extended.qls \
    --format=sarif-latest \
    --output="${REPORTS_DIR}/codeql-results.sarif"

  log "CodeQL finalizado."
}

case "${STEP}" in
  backend)
    run_backend_audit
    ;;
  frontend)
    run_frontend_audit
    ;;
  secrets)
    run_secrets_scan
    ;;
  codeql)
    run_codeql
    ;;
  *)
    echo "Uso: $0 {backend|frontend|secrets|codeql}"
    exit 1
    ;;
esac