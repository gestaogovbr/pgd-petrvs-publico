#!/bin/bash

# Saudação
echo "Instalação do sistema PetrvsPGD 2.0 - MGI"

# Função para determinar o ambiente (local ou produção)
get_environment() {
    read -p "Você está instalando em um ambiente local ou de produção? (L/P): " environment
    if [ "$environment" = "P" ]; then
        APP_URL="https://"
    else
        APP_URL="http://"
    fi
}

# Chama a função para determinar o ambiente
get_environment

# Função para verificar o sistema operacional
check_os() {
    if [ -f /etc/os-release ]; then
        source /etc/os-release
        OS=$ID
    elif [ -f /etc/redhat-release ]; then
        OS="redhat"
    else
        echo "Sistema operacional não suportado."
        exit 1
    fi
}

# Função para verificar se o Docker está instalado
check_docker_installed() {
    if ! command -v docker &>/dev/null; then
        echo "Docker não está instalado."
        return 1
    fi
    echo "Docker já está instalado."
    return 0
}

# Função para instalar o Docker
install_docker() {
    if [ "$OS" = "ubuntu" ] || [ "$OS" = "debian" ]; then
        sudo apt-get update
        sudo apt-get install -y docker.io
    elif [ "$OS" = "centos" ] || [ "$OS" = "fedora" ] || [ "$OS" = "redhat" ]; then
        sudo yum install -y docker-ce
    elif [ "$OS" = "alpine" ]; then
        sudo apk update
        sudo apk add docker
    else
        echo "Instalação do Docker não suportada neste sistema."
        return 1
    fi
}

# Função para verificar se o Docker Compose está instalado
check_docker_compose_installed() {
    if ! command -v docker-compose &>/dev/null; then
        echo "Docker Compose não está instalado."
        return 1
    fi
    echo "Docker Compose já está instalado."
    return 0
}

# Função para instalar o Docker Compose
install_docker_compose() {
    if ! check_docker_compose_installed; then
        if [ "$OS" = "ubuntu" ] || [ "$OS" = "debian" ]; then
            sudo apt-get update
            sudo apt-get install -y docker-compose
        elif [ "$OS" = "centos" ] || [ "$OS" = "fedora" ] || [ "$OS" = "redhat" ]; then
            sudo yum install -y epel-release
            sudo yum install -y python3-pip
            sudo pip3 install docker-compose
        elif [ "$OS" = "alpine" ]; then
            sudo apk update
            sudo apk add docker-compose
        else
            echo "Instalação do Docker Compose não suportada neste sistema."
            return 1
        fi
    else
        echo "Docker Compose já está instalado."
    fi
}

# Função para perguntar ao usuário se deseja instalar o Docker e o Docker Compose
ask_install_docker_and_compose() {
    if ! check_docker_installed; then
        read -p "Deseja instalar o Docker? (s/n): " install_docker
        if [ "$install_docker" = "s" ]; then
            echo "Instalando Docker..."
            install_docker
            echo "Docker instalado com sucesso."
        else
            echo "Ok, continuando sem instalar o Docker."
        fi
    fi

    if ! check_docker_compose_installed; then
        read -p "Deseja instalar o Docker Compose? (s/n): " install_docker_compose
        if [ "$install_docker_compose" = "s" ]; then
            echo "Instalando Docker Compose..."
            install_docker_compose
            echo "Docker Compose instalado com sucesso."
        else
            echo "Ok, continuando sem instalar o Docker Compose."
        fi
    fi
}

# Verifica o sistema operacional
check_os

# Chama a função para perguntar ao usuário
ask_install_docker_and_compose


# Função para ler a entrada do usuário e atualizar o arquivo .env
update_env() {
    # Verifica se o arquivo .env existe
    if [ -f .env ]; then
	# Pergunta ao usuário com base na descrição fornecida
        printf "%s\n" "$1"
        # Pula uma linha após a pergunta e exibe a resposta do usuário
        read -p "=> " value
        #echo "$value"
		if [ "$2" = "CENTRAL_DOMAINS" ]; then
			# Atualiza a variável CENTRAL_DOMAINS no .env
			sed -i "s/^CENTRAL_DOMAINS=.*/CENTRAL_DOMAINS=$value/" .env
			sed -i "s/^SESSION_DOMAIN=.*/SESSION_DOMAIN=$value/" .env
			# Atualiza a variável APP_URL com base em CENTRAL_DOMAINS
			sed -i "s|^APP_URL=.*|APP_URL=$APP_URL$value/|" .env
			sed -i "s|^SANCTUM_STATEFUL_DOMAINS=.*|SANCTUM_STATEFUL_DOMAINS=$value:80,$value:443|;" .env
        else
			# Atualiza a variável no .env
			sed -i "s/^$2=.*/$2=$value/" .env
			# Se a variável de cópia for especificada, atualize-a também
			if [ ! -z "$3" ]; then
				sed -i "s/^$3=.*/$3=$value/" .env
			fi
        fi
    else
        echo "Arquivo .env não encontrado."
	exit 1
    fi
}

# Função para perguntar ao usuário se deseja executar as configurações
ask_execute_configurations() {
    read -p "Deseja configurar o arquivo .env? (s/n): " execute_configurations
    if [ "$execute_configurations" = "s" ]; then
        echo "Configurando o arquivo .env..."
        # Pergunta e atualiza cada variável do .env
        update_env "Digite o endereço do host do banco de dados" "DB_HOST" "LOG_HOST"
        update_env "Digite a porta do banco de dados" "DB_PORT" "LOG_PORT"
        update_env "Digite o nome do banco de dados" "DB_DATABASE"
        update_env "Digite o nome do banco de dados de logs" "LOG_DATABASE"
        update_env "Digite o nome de usuário do banco de dados" "DB_USERNAME" "LOG_USERNAME"
        update_env "Digite a senha do banco de dados" "DB_PASSWORD" "LOG_PASSWORD"
        update_env "Digite a URL do sistema" "CENTRAL_DOMAINS"
        echo "Dados configurados com sucesso!"
    else
        echo "Ok, as configurações não serão executadas."
    fi
}

# Chama a função para perguntar ao usuário
ask_execute_configurations

# Conteúdo do docker-compose.yml
DOCKER_COMPOSE_CONTENT='
version: "3.9"
services:
  petrvs_php:
    image: segescginf/pgdpetrvs:latest
    container_name: petrvs_php
    ports:
      - "80:80"
      - "443:443"
    # Remova esta seção se não estiver usando Docker Swarm
    deploy:
      resources:
        limits:
          cpus: "0.5"
          memory: 2496M
'

# Função para criar o arquivo docker-compose.yml
create_docker_compose_file() {
    echo "$DOCKER_COMPOSE_CONTENT" > docker-compose.yml
    echo "Arquivo docker-compose.yml criado com sucesso."
}

# Verifica se o arquivo docker-compose.yml existe
if [ -f "docker-compose.yml" ]; then
    echo "Arquivo docker-compose.yml já existe."
else
    echo "Arquivo docker-compose.yml não encontrado. Criando..."
    create_docker_compose_file
fi

echo "--- INICIANDO DOCKER ---"

echo "Puxando novas imagens..."
# Puxar novas imagens
docker-compose pull

echo "Iniciando containers em modo detached..."
#Iniciar containers em modo detached
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

#Iniciar o cronjob
docker exec -it petrvs_php bash -c 'service cron start'
echo "--- SISTEMA INICIADO ---"
echo "Configuração concluída."
