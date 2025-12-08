# Jenkins Build Errors - Quick Fix Guide

## 🚨 Most Common Issues & Immediate Solutions

### Issue 1: Backend Container Unhealthy (CURRENT ISSUE)

**What I see in your system:**
- ✅ Frontend: Healthy
- ✅ MySQL: Healthy  
- ❌ Backend: Unhealthy

**Quick Fixes:**

#### Fix A: Give Backend More Time to Start
Add to Jenkinsfiles (already at 45-60s, might need more):
```groovy
echo "Waiting 90s for services to stabilize..."
sleep 90
```

#### Fix B: Check Backend Logs
```powershell
docker logs healthcare-backend --tail 50
```

Look for errors like:
- Database connection failed
- Port already in use
- Missing environment variables
- Prisma errors

#### Fix C: Restart Backend Container
```powershell
docker restart healthcare-backend
# Wait 30 seconds
docker ps
```

---

### Issue 2: Jenkins Can't Find Docker

**Error in Jenkins Console:**
```
'docker' is not recognized as an internal or external command
```

**Immediate Fix:**
1. Open Jenkins: http://localhost:8080
2. Manage Jenkins → Configure System
3. Global properties → ☑ Environment variables
4. Add:
   ```
   Name: PATH
   Value: C:\Program Files\Docker\Docker\resources\bin;${PATH}
   ```
5. Save and restart Jenkins

**Alternative - Update Jenkinsfiles:**
Replace `docker` commands with full path:
```groovy
bat "\"C:\\Program Files\\Docker\\Docker\\resources\\bin\\docker.exe\" --version"
```

---

### Issue 3: Ports Already in Use

**Error:**
```
Ports are not available: listen tcp 0.0.0.0:3000: bind: address already in use
```

**Immediate Fix:**
```powershell
# Stop all healthcare containers
docker-compose down -v

# Check what's using ports
netstat -ano | findstr ":3000"
netstat -ano | findstr ":3002"  
netstat -ano | findstr ":3308"

# Kill processes if needed (replace <PID>)
taskkill /PID <PID> /F
```

---

### Issue 4: Docker Daemon Not Running

**Error:**
```
error during connect: This error may indicate that the docker daemon is not running
```

**Immediate Fix:**
1. Open Docker Desktop
2. Wait for it to fully start (whale icon should be steady)
3. Test: `docker ps`
4. Then restart Jenkins pipeline

---

### Issue 5: Git Checkout Fails

**Error:**
```
ERROR: Error cloning remote repo 'origin'
```

**Immediate Fix:**

**Option A - Use Local Files (For Testing):**
Change Jenkinsfile checkout to:
```groovy
stage('Checkout') {
    steps {
        echo "Using local workspace files"
        bat 'dir'
    }
}
```

**Option B - Add Git Credentials:**
1. Jenkins → Manage Jenkins → Manage Credentials
2. Global → Add Credentials
3. Username with password
4. Add your Git credentials

---

### Issue 6: PowerShell Script Fails

**Error:**
```
smoke-test.ps1 cannot be loaded because running scripts is disabled
```

**Already Fixed in Our Jenkinsfiles:**
We use `-ExecutionPolicy Bypass`:
```groovy
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-test.ps1
```

**If Still Fails:**
```powershell
# Run as Administrator
Set-ExecutionPolicy RemoteSigned -Scope LocalMachine
```

---

### Issue 7: Workspace Path Not Found

**Error:**
```
The system cannot find the path specified
```

**Immediate Fix:**
Add to beginning of each Jenkinsfile stage:
```groovy
stage('Debug Workspace') {
    steps {
        bat 'cd'
        bat 'dir'
        bat 'dir server'
        bat 'dir front'
    }
}
```

Then update paths based on actual Jenkins workspace.

---

## 🔧 Universal Quick Fix Sequence

Try these in order:

### Step 1: Clean Everything
```powershell
# Stop containers
docker-compose down -v

# Clean Docker
docker system prune -f

# Restart Docker Desktop
```

### Step 2: Test Manually
```powershell
cd C:\3LIG\DevOps\healthcare

# Build
docker-compose build

# Start
docker-compose up -d

# Wait
Start-Sleep -Seconds 60

# Check status
docker ps

# Test
.\scripts\smoke-test.ps1

# Clean
docker-compose down -v
```

### Step 3: Restart Jenkins
```powershell
# Run as Administrator
net stop jenkins
net start jenkins
```

### Step 4: Create Minimal Test Pipeline
In Jenkins, create new pipeline with:
```groovy
pipeline {
    agent any
    stages {
        stage('Test Docker') {
            steps {
                bat 'docker --version'
                bat 'docker ps'
                echo 'Docker is accessible!'
            }
        }
        stage('Test Workspace') {
            steps {
                bat 'cd'
                bat 'dir'
            }
        }
    }
}
```

---

## 📋 Share This Info for Help

**Copy and share the output of these commands:**

```powershell
# 1. Jenkins Console Output
# (Copy from Jenkins web interface)

# 2. Docker Status
docker ps -a

# 3. Container Logs
docker logs healthcare-backend --tail 30
docker logs healthcare-frontend --tail 30

# 4. Network Test
curl http://localhost:3000
curl http://localhost:3002

# 5. Paths
cd C:\3LIG\DevOps\healthcare
dir
dir server
dir front
```

---

## 🎯 Specific Error Messages to Look For

### In Jenkins Console Output:

**Error Type 1: Command Not Found**
```
'docker' is not recognized
'git' is not recognized
'powershell' is not recognized
```
→ PATH issue, add to Jenkins environment variables

**Error Type 2: Permission Denied**
```
permission denied
access is denied
```
→ Run Jenkins as Administrator

**Error Type 3: Connection Failed**
```
Cannot connect to the Docker daemon
Connection refused
```
→ Ensure Docker Desktop is running

**Error Type 4: Build Failed**
```
ERROR: build step 'Execute Windows batch command' failed
```
→ Check the specific command that failed

**Error Type 5: Timeout**
```
timeout
timed out
took too long
```
→ Increase sleep/wait times in pipeline

---

## ⚡ Jenkins Pipeline Test Template

Use this to test your Jenkins setup:

```groovy
pipeline {
    agent any
    
    stages {
        stage('1. Environment Check') {
            steps {
                echo 'Checking environment...'
                bat 'docker --version'
                bat 'git --version'
                bat 'cd'
            }
        }
        
        stage('2. Docker Test') {
            steps {
                echo 'Testing Docker...'
                bat 'docker ps'
                bat 'docker images'
            }
        }
        
        stage('3. File Check') {
            steps {
                echo 'Checking files...'
                bat 'dir'
                bat 'if exist docker-compose.yml (echo FOUND) else (echo NOT FOUND)'
            }
        }
        
        stage('4. Simple Build Test') {
            steps {
                echo 'Testing Docker build...'
                bat 'docker pull hello-world'
                bat 'docker run hello-world'
            }
        }
    }
    
    post {
        always {
            echo 'Test completed'
        }
        success {
            echo 'All checks passed!'
        }
        failure {
            echo 'Some checks failed - review console output'
        }
    }
}
```

---

## 🆘 Emergency Contact Checklist

**Before asking for help, have ready:**

1. ✅ Jenkins console output (full log)
2. ✅ Which Jenkinsfile? (PR, Dev, or Versioned)
3. ✅ Which stage failed?
4. ✅ Docker status: `docker ps -a`
5. ✅ Backend logs: `docker logs healthcare-backend`
6. ✅ Jenkins version
7. ✅ Docker version

---

**What's the specific error message you're seeing in Jenkins?**  
**Share the Jenkins console output and I'll provide an exact fix!**

