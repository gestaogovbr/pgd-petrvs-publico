#!/bin/bash

# Script para parar containers, puxar novas imagens e reiniciar containers
# Use --deploy-seed para executar o DeployPRODSeeder

COMPOSE_FILE="resources/docker/producao/docker-compose.yml"
if [ ! -f "$COMPOSE_FILE" ]; then
  COMPOSE_FILE="resources/install-public/docker-compose.yml"
fi
PHP_CONTAINER="petrvs_php_producao"
if echo "$COMPOSE_FILE" | grep -q "install-public"; then
  PHP_CONTAINER="petrvs_php"
fi

echo "Parando containers..."
docker-compose -f "$COMPOSE_FILE" down

#echo "Limpando Docker..."
# Limpar as imagens do docker
#docker container prune -f && docker image prune -f && docker network prune -f && docker builder prune -f

echo "Puxando novas imagens..."
docker-compose -f "$COMPOSE_FILE" pull

echo "Reiniciando containers em modo detached (forcando rebuild)..."
ELASTIC_APM_ENABLED=$(grep -E '^ELASTIC_APM_ENABLED=' back-end/.env | cut -d'=' -f2 | tr -d '"')
export ELASTIC_APM_ENABLED
docker-compose -f "$COMPOSE_FILE" up -d --build

echo "Copiando o .env para o container..."
ENV_SRC=".env"
if echo "$COMPOSE_FILE" | grep -q "producao"; then
  ENV_SRC="back-end/.env"
fi
if [ -f "$ENV_SRC" ]; then
  docker cp "$ENV_SRC" "$PHP_CONTAINER":/var/www/.env
else
  echo "Aviso: arquivo $ENV_SRC não encontrado; pulando cópia do .env"
fi

sleep 10

#Storage
echo "Permissão storage/logs..."
docker exec -it "$PHP_CONTAINER" bash -c 'sudo chmod -R 777 /var/www/storage/logs/'
docker exec -it "$PHP_CONTAINER" bash -c 'sudo chmod -R 777 /var/www/storage/'
docker exec -it "$PHP_CONTAINER" bash -c 'sudo chown -R www-data:www-data ./storage/logs/'
echo "Limpando storage/logs"
docker exec -it "$PHP_CONTAINER" bash -c 'sudo rm -f /var/www/storage/logs/*.log'
docker exec -it "$PHP_CONTAINER" touch /var/www/storage/logs/laravel.log
docker exec -it "$PHP_CONTAINER" chmod 777 /var/www/storage/logs/laravel.log
docker exec -it "$PHP_CONTAINER" touch /var/www/storage/logs/siape.log
docker exec -it "$PHP_CONTAINER" chmod 777 /var/www/storage/logs/siape.log
docker exec -it "$PHP_CONTAINER" bash -lc 'touch /var/www/storage/logs/$(date +%d-%m-%Y)-mysql-slow.log'
docker exec -it "$PHP_CONTAINER" bash -lc 'chmod 777 /var/www/storage/logs/*-mysql-slow.log'

#Limpar Cache 
echo "Limpar Cache"
docker exec "$PHP_CONTAINER" bash -c 'php artisan cache:clear'
docker exec "$PHP_CONTAINER" bash -c 'php artisan config:clear'

echo "Executando php artisan migrate..."
# Execute o shell do container e o comando php artisan migrate
docker exec "$PHP_CONTAINER" bash -c "php artisan migrate"
docker exec "$PHP_CONTAINER" bash -c "php artisan tenants:migrate"

# Executa o DeployPRODSeeder apenas se a flag --deploy-seed for passada
if [[  "$*" != *"--deploy-seed"* ]]; then
    echo "Executando DeployPRODSeeder..."
    docker exec petrvs_php bash -c 'php artisan tenants:run db:seed --option="class=DeployPRODSeeder"'
fi

sleep 10

echo 'Restart do ambiente de JOBS'
if docker ps -a --format '{{.Names}}' | grep -q '^petrvs_queue$'; then
  docker restart petrvs_queue
fi
echo 'Iniciando CRON'
docker exec "$PHP_CONTAINER" bash -c "service cron start"
echo " ---- Script concluído. ----"
