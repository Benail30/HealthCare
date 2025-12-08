# Healthcare Management System - DevOps Project

A full-stack healthcare management application demonstrating complete CI/CD pipeline implementation with Jenkins, Docker, and automated testing.

## 🎯 Project Overview

This project showcases modern DevOps practices:
- **CI/CD Pipeline**: Jenkins multibranch pipeline with automated builds
- **Containerization**: Docker multi-stage builds for optimized deployment
- **Git Workflow**: Structured branching (main, dev, feature/*)
- **Automated Testing**: Smoke tests and health checks
- **Infrastructure as Code**: Dockerfiles and docker-compose configuration

## 🏗️ Architecture

### Technology Stack
- **Frontend**: Next.js 14 (React, TypeScript, Redux Toolkit)
- **Backend**: Express.js, Socket.io, Prisma ORM
- **Database**: MySQL 8.0
- **DevOps**: Docker, Docker Compose, Jenkins

### Services
| Service | Port | Description |
|---------|------|-------------|
| Frontend | 3000 | Next.js application |
| Backend | 3002 | Express REST API + WebSocket |
| MySQL | 3308 | Database server |

## 🚀 Quick Start

### Using Docker (Recommended)
```bash
# Clone and navigate
git clone https://github.com/Benail30/HealthCare.git
cd HealthCare

# Start all services
docker-compose up -d

# Check status
docker-compose ps

# Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:3002
```

### Local Development
```bash
# Backend
cd server
npm install
npm run dev

# Frontend (separate terminal)
cd front
npm install
npm run dev
```

## 🌿 Git Workflow

### Branch Structure
```
main (protected)       ← Production releases
├── dev                ← Integration & testing
│   ├── feature/*      ← Feature development
```

### Development Process
1. **Create feature branch** from dev
2. **Develop** and commit changes
3. **Push** and create Pull Request to dev
4. **Jenkins builds** and tests automatically
5. **Merge** to dev after review
6. **Promote** to main for production
7. **Tag** releases (v1.0.0, v1.1.0, etc.)

## 🔄 Jenkins CI/CD Pipeline

### Multibranch Pipeline Configuration

The Jenkins pipeline automatically:
- **Builds** on every push to dev or feature branches
- **Tests** using automated smoke tests
- **Deploys** Docker containers
- **Archives** build artifacts and logs
- **Tags** production releases when version tags are pushed

### Pipeline Stages (8 stages)
1. **Checkout** - Fetch code from GitHub
2. **Setup** - Verify Docker and tools
3. **Cleanup** - Remove old containers
4. **Build** - Build Docker images (Backend + Frontend in parallel)
5. **Run** - Start containers with docker-compose
6. **Smoke Tests** - Verify services are responding
7. **Archive Artifacts** - Save logs and reports
8. **Post Actions** - Cleanup and notifications

### Triggering Builds
- **Push to dev** → Full build and integration test
- **Push to feature/** → Build and smoke test
- **Create tag v*.*.*** → Production release build

> **Note**: Specialized pipeline examples for PR-only and versioned builds are available in `docs/examples/` for reference.

## 🐳 Docker Implementation

### Multi-Stage Builds
Both services use optimized multi-stage Docker builds:
- **Stage 1**: Install dependencies
- **Stage 2**: Build application
- **Stage 3**: Production runtime (minimal size)

**Result**: ~80% smaller images, faster deployment

### Docker Compose
```yaml
services:
  mysql:     # Database with health checks
  backend:   # Express API (depends on MySQL)
  frontend:  # Next.js app (depends on Backend)
```

## 🧪 Testing

### Automated Smoke Tests
```powershell
# Windows
.\scripts\smoke-test.ps1

# Linux/Mac
./scripts/smoke-test-backend.sh
./scripts/smoke-test-frontend.sh
```

Tests verify:
- ✓ Backend API responds
- ✓ Frontend loads
- ✓ Database connection works

## 📁 Project Structure

```
HealthCare/
├── front/                  # Next.js frontend application
│   ├── app/               # Next.js 14 app directory
│   ├── Dockerfile         # Multi-stage frontend build
│   └── package.json
├── server/                 # Express backend API
│   ├── controllers/       # API controllers
│   ├── routes/           # API routes
│   ├── prisma/           # Database schema
│   ├── Dockerfile        # Multi-stage backend build
│   └── package.json
├── scripts/               # Automation scripts
│   ├── smoke-test.ps1    # Windows smoke tests
│   └── setup-git-branches.ps1
├── docs/                  # Documentation
│   ├── SETUP_GUIDE.md    # Complete setup instructions
│   ├── JENKINS_SETUP.md  # Jenkins configuration
│   ├── PROJECT_REPORT.md # Full project report
│   └── examples/         # Pipeline examples
│       ├── Jenkinsfile.PR
│       ├── Jenkinsfile.Dev
│       └── Jenkinsfile.Versioned
├── Jenkinsfile            # Main CI/CD pipeline
├── docker-compose.yml     # Container orchestration
└── README.md             # This file
```

## 📚 Documentation

- **[docs/SETUP_GUIDE.md](docs/SETUP_GUIDE.md)** - Complete setup instructions
- **[docs/JENKINS_SETUP.md](docs/JENKINS_SETUP.md)** - Jenkins configuration guide
- **[docs/README-DOCKER.md](docs/README-DOCKER.md)** - Docker best practices
- **[docs/PROJECT_REPORT.md](docs/PROJECT_REPORT.md)** - Comprehensive project report
- **[docs/FINAL_CHECKLIST.md](docs/FINAL_CHECKLIST.md)** - Grading checklist

## 🎓 DevOps Practices Demonstrated

### Git & Version Control
- ✓ Protected branches (main, dev)
- ✓ Feature branch workflow
- ✓ Pull Request process
- ✓ Semantic versioning (v1.0.0)

### CI/CD Automation
- ✓ Automated builds on push
- ✓ Parallel Docker builds
- ✓ Automated testing
- ✓ Artifact archiving

### Containerization
- ✓ Multi-stage Dockerfiles
- ✓ Docker Compose orchestration
- ✓ Health checks
- ✓ Environment management

### Testing & Quality
- ✓ Smoke tests
- ✓ Integration tests
- ✓ Build verification
- ✓ Automated reporting

## 🐛 Troubleshooting

### Common Issues

**Port conflicts:**
```bash
docker-compose down -v
netstat -ano | findstr ":3000"
```

**Database connection:**
```bash
docker logs healthcare-mysql
docker restart healthcare-backend
```

**Jenkins build failures:**
- Verify Docker is running
- Check console output for errors
- Ensure ports 3000, 3002, 3308 are available

## 🚀 Deployment

### Development
```bash
docker-compose up -d
```

### Production
```bash
# Tag release
git tag -a v1.0.0 -m "Release v1.0.0"
git push origin v1.0.0

# Jenkins builds production images
# Deploy using tagged images
```

## 👥 Contributors

DevOps course project demonstrating:
- Pipeline design and implementation
- Docker containerization
- Git workflow management
- Automated testing and deployment

## 📄 License

Educational project for DevOps coursework.

---

**Status**: ✅ Production Ready  
**Version**: 1.0.0  
**Last Updated**: December 2025
