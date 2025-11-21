# Deployment Architecture

## Current Deployment Model

The workshop uses a **hybrid deployment** approach:

### 1. Workshop Frontend (Local Development)
- **Location**: `frontend/` directory
- **Technology**: Next.js with static export
- **Run**: `cd frontend && npm run dev`
- **Access**: http://localhost:3000
- **Purpose**: Interactive workshop content and instructions

### 2. Custom MCP Server (Databricks App)
- **Location**: `custom-mcp-template/` directory
- **Technology**: FastAPI MCP server + React client
- **Deployment**: Via `custom-mcp-template/deploy.sh` or bundle deploy
- **Access**: Databricks Apps (e.g., `databricks-mcp-john-doe`)
- **Purpose**: Hands-on custom MCP server for participants to learn from

### 3. Workshop Resources (Databricks)
- **Unity Catalog**: Created per participant (e.g., `mcp_workshop_john_doe`)
- **Sample Data**: Products, customers, sales tables
- **Jobs**: Setup and cleanup jobs defined in `databricks.yml`

## Deployment Commands

### Participant Setup (Recommended)
```bash
./setup.sh
```
This interactive script:
1. Collects participant information
2. Configures authentication
3. Deploys MCP server app via Databricks bundle
4. Creates Unity Catalog and sample data
5. Sets up local development environment

### Manual Deployment
```bash
# Deploy MCP server only
databricks bundle deploy -t dev \
  --var="participant_prefix=john_doe" \
  --var="workshop_catalog=mcp_workshop_john_doe" \
  --var="mcp_server_name=databricks-mcp-john-doe"

# Run setup jobs
databricks bundle run setup_workshop_resources -t dev
```

## Deprecated Files


## Why This Architecture?

1. **Better Development Experience**: Local Next.js dev server with hot reload
2. **Reduced Costs**: No need to run a Databricks App for static content
3. **Faster Iteration**: Participants can modify and test locally instantly
4. **Focus on MCP**: The deployed app is the actual MCP server participants build

## For Instructors

When setting up for a workshop:
1. Ensure all participants can run `npm` locally
2. Guide them through `./setup.sh`
3. Have them access the workshop at http://localhost:3000
4. Their MCP server will be deployed to Databricks Apps automatically
5. Use `./cleanup_workshop.sh` after the workshop to remove resources