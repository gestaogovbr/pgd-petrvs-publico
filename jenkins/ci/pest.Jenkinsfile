pipeline {
    agent { label 'ci' }

    options {
        skipDefaultCheckout(true)
        disableConcurrentBuilds()
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '30'))
    }

    environment {
        APP_DIR = 'back-end'
        MYSQL_IMAGE = 'mariadb:11.4'
        MYSQL_DATABASE = 'petrvs_test'
        MYSQL_ROOT_PASSWORD = 'root'
        DB_CONNECTION = 'mysql'
        DB_HOST = '127.0.0.1'
        DB_USERNAME = 'root'
        DB_PASSWORD = 'root'
    }

    stages {
        stage('Validate PR Context') {
            steps {
                script {
                    def validTargets = ['dataprev_dsv', 'dataprev_hmg']
                    def isPrBuild = env.CHANGE_ID?.trim()
                    def validTarget = validTargets.contains(env.CHANGE_TARGET)

                    if (!isPrBuild || !validTarget) {
                        currentBuild.description = "Ignorado: não é PR para dataprev_dsv/dataprev_hmg"
                        echo "Build ignorado. CHANGE_ID=${env.CHANGE_ID}, CHANGE_TARGET=${env.CHANGE_TARGET}"
                        env.SKIP_PIPELINE = 'true'
                    } else {
                        env.SKIP_PIPELINE = 'false'
                        echo "PR válido detectado. CHANGE_ID=${env.CHANGE_ID}, CHANGE_TARGET=${env.CHANGE_TARGET}"
                    }
                }
            }
        }

        stage('Checkout') {
            when {
                expression { env.SKIP_PIPELINE != 'true' }
            }
            steps {
                checkout scm
            }
        }

        stage('Prepare MariaDB') {
            when {
                expression { env.SKIP_PIPELINE != 'true' }
            }
            steps {
                script {
                    env.CI_MARIADB_CONTAINER = "ci-mariadb-${env.BUILD_NUMBER}-${env.EXECUTOR_NUMBER ?: '0'}"
                    env.CI_MARIADB_PORT = sh(
                        script: '''
                            python3 - <<'PY'
import socket
s = socket.socket()
s.bind(('', 0))
print(s.getsockname()[1])
s.close()
PY
                        ''',
                        returnStdout: true
                    ).trim()

                    sh """
                        set -eux

                        docker rm -f "${CI_MARIADB_CONTAINER}" >/dev/null 2>&1 || true

                        docker run -d \
                          --name "${CI_MARIADB_CONTAINER}" \
                          -e MYSQL_ROOT_PASSWORD="${MYSQL_ROOT_PASSWORD}" \
                          -e MYSQL_DATABASE="${MYSQL_DATABASE}" \
                          -p 127.0.0.1:${CI_MARIADB_PORT}:3306 \
                          --health-cmd="healthcheck.sh --connect --innodb_initialized" \
                          --health-interval=10s \
                          --health-timeout=5s \
                          --health-retries=12 \
                          "${MYSQL_IMAGE}"
                    """

                    env.DB_PORT = env.CI_MARIADB_PORT

                    sh '''
                        set -eu

                        for i in $(seq 1 30); do
                          STATUS="$(docker inspect --format='{{if .State.Health}}{{.State.Health.Status}}{{else}}no-healthcheck{{end}}' "${CI_MARIADB_CONTAINER}")"

                          if [ "$STATUS" = "healthy" ]; then
                            echo "MariaDB saudável."
                            exit 0
                          fi

                          echo "Aguardando MariaDB... tentativa $i/30 (status=$STATUS)"
                          sleep 2
                        done

                        echo "MariaDB não ficou saudável a tempo."
                        docker logs "${CI_MARIADB_CONTAINER}" || true
                        exit 1
                    '''
                }
            }
        }

        stage('Run Pest') {
            when {
                expression { env.SKIP_PIPELINE != 'true' }
            }
            steps {
                sh 'chmod +x ci/scripts/run-pest.sh'
                sh './ci/scripts/run-pest.sh'
            }
        }
    }

    post {
        always {
            script {
                if (env.CI_MARIADB_CONTAINER?.trim()) {
                    sh '''
                        docker logs "${CI_MARIADB_CONTAINER}" >/tmp/${CI_MARIADB_CONTAINER}.log 2>&1 || true
                        docker rm -f "${CI_MARIADB_CONTAINER}" >/dev/null 2>&1 || true
                    '''
                }
            }
        }

        failure {
            echo 'Pipeline de Pest falhou.'
        }

        success {
            echo 'Pipeline de Pest concluída com sucesso.'
        }
    }
}