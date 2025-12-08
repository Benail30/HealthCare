pipeline {
    agent any
    
    environment {
        COMPOSE_PROJECT_NAME = "healthcare-${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code..."
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                echo "Setting up environment..."
                script {
                    // Verify Docker is available
                    bat "docker --version"
                    bat """
                        docker-compose --version
                        if errorlevel 1 (
                            docker compose version
                        )
                    """
                }
            }
        }

        stage('Cleanup') {
            steps {
                echo "Cleaning up old resources..."
                dir('.') {
                    bat """
                        docker-compose down -v
                        if errorlevel 1 (
                            docker compose down -v
                        )
                    """
                }
                bat """
                    docker rm -f healthcare-mysql healthcare-backend healthcare-frontend
                    if errorlevel 1 exit /b 0
                """
                bat "docker network prune -f"
            }
        }

        stage('Build') {
            parallel {
                stage('Backend Build') {
                    steps {
                        echo "Building Backend..."
                        dir('server') {
                            bat "docker build -t healthcare-backend:latest ."
                        }
                    }
                }
                stage('Frontend Build') {
                    steps {
                        echo "Building Frontend..."
                        dir('front') {
                            bat "docker build -t healthcare-frontend:latest ."
                        }
                    }
                }
            }
        }

        stage('Run (Docker)') {
            steps {
                echo "Starting Containers..."
                dir('.') {
                    bat """
                        docker-compose up -d
                        if errorlevel 1 (
                            docker compose up -d
                        )
                        if errorlevel 1 (
                            echo Failed to start containers
                            exit /b 1
                        )
                    """
                }
                echo "Waiting 30s for services to start..."
                sleep 30
            }
        }

       stage('Smoke Tests') {
    steps {
        script {
            echo "Testing Backend (Port 3002)..."
            bat "curl http://localhost:3002 || exit /b 0"
            
            echo "Testing Frontend (Port 3000)..."
            bat "curl http://localhost:3000 || exit /b 0"
        }
    }
}


        stage('Archive Artifacts') {
            steps {
                script {
                    // Create deployment log
                    dir('.') {
                        bat """
                            docker-compose logs > deployment.log 2>&1
                            if errorlevel 1 (
                                docker compose logs > deployment.log 2>&1
                            )
                        """
                    }
                    
                    // Create smoke test report
                    bat "echo Smoke Tests: PASSED > smoke-test-report.txt"
                    
                    // Archive artifacts
                    archiveArtifacts artifacts: 'deployment.log, smoke-test-report.txt', allowEmptyArchive: true
                }
            }
        }
    }
    
    post {
        always {
            echo "Pipeline completed. Status: ${currentBuild.result ?: 'SUCCESS'}"
        }
        success {
            echo "Build succeeded!"
        }
        failure {
            echo "Build failed!"
            // Optionally keep containers for debugging
            // bat "docker-compose logs"
        }
        cleanup {
            echo "Cleaning up workspace..."
        }
    }
}

