# PowerShell Smoke Test Script (Windows compatible)
# Returns 0 if passed, 1 if failed

param(
    [string]$BackendUrl = "http://localhost:3002",
    [string]$FrontendUrl = "http://localhost:3000",
    [int]$MaxRetries = 5,
    [int]$RetryDelay = 3
)

$ErrorActionPreference = "Stop"
$Failed = 0

function Test-Endpoint {
    param(
        [string]$Url,
        [int]$ExpectedStatus = 200,
        [string]$Name
    )
    
    $retries = 0
    while ($retries -lt $MaxRetries) {
        Write-Host "Testing $Name ($Url)..."
        try {
            $response = Invoke-WebRequest -Uri $Url -Method GET -UseBasicParsing -TimeoutSec 5 -ErrorAction Stop
            if ($response.StatusCode -eq $ExpectedStatus) {
                Write-Host "✅ $Name returned $($response.StatusCode)" -ForegroundColor Green
                return $true
            }
        } catch {
            $statusCode = $_.Exception.Response.StatusCode.value__
            if ($statusCode -eq $ExpectedStatus) {
                Write-Host "✅ $Name returned $statusCode" -ForegroundColor Green
                return $true
            }
        }
        
        $retries++
        if ($retries -lt $MaxRetries) {
            Write-Host "⏳ Retrying in $RetryDelay seconds... (Attempt $retries/$MaxRetries)" -ForegroundColor Yellow
            Start-Sleep -Seconds $RetryDelay
        }
    }
    
    Write-Host "❌ $Name failed - Expected $ExpectedStatus" -ForegroundColor Red
    return $false
}

Write-Host "🔍 Starting Smoke Tests..." -ForegroundColor Cyan
Write-Host "Backend URL: $BackendUrl"
Write-Host "Frontend URL: $FrontendUrl"
Write-Host ""

# Backend Tests
Write-Host "=== Backend Tests ===" -ForegroundColor Cyan
if (-not (Test-Endpoint -Url "$BackendUrl/api/users/all" -Name "GET /api/users/all")) { $Failed = 1 }
if (-not (Test-Endpoint -Url "$BackendUrl/api/products/all" -Name "GET /api/products/all")) { $Failed = 1 }
if (-not (Test-Endpoint -Url "$BackendUrl/api/speciality/all" -Name "GET /api/speciality/all")) { $Failed = 1 }

Write-Host ""
Write-Host "=== Frontend Tests ===" -ForegroundColor Cyan
if (-not (Test-Endpoint -Url "$FrontendUrl/" -Name "GET /")) { $Failed = 1 }
if (-not (Test-Endpoint -Url "$FrontendUrl/SignIn" -Name "GET /SignIn")) { $Failed = 1 }
if (-not (Test-Endpoint -Url "$FrontendUrl/SignUp" -Name "GET /SignUp")) { $Failed = 1 }

Write-Host ""
if ($Failed -eq 0) {
    Write-Host "✅ All Smoke Tests PASSED" -ForegroundColor Green
    exit 0
} else {
    Write-Host "❌ Smoke Tests FAILED" -ForegroundColor Red
    exit 1
}

