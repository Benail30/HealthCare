pipeline {
    agent any
    
    environment {
        COMPOSE_PROJECT_NAME = "healthcare-${env.BUILD_NUMBER}"
    }

stage('Cleanup') {
    steps {
        echo "Cleaning up old resources..."
        bat """
            docker compose down -v || exit 0
            docker rm -f healthcare-mysql healthcare-backend healthcare-frontend || exit 0
            docker network prune -f || exit 0
        """
    }
}
        stage('Build Images') {
            parallel {
                stage('Backend Build') {
                    steps {
                        echo "Building Backend..."
                        bat "docker compose build backend"
                    }
                }
                stage('Frontend Build') {
                    steps {
                        echo "Building Frontend..."
                        bat "docker compose build frontend"
                    }
                }
            }
        }

        stage('Start Environment') {
            steps {
                echo "Starting Containers..."
                bat "docker compose up -d"
                echo "Waiting 30s for Database..."
                sleep 30
            }
        }

        stage('Smoke Tests') {
            steps {
                script {
                    echo "Testing Backend (Port 3002)..."
                    bat "curl -f http://localhost:3002/ || exit /b 1"
                    
                    echo "Testing Frontend (Port 3000)..."
                    bat "curl -f http://localhost:3000/ || exit /b 1"
                }
            }
        }

        stage('Archive Logs') {
            steps {
                bat "docker compose logs > deployment.log"
                archiveArtifacts artifacts: 'deployment.log', allowEmptyArchive: true
            }
        }

        stage('Release') {
            when { tag "v*" }
            steps {
                echo "RELEASE DETECTED: ${env.TAG_NAME}"
                bat "docker tag healthcare-backend:latest healthcare-backend:${env.TAG_NAME}"
            }
        }
    }
}

