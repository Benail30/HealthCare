pipeline {
    agent any
    
    environment {
        COMPOSE_PROJECT_NAME = "healthcare-${env.BUILD_NUMBER}"
    }

    stages {
        // Stage 1: Checkout code from source control
        stage('Checkout SCM') {
            steps {
                echo "Checking out code from SCM..."
                checkout scm
            }
        }

        // Stage 2: Clean up old resources before build
        stage('Cleanup') {
            steps {
                echo "Cleaning up old containers and resources..."
                script {
                    // Verify Docker is available
                    bat "docker --version"
                    bat """
                        docker-compose --version
                        if errorlevel 1 (
                            docker compose version
                        )
                    """
                    
                    // Remove old containers and networks
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
                echo "Cleanup completed"
            }
        }

        // Stage 3: Build Docker images in parallel for faster execution
        stage('Build Images') {
            parallel {
                stage('Backend Build') {
                    steps {
                        echo "Building Backend Docker image..."
                        dir('server') {
                            bat "docker build -t healthcare-backend:${env.BUILD_NUMBER} -t healthcare-backend:latest ."
                        }
                        echo "Backend image built successfully"
                    }
                }
                stage('Frontend Build') {
                    steps {
                        echo "Building Frontend Docker image..."
                        dir('front') {
                            bat "docker build -t healthcare-frontend:${env.BUILD_NUMBER} -t healthcare-frontend:latest ."
                        }
                        echo "Frontend image built successfully"
                    }
                }
            }
        }

        // Stage 4: Start all application containers
        stage('Start Environment') {
            steps {
                echo "Starting application environment with docker-compose..."
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
                echo "Environment started successfully"
            }
        }

        // Stage 5: Run smoke tests to verify application health
        // Tests backend API endpoints, frontend accessibility, and database connectivity
        // Returns non-zero exit code if any critical service fails
        stage('Smoke Tests') {
            steps {
                echo "Running smoke tests to verify application health..."
                script {
                    // Detect OS and run appropriate smoke test script
                    if (isUnix()) {
                        // Linux/Mac: use shell scripts
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
                echo "✓ All smoke tests passed"
            }
        }

        // Stage 6: Archive build artifacts, logs, and test results
        stage('Archive Logs') {
            steps {
                echo "Archiving build artifacts, logs, and smoke test results..."
                script {
                    // Collect Docker container logs
                    bat """
                        docker-compose logs > deployment-${env.BUILD_NUMBER}.log 2>&1
                        if errorlevel 1 (
                            docker compose logs > deployment-${env.BUILD_NUMBER}.log 2>&1
                        )
                    """
                    
                    // Create comprehensive smoke test report
                    bat """
                        echo ========================================= > smoke-test-report-${env.BUILD_NUMBER}.txt
                        echo Healthcare Application - Smoke Test Report >> smoke-test-report-${env.BUILD_NUMBER}.txt
                        echo ========================================= >> smoke-test-report-${env.BUILD_NUMBER}.txt
                        echo. >> smoke-test-report-${env.BUILD_NUMBER}.txt
                        echo Status: PASSED >> smoke-test-report-${env.BUILD_NUMBER}.txt
                        echo Build Number: ${env.BUILD_NUMBER} >> smoke-test-report-${env.BUILD_NUMBER}.txt
                        echo Branch: ${env.BRANCH_NAME} >> smoke-test-report-${env.BUILD_NUMBER}.txt
                        echo Build URL: ${env.BUILD_URL} >> smoke-test-report-${env.BUILD_NUMBER}.txt
                        echo Timestamp: %date% %time% >> smoke-test-report-${env.BUILD_NUMBER}.txt
                        echo. >> smoke-test-report-${env.BUILD_NUMBER}.txt
                        echo Tests Executed: >> smoke-test-report-${env.BUILD_NUMBER}.txt
                        echo   - Backend API Health Check >> smoke-test-report-${env.BUILD_NUMBER}.txt
                        echo   - Frontend Accessibility Check >> smoke-test-report-${env.BUILD_NUMBER}.txt
                        echo   - Database Connectivity Check >> smoke-test-report-${env.BUILD_NUMBER}.txt
                    """
                    
                    // Archive all build artifacts with comprehensive glob patterns
                    // This includes: deployment logs, smoke test results, frontend build output, and backend logs
                    archiveArtifacts artifacts: """
                        deployment-${env.BUILD_NUMBER}.log,
                        smoke-test-report-${env.BUILD_NUMBER}.txt,
                        front/.next/**/*.js,
                        front/.next/**/*.css,
                        front/.next/**/*.html,
                        front/.next/static/**,
                        front/.next/server/**,
                        server/logs/**,
                        **/http_response.txt,
                        **/smoke_test*.log,
                        **/temp_status.txt
                    """.replaceAll(/\s+/, ' ').trim(), 
                    fingerprint: true, 
                    allowEmptyArchive: true
                }
                echo "✓ Artifacts archived successfully"
            }
        }

        // Stage 7: Release stage for tagged builds or deployment preparation
        stage('Release') {
            steps {
                echo "Preparing release artifacts..."
                script {
                    // For version-tagged builds (e.g., v1.0.0), save Docker images for deployment
                    if (env.TAG_NAME?.startsWith('v')) {
                        echo "Tagged build detected: ${env.TAG_NAME}"
                        echo "Saving Docker images for release..."
                        
                        bat """
                            docker save healthcare-backend:${env.BUILD_NUMBER} -o backend-${env.TAG_NAME}.tar
                            docker save healthcare-frontend:${env.BUILD_NUMBER} -o frontend-${env.TAG_NAME}.tar
                        """
                        
                        bat """
                            echo Release Version: ${env.TAG_NAME} > release-info-${env.TAG_NAME}.txt
                            echo Build Number: ${env.BUILD_NUMBER} >> release-info-${env.TAG_NAME}.txt
                            echo Build Date: %date% %time% >> release-info-${env.TAG_NAME}.txt
                            echo Backend Image: healthcare-backend:${env.BUILD_NUMBER} >> release-info-${env.TAG_NAME}.txt
                            echo Frontend Image: healthcare-frontend:${env.BUILD_NUMBER} >> release-info-${env.TAG_NAME}.txt
                        """
                        
                        // Archive release-specific artifacts
                        archiveArtifacts artifacts: """
                            backend-${env.TAG_NAME}.tar,
                            frontend-${env.TAG_NAME}.tar,
                            release-info-${env.TAG_NAME}.txt
                        """.replaceAll(/\s+/, ' ').trim(), 
                        fingerprint: true, 
                        allowEmptyArchive: false
                        
                        echo "✓ Release ${env.TAG_NAME} prepared successfully"
                    } else if (env.BRANCH_NAME == 'main') {
                        // Main branch: tag images as production-ready
                        echo "Main branch build - tagging as production-ready"
                        bat """
                            docker tag healthcare-backend:${env.BUILD_NUMBER} healthcare-backend:production
                            docker tag healthcare-frontend:${env.BUILD_NUMBER} healthcare-frontend:production
                        """
                        echo "✓ Images tagged as production-ready"
                    } else if (env.BRANCH_NAME == 'dev') {
                        // Dev branch: tag images for dev environment
                        echo "Dev branch build - tagging for development environment"
                        bat """
                            docker tag healthcare-backend:${env.BUILD_NUMBER} healthcare-backend:dev
                            docker tag healthcare-frontend:${env.BUILD_NUMBER} healthcare-frontend:dev
                        """
                        echo "✓ Images tagged for dev environment"
                    } else {
                        // Feature branches or PRs
                        echo "Feature/PR build - no special release actions"
                        echo "Images are available as healthcare-*:${env.BUILD_NUMBER}"
                    }
                }
                echo "✓ Release stage completed"
            }
        }
    }
    
    post {
        always {
            echo "========================================="
            echo "Pipeline completed"
            echo "Status: ${currentBuild.result ?: 'SUCCESS'}"
            echo "Branch: ${env.BRANCH_NAME ?: 'unknown'}"
            echo "Build: #${env.BUILD_NUMBER}"
            echo "========================================="
        }
        success {
            echo "✓✓✓ BUILD SUCCEEDED ✓✓✓"
            echo "All 7 stages completed successfully for ${env.BRANCH_NAME}"
        }
        failure {
            echo "✗✗✗ BUILD FAILED ✗✗✗"
            echo "Check logs for details"
            // Print container logs for debugging
            script {
                try {
                    bat "docker-compose logs --tail=50"
                } catch (Exception e) {
                    echo "Could not retrieve container logs: ${e.message}"
                }
            }
        }
        cleanup {
            echo "Running cleanup tasks..."
            script {
                if (env.CHANGE_ID) {
                    // This is a PR build - clean up containers
                    echo "PR build detected - removing containers"
                    bat """
                        docker-compose down -v
                        if errorlevel 1 (
                            docker compose down -v
                        )
                    """
                } else {
                    // Dev, main, or tag builds - keep containers running
                    echo "Branch build (${env.BRANCH_NAME}) - containers left running for inspection"
                    echo "To stop manually: docker-compose down -v"
                }
            }
        }
    }
}
