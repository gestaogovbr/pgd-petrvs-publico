pipeline {
    agent { label 'docker' }

    options {
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
    }

    environment {
        NODE_VERSION = '20'
        DOCKER_HUB_USERNAME = 'segescginf'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Show Context') {
            steps {
                sh '''
                echo "=== USER / HOST ==="
                whoami
                hostname
                pwd

                echo "=== PATH ==="
                echo "$PATH"

                echo "=== NODE / NPM ==="
                which node || true
                which npm || true
                node -v || true
                npm -v || true

                echo "=== DIRECT CHECKS ==="
                /usr/bin/node -v || true
                /usr/bin/npm -v || true
                /bin/node -v || true
                /bin/npm -v || true

                echo "=== ALL NODES FOUND ==="
                find / -name node 2>/dev/null | head -20

                echo "=== ALL NPMS FOUND ==="
                find / -name npm 2>/dev/null | head -20
            '''
            }
        }

        stage('Install Frontend Dependencies') {
            when {
                anyOf {
                    branch 'dataprev_dsv'
                    branch 'dataprev_hmg'
                    branch 'dataprev_producao'
                }
            }
            steps {
                dir('front-end') {
                    sh '''
                    docker run --rm \
                      -v "$WORKSPACE":/workspace \
                      -w /workspace/front-end \
                      node:20 \
                      bash -lc "
                        set -eu
                        npm install --legacy-peer-deps
                      "
                '''
                }
            }
        }

        stage('Install Angular CLI') {
            when {
                anyOf {
                    branch 'dataprev_dsv'
                    branch 'dataprev_hmg'
                    branch 'dataprev_producao'
                }
            }
            steps {
                sh 'echo "Instalação global do @angular/cli desabilitada (EACCES). O build usa npx dentro do container."'
            }
        }

        stage('Build Angular + Postbuild') {
            when {
                anyOf {
                    branch 'dataprev_dsv'
                    branch 'dataprev_hmg'
                }
            }
            steps {
                dir('front-end') {
                    sh '''
                    cd "$WORKSPACE"
                    VERSION=$(node -p "require('./back-end/public/app.json').version")
                    echo "Versão: $VERSION"

                    docker run --rm \
                      -v "$WORKSPACE":/workspace \
                      -w /workspace/front-end \
                      node:20 \
                      bash -lc "
                        set -eu
                        npm install --legacy-peer-deps
                        mkdir -p ../back-end/resources/views ../back-end/public/pages ../back-end/public/assets
                        npx ng build --configuration=production --output-path=../back-end/public
                        node ./postbuild.js
                      "
                '''
                }
            }
        }

        stage('Build Producao') {
            when {
                branch 'dataprev_producao'
            }
            environment {
                DOCKER_HUB_IMAGE = 'segescginf/pgdpetrvs'
                DOCKER_HUB_TAG_LATEST = 'latest'
                DOCKER_HUB_TAG_NEW = '2.9.20'
                DOCKER_HUB_TAG_OLD = '2.9.19'
            }
            steps {
                withCredentials([
                    string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD')
                ]) {
                    sh '''
                        set -eu

                        echo "=== BUILD PRODUÇÃO ==="
                        cd "$WORKSPACE"

                        echo "=== LIMPEZA MÍNIMA DE ARTEFATOS ==="
                        rm -f back-end/resources/views/angular.blade.php || true
                        rm -f back-end/public/index.html || true
                        rm -f back-end/public/app.json || true
                        rm -f back-end/public/assets/build-info.json || true

                        echo "=== BUILD ANGULAR + POSTBUILD (NODE 20) ==="
                        docker run --rm \
                        -v "$WORKSPACE":/workspace \
                        -w /workspace/front-end \
                        node:20 \
                        bash -lc '
                            set -eu
                            npm install --legacy-peer-deps
                            mkdir -p ../back-end/resources/views ../back-end/public/pages ../back-end/public/assets
                            npx ng build --configuration=production --output-path=../back-end/public
                            node ./postbuild.js
                        '

                        echo "=== VALIDAÇÃO DOS ARTEFATOS ==="
                        test -f back-end/resources/views/angular.blade.php
                        test -f back-end/public/app.json
                        test -f back-end/public/assets/build-info.json

                        echo "=== DIAGNÓSTICO RÁPIDO ==="
                        ls -lah back-end/resources/views/angular.blade.php
                        ls -lah back-end/public/app.json
                        ls -lah back-end/public/assets/build-info.json

                        echo "=== LOGIN DOCKER HUB ==="
                        echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USERNAME" --password-stdin

                        echo "=== PREPARANDO TAG OLD ==="
                        docker pull "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_LATEST" || true

                        if docker manifest inspect "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_OLD" >/dev/null 2>&1; then
                        echo "A tag $DOCKER_HUB_TAG_OLD já existe, não será reetiquetada."
                        else
                        docker tag "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_LATEST" "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_OLD"
                        docker push "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_OLD"
                        fi

                        echo "=== BUILD DA IMAGEM ==="
                        docker build -t "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_NEW" -f ./resources/deploy/Dockerfile .

                        docker tag "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_NEW" "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_LATEST"

                        echo "=== PUSH DAS IMAGENS ==="
                        docker push "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_NEW"
                        docker push "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_LATEST"

                        echo "=== FIM BUILD PRODUÇÃO ==="
                    '''
                }
            }
        }

        stage('Build and Deploy DSV') {
            when {
                branch 'dataprev_dsv'
            }
            environment {
                DOCKER_HUB_IMAGE = 'segescginf/pgdpetrvs-develop'
                DOCKER_HUB_TAG = 'dsv'
                DEPLOY_PATH = './'
            }
            steps {
                withCredentials([
                    string(credentialsId: 'SSH_USER', variable: 'SSH_USER'),
                    string(credentialsId: 'SSH_HOST', variable: 'SSH_HOST'),
                    string(credentialsId: 'SSH_DSV_PORT', variable: 'SSH_PORT'),
                    string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD'),
                    file(credentialsId: 'SSH_DSV_KNOWN_HOSTS', variable: 'KNOWN_HOSTS_FILE')
                ]) {
                    sshagent(credentials: ['SSH_KEY_DSV']) {
                        sh '''
                            set -eu

                            echo "Iniciando a construção e implantação do DSV..."
                            echo "Construindo a imagem Docker..."
                            docker build -t "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG" -f ./resources/deploy/Dockerfile .

                            echo "Construção da imagem concluída. Enviando para o Docker Hub..."
                            echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USERNAME" --password-stdin
                            docker push "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG"

                            echo "Envio da imagem Docker concluído. Iniciando implantação no servidor remoto..."
                            ssh -T \
                                -o StrictHostKeyChecking=yes \
                                -o UserKnownHostsFile="$KNOWN_HOSTS_FILE" \
                                -p "$SSH_PORT" \
                                "$SSH_USER@$SSH_HOST" \
                                'cd /home/marcocoelho && bash ./install-pgd.sh'

                            echo "Implantação concluída com sucesso em DSV."
                        '''
                    }
                }
            }
        }

        stage('Build and Deploy HMG') {
            when {
                branch 'dataprev_hmg'
            }
            environment {
                DOCKER_HUB_IMAGE = 'segescginf/pgdpetrvs-develop'
                DOCKER_HUB_TAG = 'hmg'
                DEPLOY_PATH = './'
            }
            steps {
                withCredentials([
                    string(credentialsId: 'SSH_USER', variable: 'SSH_USER'),
                    string(credentialsId: 'SSH_HOST', variable: 'SSH_HOST'),
                    string(credentialsId: 'SSH_HMG_PORT', variable: 'SSH_PORT'),
                    string(credentialsId: 'SSH_PASSWORD_HMG', variable: 'SSH_PASSWORD'),
                    string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD'),
                    file(credentialsId: 'SSH_HMG_KNOWN_HOSTS', variable: 'KNOWN_HOSTS_FILE')
                ]) {
                        sshagent(credentials: ['SSH_KEY_DSV']) {
                            sh '''
                        set -eu

                        echo "Iniciando a construção e implantação do HMG..."

                        echo "Construindo a imagem Docker..."
                        docker build -t "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG" -f ./resources/deploy/Dockerfile .

                        echo "Construção da imagem concluída. Enviando para o Docker Hub..."
                        echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USERNAME" --password-stdin
                        docker push "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG"

                        echo "Envio da imagem Docker concluído. Iniciando implantação no servidor remoto..."

                        ssh -T \
                            -o StrictHostKeyChecking=yes \
                            -o UserKnownHostsFile="$KNOWN_HOSTS_FILE" \
                            -p "$SSH_PORT" \
                            "$SSH_USER@$SSH_HOST" << 'EOF'

                            set -e

                            docker compose down

                            docker container prune -f && docker image prune -f && docker network prune -f && docker builder prune -f

                            docker compose pull
                            docker compose up -d --remove-orphans

                            sleep 10

                            docker cp /root/.env petrvs_php_hmg:/var/www/.env

                            docker exec petrvs_php_hmg php artisan config:clear

                            docker exec -i petrvs_php_hmg php artisan tinker --execute="
                                \$tenantId = env('PETRVS_ENTIDADE');
                                \$tenant = App\\Models\\Tenant::find(\$tenantId);
                                if (\$tenant) {
                                    \$path = public_path('app.json');
                                    if (file_exists(\$path)) {
                                        \$json = json_decode(file_get_contents(\$path), true);
                                        if ((\$json['version'] ?? '') !== \$tenant->version) {
                                            \$json['version'] = \$tenant->version;
                                            file_put_contents(\$path, json_encode(\$json, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));
                                            echo 'Versão sincronizada para: ' . \$tenant->version . PHP_EOL;
                                        } else {
                                            echo 'Versão já está sincronizada: ' . \$tenant->version . PHP_EOL;
                                        }
                                    }
                                } else {
                                    echo 'Tenant não encontrado: ' . \$tenantId . PHP_EOL;
                                }
                            "

                            docker exec petrvs_php_hmg php artisan config:clear

                            sleep 10

                            docker exec petrvs_php_hmg bash -c 'chmod -R 777 /var/www/storage/logs/'
                            docker exec petrvs_php_hmg bash -c 'chmod -R 777 /var/www/storage/'
                            docker exec petrvs_php_hmg bash -c 'chown -R www-data:www-data /var/www/storage/logs/'
                            docker exec petrvs_php_hmg bash -c 'rm -f /var/www/storage/logs/*.log'

                            docker exec petrvs_php_hmg touch /var/www/storage/logs/laravel.log
                            docker exec petrvs_php_hmg chmod 777 /var/www/storage/logs/laravel.log

                            docker exec petrvs_php_hmg php artisan optimize:clear
                            docker exec petrvs_php_hmg php artisan cache:clear
                            docker exec petrvs_php_hmg php artisan config:clear

                            docker exec petrvs_php_hmg composer dump-autoload

                            docker exec petrvs_php_hmg php artisan migrate
                            docker exec petrvs_php_hmg php artisan tenants:migrate
                            docker exec petrvs_php_hmg php artisan tenants:run db:seed --option="class=DeployHMGSeeder"

                            sleep 10

                            docker restart petrvs_queue

                            docker exec petrvs_php_hmg bash -c "service cron start"

EOF

                        echo "Implantação concluída com sucesso em HMG."
                    '''
                        }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline concluída com sucesso.'
        }
        failure {
            echo 'Pipeline falhou.'
        }
        always {
            cleanWs()
        }
    }
}
