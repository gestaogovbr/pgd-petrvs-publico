#!/bin/bash

# Script para parar containers, puxar novas imagens e reiniciar containers

echo "Parando containers..."
# Parar containers
docker-compose down

#echo "Limpando o docker"
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

#Storage
echo "Permissao storage/logs..."
docker exec -it petrvs_php bash -c 'sudo chmod -R 775 /var/www/storage/logs/'
docker exec -it petrvs_php bash -c 'sudo chown -R www-data:root ./storage'
echo "Limpando storage/logs"
docker exec -it petrvs_php bash -c 'sudo rm -f /var/www/storage/logs/*.log'

#Limpar Cache
echo "Limpar Cache"
docker exec -it petrvs_php bash -c 'php artisan cache:clear'
docker exec -it petrvs_php bash -c 'php artisan config:clear'

echo "Executando php artisan migrate..."
# Execute o shell do container e o comando php artisan migrate
docker exec -it petrvs_php bash -c "php artisan migrate"
docker exec -it petrvs_php bash -c "php artisan tenants:migrate"
docker exec -it petrvs_php bash -c 'php artisan tenants:run db:seed --option="class=DeployPRODSeeder"'
echo " ---- Script concluído. ----"