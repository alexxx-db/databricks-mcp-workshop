#!/bin/bash

# Check Databricks App Status
# Shows the current state and URL of your deployed MCP server

set -e
source ../.env.local
echo "MCP_APP_NAME: $MCP_APP_NAME"

echo "📊 Checking MCP Server Status"
echo "=============================="
echo ""

# Check if databricks CLI is installed
if ! command -v databricks &> /dev/null; then
    echo "❌ Error: Databricks CLI is not installed"
    exit 1
fi

# Get app name from env.local
APP_NAME=$MCP_APP_NAME
if [ -z "$APP_NAME" ]; then
    echo "❌ Could not find app name in .env.local"
    exit 1
fi

echo "🔍 Looking for app: $APP_NAME"
echo ""

# Get app details
APP_INFO=$(databricks apps list | grep "$APP_NAME" || echo "")

if [ -z "$APP_INFO" ]; then
    echo "❌ App not found: $APP_NAME"
    echo ""
    echo "Have you deployed yet? Run: ./deploy.sh"
    exit 1
fi

# Parse app details
APP_STATE=$(echo "$APP_INFO" | awk '{print $2}')
APP_URL=$(databricks apps get "$APP_NAME" 2>/dev/null | grep -o 'https://[^[:space:]]*' | head -1 || echo "URL not available")

echo "✅ App found!"
echo ""
echo "📍 App Name:  $APP_NAME"
echo "🔄 State:     $APP_STATE"
echo "🌐 URL:       $APP_URL"
echo ""

if [ "$APP_STATE" = "RUNNING" ]; then
    echo "✅ Your MCP server is running!"
    echo ""
    echo "🔗 MCP Endpoint: ${APP_URL}/mcp/"
    echo ""
    echo "📋 Connect AI assistants using this URL"
else
    echo "⚠️  App is not running (State: $APP_STATE)"
    echo ""
    echo "Check logs in Databricks: Apps → $APP_NAME → Logs"
fi
echo ""

