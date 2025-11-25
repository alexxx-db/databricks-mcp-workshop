# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is **Prototyping with Confidence on Databricks** - an interactive learning environment that demonstrates MCP integration with Databricks. The workshop uses a Next.js frontend served by a Python FastAPI backend and is deployed as a Databricks App using Asset Bundles (DABS).

## Key Architecture

### Deployment Model
- **Frontend**: Next.js application with static export (`frontend/out/`)
- **Backend**: FastAPI server (`backend/app.py`) serves static files from `frontend/out/`
- **Deployment**: Databricks Asset Bundle (DABS) automates resource provisioning and app deployment
- **Multi-participant**: Each workshop participant gets isolated resources (catalog, app, MCP server)

### Resource Isolation Pattern
Resources are namespaced per participant using a cleaned username prefix:
- **Catalog**: `mcp_workshop_{prefix}` (e.g., `mcp_workshop_john_doe`)
- **App**: `mcp-workshop-app-{prefix}` (e.g., `mcp-workshop-app-john-doe`)
- **MCP Server**: `databricks-mcp-{prefix}`

### Authentication
Uses Databricks Apps built-in authentication:
- **User tokens**: Forwarded via `x-forwarded-access-token` header
- **Service principal**: Configured via `DATABRICKS_CLIENT_ID` and `DATABRICKS_CLIENT_SECRET` env vars
- **Permissions**: All operations respect Unity Catalog permissions

## Common Commands

### Development

```bash
# Run frontend locally
cd frontend
npm install
npm run dev  # Starts on http://localhost:3000

# Build frontend for deployment
npm run build  # Creates static export in frontend/out/

# Lint frontend
npm run lint
```

### Workshop Setup (Participant)

```bash
# Interactive setup script - creates isolated environment for each participant
./setup.sh

# This creates:
# - Personal Unity Catalog with sample data
# - Personal Databricks App instance
# - Custom MCP server configuration
# - Local development environment
```

### Databricks Deployment

```bash
# Participant setup (RECOMMENDED - interactive, creates all resources)
./setup.sh

# Manual deployment using Asset Bundle
databricks bundle deploy -t dev    # Development target (MCP server only)
databricks bundle deploy -t prod   # Production target

# Validate bundle configuration
databricks bundle validate

# Run setup jobs
databricks bundle run setup_workshop_resources -t dev
databricks bundle run cleanup_workshop_resources -t dev

# NOTE: ./deploy.sh is deprecated - workshop frontend now runs locally
```

### Workshop Cleanup (Instructor)

```bash
# List all workshop participants and their resources
./cleanup_workshop.sh --list

# Clean up specific participant
./cleanup_workshop.sh --participant john_doe

# Clean up ALL workshop resources (DESTRUCTIVE)
./cleanup_workshop.sh --all
```

## Code Structure

### Frontend (`frontend/`)
- **`src/app/`**: Next.js App Router pages
  - `page.tsx`: Workshop home/introduction
  - `managed-mcp/`: Section 1 - Databricks managed MCP servers
  - `external-mcp/`: Section 2 - External MCP integrations
  - `custom-mcp/`: Section 3 - Custom MCP server development
  - `local-ide/`: Section 4 - Local IDE integration
- **`src/components/`**: Reusable React components
  - `Sidebar.tsx`: Workshop navigation
  - `WorkshopStep.tsx`: Step-by-step instructions
  - `CodeBlock.tsx`: Syntax-highlighted code examples
  - `InfoBox.tsx`: Callouts and warnings

### Backend (`backend/`) - DEPRECATED
- **Status**: No longer deployed. Workshop frontend runs locally instead.
- **See**: `backend/README.md` for details on deprecation

### Setup Scripts (`setup/`)
Python notebooks run as Databricks Jobs to provision resources:
- **`create_workshop_catalog.py`**: Creates Unity Catalog and schemas
- **`setup_sample_data.py`**: Loads sample tables (products, customers, sales)
- **`cleanup_workshop_resources.py`**: Removes workshop resources

### Configuration
- **`databricks.yml`**: Main Asset Bundle configuration
  - Defines MCP server app (NOT workshop frontend)
  - Configures setup/cleanup jobs
  - Manages variables (catalog name, participant prefix)
  - Defines targets (dev, prod)
- **`setup.sh`**: Interactive participant onboarding script (RECOMMENDED)
- **`deploy.sh`**: DEPRECATED - see DEPLOY_NOTES.md
- **`cleanup_workshop.sh`**: Workshop resource cleanup script
- **`DEPLOY_NOTES.md`**: Current deployment architecture documentation

## Important Implementation Details

### Deployment Architecture (Updated)
The workshop now uses a **hybrid deployment** model:
1. **Workshop Frontend**: Runs locally via `npm run dev` (NOT deployed to Databricks Apps)
2. **Custom MCP Server**: Deployed to Databricks Apps (from `custom-mcp-template/`)
3. **Resources**: Unity Catalog, sample data (via Databricks bundle jobs)

See `DEPLOY_NOTES.md` for complete architecture details.

### Legacy Deployment (No Longer Used)
The `backend/` directory and `deploy.sh` script previously deployed the workshop frontend
as a Databricks App, but this is no longer the case. These files are kept for reference.

### Username Cleaning (setup.sh)
Usernames are cleaned for resource naming:
- Takes first part before `@` or `.`
- Converts to lowercase
- Replaces spaces/hyphens with underscores
- Removes special characters
- Example: `John.Doe@email.com` → `john_doe`

### Bundle Variables
Key variables in `databricks.yml`:
- `workshop_catalog`: Base catalog name (default: `mcp_workshop`)
- `app_name`: DEPRECATED - was for workshop app, no longer used
- `mcp_server_name`: MCP server app name (default: `databricks-mcp-workshop`)
- `participant_prefix`: Used for resource isolation (default: `default`)

## Workshop Content Sections

1. **Managed MCP Servers** (45 min): Unity Catalog functions, Vector Search, Genie Spaces
2. **External MCP Servers** (40 min): Unity Catalog connections, GitHub/Slack integrations
3. **Custom MCP Servers** (60 min): Building and deploying custom MCP servers as Databricks Apps
4. **Local IDE Integration** (30 min): Cursor IDE, Claude Desktop, VS Code MCP setup

## Development Notes

- Frontend development runs on `http://localhost:3000` with mock auth
- Production deployment uses Databricks Apps built-in authentication
- All workshop resources should use participant-specific prefixes to avoid conflicts
- The `deploy.sh` script hardcodes workspace path and app name - update for your environment
- Unity Catalog operations require appropriate permissions (CREATE CATALOG, etc.)
- Cleanup operations may require admin permissions for catalog deletion

## Troubleshooting

**Frontend not building**: Ensure `output: 'export'` is set in `next.config.mjs`

**App deployment fails**: Verify workspace path exists and you have app creation permissions

**Resource conflicts**: Check that participant prefixes are unique

**Authentication errors**: Ensure user authorization scopes are configured in `databricks.yml`

**Catalog permissions**: Verify Unity Catalog permissions for the workshop catalog