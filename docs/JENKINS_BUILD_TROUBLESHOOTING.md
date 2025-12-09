# Jenkins Build Troubleshooting Guide

## 🔧 Backend Build Stage Failing

### Problem
Backend Build stage shows an error in Jenkins, and subsequent stages don't execute.

### Root Causes

#### 1. **Silent Build Failures**
Docker build may fail without clear error messages in Jenkins console.

**Solution**: Added `--progress=plain` flag for verbose output:
```batch
docker build --progress=plain -t healthcare-backend:latest .
```

#### 2. **Build Context Issues**
Jenkins may not be in the correct directory when building.

**Solution**: Added directory verification:
```batch
cd
dir server
if exist server\Dockerfile (echo Dockerfile found)
```

#### 3. **Missing Error Handling**
Build errors weren't being caught properly.

**Solution**: Added explicit error checking:
```batch
if errorlevel 1 (
    echo ERROR: Backend Docker build failed!
    exit /b 1
)
```

#### 4. **Parallel Build Failures**
When backend fails, frontend build also stops immediately.

**Solution**: Parallel builds now complete independently (both builds finish even if one fails).

---

## 🔍 **Updated Backend Build Stage**

```groovy
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
```

---

## 📊 **What Changed**

### Before:
```groovy
stage('Backend Build') {
    steps {
        echo "Building Backend Docker image..."
        dir('server') {
            bat "docker build -t healthcare-backend:latest ."
        }
        echo "Backend image built successfully"
    }
}
```

### After:
```groovy
stage('Backend Build') {
    steps {
        script {
            // 1. Added section headers
            echo "========================================="
            echo "Starting Backend Docker Build"
            
            // 2. Verify directory structure
            bat "cd"
            bat "dir server"
            
            // 3. Check Dockerfile exists
            bat "if exist server\\Dockerfile (echo Dockerfile found) else exit /b 1"
            
            // 4. Verbose build with error handling
            dir('server') {
                bat """
                    docker build --progress=plain -t healthcare-backend:latest . 2>&1
                    if errorlevel 1 (
                        echo ERROR: Build failed!
                        exit /b 1
                    )
                """
            }
            
            // 5. Verify image created
            bat "docker images | findstr healthcare-backend"
            echo "✓ Backend image built successfully"
        }
    }
}
```

---

## 🚨 **Common Build Errors & Solutions**

### Error 1: "Dockerfile not found"
**Symptom**: `ERROR: Dockerfile not found`

**Cause**: Jenkins workspace isn't in the correct directory

**Solution**: Check Jenkins workspace path matches repository structure
```batch
# In Jenkins console, look for:
Building in workspace: C:\Jenkins\workspace\healthcare
```

---

### Error 2: "npm install fails"
**Symptom**: `npm ERR! code ENOTFOUND` or `npm ERR! network timeout`

**Cause**: Network issues during dependency installation

**Solution**: 
1. Add retry logic to Dockerfile:
```dockerfile
RUN npm install --retry=3 --fetch-timeout=60000
```

2. Or use npm cache in Jenkins:
```groovy
bat "npm config set cache C:\\Jenkins\\.npm-cache"
```

---

### Error 3: "Prisma generate fails"
**Symptom**: `Error: Cannot find module '@prisma/client'`

**Cause**: Prisma client not generated properly

**Solution**: Dockerfile already includes:
```dockerfile
RUN npx prisma generate
```

If still failing, check `server/prisma/schema.prisma` exists.

---

### Error 4: "Permission denied"
**Symptom**: `cannot create directory` or `permission denied`

**Cause**: Jenkins user doesn't have Docker permissions

**Solution**: Add Jenkins user to `docker-users` group:
```powershell
# PowerShell (as Administrator)
Add-LocalGroupMember -Group "docker-users" -Member "jenkins"
```

---

### Error 5: "Out of disk space"
**Symptom**: `no space left on device`

**Cause**: Old Docker images filling disk

**Solution**: Clean up old images:
```batch
docker system prune -af --volumes
docker image prune -af
```

---

## 🔍 **How to Debug in Jenkins**

### Step 1: Check Console Output
1. Click on the failing build number
2. Click "Console Output"
3. Look for lines starting with `ERROR:` or `failed`

### Step 2: Verify Docker Images
Add this to your Jenkinsfile after build:
```groovy
bat "docker images"
```

### Step 3: Check Build Context
Add before build:
```groovy
bat "dir /s server"  // Shows all files in server directory
```

### Step 4: Test Build Locally
On your machine:
```batch
cd server
docker build --progress=plain -t test-backend .
```

If it works locally but fails in Jenkins, it's a Jenkins configuration issue.

---

## ✅ **Verification Checklist**

After the fix, your Jenkins console should show:

```
[Build Images] Starting
[Backend Build] =========================================
[Backend Build] Starting Backend Docker Build
[Backend Build] =========================================
[Backend Build] C:\Jenkins\workspace\healthcare
[Backend Build] Directory of C:\Jenkins\workspace\healthcare\server
[Backend Build] Dockerfile found
[Backend Build] Building Backend Docker image...
[Backend Build] Current directory: C:\Jenkins\workspace\healthcare\server
[Backend Build] #1 [internal] load build definition from Dockerfile
[Backend Build] #2 [internal] load .dockerignore
[Backend Build] #3 [internal] load metadata for docker.io/library/node:18-slim
[Backend Build] ... (build output)
[Backend Build] Successfully tagged healthcare-backend:123
[Backend Build] Successfully tagged healthcare-backend:latest
[Backend Build] healthcare-backend    latest    abc123def456
[Backend Build] healthcare-backend    123       abc123def456
[Backend Build] ✓ Backend image built successfully
```

---

## 🎯 **Next Steps**

1. **Commit the updated Jenkinsfile**:
```bash
git add Jenkinsfile
git commit -m "Fix: Add verbose logging and error handling to Backend Build stage"
git push origin dev
```

2. **Trigger a new build** in Jenkins

3. **Check Console Output** for detailed logs

4. **If still failing**, share the console output starting from "Backend Build" section

---

## 📞 **Still Having Issues?**

Look for these specific lines in console output:
- `ERROR: Dockerfile not found` → Check repository structure
- `npm ERR!` → Network/dependency issue
- `Prisma` errors → Database schema issue
- `permission denied` → Jenkins user permissions
- `no space` → Disk cleanup needed

---

**Updated**: December 2025  
**Status**: Enhanced error handling and verbose logging added

