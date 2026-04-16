#!/usr/bin/env sh
set -eu

ROOT_DIR="$(cd "$(dirname "$0")/../.." && pwd)"
BACKEND_DIR="$ROOT_DIR/back-end"
EXIT_FILE="$ROOT_DIR/.phpstan-exit-code"
REPORT_XML="$BACKEND_DIR/phpstan-report.xml"
REPORT_TXT="$BACKEND_DIR/phpstan-report.txt"

echo "==> Iniciando CI do PHPStan"
echo "ROOT_DIR=$ROOT_DIR"
echo "BACKEND_DIR=$BACKEND_DIR"

command -v php >/dev/null 2>&1 || { echo "ERRO: php não encontrado no agente."; exit 1; }
command -v composer >/dev/null 2>&1 || { echo "ERRO: composer não encontrado no agente."; exit 1; }

cd "$BACKEND_DIR"

echo "==> Validando composer.json"
composer validate --no-check-publish --ansi

echo "==> Configurando allow-plugins"
composer config --no-interaction allow-plugins.pestphp/pest-plugin true || true
composer config --no-interaction allow-plugins.phpstan/extension-installer true || true

echo "==> Instalando dependências"
composer install --no-interaction --prefer-dist --ansi

if [ ! -x vendor/bin/phpstan ]; then
  echo "ERRO: vendor/bin/phpstan não encontrado após composer install."
  exit 1
fi

: > "$REPORT_XML"
: > "$REPORT_TXT"
: > "$EXIT_FILE"

echo "==> Executando PHPStan"
set +e
vendor/bin/phpstan analyse app \
  --configuration=phpstan.neon.dist \
  --memory-limit=1G \
  --error-format=checkstyle \
  --no-progress \
  > "$REPORT_XML" 2> "$REPORT_TXT"
PHPSTAN_EXIT_CODE=$?
set -e

echo "$PHPSTAN_EXIT_CODE" > "$EXIT_FILE"

echo "==> Exit code do PHPStan: $PHPSTAN_EXIT_CODE"
echo "==> Arquivos gerados:"
ls -lah "$REPORT_XML" "$REPORT_TXT" "$EXIT_FILE" || true

echo "==> Resumo textual do PHPStan:"
if [ -s "$REPORT_TXT" ]; then
  cat "$REPORT_TXT"
else
  echo "Sem saída textual adicional."
fi

exit 0