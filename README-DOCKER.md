# Docker Setup Guide

## Overview
This project uses multi-stage Docker builds for both backend and frontend applications.

## Dockerfiles

### Backend Dockerfile (`server/Dockerfile`)
- **Stage 1 (builder)**: Installs dependencies and generates Prisma client
- **Stage 2 (production)**: Creates lightweight production image with only runtime dependencies

### Frontend Dockerfile (`front/Dockerfile`)
- **Stage 1 (builder)**: Installs dependencies and builds Next.js application
- **Stage 2 (production)**: Creates lightweight production image with built application

## Building Docker Images

### Backend
```bash
cd server
docker build -t healthcare-backend:latest .
```

### Frontend
```bash
cd front
docker build -t healthcare-frontend:latest .
```

## Running with Docker Compose

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all services
docker-compose down

# Rebuild and start
docker-compose up -d --build
```

## Services

- **MySQL**: Port 3307 (mapped from container port 3306)
- **Backend**: Port 3002
- **Frontend**: Port 3000

## Environment Variables

Backend requires these environment variables:
- `DATABASE_URL`: MySQL connection string
- `SECRET_KEY`: JWT secret key
- `PORT`: Server port (default: 3002)
- Cloudinary credentials (optional)

Frontend requires:
- `NEXT_PUBLIC_API_BASE`: Backend API URL

## Smoke Tests

Run smoke tests to verify services are working:

```bash
# Linux/Mac
chmod +x scripts/smoke-test-backend.sh
chmod +x scripts/smoke-test-frontend.sh
./scripts/smoke-test-backend.sh
./scripts/smoke-test-frontend.sh

# Windows PowerShell
.\scripts\smoke-test.ps1
```

## Health Checks

Both containers include health checks that verify the services are responding correctly.

