# Healthcare Project - Git Branch Setup Script
# This script sets up the required Git workflow (main, dev, feature branches)

Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Healthcare Project - Git Setup" -ForegroundColor Cyan
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
Write-Host "[1/7] Checking Git installation..." -ForegroundColor Yellow
try {
    $gitVersion = git --version
    Write-Host "✓ Git found: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ ERROR: Git is not installed or not in PATH" -ForegroundColor Red
    exit 1
}

# Check if we're in a Git repository
Write-Host "[2/7] Checking Git repository..." -ForegroundColor Yellow
if (Test-Path ".git") {
    Write-Host "✓ Git repository detected" -ForegroundColor Green
} else {
    Write-Host "! No Git repository found. Initializing..." -ForegroundColor Yellow
    git init
    Write-Host "✓ Git repository initialized" -ForegroundColor Green
}

# Check current branch
$currentBranch = git rev-parse --abbrev-ref HEAD 2>$null
Write-Host "Current branch: $currentBranch" -ForegroundColor Cyan

# Create/rename to main branch
Write-Host "[3/7] Setting up main branch..." -ForegroundColor Yellow
if ($currentBranch -ne "main") {
    git branch -M main
    Write-Host "✓ Renamed to main branch" -ForegroundColor Green
} else {
    Write-Host "✓ Already on main branch" -ForegroundColor Green
}

# Check if there are any commits
$commitCount = git rev-list --count HEAD 2>$null
if (-not $commitCount) {
    Write-Host "! No commits found. Creating initial commit..." -ForegroundColor Yellow
    git add .
    git commit -m "Initial commit: Healthcare DevOps project" -ErrorAction SilentlyContinue
    Write-Host "✓ Initial commit created" -ForegroundColor Green
}

# Create dev branch
Write-Host "[4/7] Creating dev branch..." -ForegroundColor Yellow
$branches = git branch -a
if ($branches -match "dev") {
    Write-Host "✓ dev branch already exists" -ForegroundColor Green
    git checkout dev 2>$null
} else {
    git checkout -b dev
    Write-Host "✓ dev branch created" -ForegroundColor Green
}

# Add some commits to dev if needed
Write-Host "[5/7] Setting up dev branch content..." -ForegroundColor Yellow
git add .
git commit -m "Dev branch setup: Add Jenkins pipelines and documentation" -ErrorAction SilentlyContinue
Write-Host "✓ Dev branch configured" -ForegroundColor Green

# Create example feature branch
Write-Host "[6/7] Creating example feature branch..." -ForegroundColor Yellow
$featureBranches = git branch -a
if ($featureBranches -match "feature/example") {
    Write-Host "✓ feature/example branch already exists" -ForegroundColor Green
} else {
    git checkout -b feature/example
    Write-Host "✓ feature/example branch created" -ForegroundColor Green
    git checkout dev
}

# Show branch structure
Write-Host "[7/7] Git branch structure:" -ForegroundColor Yellow
Write-Host ""
git branch -a
Write-Host ""

# Summary
Write-Host "============================================" -ForegroundColor Cyan
Write-Host "Git Setup Complete!" -ForegroundColor Green
Write-Host "============================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Branch structure created:" -ForegroundColor Cyan
Write-Host "  ✓ main     - Production branch (protected)" -ForegroundColor White
Write-Host "  ✓ dev      - Development/Integration branch" -ForegroundColor White
Write-Host "  ✓ feature/ - Feature branch example" -ForegroundColor White
Write-Host ""
Write-Host "Next steps:" -ForegroundColor Cyan
Write-Host "  1. Push branches to remote:" -ForegroundColor White
Write-Host "     git push -u origin main" -ForegroundColor Gray
Write-Host "     git push -u origin dev" -ForegroundColor Gray
Write-Host ""
Write-Host "  2. Create version tag:" -ForegroundColor White
Write-Host "     git checkout main" -ForegroundColor Gray
Write-Host "     git tag -a v1.0.0 -m 'Release version 1.0.0'" -ForegroundColor Gray
Write-Host "     git push origin v1.0.0" -ForegroundColor Gray
Write-Host ""
Write-Host "  3. Configure Jenkins pipelines (see JENKINS_SETUP.md)" -ForegroundColor White
Write-Host ""
Write-Host "Current branch: " -NoNewline -ForegroundColor Cyan
git rev-parse --abbrev-ref HEAD
Write-Host ""

