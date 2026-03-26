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
                        set -euo pipefail
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
                    docker run --rm \
                      -v "$WORKSPACE":/workspace \
                      -w /workspace/front-end \
                      node:20 \
                      bash -lc "
                        set -euo pipefail
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
                DOCKER_HUB_TAG_NEW = '2.9.19'
                DOCKER_HUB_TAG_OLD = '2.9.18'
            }
            steps {
                withCredentials([
                    string(credentialsId: 'DOCKER_HUB_PASSWORD', variable: 'DOCKER_HUB_PASSWORD')
                ]) {
                    sh '''
                        set -euo pipefail

                        echo "=== INÍCIO BUILD PRODUÇÃO ==="
                        cd "$WORKSPACE"

                        echo "=== LIMPEZA PRÉ-BUILD DO FRONT ==="
                        rm -f back-end/resources/views/angular.blade.php
                        rm -f back-end/public/index.html
                        rm -f back-end/public/app.json
                        rm -f back-end/public/assets/build-info.json

                        # Remove bundles antigos do Angular sem destruir outras pastas do backend
                        find back-end/public -maxdepth 1 -type f \\( \
                            -name "main*.js" -o \
                            -name "polyfills*.js" -o \
                            -name "runtime*.js" -o \
                            -name "scripts*.js" -o \
                            -name "styles*.css" -o \
                            -name "vendor*.js" -o \
                            -name "*.map" \
                        \\) -print -delete || true

                        mkdir -p back-end/resources/views
                        mkdir -p back-end/public/assets
                        mkdir -p back-end/public/pages

                        echo "=== BUILD ANGULAR PRODUÇÃO ==="
                        docker run --rm \
                        -v "$WORKSPACE":/workspace \
                        -w /workspace/front-end \
                        node:20 \
                        bash -lc '
                            set -euo pipefail

                            echo "--- node/npm ---"
                            node -v
                            npm -v

                            echo "--- limpeza local do front ---"
                            rm -rf node_modules
                            npm ci --legacy-peer-deps

                            echo "--- build angular ---"
                            npx ng build --configuration=production --output-path=../back-end/public
                        '

                        echo "=== VALIDAÇÃO DOS ARTEFATOS GERADOS ==="
                        test -f back-end/public/index.html

                        if ! grep -Eq 'src="[^"]+\\.js"' back-end/public/index.html; then
                        echo "ERRO: index.html não contém bundles .js esperados."
                        exit 1
                        fi

                        echo "=== EXTRAÇÃO DOS BUNDLES DO INDEX ==="
                        node - <<'NODE'
        const fs = require('fs');

        const indexPath = 'back-end/public/index.html';
        const appJsonPath = 'back-end/public/app.json';

        const html = fs.readFileSync(indexPath, 'utf8');
        const matches = [...html.matchAll(/src="([^"]+\\.js)"/gi)].map(m => m[1]);

        if (!matches.length) {
        console.error('ERRO: Nenhum bundle JS encontrado no index.html');
        process.exit(1);
        }

        const angularFiles = [...new Set(matches)];
        for (const file of angularFiles) {
        const normalized = file.replace(/^\\//, '');
        const fullPath = `back-end/public/${normalized}`;
        if (!fs.existsSync(fullPath)) {
            console.error(`ERRO: Bundle referenciado no index.html não existe: ${fullPath}`);
            process.exit(1);
        }
        }

        const appJson = { angularFiles };
        fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
        console.log('app.json gerado com sucesso:', angularFiles);
        NODE

                        echo "=== GERANDO BUILD-INFO ==="
                        node - <<'NODE'
        const fs = require('fs');
        const path = require('path');

        const output = 'back-end/public/assets/build-info.json';
        const info = {
        build_date: new Date().toISOString(),
        build_number: Date.now()
        };

        fs.mkdirSync(path.dirname(output), { recursive: true });
        fs.writeFileSync(output, JSON.stringify(info, null, 2));
        console.log('build-info.json gerado:', info);
        NODE

                        echo "=== MOVENDO INDEX PARA BLADE ==="
                        mv back-end/public/index.html back-end/resources/views/angular.blade.php

                        echo "=== VALIDAÇÕES FINAIS ==="
                        test -f back-end/resources/views/angular.blade.php
                        test -f back-end/public/app.json
                        test -f back-end/public/assets/build-info.json

                        node - <<'NODE'
        const fs = require('fs');

        const appJson = JSON.parse(fs.readFileSync('back-end/public/app.json', 'utf8'));
        if (!Array.isArray(appJson.angularFiles) || !appJson.angularFiles.length) {
        console.error('ERRO: app.json sem angularFiles válidos');
        process.exit(1);
        }

        console.log('Validação final do app.json OK');
        NODE

                        echo "=== DIAGNÓSTICO DOS ARTEFATOS ==="
                        echo "--- app.json ---"
                        cat back-end/public/app.json

                        echo "--- build-info.json ---"
                        cat back-end/public/assets/build-info.json

                        echo "--- primeiros 40 linhas do angular.blade.php ---"
                        head -40 back-end/resources/views/angular.blade.php || true

                        echo "--- arquivos em back-end/public ---"
                        find back-end/public -maxdepth 2 -type f | sort

                        echo "=== LOGIN DOCKER HUB ==="
                        echo "$DOCKER_HUB_PASSWORD" | docker login -u "$DOCKER_HUB_USERNAME" --password-stdin

                        echo "=== PREPARANDO TAG ANTIGA ==="
                        docker pull "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_LATEST" || true

                        if docker manifest inspect "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_OLD" >/dev/null 2>&1; then
                        echo "A tag $DOCKER_HUB_TAG_OLD já existe, não será reetiquetada."
                        else
                        if docker image inspect "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_LATEST" >/dev/null 2>&1; then
                            docker tag "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_LATEST" "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_OLD"
                            docker push "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_OLD"
                        else
                            echo "Imagem latest não disponível localmente após pull; pulando criação da tag OLD."
                        fi
                        fi

                        echo "=== BUILD DA IMAGEM FINAL ==="
                        docker build \
                        --pull \
                        --no-cache \
                        -t "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_NEW" \
                        -f ./resources/deploy/Dockerfile .

                        docker tag "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_NEW" "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_LATEST"

                        echo "=== PUSH DAS IMAGENS ==="
                        docker push "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_NEW"
                        docker push "$DOCKER_HUB_IMAGE:$DOCKER_HUB_TAG_LATEST"

                        echo "=== BUILD PRODUÇÃO FINALIZADO COM SUCESSO ==="
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
