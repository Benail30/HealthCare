pipeline {
    agent any
    
    environment {
        COMPOSE_PROJECT_NAME = "healthcare-${env.BUILD_NUMBER}"
    }

    stages {
        stage('Checkout') {
            steps {
                echo "Checking out code from SCM..."
                checkout scm
            }
        }

        stage('Setup') {
            steps {
                echo "Setting up build environment..."
                script {
                    // Verify Docker is available
                    bat "docker --version"
                    bat """
                        docker-compose --version
                        if errorlevel 1 (
                            docker compose version
                        )
                    """
                    
                    // Clean up old containers and resources
                    echo "Cleaning up previous resources..."
                    bat """
                        docker-compose down -v
                        if errorlevel 1 (
                            docker compose down -v
                        )
                    """
                    bat """
                        docker rm -f healthcare-mysql healthcare-backend healthcare-frontend
                        if errorlevel 1 exit /b 0
                    """
                    bat "docker network prune -f"
                }
            }
        }

        stage('Build') {
            parallel {
                stage('Backend Build') {
                    steps {
                        echo "Building Backend Docker image..."
                        dir('server') {
                            bat "docker build -t healthcare-backend:${env.BUILD_NUMBER} -t healthcare-backend:latest ."
                        }
                    }
                }
                stage('Frontend Build') {
                    steps {
                        echo "Building Frontend Docker image..."
                        dir('front') {
                            bat "docker build -t healthcare-frontend:${env.BUILD_NUMBER} -t healthcare-frontend:latest ."
                        }
                    }
                }
            }
        }

        stage('Run (Docker)') {
            steps {
                echo "Starting application containers..."
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
                
                echo "Waiting for services to initialize (60 seconds)..."
                sleep 60
                
                echo "Verifying container status..."
                bat "docker ps --filter name=healthcare"
            }
        }

        // Smoke Test stage: Performs basic health checks on running containers
        // Tests backend API, frontend, and database connectivity
        // Returns non-zero exit code if any service fails to respond
        stage('Smoke Test') {
            steps {
                echo "Running smoke tests to verify application health..."
                script {
                    // Detect OS and run appropriate smoke test script
                    if (isUnix()) {
                        // Linux/Mac: use shell script
                        sh """
                            chmod +x scripts/smoke-test-backend.sh scripts/smoke-test-frontend.sh
                            ./scripts/smoke-test-backend.sh
                            ./scripts/smoke-test-frontend.sh
                        """
                    } else {
                        // Windows: use batch script
                        bat "scripts\\smoke-test.bat"
                    }
                }
                echo "Smoke tests completed successfully"
            }
        }

        stage('Archive Artifacts') {
            steps {
                echo "Archiving build artifacts and logs..."
                script {
                    // Collect Docker logs
                    bat """
                        docker-compose logs > deployment-${env.BUILD_NUMBER}.log 2>&1
                        if errorlevel 1 (
                            docker compose logs > deployment-${env.BUILD_NUMBER}.log 2>&1
                        )
                    """
                    
                    // Create smoke test report
                    bat "echo Smoke Test Status: PASSED > smoke-test-report-${env.BUILD_NUMBER}.txt"
                    bat "echo Build Number: ${env.BUILD_NUMBER} >> smoke-test-report-${env.BUILD_NUMBER}.txt"
                    bat "echo Branch: ${env.BRANCH_NAME} >> smoke-test-report-${env.BUILD_NUMBER}.txt"
                    bat "echo Timestamp: %date% %time% >> smoke-test-report-${env.BUILD_NUMBER}.txt"
                    
                    // For tagged builds (vX.Y.Z), save Docker images
                    if (env.TAG_NAME?.startsWith('v')) {
                        echo "Tagged build detected: ${env.TAG_NAME}"
                        bat """
                            docker save healthcare-backend:${env.BUILD_NUMBER} -o backend-${env.TAG_NAME}.tar
                            docker save healthcare-frontend:${env.BUILD_NUMBER} -o frontend-${env.TAG_NAME}.tar
                        """
                        bat "echo Release Version: ${env.TAG_NAME} > release-info.txt"
                        
                        // Archive Docker images, build outputs, logs, and smoke test results
                        archiveArtifacts artifacts: """
                            deployment-${env.BUILD_NUMBER}.log,
                            smoke-test-report-${env.BUILD_NUMBER}.txt,
                            backend-${env.TAG_NAME}.tar,
                            frontend-${env.TAG_NAME}.tar,
                            release-info.txt,
                            front/.next/**/*.js,
                            front/.next/**/*.css,
                            front/.next/**/*.html,
                            front/.next/static/**,
                            server/logs/**,
                            **/http_response.txt,
                            **/smoke_test*.log,
                            **/temp_status.txt
                        """.replaceAll(/\s+/, ' ').trim(), 
                        fingerprint: true, 
                        allowEmptyArchive: true
                    } else {
                        // Standard artifact archiving for PR and dev builds
                        // Includes frontend build output, backend logs, and smoke test results
                        archiveArtifacts artifacts: """
                            deployment-${env.BUILD_NUMBER}.log,
                            smoke-test-report-${env.BUILD_NUMBER}.txt,
                            front/.next/**/*.js,
                            front/.next/**/*.css,
                            front/.next/**/*.html,
                            front/.next/static/**,
                            server/logs/**,
                            **/http_response.txt,
                            **/smoke_test*.log,
                            **/temp_status.txt
                        """.replaceAll(/\s+/, ' ').trim(), 
                        fingerprint: true, 
                        allowEmptyArchive: true
                    }
                }
                echo "Artifacts archived successfully"
            }
        }
    }
    
    post {
        always {
            echo "Pipeline completed. Status: ${currentBuild.result ?: 'SUCCESS'}"
        }
        success {
            echo "✓ Build succeeded for branch: ${env.BRANCH_NAME ?: 'unknown'}"
        }
        failure {
            echo "✗ Build failed! Check logs for details."
            bat "docker-compose logs"
        }
        cleanup {
            echo "Cleaning up workspace..."
            // Keep containers running for debugging on dev, clean up on PRs
            script {
                if (env.CHANGE_ID) {
                    // This is a PR build - clean up
                    echo "PR build detected - cleaning up containers"
                    bat """
                        docker-compose down -v
                        if errorlevel 1 (
                            docker compose down -v
                        )
                    """
                } else {
                    echo "Non-PR build - containers left running for inspection"
                }
            }
        }
    }
}
