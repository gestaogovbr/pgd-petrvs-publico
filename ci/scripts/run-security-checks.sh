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

  set +e
  composer audit --locked --no-interaction --format=json > "${REPORTS_DIR}/composer-audit.json"
  AUDIT_EXIT_CODE=$?
  set -e

  echo "Resumo do Composer Audit:"
  set +e
  php -r '
    $file = "'"${REPORTS_DIR}/composer-audit.json"'";
    if (!file_exists($file)) {
        fwrite(STDERR, "Arquivo de relatório não encontrado.\n");
        exit(1);
    }
    $data = json_decode(file_get_contents($file), true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        fwrite(STDERR, "Falha ao interpretar JSON do composer audit.\n");
        exit(1);
    }

    $advisories = $data["advisories"] ?? [];
    $abandoned = $data["abandoned"] ?? [];
    $severityCounts = [
        "critical" => 0,
        "high" => 0,
        "medium" => 0,
        "low" => 0,
        "info" => 0,
        "unknown" => 0,
    ];
    $blockingCount = 0;

    $advisoryCount = 0;
    foreach ($advisories as $package => $items) {
        $advisoryCount += count($items);
        foreach ($items as $item) {
            $severity = strtolower($item["severity"] ?? "unknown");
            if (!array_key_exists($severity, $severityCounts)) {
                $severity = "unknown";
            }
            $severityCounts[$severity]++;
            if (in_array($severity, ["high", "critical"], true)) {
                $blockingCount++;
            }
        }
    }

    echo "- Pacotes com advisories: " . count($advisories) . PHP_EOL;
    echo "- Total de advisories: " . $advisoryCount . PHP_EOL;
    echo "- Critical: " . $severityCounts["critical"] . PHP_EOL;
    echo "- High: " . $severityCounts["high"] . PHP_EOL;
    echo "- Medium: " . $severityCounts["medium"] . PHP_EOL;
    echo "- Low: " . $severityCounts["low"] . PHP_EOL;
    echo "- Info: " . $severityCounts["info"] . PHP_EOL;
    echo "- Unknown: " . $severityCounts["unknown"] . PHP_EOL;
    echo "- Pacotes abandonados: " . count($abandoned) . PHP_EOL;

    foreach ($advisories as $package => $items) {
        foreach ($items as $item) {
            $title = $item["title"] ?? "Sem título";
            $severity = $item["severity"] ?? "unknown";
            echo "  * [$severity] $package - $title" . PHP_EOL;
        }
    }

    foreach ($abandoned as $package => $replacement) {
        $replacementText = $replacement ?: "sem substituto informado";
        echo "  * [abandoned] $package -> $replacementText" . PHP_EOL;
    }

    exit($blockingCount > 0 ? 10 : 0);
  '
  SUMMARY_EXIT_CODE=$?
  set -e

  if [ "${SUMMARY_EXIT_CODE}" -eq 10 ]; then
    echo "Composer Audit encontrou vulnerabilidades high/critical."
    return 1
  fi

  if [ "${SUMMARY_EXIT_CODE}" -ne 0 ]; then
    return "${SUMMARY_EXIT_CODE}"
  fi

  if [ "${AUDIT_EXIT_CODE}" -ne 0 ]; then
    echo "Composer Audit encontrou apenas vulnerabilidades abaixo de high; pipeline seguirá."
  fi

  log "Backend SCA finalizado."
}

run_frontend_audit() {
  log "Iniciando Frontend SCA (npm audit)..."
  cd "${ROOT_DIR}/front-end"

  if [ ! -f "package-lock.json" ]; then
    echo "ERRO: package-lock.json não encontrado em front-end/"
    exit 1
  fi

  set +e
  npm audit --omit=dev --audit-level=high --package-lock-only --json > "${REPORTS_DIR}/npm-audit.json"
  AUDIT_EXIT_CODE=$?
  set -e

  echo "Resumo do npm audit:"
  set +e
  node -e '
    const fs = require("fs");
    const file = process.argv[1];

    if (!fs.existsSync(file)) {
      console.error("Arquivo de relatório não encontrado.");
      process.exit(1);
    }

    let data;
    try {
      data = JSON.parse(fs.readFileSync(file, "utf8"));
    } catch (e) {
      console.error("Falha ao interpretar JSON do npm audit.");
      process.exit(1);
    }

    if (data.error) {
      const code = data.error.code || "erro";
      const summary = data.error.summary || data.error.message || JSON.stringify(data.error);
      console.error(`npm audit retornou erro (${code}): ${summary}`);
      process.exit(2);
    }

    const vulnerabilities = data.vulnerabilities || {};
    const metadata = data.metadata || {};
    const counts = (metadata.vulnerabilities || {});
    const blockingByMetadata = (counts.high || 0) + (counts.critical || 0);
    const blockingByPackage = Object.values(vulnerabilities)
      .filter(info => ["high", "critical"].includes(String(info.severity || "unknown").toLowerCase()))
      .length;
    const blockingCount = blockingByMetadata || blockingByPackage;

    console.log(`- Info: ${counts.info || 0}`);
    console.log(`- Low: ${counts.low || 0}`);
    console.log(`- Moderate: ${counts.moderate || 0}`);
    console.log(`- High: ${counts.high || 0}`);
    console.log(`- Critical: ${counts.critical || 0}`);

    for (const [pkg, info] of Object.entries(vulnerabilities)) {
      const severity = info.severity || "unknown";
      const via = Array.isArray(info.via) ? info.via : [];
      const titles = via
        .filter(v => typeof v === "object" && v.title)
        .map(v => v.title);

      console.log(`  * [${severity}] ${pkg}`);
      for (const title of titles) {
        console.log(`      - ${title}`);
      }
    }

    process.exit(blockingCount > 0 ? 10 : 0);
  ' "${REPORTS_DIR}/npm-audit.json"
  SUMMARY_EXIT_CODE=$?
  set -e

  if [ "${SUMMARY_EXIT_CODE}" -eq 10 ]; then
    echo "npm audit encontrou vulnerabilidades high/critical."
    return 1
  fi

  if [ "${SUMMARY_EXIT_CODE}" -ne 0 ]; then
    return "${SUMMARY_EXIT_CODE}"
  fi

  if [ "${AUDIT_EXIT_CODE}" -ne 0 ]; then
    echo "npm audit falhou por erro de execução sem vulnerabilidades high/critical; ver relatório."
    return "${AUDIT_EXIT_CODE}"
  fi

  log "Frontend SCA finalizado."
}

run_secrets_scan() {
  log "Iniciando Secret Scan (Gitleaks)..."
  cd "${ROOT_DIR}"

  gitleaks detect \
    --source=. \
    --no-git \
    --config="${ROOT_DIR}/.gitleaks.toml" \
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
