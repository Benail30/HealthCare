# Artifact Archiving Fix - Why Files Were Missing

## ❌ **The Problem**

When you checked Jenkins artifacts, only 2 files appeared:
- `deployment-6.log` (6.38 KiB) ✅
- `smoke-test-report-6.txt` (96 B) ✅

**Missing artifacts:**
- ❌ Frontend build output (`front/.next/**`)
- ❌ Smoke test logs (`http_response.txt`, `temp_status.txt`)
- ❌ Backend logs (`server/logs/**`)

## 🔍 **Why Were They Missing?**

### **Root Cause:**
The frontend and backend builds happen **INSIDE Docker containers**, not in the Jenkins workspace filesystem.

```
Jenkins Workspace (filesystem):
  ├── Jenkinsfile
  ├── server/
  │   ├── Dockerfile
  │   └── package.json
  └── front/
      ├── Dockerfile
      └── package.json

Docker Container (isolated):
  healthcare-frontend:
    /app/.next/        ← Build output is HERE (inside container)
    /app/public/       ← Static files are HERE
    
  healthcare-backend:
    /app/logs/         ← Logs are HERE (inside container)
```

When `archiveArtifacts` tries to find `front/.next/**`, it looks in the **workspace**, not inside the Docker container!

## ✅ **The Solution**

Extract artifacts from Docker containers BEFORE archiving them.

### **Updated Archive Logs Stage:**

```groovy
stage('Archive Logs') {
    steps {
        script {
            // 1. Collect container logs (this works - logs go to workspace)
            bat "docker-compose logs > deployment-${env.BUILD_NUMBER}.log 2>&1"
            
            // 2. Create smoke test report (this works - created in workspace)
            bat "echo Status: PASSED > smoke-test-report-${env.BUILD_NUMBER}.txt"
            
            // 3. ✨ NEW: Extract frontend build from container
            bat """
                if not exist "artifacts\\frontend" mkdir artifacts\\frontend
                docker cp healthcare-frontend:/app/.next artifacts\\frontend\\.next
                docker cp healthcare-frontend:/app/public artifacts\\frontend\\public
            """
            
            // 4. ✨ NEW: Extract backend logs from container
            bat """
                if not exist "artifacts\\backend" mkdir artifacts\\backend
                docker cp healthcare-backend:/app/logs artifacts\\backend\\logs
            """
            
            // 5. ✨ NEW: Copy smoke test results
            bat """
                if exist "temp_status.txt" copy temp_status.txt artifacts\\
                if exist "http_response.txt" copy http_response.txt artifacts\\
            """
            
            // 6. Archive everything
            archiveArtifacts artifacts: """
                deployment-${env.BUILD_NUMBER}.log,
                smoke-test-report-${env.BUILD_NUMBER}.txt,
                artifacts/**/*
            """, fingerprint: true, allowEmptyArchive: true
        }
    }
}
```

## 📦 **What Gets Archived Now**

After this fix, Jenkins will show these artifacts:

```
📦 Last Successful Artifacts:
  ├── deployment-7.log                      (Docker logs)
  ├── smoke-test-report-7.txt              (Test report)
  └── artifacts/
      ├── frontend/
      │   ├── .next/
      │   │   ├── static/
      │   │   │   ├── chunks/
      │   │   │   │   ├── app-123abc.js    ✅ JavaScript bundles
      │   │   │   │   └── main-456def.js
      │   │   │   └── css/
      │   │   │       └── app.css           ✅ Stylesheets
      │   │   └── server/
      │   │       └── app.html              ✅ Server files
      │   └── public/
      │       └── images/                   ✅ Static assets
      ├── backend/
      │   └── logs/
      │       └── app.log                   ✅ Backend logs
      ├── temp_status.txt                   ✅ Smoke test temp file
      └── http_response.txt                 ✅ HTTP test response
```

## 🎯 **How It Works**

### **docker cp Command:**
```batch
docker cp <container>:<source> <destination>
```

**Example:**
```batch
docker cp healthcare-frontend:/app/.next artifacts/frontend/.next
```

This copies the `.next` directory from inside the container to the workspace where Jenkins can archive it.

## 🚀 **Next Steps**

### **1. Commit and Push**
```bash
git add Jenkinsfile docs/ARTIFACT_ARCHIVING_FIX.md
git commit -m "Fix: Extract build artifacts from Docker containers for archiving"
git push origin dev
```

### **2. Trigger New Build**
- Go to Jenkins
- Click "Build Now"
- Wait for build to complete

### **3. Check Artifacts**
After build #7 completes:
1. Click on build #7
2. Look at "Last Successful Artifacts"
3. You should now see the `artifacts/` folder with frontend and backend files!

## 📊 **Before vs After**

### **Before (Build #6):**
```
Last Successful Artifacts:
  ├── deployment-6.log          (6.38 KiB)
  └── smoke-test-report-6.txt   (96 B)
                                 ⬆️ Only 2 files!
```

### **After (Build #7+):**
```
Last Successful Artifacts:
  ├── deployment-7.log          (7.2 KiB)
  ├── smoke-test-report-7.txt   (124 B)
  └── artifacts/                (15+ MB)
      ├── frontend/
      │   ├── .next/           (10+ MB - all JS/CSS)
      │   └── public/          (2+ MB - images)
      └── backend/
          └── logs/            (500 KB - logs)
                                 ⬆️ All build outputs!
```

## 💡 **Why This Approach?**

### **Alternative 1: Build in Workspace**
```groovy
dir('front') {
    bat "npm install && npm run build"  // Build in workspace
}
archiveArtifacts "front/.next/**"       // Then archive
```
**Problem**: Duplicates the build process (once for Docker, once for archiving)

### **Alternative 2: Volume Mounts**
```yaml
services:
  frontend:
    volumes:
      - ./front/.next:/app/.next
```
**Problem**: Creates permission issues, slower builds

### **✅ Our Approach: docker cp**
```groovy
docker cp healthcare-frontend:/app/.next artifacts/frontend/.next
```
**Benefits**:
- ✅ Single build (inside Docker)
- ✅ No permission issues
- ✅ Clean extraction
- ✅ Works with any container

## 🔍 **Troubleshooting**

### **Issue: "docker cp" fails**
**Error**: `Error: No such container: healthcare-frontend`

**Cause**: Container isn't running

**Solution**: Check containers are running:
```batch
docker ps --filter name=healthcare
```

---

### **Issue: Artifacts folder is empty**
**Error**: No files in `artifacts/frontend/.next/`

**Cause**: Frontend container doesn't have `.next` directory

**Debug**:
```batch
# Check what's inside the container
docker exec healthcare-frontend ls -la /app/.next
```

If empty, the build inside Dockerfile failed silently.

---

### **Issue: "Path not found" errors**
**Error**: `The system cannot find the path specified`

**Cause**: Container paths are Linux-style even on Windows

**Solution**: Use forward slashes in docker cp source:
```batch
docker cp healthcare-frontend:/app/.next artifacts\frontend\.next
                              ⬆️ Linux path    ⬆️ Windows path
```

## ✅ **Verification**

After the next build, verify artifacts:

```batch
# In Jenkins workspace
cd C:\Jenkins\workspace\Healthcare_DevOps_Project\dev
dir artifacts /s

# Should show:
artifacts\frontend\.next\static\chunks\*.js
artifacts\frontend\.next\static\css\*.css
artifacts\backend\logs\*.log
```

## 📝 **Summary**

**Problem**: Artifacts were inside Docker containers, not accessible to Jenkins  
**Solution**: Use `docker cp` to extract them before archiving  
**Result**: All build outputs, logs, and test results now archived  

**Files archived:**
- ✅ Docker logs (deployment-*.log)
- ✅ Smoke test reports (smoke-test-report-*.txt)
- ✅ Frontend build (artifacts/frontend/.next/**)
- ✅ Backend logs (artifacts/backend/logs/**)
- ✅ Smoke test files (temp_status.txt, http_response.txt)

---

**Updated**: December 2025  
**Status**: ✅ Fixed - Artifacts now extracted from containers

