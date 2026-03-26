pipeline {
    agent { label 'ci' }

    options {
        ansiColor('xterm')
        timestamps()
        disableConcurrentBuilds()
        buildDiscarder(logRotator(numToKeepStr: '30', artifactNumToKeepStr: '30'))
        timeout(time: 30, unit: 'MINUTES')
    }

    environment {
        COMPOSER_ALLOW_SUPERUSER = '1'
        PHPSTAN_REPORT = 'back-end/phpstan-report.xml'
        PHPSTAN_EXIT_FILE = '.phpstan-exit-code'
    }

    stages {
        stage('Validate target branch') {
            when {
                not {
                    anyOf {
                        allOf {
                            changeRequest()
                            expression { env.CHANGE_TARGET in ['dataprev_dsv', 'dataprev_hmg'] }
                        }
                        branch 'dataprev_dsv'
                        branch 'dataprev_hmg'
                    }
                }
            }
            steps {
                script {
                    currentBuild.result = 'NOT_BUILT'
                    error("Branch/PR fora do escopo do CI PHPStan. CHANGE_TARGET=${env.CHANGE_TARGET}, BRANCH_NAME=${env.BRANCH_NAME}")
                }
            }
        }

        stage('Checkout') {
            when {
                anyOf {
                    allOf {
                        changeRequest()
                        expression { env.CHANGE_TARGET in ['dataprev_dsv', 'dataprev_hmg'] }
                    }
                    branch 'dataprev_dsv'
                    branch 'dataprev_hmg'
                }
            }
            steps {
                checkout scm
            }
        }

        stage('Run PHPStan') {
            steps {
                sh '''
                    chmod +x ci/scripts/run-phpstan.sh
                    ci/scripts/run-phpstan.sh
                '''
            }
        }

        stage('Fail build if PHPStan found errors') {
            steps {
                script {
                    def exitCode = readFile(env.PHPSTAN_EXIT_FILE).trim()
                    if (exitCode != '0') {
                        error("PHPStan encontrou erros. Exit code: ${exitCode}")
                    }
                }
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'back-end/phpstan-report.xml, back-end/phpstan-report.txt, .phpstan-exit-code', allowEmptyArchive: true
        }

        success {
            echo 'PHPStan executado com sucesso.'
        }

        failure {
            echo 'Falha no PHPStan. O merge deve ser bloqueado pelo status check do GitHub.'
        }

        cleanup {
            deleteDir()
        }
    }
}