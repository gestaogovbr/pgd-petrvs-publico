#!/bin/sh -l
echo "Starting php artisan migrate..."
php artisan migrate
echo "Stopping php artisan migrate com sucesso...!"
echo "Starting php artisan tenants:migrate..."
php artisan tenants:migrate
echo "Stopping php artisan tenants:migrate com sucesso...!"
echo "Starting php artisan tenants:seed --class=DeployPRFEsteira..."
php artisan tenants:seed --class=DeployPRFEsteira
echo "Stopping php artisan tenants:seed --class=DeployPRFEsteira com sucesso...!"