pipeline {
    agent any
    
    environment {
        COMPOSE_PROJECT_NAME = "healthcare-${env.BUILD_NUMBER}"
    }

    stages {
        stage('Cleanup') {
            steps {
                echo "Cleaning up old resources..."
                sh "docker compose down -v || true" 
            }
        }

        stage('Build Images') {
            parallel {
                stage('Backend Build') {
                    steps {
                        echo "Building Backend..."
                        sh "docker compose build backend"
                    }
                }
                stage('Frontend Build') {
                    steps {
                        echo "Building Frontend..."
                        sh "docker compose build frontend"
                    }
                }
            }
        }

        stage('Start Environment') {
            steps {
                echo "Starting Containers..."
                sh "docker compose up -d"
                echo "Waiting 30s for Database..."
                sleep 30 
            }
        }

        stage('Smoke Tests') {
            steps {
                script {
                    echo "Testing Backend (Port 3002)..."
                    sh "curl -f http://localhost:3002/ || exit 1"
                    echo "Testing Frontend (Port 3000)..."
                    sh "curl -f http://localhost:3000/ || exit 1"
                }
            }
        }

        stage('Archive Logs') {
            steps {
                sh "docker compose logs > deployment.log"
                archiveArtifacts artifacts: 'deployment.log', allowEmptyArchive: true
            }
        }

        stage('Release') {
            when { tag "v*" }
            steps {
                echo "RELEASE DETECTED: ${env.TAG_NAME}"
                sh "docker tag healthcare-backend:latest healthcare-backend:${env.TAG_NAME}"
            }
        }
    }
}
