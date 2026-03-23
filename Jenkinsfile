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
                    -v "$PWD":/app \
                    -w /app \
                    node:20 \
                    bash -lc "
                        npm install --legacy-peer-deps &&
                        npm run build
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
                    branch 'dataprev_producao'
                }
            }
             steps {
            dir('front-end') {
                sh '''
                    docker run --rm \
                    -v "$PWD":/app \
                    -w /app \
                    node:20 \
                    bash -lc "
                        npm install --legacy-peer-deps &&
                        npx ng build
                    "
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
                SSH_USER = 'root'
                SSH_HOST = '200.152.47.207'
                SSH_PORT = '7223'
                DEPLOY_PATH = './'
            }
            steps {
                withCredentials([
                    string(credentialsId: 'SSH_PASSWORD_DSV', variable: 'SSH_PASSWORD'),
                    string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD')
                ]) {
                    sh '''
                        echo "Iniciando a construção e implantação do DSV..."
                        echo "Construindo a imagem Docker..."
                        docker build -t $DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG -f ./resources/deploy/Dockerfile .
                        echo "Construção da imagem concluída. Enviando para o Docker Hub..."
                        echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin
                        docker push $DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG
                        echo "Envio da imagem Docker concluído. Iniciando implantação no servidor remoto..."
                        docker run --rm \
                            -e SSHPASS="$SSH_PASSWORD" \
                            -e SSH_PORT="$SSH_PORT" \
                            -e SSH_TARGET="$SSH_USER@$SSH_HOST" \
                            alpine:3.20 \
                            sh -lc 'apk add --no-cache openssh-client sshpass >/dev/null && sshpass -e ssh -T -o StrictHostKeyChecking=no -p "$SSH_PORT" "$SSH_TARGET" "$1"' -- 'cd /home/marcocoelho && bash ./install-pgd.sh'
                        echo "Implantação concluída com sucesso em DSV."
                    '''
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
                SSH_USER = 'root'
                SSH_HOST = '200.152.47.207'
                SSH_PORT = '7222'
                DEPLOY_PATH = './'
            }
            steps {
                withCredentials([
                    string(credentialsId: 'SSH_PASSWORD_HMG', variable: 'SSH_PASSWORD'),
                    string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD')
                ]) {
                    sh '''
                        echo "Iniciando a construção e implantação do HMG..."
                        echo "Construindo a imagem Docker..."
                        docker build -t $DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG -f ./resources/deploy/Dockerfile .
                        echo "Construção da imagem concluída. Enviando para o Docker Hub..."
                        echo $DOCKER_HUB_PASSWORD | docker login -u $DOCKER_HUB_USERNAME --password-stdin
                        docker push $DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG
                        echo "Envio da imagem Docker concluído. Iniciando implantação no servidor remoto..."
                        docker run --rm \
                            -e SSHPASS="$SSH_PASSWORD" \
                            -e SSH_PORT="$SSH_PORT" \
                            -e SSH_TARGET="$SSH_USER@$SSH_HOST" \
                            alpine:3.20 \
                            sh -lc 'apk add --no-cache openssh-client sshpass >/dev/null && sshpass -e ssh -T -o StrictHostKeyChecking=no -p "$SSH_PORT" "$SSH_TARGET" "$1"' -- 'sh install-pgd.sh < /dev/null'
                        echo "Implantação concluída com sucesso em HMG."
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Pipeline concluída com sucesso."
        }
        failure {
            echo "Pipeline falhou."
        }
        always {
            cleanWs()
        }
    }
}
