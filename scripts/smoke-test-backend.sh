#!/bin/bash
# Smoke Test Script for Backend
# Returns 0 if passed, 1 if failed

set -e

BACKEND_URL=${BACKEND_URL:-"http://localhost:3002"}
MAX_RETRIES=5
RETRY_DELAY=3

echo "🔍 Starting Backend Smoke Tests..."
echo "Backend URL: $BACKEND_URL"

# Function to check endpoint
check_endpoint() {
    local endpoint=$1
    local expected_status=$2
    local retries=0
    
    while [ $retries -lt $MAX_RETRIES ]; do
        echo "Testing $endpoint..."
        status_code=$(curl -s -o /dev/null -w "%{http_code}" "$BACKEND_URL$endpoint" || echo "000")
        
        if [ "$status_code" = "$expected_status" ]; then
            echo "✅ $endpoint returned $status_code"
            return 0
        fi
        
        retries=$((retries + 1))
        if [ $retries -lt $MAX_RETRIES ]; then
            echo "⏳ Retrying in $RETRY_DELAY seconds... (Attempt $retries/$MAX_RETRIES)"
            sleep $RETRY_DELAY
        fi
    done
    
    echo "❌ $endpoint failed - Expected $expected_status, got $status_code"
    return 1
}

# Test endpoints
FAILED=0

check_endpoint "/api/users/all" "200" || FAILED=1
check_endpoint "/api/products/all" "200" || FAILED=1
check_endpoint "/api/speciality/all" "200" || FAILED=1

# Health check
if [ $FAILED -eq 0 ]; then
    echo ""
    echo "✅ All Backend Smoke Tests PASSED"
    exit 0
else
    echo ""
    echo "❌ Backend Smoke Tests FAILED"
    exit 1
fi

