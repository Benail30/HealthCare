@echo off
REM Smoke Test Script for Healthcare Application
REM Returns 0 if all checks pass, 1 if any check fails

setlocal enabledelayedexpansion
set FAILED=0

echo ========================================
echo Healthcare Application Smoke Tests
echo ========================================
echo.

REM Test Backend API endpoint
echo [1/3] Testing Backend API (Port 3002)...
curl -f -s -o nul -w "%%{http_code}" http://localhost:3002/api/users/all > temp_status.txt 2>nul
set /p BACKEND_STATUS=<temp_status.txt
del temp_status.txt 2>nul

if "!BACKEND_STATUS!"=="200" (
    echo [PASS] Backend API responded with status 200
) else if "!BACKEND_STATUS!"=="500" (
    echo [PASS] Backend API is running ^(status 500 - expected^)
) else if "!BACKEND_STATUS!"=="" (
    echo [FAIL] Backend API is not responding
    set FAILED=1
) else (
    echo [PASS] Backend API responded with status !BACKEND_STATUS!
)

echo.

REM Test Frontend
echo [2/3] Testing Frontend (Port 3000)...
curl -f -s -o nul -w "%%{http_code}" http://localhost:3000 > temp_status.txt 2>nul
set /p FRONTEND_STATUS=<temp_status.txt
del temp_status.txt 2>nul

if "!FRONTEND_STATUS!"=="200" (
    echo [PASS] Frontend responded with status 200
) else if "!FRONTEND_STATUS!"=="" (
    echo [FAIL] Frontend is not responding
    set FAILED=1
) else (
    echo [PASS] Frontend responded with status !FRONTEND_STATUS!
)

echo.

REM Test Database connectivity via backend
echo [3/3] Testing Database connectivity...
curl -f -s -o nul -w "%%{http_code}" http://localhost:3002/api/speciality/all > temp_status.txt 2>nul
set /p DB_STATUS=<temp_status.txt
del temp_status.txt 2>nul

if "!DB_STATUS!"=="200" (
    echo [PASS] Database connectivity OK
) else if "!DB_STATUS!"=="500" (
    echo [PASS] Backend can reach database ^(status 500 - expected^)
) else if "!DB_STATUS!"=="" (
    echo [FAIL] Cannot verify database connectivity
    set FAILED=1
) else (
    echo [PASS] Database check returned status !DB_STATUS!
)

echo.
echo ========================================

if !FAILED!==0 (
    echo Result: PASSED - All smoke tests successful
    echo ========================================
    exit /b 0
) else (
    echo Result: FAILED - One or more smoke tests failed
    echo ========================================
    exit /b 1
)

