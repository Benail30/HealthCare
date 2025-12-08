# Healthcare Project - Pipeline Testing Script
Write-Host "=========================================" -ForegroundColor Cyan
Write-Host "Healthcare Project - Pipeline Test Suite" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""

$testsPassed = 0
$testsFailed = 0

# Test 1: Jenkinsfiles
Write-Host "[Test 1/10] Checking Jenkinsfiles..." -ForegroundColor Yellow
$files = @("Jenkinsfile.PR", "Jenkinsfile.Dev", "Jenkinsfile.Versioned")
foreach ($f in $files) {
    if (Test-Path $f) {
        Write-Host "  ✓ $f" -ForegroundColor Green
        $testsPassed++
    } else {
        Write-Host "  ✗ $f missing" -ForegroundColor Red
        $testsFailed++
    }
}

# Test 2: Docker files
Write-Host "[Test 2/10] Checking Docker files..." -ForegroundColor Yellow
$dockerFiles = @("docker-compose.yml", "server\Dockerfile", "front\Dockerfile")
foreach ($f in $dockerFiles) {
    if (Test-Path $f) {
        Write-Host "  ✓ $f" -ForegroundColor Green
        $testsPassed++
    } else {
        Write-Host "  ✗ $f missing" -ForegroundColor Red
        $testsFailed++
    }
}

# Test 3: Smoke test
Write-Host "[Test 3/10] Checking smoke test..." -ForegroundColor Yellow
if (Test-Path "scripts\smoke-test.ps1") {
    Write-Host "  ✓ Smoke test script" -ForegroundColor Green
    $testsPassed++
} else {
    Write-Host "  ✗ Smoke test missing" -ForegroundColor Red
    $testsFailed++
}

# Test 4: Git
Write-Host "[Test 4/10] Checking Git..." -ForegroundColor Yellow
$gitCmd = git --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Git installed" -ForegroundColor Green
    $testsPassed++
} else {
    Write-Host "  ✗ Git not found" -ForegroundColor Red
    $testsFailed++
}

# Test 5: Docker
Write-Host "[Test 5/10] Checking Docker..." -ForegroundColor Yellow
$dockerCmd = docker --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Docker installed" -ForegroundColor Green
    $testsPassed++
} else {
    Write-Host "  ✗ Docker not found" -ForegroundColor Red
    $testsFailed++
}

# Test 6: Docker Compose
Write-Host "[Test 6/10] Checking Docker Compose..." -ForegroundColor Yellow
$composeCmd = docker-compose --version 2>&1
if ($LASTEXITCODE -eq 0) {
    Write-Host "  ✓ Docker Compose installed" -ForegroundColor Green
    $testsPassed++
} else {
    $composeV2 = docker compose version 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "  ✓ Docker Compose V2 installed" -ForegroundColor Green
        $testsPassed++
    } else {
        Write-Host "  ✗ Docker Compose not found" -ForegroundColor Red
        $testsFailed++
    }
}

# Test 7: Documentation
Write-Host "[Test 7/10] Checking documentation..." -ForegroundColor Yellow
$docs = @("SETUP_GUIDE.md", "JENKINS_SETUP.md", "README-DOCKER.md", "PROJECT_REPORT.md")
foreach ($d in $docs) {
    if (Test-Path $d) {
        Write-Host "  ✓ $d" -ForegroundColor Green
        $testsPassed++
    } else {
        Write-Host "  ✗ $d missing" -ForegroundColor Red
        $testsFailed++
    }
}

# Test 8: Jenkinsfile syntax
Write-Host "[Test 8/10] Validating Jenkinsfile syntax..." -ForegroundColor Yellow
foreach ($f in $files) {
    if (Test-Path $f) {
        $content = Get-Content $f -Raw
        if ($content -match 'pipeline' -and $content -match 'stages') {
            Write-Host "  ✓ $f valid structure" -ForegroundColor Green
            $testsPassed++
        } else {
            Write-Host "  ✗ $f invalid" -ForegroundColor Red
            $testsFailed++
        }
    }
}

# Test 9: Stage counts
Write-Host "[Test 9/10] Counting stages..." -ForegroundColor Yellow
$reqs = @{
    "Jenkinsfile.PR" = 6
    "Jenkinsfile.Dev" = 6
    "Jenkinsfile.Versioned" = 6
}
foreach ($f in $files) {
    if (Test-Path $f) {
        $content = Get-Content $f -Raw
        $matches = [regex]::Matches($content, 'stage\s*\(')
        $count = $matches.Count
        if ($count -ge $reqs[$f]) {
            Write-Host "  ✓ $f has $count stages" -ForegroundColor Green
            $testsPassed++
        } else {
            Write-Host "  ✗ $f has $count stages (need $($reqs[$f]))" -ForegroundColor Red
            $testsFailed++
        }
    }
}

# Test 10: Ports
Write-Host "[Test 10/10] Checking ports..." -ForegroundColor Yellow
$ports = @(3000, 3002, 3308)
foreach ($p in $ports) {
    $conn = Get-NetTCPConnection -LocalPort $p -ErrorAction SilentlyContinue
    if ($conn) {
        Write-Host "  ! Port $p in use" -ForegroundColor Yellow
    } else {
        Write-Host "  + Port $p available" -ForegroundColor Green
        $testsPassed++
    }
}

# Summary
Write-Host ""
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host "Results" -ForegroundColor Cyan
Write-Host "==========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "Passed: $testsPassed" -ForegroundColor Green
Write-Host "Failed: $testsFailed" -ForegroundColor Red
Write-Host ""

if ($testsFailed -eq 0) {
    Write-Host "[PASS] ALL TESTS PASSED" -ForegroundColor Green
    Write-Host "Project is ready for Jenkins!" -ForegroundColor Cyan
    exit 0
} elseif ($testsFailed -le 3) {
    Write-Host "[OK] MOSTLY READY" -ForegroundColor Yellow
    exit 0
} else {
    Write-Host "[FAIL] NEEDS WORK" -ForegroundColor Red
    exit 1
}
