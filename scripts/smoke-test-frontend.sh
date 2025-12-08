#!/bin/bash
# Smoke Test Script for Frontend
# Returns 0 if passed, 1 if failed

set -e

FRONTEND_URL=${FRONTEND_URL:-"http://localhost:3000"}
MAX_RETRIES=5
RETRY_DELAY=3

echo "🔍 Starting Frontend Smoke Tests..."
echo "Frontend URL: $FRONTEND_URL"

# Function to check endpoint
check_endpoint() {
    local endpoint=$1
    local expected_status=$2
    local retries=0
    
    while [ $retries -lt $MAX_RETRIES ]; do
        echo "Testing $endpoint..."
        status_code=$(curl -s -o /dev/null -w "%{http_code}" "$FRONTEND_URL$endpoint" || echo "000")
        
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

check_endpoint "/" "200" || FAILED=1
check_endpoint "/SignIn" "200" || FAILED=1
check_endpoint "/SignUp" "200" || FAILED=1

# Health check
if [ $FAILED -eq 0 ]; then
    echo ""
    echo "✅ All Frontend Smoke Tests PASSED"
    exit 0
else
    echo ""
    echo "❌ Frontend Smoke Tests FAILED"
    exit 1
fi

