# Multi-stage Dockerfile for Backend
# Stage 1: Dependencies and Build
FROM node:18-slim AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies
RUN npm ci

# Generate Prisma Client
RUN npx prisma generate

# Stage 2: Production
FROM node:18-slim AS production

# Install OpenSSL and build tools for Prisma (Debian-based image)
RUN apt-get update && apt-get install -y openssl && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy package files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies including Prisma
RUN npm ci --only=production && npm cache clean --force

# Generate Prisma Client for the correct platform
RUN npx prisma generate

# Copy application code
COPY . .

# Expose port
EXPOSE 3002

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3002/api/users/all', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start server
CMD ["node", "index.js"]

