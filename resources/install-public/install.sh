#!/bin/bash

# Verificar se o arquivo .env já existe
if [ ! -f .env ]; then
    # Criar o conteúdo do arquivo .env
    cat <<EOF > .env
APP_NAME=Petrvs
APP_ENV=local
APP_KEY=base64:U3I8G1vro0qdHqYIlHfQYPSTr8dqZIOrLt5Xrd8zE0U=
APP_DEBUG=true
APP_URL=http://localhost/

CENTRAL_DOMAINS=localhost

LOG_CHANNEL=stack
LOG_LEVEL=debug

DB_CONNECTION=mysql
DB_HOST=mariadb
DB_PORT=3306
DB_DATABASE=petrvs_db
DB_USERNAME=root
DB_PASSWORD=rootpgd

LOG_CONNECTION=log
LOG_HOST=mariadb
LOG_PORT=3306
LOG_DATABASE=petrvs_logs_db
LOG_USERNAME=root
LOG_PASSWORD=rootpgd
LOG_TRAFFIC=false
LOG_CHANGES=false
LOG_ERRORS=false

BROADCAST_DRIVER=log
CACHE_DRIVER=redis
FILESYSTEM_DRIVER=local
QUEUE_CONNECTION=redis
SESSION_LIFETIME=1200
SESSION_DRIVER=custom-database
SESSION_CONNECTION=mysql
SESSION_DOMAIN=localhost
SESSION_SAME_SITE=none
SESSION_SECURE_COOKIE=true
SESSION_HTTP_ONLY=true
SESSION_SECURE_COOKIE=true
SANCTUM_STATEFUL_DOMAINS=localhost:80,localhost:443

MEMCACHED_HOST=127.0.0.1

REDIS_HOST=petrvs_redis
REDIS_PASSWORD=null
REDIS_PORT=6379

MAIL_MAILER=smtp
MAIL_HOST=
MAIL_PORT=465
MAIL_USERNAME=
MAIL_PASSWORD=
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS=
MAIL_FROM_NAME="\${APP_NAME}"

AWS_ACCESS_KEY_ID=
AWS_SECRET_ACCESS_KEY=
AWS_DEFAULT_REGION=us-east-1
AWS_BUCKET=
AWS_USE_PATH_STYLE_ENDPOINT=false

PUSHER_APP_ID=
PUSHER_APP_KEY=
PUSHER_APP_SECRET=
PUSHER_APP_CLUSTER=mt1

MIX_PUSHER_APP_KEY="\${PUSHER_APP_KEY}"
MIX_PUSHER_APP_CLUSTER="\${PUSHER_APP_CLUSTER}"

EOF
fi


# Saudação
echo "Instalação do sistema PetrvsPGD 2.0 - MGI"

# Função para determinar o ambiente (local ou produção)
get_environment() {
    echo "Você está instalando em um ambiente local ou de produção?"
    select environment in "Local" "Produção"; do
        case $environment in
            "Produção")
                APP_URL="https://"
                break
                ;;
            "Local")
                APP_URL="http://"
                break
                ;;
            *)
                echo "Opção inválida. Por favor, selecione 1 para Local ou 2 para Produção."
                ;;
        esac
    done
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
        echo "Deseja instalar o Docker?"
        select install_docker in "Sim" "Não"; do
            case $install_docker in
                Sim)
                    echo "Instalando Docker..."
                    install_docker
                    echo "Docker instalado com sucesso."
                    break
                    ;;
                Não)
                    echo "Ok, continuando sem instalar o Docker."
                    break
                    ;;
                *)
                    echo "Opção inválida. Por favor, selecione 1 para Sim ou 2 para Não."
                    ;;
            esac
        done
    fi

    if ! check_docker_compose_installed; then
        echo "Deseja instalar o Docker Compose?"
        select install_docker_compose in "Sim" "Não"; do
            case $install_docker_compose in
                Sim)
                    echo "Instalando Docker Compose..."
                    install_docker_compose
                    echo "Docker Compose instalado com sucesso."
                    break
                    ;;
                Não)
                    echo "Ok, continuando sem instalar o Docker Compose."
                    break
                    ;;
                *)
                    echo "Opção inválida. Por favor, selecione 1 para Sim ou 2 para Não."
                    ;;
            esac
        done
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

# Função para configurar variáveis padrão no arquivo .env
configure_default_env() {
    if [ -f .env ]; then
        mariadb_root_password="rootpgd"
        sed -i "s/^DB_CONNECTION=.*/DB_CONNECTION=mysql/" .env
        sed -i "s/^DB_HOST=.*/DB_HOST=mariadb/" .env
        sed -i "s/^LOG_HOST=.*/LOG_HOST=mariadb/" .env
        sed -i "s/^DB_PORT=.*/DB_PORT=3306/" .env
        sed -i "s/^LOG_PORT=.*/LOG_PORT=3306/" .env
        sed -i "s/^DB_DATABASE=.*/DB_DATABASE=petrvs_db/" .env
        sed -i "s/^LOG_DATABASE=.*/LOG_DATABASE=petrvs_logs_db/" .env
        sed -i "s/^DB_USERNAME=.*/DB_USERNAME=root/" .env
        sed -i "s/^LOG_USERNAME=.*/LOG_USERNAME=root/" .env
        sed -i "s/^DB_PASSWORD=.*/DB_PASSWORD=$mariadb_root_password/" .env
        sed -i "s/^LOG_PASSWORD=.*/LOG_PASSWORD=$mariadb_root_password/" .env
    else
        echo "Arquivo .env não encontrado."
        exit 1
    fi
}

select_image_tag() {
    echo "Selecione a tag da imagem:"
    select image_tag in "Produção" "Desenvolvimento"; do
        case $image_tag in
            Produção)
                IMAGE_TAG="latest"
                break
                ;;
            Desenvolvimento)
                IMAGE_TAG="dsv"
                break
                ;;
            *)
                echo "Opção inválida. Por favor, selecione 1 para Produção ou 2 para Desenvolvimento."
                ;;
        esac
    done
}

#select_image_tag
IMAGE_TAG="latest"
# Função para perguntar ao usuário se deseja levantar o MariaDB
ask_mariadb() {
    echo "Deseja levantar o MariaDB?"
    select use_mariadb in "Sim" "Não"; do
        case $use_mariadb in
            Sim)
                configure_default_env
                ask_execute_configurations2
                DOCKER_COMPOSE_CONTENT="
version: '3.9'
services:
  mariadb:
    image: mariadb:latest
    container_name: mariadb
    ports:
      - '3306:3306'
    volumes:
      - db_data:/var/lib/mysql      # Define um volume persistente para os dados do MariaDB
      - ./my.cnf:/etc/mysql/my.cnf  # Certifique-se que este arquivo está corretamente configurado
    environment:
      MYSQL_ROOT_PASSWORD: rootpgd   # Define a senha para o root
  petrvs_php:
    image: segescginf/pgdpetrvs:$IMAGE_TAG  # Substitua pela sua imagem real
    container_name: petrvs_php
    ports:
      - '80:80'
      - '443:443'
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 4048M
    volumes:
      - ./.env:/var/www/.env
      - ./php.ini:/usr/local/etc/php/conf.d/custom-php.ini
  petrvs_queue:
    image: segescginf/pgdpetrvs:$IMAGE_TAG
    container_name: petrvs_queue
    environment:
      - TZ=America/Bahia
    command: ['/bin/bash', '-c', 'mkdir -p /var/www/storage/logs && chown -R www-data:www-data /var/www/storage && chmod -R 775 /var/www/storage && supervisord -c /etc/supervisor/conf.d/horizon.conf']
    depends_on:
      - petrvs_php
    volumes:
      - './.env:/var/www/.env'
      - ./php.ini:/usr/local/etc/php/conf.d/custom-php.ini
    stdin_open: true
    tty: true
  petrvs_redis:
    image: redis:alpine
    container_name: petrvs_redis
    ports:
      - '6379:6379'
volumes:
  db_data:  # Declara o volume persistente
"
                break
                ;;
            Não)
                ask_execute_configurations
                DOCKER_COMPOSE_CONTENT="
version: '3.9'
services:
  petrvs_php:
    image: segescginf/pgdpetrvs:$IMAGE_TAG  # Substitua pela sua imagem real
    container_name: petrvs_php
    ports:
      - '80:80'
      - '443:443'
    deploy:
      resources:
        limits:
          cpus: '2.0'
          memory: 4048M
    volumes:
      - ./.env:/var/www/.env
      - ./php.ini:/usr/local/etc/php/conf.d/custom-php.ini
  petrvs_queue:
    image: segescginf/pgdpetrvs:$IMAGE_TAG
    container_name: petrvs_queue
    environment:
      - TZ=America/Bahia
    command: ['/bin/bash', '-c', 'mkdir -p /var/www/storage/logs && chown -R www-data:www-data /var/www/storage && chmod -R 775 /var/www/storage && supervisord -c /etc/supervisor/conf.d/horizon.conf']
    depends_on:
      - petrvs_php
    volumes:
      - './.env:/var/www/.env'
      - ./php.ini:/usr/local/etc/php/conf.d/custom-php.ini
    stdin_open: true
    tty: true
  petrvs_redis:
    image: redis:alpine
    container_name: petrvs_redis
    ports:
      - '6379:6379'
"
                break
                ;;
            *)
                echo "Opção inválida. Por favor, selecione 1 para Sim ou 2 para Não."
                ;;
        esac
    done
}



# Função para perguntar ao usuário se deseja executar as configurações
ask_execute_configurations() {
    echo "Deseja configurar o arquivo .env?"
    select execute_configurations in "Sim" "Não"; do
        case $execute_configurations in
            Sim)
                echo "Configurando o arquivo .env..."
                # Pergunta e atualiza cada variável do .env
                update_env "Digite o host do banco de dados" "DB_HOST" "LOG_HOST"
                update_env "Digite a porta do banco de dados" "DB_PORT" "LOG_PORT"
                update_env "Digite o nome do banco de dados" "DB_DATABASE"
                update_env "Digite o nome do banco de dados de logs" "LOG_DATABASE"
                update_env "Digite o nome de usuário do banco de dados" "DB_USERNAME" "LOG_USERNAME"
                update_env "Digite a senha do banco de dados" "DB_PASSWORD" "LOG_PASSWORD"
                update_env "Digite a URL do sistema" "CENTRAL_DOMAINS"
                echo "Dados configurados com sucesso!"
                break
                ;;
            Não)
                echo "Ok, as configurações não serão executadas."
                break
                ;;
            *)
                echo "Opção inválida. Por favor, selecione 1 para Sim ou 2 para Não."
                ;;
        esac
    done
}

# Função para perguntar ao usuário se deseja executar as configurações adicionais
ask_execute_configurations2() {
    echo "Deseja configurar o arquivo .env?"
    select execute_configurations in "Sim" "Não"; do
        case $execute_configurations in
            Sim)
                echo "Configurando o arquivo .env..."
                # Pergunta e atualiza cada variável do .env
                update_env "Digite a URL do sistema" "CENTRAL_DOMAINS"
                echo "Dados configurados com sucesso!"
                break
                ;;
            Não)
                echo "Ok, as configurações não serão executadas."
                break
                ;;
            *)
                echo "Opção inválida. Por favor, selecione 1 para Sim ou 2 para Não."
                ;;
        esac
    done
}

# Chama a função para perguntar ao usuário
ask_mariadb

# Função para criar o arquivo docker-compose.yml
create_docker_compose_file() {
    echo "$DOCKER_COMPOSE_CONTENT" > docker-compose.yml
    echo "Arquivo docker-compose.yml criado com sucesso."
}

reset_docker_compose_file() {
    if [ -f "docker-compose.yml" ]; then
        echo "Apagando arquivo docker-compose.yml existente..."
        rm docker-compose.yml
    fi
    echo "Criando novo arquivo docker-compose.yml..."
    create_docker_compose_file
}
reset_docker_compose_file

echo "--- PARANDO DOCKER ---"
docker-compose down

#if docker volume inspect install_mariadb_data &>/dev/null; then
#    echo "Removendo o volume do MariaDB..."
#    docker volume rm install_mariadb_data
#fi

echo "--- INICIANDO DOCKER ---"

echo "Puxando novas imagens..."
# Puxar novas imagens
docker-compose pull

echo "Iniciando containers em modo detached..."
# Iniciar containers em modo detached
docker-compose up -d

echo "Copiando o .env para o container..."
# Copia o .env para container
docker cp .env petrvs_php:/var/www/.env

# Storage
echo "Permissão storage/logs..."
docker exec -it petrvs_php bash -c 'sudo chmod -R 777 /var/www/storage/logs/'
docker exec -it petrvs_php bash -c 'sudo chmod -R 777 /var/www/storage/'
docker exec -it petrvs_php bash -c 'sudo chown -R www-data:root ./storage/logs/'
echo "Limpando storage/logs"
docker exec -it petrvs_php bash -c 'sudo rm -f /var/www/storage/logs/*.log'
docker exec -it petrvs_php touch /var/www/storage/logs/laravel.log
docker exec -it petrvs_php chmod 777 /var/www/storage/logs/laravel.log
docker exec -it petrvs_php touch /var/www/storage/logs/siape.log
docker exec -it petrvs_php chmod 777 /var/www/storage/logs/siape.log
docker exec -it petrvs_php touch /var/www/storage/logs/mysql-slow.log
docker exec -it petrvs_php chmod 660 /var/www/storage/logs/mysql-slow.log

echo "Conectando banco de dados..."
sleep 10

# Cria o schema se ele não existir
if ! docker exec -it petrvs_php sh -c "php artisan migrate"; then
     echo "Falha ao conectar ao banco de dados"
    exit 1
fi
echo "Migrando e semeando o banco de dados..."
docker exec -it petrvs_php sh -c "php artisan tenants:migrate"
docker exec -it petrvs_php sh -c 'php artisan tenants:run db:seed --option="class=DeployPRODSeeder"'

# Limpar Cache
echo "Limpar Cache"
docker exec -it petrvs_php bash -c 'php artisan cache:clear'
docker exec -it petrvs_php bash -c 'php artisan config:clear'

sleep 10

# Reiniciando o container Queue
echo "Restart do ambiente de JOBS"
docker restart petrvs_queue

# Iniciar o cronjob
echo 'Iniciando CRON'
docker exec -it petrvs_php bash -c 'service cron start'

echo "--- SISTEMA INICIADO ---"
echo " "

# Função para obter entrada do usuário do Panel SaaS
get_input() {
    local prompt=$1
    local input
    while true; do
        read -p "$prompt: " input
        if [ ! -z "$input" ]; then
            echo $input
            break
        else
            echo "Entrada inválida. Por favor, tente novamente."
        fi
    done
}

echo "Vamos configurar o login e senha do administrador do Painel SaaS."
echo " "

ADMIN_NAME=$(get_input "Digite o nome do administrador")
ADMIN_CPF=$(get_input "Digite o CPF do administrador")
ADMIN_EMAIL=$(get_input "Digite o email do administrador")
ADMIN_PASSWORD=$(get_input "Digite a senha do administrador")

# Criar ou atualizar o usuário administrador no Laravel usando MD5 para o hash da senha
docker exec -it petrvs_php php artisan tinker --execute="App\\Models\\PainelUsuario::updateOrCreate(
    ['email' => '$ADMIN_EMAIL'],
    [
        'nome' => '$ADMIN_NAME',
        'cpf' => '$ADMIN_CPF',
        'password' => md5('$ADMIN_PASSWORD'),
        'email_verified_at' => now()
    ]
)"
echo " "
echo "Configuração completa. O administrador pode acessar o sistema com o email '$ADMIN_EMAIL'."
echo " "
echo -e "URL do panel: \e[34m$(grep -oP '^APP_URL=\K.*' .env)/panel\e[0m"
echo -e "URL do sistema: \e[34m$(grep -oP '^APP_URL=\K.*' .env)/login\e[0m"
