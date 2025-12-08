# Jenkins Pipeline Fixes

## Issues Fixed

### 1. **Windows Batch Command Syntax**
   - **Problem**: Used `||` operator which doesn't work in Windows batch files
   - **Fix**: Changed to `if errorlevel 1` syntax for proper error handling
   - **Example**: 
     ```groovy
     // Before: bat "docker-compose up -d || docker compose up -d"
     // After:
     bat """
         docker-compose up -d
         if errorlevel 1 (
             docker compose up -d
         )
     """
     ```

### 2. **PowerShell Script Path**
   - **Problem**: Incorrect path separator in PowerShell script call
   - **Fix**: Changed from `scripts\\smoke-test.ps1` to `.\\scripts\\smoke-test.ps1`
   - **Also**: Changed `%ERRORLEVEL%` to `errorlevel` (batch syntax)

### 3. **Working Directory Issues**
   - **Problem**: `docker-compose` commands need to run from project root
   - **Fix**: Added `dir('.')` blocks to ensure commands run in correct directory

### 4. **Error Handling**
   - **Problem**: Commands failing silently
   - **Fix**: Added proper error checking with `if errorlevel 1` and exit codes

## Current Pipeline Stages

1. **Checkout** - Gets code from repository
2. **Setup** - Verifies Docker is available
3. **Cleanup** - Removes old containers and networks
4. **Build** - Builds backend and frontend images in parallel
5. **Run (Docker)** - Starts all containers with docker-compose
6. **Smoke Test** - Runs PowerShell smoke test script
7. **Archive Artifacts** - Saves deployment logs and test reports

## Testing the Pipeline Locally

You can test individual commands:

```powershell
# Test cleanup
docker-compose down -v
docker rm -f healthcare-mysql healthcare-backend healthcare-frontend

# Test builds
cd server
docker build -t healthcare-backend:latest .
cd ..\front
docker build -t healthcare-frontend:latest .

# Test docker-compose
cd ..
docker-compose up -d

# Test smoke tests
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-test.ps1
```

## Common Issues to Check

1. **Docker not in PATH**: Make sure Docker is accessible from Jenkins
2. **Port conflicts**: Ensure ports 3000, 3002, 3308 are available
3. **File permissions**: Jenkins needs read/write access to project directory
4. **PowerShell execution policy**: Script uses `-ExecutionPolicy Bypass` to avoid policy issues

## Next Steps

If builds still fail, check:
- Jenkins console output for specific error messages
- Docker logs: `docker-compose logs`
- Container status: `docker ps -a`
- Network connectivity: `docker network ls`

