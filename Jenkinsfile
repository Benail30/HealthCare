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
        // failFast: false allows both builds to complete even if one fails (helps debugging)
        stage('Build Images') {
            parallel {
                stage('Backend Build') {
                    steps {
                        script {
                            echo "========================================="
                            echo "Starting Backend Docker Build"
                            echo "========================================="
                            
                            // Verify we're in the right location
                            bat "cd"
                            bat "dir server"
                            
                            echo "Checking for Dockerfile..."
                            bat "if exist server\\Dockerfile (echo Dockerfile found) else (echo ERROR: Dockerfile not found && exit /b 1)"
                            
                            echo "Building Backend Docker image..."
                            dir('server') {
                                // Build with verbose output and error handling
                                bat """
                                    echo Current directory: %CD%
                                    docker build --progress=plain -t healthcare-backend:${env.BUILD_NUMBER} -t healthcare-backend:latest . 2>&1
                                    if errorlevel 1 (
                                        echo ERROR: Backend Docker build failed!
                                        docker images
                                        exit /b 1
                                    )
                                """
                            }
                            
                            // Verify the image was created
                            bat "docker images | findstr healthcare-backend"
                            echo "✓ Backend image built successfully"
                        }
                    }
                }
                stage('Frontend Build') {
                    steps {
                        script {
                            echo "========================================="
                            echo "Starting Frontend Docker Build"
                            echo "========================================="
                            
                            // Verify we're in the right location
                            bat "cd"
                            bat "dir front"
                            
                            echo "Checking for Dockerfile..."
                            bat "if exist front\\Dockerfile (echo Dockerfile found) else (echo ERROR: Dockerfile not found && exit /b 1)"
                            
                            echo "Building Frontend Docker image..."
                            dir('front') {
                                // Build with verbose output and error handling
                                bat """
                                    echo Current directory: %CD%
                                    docker build --progress=plain -t healthcare-frontend:${env.BUILD_NUMBER} -t healthcare-frontend:latest . 2>&1
                                    if errorlevel 1 (
                                        echo ERROR: Frontend Docker build failed!
                                        docker images
                                        exit /b 1
                                    )
                                """
                            }
                            
                            // Verify the image was created
                            bat "docker images | findstr healthcare-frontend"
                            echo "✓ Frontend image built successfully"
                        }
                    }
                }
            }
        }

        // Stage 4: Start all application containers
        stage('Start Environment') {
            steps {
                echo "Starting application environment with docker-compose..."
                
                bat """
                    REM Stop and remove any previous stack/containers
                    docker-compose down || echo No existing stack to remove
                    docker rm -f healthcare-mysql || echo No old mysql container
                    
                    REM Start fresh containers
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
                    
                    // Extract build artifacts from Docker containers
                    echo "Extracting frontend build output from Docker container..."
                    bat """
                        REM Create artifacts directory
                        if not exist "artifacts" mkdir artifacts
                        if not exist "artifacts\\frontend" mkdir artifacts\\frontend
                        
                        REM Extract .next build directory from frontend container (ignore errors)
                        docker cp healthcare-frontend:/app/.next artifacts\\frontend\\.next 2>nul || (
                            echo [INFO] Frontend .next not found - skipping
                            exit /b 0
                        )
                        
                        REM Extract static files (ignore errors)
                        docker cp healthcare-frontend:/app/public artifacts\\frontend\\public 2>nul || (
                            echo [INFO] Frontend public not found - skipping
                            exit /b 0
                        )
                    """
                    
                    echo "Extracting backend logs from Docker container..."
                    bat """
                        REM Create backend artifacts directory
                        if not exist "artifacts\\backend" mkdir artifacts\\backend
                        
                        REM Try to extract any logs from backend container (ignore errors)
                        docker cp healthcare-backend:/app/logs artifacts\\backend\\logs 2>nul || (
                            echo [INFO] Backend logs not found - skipping
                            exit /b 0
                        )
                    """
                    
                    // Copy smoke test artifacts if they exist
                    bat """
                        REM Copy smoke test results to artifacts folder (ignore errors)
                        if exist "temp_status.txt" (
                            copy temp_status.txt artifacts\\ >nul 2>&1
                        )
                        if exist "http_response.txt" (
                            copy http_response.txt artifacts\\ >nul 2>&1
                        )
                        if exist "scripts\\temp_status.txt" (
                            copy scripts\\temp_status.txt artifacts\\ >nul 2>&1
                        )
                        REM Always succeed
                        exit /b 0
                    """
                    
                    // List what we collected
                    echo "Artifacts collected:"
                    bat "if exist artifacts dir /s artifacts"
                    
                    // Archive all collected artifacts
                    archiveArtifacts artifacts: """
                        deployment-${env.BUILD_NUMBER}.log,
                        smoke-test-report-${env.BUILD_NUMBER}.txt,
                        artifacts/**/*,
                        **/temp_status.txt,
                        **/http_response.txt,
                        **/smoke_test*.log
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
