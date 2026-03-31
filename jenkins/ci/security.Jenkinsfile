pipeline {
    agent { label 'ci' }

    options {
        timestamps()
        ansiColor('xterm')
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '20'))
        timeout(time: 90, unit: 'MINUTES')
    }

    triggers {
        cron('0 3 * * 1')
    }

    environment {
        CI = 'true'
        REPORTS_DIR = 'reports/security'
        CODEQL_BIN = '/opt/codeql/codeql/codeql'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
                sh '''
                    set -eu
                    mkdir -p "${REPORTS_DIR}"
                    echo "Branch atual: ${BRANCH_NAME:-desconhecida}"
                '''
            }
        }

        stage('Validar ambiente') {
            steps {
                sh '''
                    set -eu
                    php -v
                    composer --version
                    node --version
                    npm --version
                    gitleaks version
                    "${CODEQL_BIN}" version
                '''
            }
        }

        stage('Security Checks') {
            parallel {
                stage('Backend SCA - Composer Audit') {
                    steps {
                        sh '''
                            set -eu
                            chmod +x ci/scripts/run-security-checks.sh
                            ci/scripts/run-security-checks.sh backend
                        '''
                    }
                }

                stage('Frontend SCA - npm audit') {
                    steps {
                        sh '''
                            set -eu
                            chmod +x ci/scripts/run-security-checks.sh
                            ci/scripts/run-security-checks.sh frontend
                        '''
                    }
                }

                stage('Secret Scan - Gitleaks') {
                    steps {
                        sh '''
                            set -eu
                            chmod +x ci/scripts/run-security-checks.sh
                            ci/scripts/run-security-checks.sh secrets
                        '''
                    }
                }

                stage('SAST - CodeQL') {
                    when {
                        expression {
                            return env.BRANCH_NAME == 'dataprev_producao'
                        }
                    }
                    steps {
                        sh '''
                            set -eu
                            chmod +x ci/scripts/run-security-checks.sh
                            ci/scripts/run-security-checks.sh codeql
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'reports/security/**/*', allowEmptyArchive: true
        }
        success {
            echo 'Pipeline de segurança finalizada com sucesso.'
        }
        failure {
            echo 'Falha na pipeline de segurança.'
        }
    }
}