#!/bin/sh

set -e

echo "Rodando comandos do artisan ..."

#php -f /var/www/artisan migrate --force
php -f /var/www/artisan cache:clear
php -f /var/www/artisan config:cache
php -f /var/www/artisan route:clear
php -f /var/www/artisan storage:link

echo "Comandos do artisan executados"