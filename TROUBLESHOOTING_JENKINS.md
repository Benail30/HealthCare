# Jenkins Build Errors - Troubleshooting Guide

## 🔍 Common Jenkins Build Errors & Solutions

### Error 1: "docker: command not found"

**Symptoms:**
```
docker: command not found
```

**Solutions:**

#### Option A: Add Docker to Jenkins PATH
1. Open Jenkins: http://localhost:8080
2. Go to: **Manage Jenkins** → **Configure System**
3. Scroll to **Global properties**
4. Check ☑ **Environment variables**
5. Add new variable:
   - Name: `PATH`
   - Value: `C:\Program Files\Docker\Docker\resources\bin;${PATH}`
6. Click **Save**
7. Restart Jenkins

#### Option B: Use Full Docker Path
Update Jenkinsfiles to use full path:
```groovy
bat "\"C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker.exe\" --version"
```

---

### Error 2: "docker-compose: command not found"

**Symptoms:**
```
docker-compose is not recognized as an internal or external command
```

**Solutions:**

#### Check Docker Compose Version
```powershell
docker-compose --version
# or
docker compose version
```

#### Fix in Jenkinsfile (Already implemented)
Our Jenkinsfiles already handle this:
```groovy
bat """
    docker-compose up -d
    if errorlevel 1 (
        docker compose up -d
    )
"""
```

---

### Error 3: "Access Denied" or Permission Errors

**Symptoms:**
```
ERROR: Got permission denied while trying to connect to the Docker daemon
```

**Solutions:**

#### Option A: Run Jenkins as Administrator
1. Open Services (services.msc)
2. Find "Jenkins"
3. Right-click → Properties
4. Log On tab → Select "Local System account"
5. Restart Jenkins service

#### Option B: Add Jenkins User to Docker Group
```powershell
# Run as Administrator
net localgroup docker-users jenkins /add
```

---

### Error 4: Port Already in Use

**Symptoms:**
```
Error starting userland proxy: listen tcp 0.0.0.0:3000: bind: address already in use
```

**Solutions:**

#### Stop Conflicting Processes
```powershell
# Find process using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID)
taskkill /PID <PID> /F

# Or stop all healthcare containers
docker-compose down -v
```

#### Alternative: Change Ports in docker-compose.yml
```yaml
services:
  frontend:
    ports:
      - "3001:3000"  # Changed from 3000:3000
```

---

### Error 5: "No such file or directory" - Workspace Issues

**Symptoms:**
```
C:\3LIG\DevOps\healthcare>cd server
The system cannot find the path specified.
```

**Solutions:**

#### Check Workspace Path
1. Jenkins Dashboard → Pipeline → Configure
2. Under "Pipeline script from SCM"
3. Verify "Repository URL" is correct
4. Check "Branch Specifier"

#### Fix Path in Pipeline
The issue is Jenkins workspace might be different. Use `dir()` blocks:
```groovy
stage('Build Backend') {
    steps {
        dir('server') {
            bat "docker build -t healthcare-backend:latest ."
        }
    }
}
```

---

### Error 6: "Checkout" Stage Fails

**Symptoms:**
```
ERROR: Error cloning remote repo 'origin'
```

**Solutions:**

#### Configure Git Credentials
1. Jenkins → Manage Jenkins → Manage Credentials
2. Add credentials (Global)
3. Kind: "Username with password"
4. Add your Git username and password/token

#### Update Pipeline Configuration
```groovy
stage('Checkout') {
    steps {
        checkout scm
        // or
        git branch: 'dev', url: 'https://github.com/your-repo.git'
    }
}
```

---

### Error 7: PowerShell Script Execution Policy

**Symptoms:**
```
cannot be loaded because running scripts is disabled on this system
```

**Solutions:**

#### Already Fixed in Our Jenkinsfiles
We use `-ExecutionPolicy Bypass`:
```groovy
bat "powershell -ExecutionPolicy Bypass -File .\\scripts\\smoke-test.ps1"
```

#### Alternative: Set Global Policy
```powershell
# Run as Administrator
Set-ExecutionPolicy RemoteSigned -Force
```

---

### Error 8: Slow Build / Timeout

**Symptoms:**
```
Timeout after 30 seconds waiting for services
```

**Solutions:**

#### Increase Wait Time
In Jenkinsfiles, increase sleep time:
```groovy
echo "Waiting 60s for services..."  // Changed from 30s
sleep 60
```

#### Check Docker Performance
```powershell
docker stats
# If high CPU/Memory, increase Docker resources in Docker Desktop
```

---

### Error 9: "npm install" Fails During Docker Build

**Symptoms:**
```
npm ERR! network request to https://registry.npmjs.org failed
```

**Solutions:**

#### Check Internet Connection
```powershell
ping registry.npmjs.org
```

#### Use npm ci with Retry
Already in our Dockerfiles, but you can add:
```dockerfile
RUN npm ci --only=production --retry=3
```

#### Clear npm Cache
```powershell
docker builder prune -a
```

---

### Error 10: "Prisma Generate" Fails in Docker

**Symptoms:**
```
Error: Cannot find module '@prisma/client'
```

**Solutions:**

#### Already Fixed in Our Dockerfile
We use `node:18-slim` with OpenSSL:
```dockerfile
FROM node:18-slim
RUN apt-get update && apt-get install -y openssl
RUN npx prisma generate
```

#### Rebuild Without Cache
```powershell
docker-compose build --no-cache backend
```

---

## 🛠️ Debugging Commands

### Check Jenkins Logs
```powershell
# Windows
Get-Content "C:\Program Files\Jenkins\jenkins.log" -Tail 50
```

### Test Docker from Jenkins
Create a test pipeline:
```groovy
pipeline {
    agent any
    stages {
        stage('Test Docker') {
            steps {
                bat 'docker --version'
                bat 'docker ps'
                bat 'docker-compose --version || docker compose version'
            }
        }
    }
}
```

### Check Workspace
```groovy
stage('Debug') {
    steps {
        bat 'cd'
        bat 'dir'
        bat 'echo %PATH%'
    }
}
```

---

## 📋 Pre-Build Checklist

Before running Jenkins pipelines, verify:

```powershell
# 1. Docker is running
docker ps

# 2. Docker Compose works
docker-compose --version

# 3. Ports are available
netstat -ano | findstr ":3000"
netstat -ano | findstr ":3002"
netstat -ano | findstr ":3308"

# 4. Files exist
Test-Path Jenkinsfile.PR
Test-Path Jenkinsfile.Dev
Test-Path Jenkinsfile.Versioned
Test-Path docker-compose.yml

# 5. Git is accessible
git --version
```

---

## 🔧 Quick Fixes

### Fix 1: Clean Everything and Restart
```powershell
# Stop all containers
docker-compose down -v

# Clean Docker
docker system prune -a -f
docker volume prune -f

# Restart Docker Desktop
# Then restart Jenkins service
net stop jenkins
net start jenkins
```

### Fix 2: Test Manual Build
```powershell
# Try building manually first
cd C:\3LIG\DevOps\healthcare
docker-compose build
docker-compose up -d
.\scripts\smoke-test.ps1
docker-compose down -v
```

### Fix 3: Simplify Pipeline for Testing
Create a minimal test pipeline:
```groovy
pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Hello World'
                bat 'docker --version'
            }
        }
    }
}
```

---

## 📞 Getting More Help

### Share These Details:

1. **Error Message** - Full error from Jenkins console output
2. **Pipeline Name** - Which Jenkinsfile (PR, Dev, Versioned)?
3. **Stage Failed** - Which stage number?
4. **Jenkins Version** - Check in Jenkins → About
5. **Docker Version** - `docker --version`

### Where to Find Logs:

**Jenkins Console Output:**
- Jenkins → Pipeline Name → Build Number → Console Output

**Docker Logs:**
```powershell
docker-compose logs backend
docker-compose logs frontend
docker-compose logs mysql
```

**Windows Event Viewer:**
- Look for Docker and Jenkins errors

---

## 🚀 Recommended Jenkins Configuration

### For Windows Jenkins Setup:

1. **Install Jenkins Plugins:**
   - Docker Pipeline
   - Git Plugin
   - Pipeline
   - Multibranch Pipeline

2. **Configure Jenkins:**
   - Set PATH to include Docker
   - Add Git credentials
   - Set workspace permissions

3. **Test Setup:**
   - Create simple test pipeline
   - Verify Docker access
   - Check workspace paths

4. **Run Full Pipelines:**
   - Start with Jenkinsfile.PR (simplest)
   - Then Jenkinsfile.Dev
   - Finally Jenkinsfile.Versioned

---

## ✅ Success Indicators

Your Jenkins is working correctly when:

- ✅ `docker --version` works in pipeline
- ✅ `checkout scm` completes
- ✅ `docker build` succeeds
- ✅ `docker-compose up -d` starts services
- ✅ Smoke tests pass
- ✅ Artifacts are archived

---

**Need specific help? Share your exact error message and I can provide targeted solutions!**

