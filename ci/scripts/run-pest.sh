#!/usr/bin/env bash
set -Eeuo pipefail

APP_DIR="${APP_DIR:-back-end}"

cd "${APP_DIR}"

echo "[INFO] Validando composer.json"
composer validate --no-interaction

echo "[INFO] Liberando plugins do Pest no Composer"
composer config --no-plugins allow-plugins.pestphp/pest-plugin true
composer config --no-plugins allow-plugins.pestphp/pest-plugin-laravel true

echo "[INFO] Instalando dependências"
composer install --no-interaction --prefer-dist

echo "[INFO] Garantindo binário do Pest"
if [ ! -f vendor/bin/pest ]; then
  composer update pestphp/pest pestphp/pest-plugin-laravel --no-interaction --prefer-dist
fi

echo "[INFO] Executando Pest"
DB_CONNECTION="${DB_CONNECTION:-mysql}" \
DB_HOST="${DB_HOST:-127.0.0.1}" \
DB_PORT="${DB_PORT:-3306}" \
DB_DATABASE="${MYSQL_DATABASE:-petrvs_test}" \
DB_USERNAME="${DB_USERNAME:-root}" \
DB_PASSWORD="${DB_PASSWORD:-root}" \
./vendor/bin/pest --ci