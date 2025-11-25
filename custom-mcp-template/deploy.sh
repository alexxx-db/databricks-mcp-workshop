#!/bin/bash

# Deploy MCP Server to Databricks Apps
# This script builds and deploys your custom MCP server
source ../.env.local
echo "PARTICIPANT_PREFIX: $PARTICIPANT_PREFIX"

set -e  # Exit on error

echo "🚀 Deploying Custom MCP Server to Databricks Apps"
echo "=================================================="
echo ""

# Check if uv is installed
if ! command -v uv &> /dev/null; then
    echo "❌ Error: 'uv' is not installed"
    echo "Install it with: curl -LsSf https://astral.sh/uv/install.sh | sh"
    exit 1
fi

# Check if databricks CLI is installed
if ! command -v databricks &> /dev/null; then
    echo "❌ Error: Databricks CLI is not installed"
    echo "Install from: https://docs.databricks.com/dev-tools/cli/install.html"
    exit 1
fi

# Check authentication
echo "🔐 Checking Databricks authentication..."
if ! databricks current-user me &> /dev/null; then
    echo "❌ Not authenticated with Databricks"
    echo "Run: databricks auth login"
    exit 1
fi

USER_EMAIL=$(databricks current-user me | grep -o '"userName": "[^"]*"' | cut -d'"' -f4)
echo "✅ Authenticated as: $USER_EMAIL"
echo ""

# Get participant prefix
if [ -z "$PARTICIPANT_PREFIX" ]; then
    echo "❌ Error: PARTICIPANT_PREFIX environment variable is not set"
    echo "Run the setup script first: ../setup.sh"
    echo "Or manually set: export PARTICIPANT_PREFIX=your-prefix"
    exit 1
fi

# Convert underscores to dashes for app naming (Databricks Apps naming requirement)
PARTICIPANT_PREFIX_CLEAN=$(echo "$PARTICIPANT_PREFIX" | tr '_' '-')
echo "🏷️  Using participant prefix: $PARTICIPANT_PREFIX_CLEAN"
echo ""

# Build the wheel
echo "📦 Building Python wheel..."
uv build --wheel

if [ ! -d ".build" ]; then
    echo "❌ Build failed - .build directory not created"
    exit 1
fi

echo "✅ Wheel built successfully"
echo ""

# Deploy with bundle
echo "🚀 Deploying to Databricks Apps..."
# Unset DATABRICKS_AUTH_TYPE to avoid auth conflicts
unset DATABRICKS_AUTH_TYPE
databricks bundle deploy --var="participant_prefix=$PARTICIPANT_PREFIX_CLEAN"

if [ $? -ne 0 ]; then
    echo "❌ Deployment failed"
    exit 1
fi

echo ""
echo "✅ Deployment complete!"
echo ""

# Start the app
APP_NAME="mcp-custom-server-$PARTICIPANT_PREFIX_CLEAN"
echo "🚀 Starting app: $APP_NAME..."
unset DATABRICKS_AUTH_TYPE
databricks bundle run custom-mcp-server --var="participant_prefix=$PARTICIPANT_PREFIX_CLEAN"

# Wait a moment for app to start
sleep 3

# Get app URL
APP_URL=$(databricks apps get "$APP_NAME" --output json 2>/dev/null | grep -o '"url": "[^"]*"' | cut -d'"' -f4)

echo ""
echo "✅ App deployed and started successfully!"
echo ""
echo "📋 App Details:"
echo "  Name: $APP_NAME"
if [ -n "$APP_URL" ]; then
    echo "  URL: ${APP_URL}/mcp/"
    echo ""
    echo "🔗 MCP Connection URL - use this in AI assistants:"
    echo "  ${APP_URL}/mcp/"
fi
echo ""
echo "📋 Next steps:"
echo "  1. Check app status: ./app_status.sh"
echo "  2. View logs in Databricks workspace: Apps → $APP_NAME → Logs"
echo "  3. Connect your AI assistant using the MCP URL above"
echo ""

