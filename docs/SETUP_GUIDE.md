# Healthcare DevOps Project - Complete Setup Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Git Workflow Setup](#git-workflow-setup)
4. [Jenkins Pipeline Setup](#jenkins-pipeline-setup)
5. [Docker Setup](#docker-setup)
6. [Testing & Verification](#testing--verification)
7. [Grading Checklist](#grading-checklist)

---

## 🎯 Project Overview

This healthcare application follows DevOps best practices with:
- **3 Jenkins Pipelines** (PR, Dev, Versioned)
- **Docker multi-stage builds**
- **Git workflow** (main, dev, feature branches)
- **Automated smoke tests**
- **Artifact archiving**

### Technology Stack
- **Frontend**: Next.js 14 (React, TypeScript, Redux)
- **Backend**: Express.js, Socket.io, Prisma ORM
- **Database**: MySQL 8.0
- **Container**: Docker, Docker Compose
- **CI/CD**: Jenkins

---

## 📦 Prerequisites

### Required Software
- [x] **Git** (2.40+)
- [x] **Docker Desktop** (latest)
- [x] **Node.js** 18+ (for local development)
- [x] **Jenkins** (2.400+)
- [x] **MySQL** 8.0+ (installed on port 3307)

### Check installations:
```powershell
git --version
docker --version
docker-compose --version
node --version
```

---

## 🌿 Git Workflow Setup

### Step 1: Initialize Git Repository

```powershell
cd C:\3LIG\DevOps\healthcare
git init
git add .
git commit -m "Initial commit: Healthcare application"
```

### Step 2: Create Branch Structure

```powershell
# Create main branch (protected, production-ready code)
git branch -M main

# Create dev branch (integration branch for development)
git checkout -b dev
git push -u origin dev

# Go back to main and push
git checkout main
git push -u origin main

# Create feature branch example
git checkout dev
git checkout -b feature/patient-registration
```

### Branch Strategy

| Branch | Purpose | Protected | Merges From |
|--------|---------|-----------|-------------|
| `main` | Production code | ✓ | `dev` only |
| `dev` | Integration | ✓ | feature branches |
| `feature/*` | New features | ✗ | `dev` |

### Step 3: Create Version Tags

```powershell
# On main branch, create version tags
git checkout main
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0

# For subsequent releases
git tag -a v1.1.0 -m "Release version 1.1.0"
git push origin v1.1.0
```

---

## 🔧 Jenkins Pipeline Setup

### Step 1: Configure Jenkins

1. **Open Jenkins**: http://localhost:8080
2. **Install Required Plugins**:
   - Git Plugin
   - Docker Pipeline
   - Pipeline
   - Multibranch Pipeline

### Step 2: Create Three Pipeline Jobs

#### Pipeline 1: PR Build (Pull Request)

1. **New Item** → **Multibranch Pipeline** → `healthcare-pr-pipeline`
2. **Branch Sources**:
   - Add Git source
   - Repository URL: Your repo URL
   - Credentials: Add your Git credentials
3. **Build Configuration**:
   - Mode: by Jenkinsfile
   - Script Path: `Jenkinsfile.PR`
4. **Scan Multibranch Pipeline Triggers**:
   - Check "Scan by webhook"
   - Filter by: Pull Requests only
5. **Save**

**Purpose**: Runs on every PR to `dev` branch
- ✓ Quick builds
- ✓ Smoke tests only
- ✓ Fast feedback (~5-10 min)

#### Pipeline 2: Dev Build (Development Push)

1. **New Item** → **Pipeline** → `healthcare-dev-pipeline`
2. **Build Triggers**:
   - Poll SCM: `H/5 * * * *` (every 5 minutes)
   - Or use webhook
3. **Pipeline**:
   - Definition: Pipeline script from SCM
   - SCM: Git
   - Repository URL: Your repo
   - Branch Specifier: `*/dev`
   - Script Path: `Jenkinsfile.Dev`
4. **Save**

**Purpose**: Runs on every push to `dev` branch
- ✓ Complete build
- ✓ Integration tests
- ✓ Full artifact archiving (~10-15 min)

#### Pipeline 3: Versioned Build (Production Release)

1. **New Item** → **Pipeline** → `healthcare-versioned-pipeline`
2. **Build Triggers**:
   - Poll SCM: `H/10 * * * *`
3. **Pipeline**:
   - Definition: Pipeline script from SCM
   - SCM: Git
   - Repository URL: Your repo
   - Branch Specifier: `refs/tags/v*`
   - Script Path: `Jenkinsfile.Versioned`
4. **Advanced**:
   - Filter by name: `v*.*.*` (regex)
5. **Save**

**Purpose**: Runs when version tag (vX.Y.Z) is pushed
- ✓ Production builds
- ✓ Quality gates
- ✓ Release artifacts (~15-20 min)

### Step 3: Configure Jenkins Environment

Add to Jenkins > Manage Jenkins > Configure System:

**Environment Variables**:
```
DATABASE_URL=mysql://root:yourpassword@mysql:3306/healthcare
PORT=3002
NODE_ENV=production
```

---

## 🐳 Docker Setup

### Files Created

1. **server/Dockerfile** - Backend multi-stage build
2. **front/Dockerfile** - Frontend multi-stage build
3. **docker-compose.yml** - Orchestration
4. **.dockerignore** - Exclude unnecessary files

### Build and Run Locally

```powershell
# Build images
docker-compose build

# Run all services
docker-compose up -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down -v
```

### Service Ports

| Service | Port | URL |
|---------|------|-----|
| Frontend | 3000 | http://localhost:3000 |
| Backend | 3002 | http://localhost:3002 |
| MySQL | 3308 | localhost:3308 |

---

## ✅ Testing & Verification

### Smoke Test Script

Location: `scripts/smoke-test.ps1`

**Run manually**:
```powershell
powershell -ExecutionPolicy Bypass -File .\scripts\smoke-test.ps1
```

### Manual Testing

**Test Backend**:
```powershell
curl http://localhost:3002
# Or
Invoke-WebRequest -Uri http://localhost:3002
```

**Test Frontend**:
```powershell
curl http://localhost:3000
# Or
Start-Process http://localhost:3000
```

### Jenkins Pipeline Testing

1. **Test PR Pipeline**:
   ```powershell
   git checkout dev
   git checkout -b feature/test-pr
   # Make a change
   echo "test" > test.txt
   git add test.txt
   git commit -m "Test PR pipeline"
   git push origin feature/test-pr
   # Create PR to dev branch on GitHub/GitLab
   ```

2. **Test Dev Pipeline**:
   ```powershell
   git checkout dev
   # Make a change
   git add .
   git commit -m "Test dev pipeline"
   git push origin dev
   # Pipeline should trigger automatically
   ```

3. **Test Versioned Pipeline**:
   ```powershell
   git checkout main
   git tag -a v1.0.1 -m "Test release v1.0.1"
   git push origin v1.0.1
   # Versioned pipeline should trigger
   ```

---

## 📊 Grading Checklist

### Git Workflow (15%)
- [x] Main branch (protected)
- [x] Dev branch (integration)
- [x] Feature branches
- [x] Version tags (vX.Y.Z)
- [x] Pull Request workflow

### Jenkins Pipelines (30%)
- [x] 3 separate Jenkinsfiles
- [x] PR pipeline (Jenkinsfile.PR)
- [x] Dev pipeline (Jenkinsfile.Dev)
- [x] Versioned pipeline (Jenkinsfile.Versioned)
- [x] 6+ stages per pipeline
- [x] Proper triggers configured

### Dockerization (25%)
- [x] Multi-stage Dockerfiles
- [x] Backend Dockerfile
- [x] Frontend Dockerfile
- [x] docker-compose.yml
- [x] .dockerignore files
- [x] Optimized builds

### Smoke Tests & Artifacts (15%)
- [x] Smoke test scripts
- [x] PowerShell test runner
- [x] Passed/Failed status
- [x] Artifact archiving
- [x] Build reports
- [x] Deployment logs

### Documentation (15%)
- [x] README files
- [x] Setup guide
- [x] Docker documentation
- [x] Jenkins configuration guide
- [x] Testing procedures

---

## 🎓 Pipeline Comparison

| Feature | PR Pipeline | Dev Pipeline | Versioned Pipeline |
|---------|-------------|--------------|-------------------|
| **Trigger** | Pull Request | Push to dev | Tag vX.Y.Z |
| **Duration** | ~5-10 min | ~10-15 min | ~15-20 min |
| **Stages** | 7 | 8 | 9 |
| **Tests** | Smoke only | Smoke + Integration | Full QA gates |
| **Artifacts** | Minimal | Comprehensive | Complete release |
| **Cleanup** | Auto | Preserve | Preserve |
| **Purpose** | Fast feedback | Integration | Production |

---

## 📁 Project Structure

```
healthcare/
├── Jenkinsfile              # Original (can be deleted)
├── Jenkinsfile.PR           # PR pipeline ⭐
├── Jenkinsfile.Dev          # Dev pipeline ⭐
├── Jenkinsfile.Versioned    # Release pipeline ⭐
├── docker-compose.yml       # Docker orchestration
├── SETUP_GUIDE.md          # This file
├── README-DOCKER.md        # Docker documentation
├── JENKINS_FIXES.md        # Troubleshooting
├── scripts/
│   ├── smoke-test.ps1      # PowerShell smoke tests
│   ├── smoke-test-backend.sh
│   └── smoke-test-frontend.sh
├── server/
│   ├── Dockerfile          # Backend multi-stage
│   ├── .dockerignore
│   ├── package.json
│   └── ...
└── front/
    ├── Dockerfile          # Frontend multi-stage
    ├── .dockerignore
    ├── package.json
    └── ...
```

---

## 🚀 Quick Start Commands

### For Students/Developers

```powershell
# 1. Clone and setup
git clone <your-repo>
cd healthcare

# 2. Setup Git branches
git checkout -b dev
git push -u origin dev

# 3. Test locally with Docker
docker-compose up -d

# 4. Run smoke tests
.\scripts\smoke-test.ps1

# 5. Create feature branch
git checkout -b feature/my-feature

# 6. Make changes and create PR
git add .
git commit -m "Add new feature"
git push origin feature/my-feature
# Create PR on GitHub/GitLab

# 7. After PR merged, create release
git checkout main
git tag -a v1.0.0 -m "First release"
git push origin v1.0.0
```

---

## 🐛 Troubleshooting

See `JENKINS_FIXES.md` for common issues and solutions.

### Common Issues

**Issue**: Jenkins can't find Docker
- **Fix**: Add Docker to PATH in Jenkins configuration

**Issue**: Port already in use
- **Fix**: Change ports in docker-compose.yml

**Issue**: MySQL connection failed
- **Fix**: Check DATABASE_URL in .env file

**Issue**: Smoke tests fail
- **Fix**: Wait longer for services to start (increase sleep time)

---

## 📞 Support

- Check `README-DOCKER.md` for Docker-specific help
- Check `JENKINS_FIXES.md` for Jenkins troubleshooting
- Review individual Jenkinsfile comments for pipeline details

---

## ✨ Success Criteria

Your project is ready for submission when:

1. ✅ All 3 Jenkins pipelines are configured and working
2. ✅ Git branches (main, dev, feature) are set up
3. ✅ Version tag v1.0.0 exists and triggers versioned build
4. ✅ Docker containers build and run successfully
5. ✅ Smoke tests pass in all pipelines
6. ✅ Artifacts are archived in Jenkins
7. ✅ Documentation is complete

**Good luck with your DevOps project! 🎉**

