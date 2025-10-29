#!/bin/bash

# Script para parar containers, puxar novas imagens e reiniciar containers
# Use --deploy-seed para executar o DeployPRODSeeder

echo "Parando containers..."
# Parar containers
docker-compose down

#echo "Limpando Docker..."
# Limpar as imagens do docker
#docker container prune -f && docker image prune -f && docker network prune -f && docker builder prune -f

echo "Puxando novas imagens..."
# Puxar novas imagens
docker-compose pull

echo "Reiniciando containers em modo detached..."
# Reiniciar containers em modo detached
docker-compose up -d

echo "Copiando o .env para o container..."
# Copia o .env para container
docker cp .env petrvs_php:/var/www/.env

sleep 10

#Storage
echo "Permissão storage/logs..."
docker exec -it petrvs_php bash -c 'sudo chmod -R 777 /var/www/storage/logs/'
docker exec -it petrvs_php bash -c 'sudo chmod -R 777 /var/www/storage/'
docker exec -it petrvs_php bash -c 'sudo chown -R www-data:www-data ./storage/logs/'
echo "Limpando storage/logs"
docker exec -it petrvs_php bash -c 'sudo rm -f /var/www/storage/logs/*.log'
docker exec -it petrvs_php touch /var/www/storage/logs/laravel.log
docker exec -it petrvs_php chmod 777 /var/www/storage/logs/laravel.log

#Limpar Cache 
echo "Limpar Cache"
docker exec petrvs_php bash -c 'php artisan cache:clear'
docker exec petrvs_php bash -c 'php artisan config:clear'

echo "Executando php artisan migrate..."
# Execute o shell do container e o comando php artisan migrate
docker exec petrvs_php bash -c "php artisan migrate"
docker exec petrvs_php bash -c "php artisan tenants:migrate"

# Executa o DeployPRODSeeder apenas se a flag --deploy-seed for passada
if [[  "$*" != *"--deploy-seed"* ]]; then
    echo "Executando DeployPRODSeeder..."
    docker exec petrvs_php bash -c 'php artisan tenants:run db:seed --option="class=DeployPRODSeeder"'
fi

sleep 10

echo 'Restart do ambiente de JOBS'
docker restart petrvs_queue
echo 'Iniciando CRON'
docker exec petrvs_php bash -c "service cron start"
echo " ---- Script concluído. ----"