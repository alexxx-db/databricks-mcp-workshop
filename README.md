# Databricks MCP Workshop

Interactive workshop for learning how to build agents on Databricks with hands-on examples covering managed servers, external integrations, custom server development and local IDE setup.

## 🎓 Workshop Participant Setup

**For workshop participants** - Get your own isolated environment with one command:

```bash
git clone https://github.com/databricks-solutions/mcp-workshop
cd mcp-workshop
./setup.sh
```

This interactive setup creates your personal workshop environment:
- 🏗️ **Your own Unity Catalog** with sample data
- 🚀 **Custom MCP server** deployed as a Databricks App
- 💻 **Local development** environment
- 🔐 **Secure authentication** setup

Each participant gets isolated resources (e.g., `mcp_workshop_john_doe`) - no conflicts, no shared data issues!

👉 **[See detailed setup guide →](./WORKSHOP_SETUP.md)**

---
### Access the Workshop

After deployment, access the workshop locally:

1. Navigate to the frontend: `cd frontend`
2. Start the dev server: `npm run dev`
3. Visit **http://localhost:3000** to start the workshop

Your MCP server will be deployed as a Databricks App (check the Apps page)

## 📚 Workshop Content

### Section 1: Managed MCP Servers (45 min)
Learn to use Databricks-managed MCP servers with:
- Unity Catalog functions and permissions
- Vector Search for RAG applications  
- Genie Spaces for natural language SQL
- Automated vs Interactive modes

### Section 2: External MCP Servers (40 min)
Integrate third-party services:
- Unity Catalog connections
- GitHub, Atlassian, Slack integrations
- Custom API connections
- Proxy authentication and security

### Section 3: Custom MCP Servers (60 min)
Build and deploy your own:
- Simple `@mcp.tool()` decorator pattern (based on [databrickslabs/mcp](https://github.com/databrickslabs/mcp))
- Databricks SDK integration (clusters, warehouses, SQL)
- Markdown-based prompts for reusable commands
- **Databricks Apps deployment** with automated scripts
- End-to-end testing and debugging tools

### Section 4: Local IDE Integration (30 min)
Connect your development environment:
- Cursor IDE configuration
- Claude Desktop setup
- VS Code with MCP extensions
- OAuth and PAT authentication

## 🔐 Authentication Model

This workshop uses **Databricks Apps built-in authentication** exclusively:

- **User Authorization**: Your access token is automatically forwarded via `x-forwarded-access-token` header
- **App Authorization**: Service principal credentials via `DATABRICKS_CLIENT_ID` and `DATABRICKS_CLIENT_SECRET` environment variables
- **Unified Permissions**: All operations respect your existing Unity Catalog permissions
- **Zero Setup**: No manual token management or OAuth flows required

[Learn more about Databricks Apps authentication →](https://docs.databricks.com/aws/en/dev-tools/databricks-apps/auth)

## 🛠️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                 Databricks Workspace                        │
├─────────────────────────────────────────────────────────────┤
│  ┌─────────────────┐    ┌──────────────────────────────────┐ │
│  │  Local Dev      │    │         Unity Catalog           │ │
│  │  Frontend       │◄──►│  - mcp_workshop catalog         │ │
│  │  (Next.js)      │    │  - Sample data & schemas        │ │
│  │                 │    │  - Vector Search indexes       │ │
│  │  http://        │    │  - Genie Spaces                │ │
│  │  localhost:3000 │    └──────────────────────────────────┘ │
│  └─────────────────┘                                        │
│                         ┌──────────────────────────────────┐ │
│  ┌─────────────────┐    │       MCP Integrations          │ │
│  │  Setup Jobs     │    │  - Managed MCP servers          │ │
│  │  - Catalog      │    │  - External connections         │ │
│  │  - Sample data  │    │  - Custom MCP App (deployed)    │ │
│  │  - Vector index │    └──────────────────────────────────┘ │
│  └─────────────────┘                                        │
└─────────────────────────────────────────────────────────────┘
```

## 📁 Project Structure

```
mcp-workshop/
├── databricks.yml              # Bundle configuration
├── frontend/                   # Next.js workshop application (local dev)
│   ├── src/
│   │   ├── app/               # App router pages
│   │   └── components/        # React components
│   └── package.json
├── custom-mcp-template/        # Custom MCP server (deployed to Databricks Apps)
│   ├── server/                # FastAPI MCP server
│   ├── client/                # React client UI
│   └── deploy.sh              # Deployment script
└── setup/                      # Workshop setup jobs
    ├── create_workshop_catalog.py
    ├── setup_sample_data.py
    └── deploy_mcp_template.py
```

## 🎯 Learning Objectives

By the end of this workshop, you'll be able to:

- ✅ Use Databricks managed MCP servers in your applications
- ✅ Integrate external MCP servers via Unity Catalog connections
- ✅ Build and deploy custom MCP servers as Databricks Apps
- ✅ Implement proper authentication and authorization patterns
- ✅ Apply MCP best practices for production deployments
- ✅ Connect local IDEs to Databricks MCP resources  

## 🔧 Development

To run the workshop locally for development:

```bash
cd app
npm install
npm run dev
```

The app will run at `http://localhost:3000` with mock authentication for development.

## 📝 Customization

### Adding New Workshop Sections

1. Update `src/lib/workshop-config.ts` with new section definitions
2. Create component files in `src/components/workshop/sections/`
3. Add any required setup jobs to `databricks.yml`
4. Deploy with `databricks bundle deploy`

### Modifying Authentication Scopes

Update the `user_authorization.scopes` in `databricks.yml`:

```yaml
user_authorization:
  enabled: true
  scopes:
    - "sql"                    # SQL warehouse access
    - "files.files"           # File operations  
    - "dashboards.genie"      # Genie Spaces (add if needed)
    - "your-custom-scope"     # Additional scopes
```

## 🧹 Workshop Management

### Cleanup After Workshop (for workspace admins/instructors)

The workshop creates user-specific resources in the workspace that should be cleaned up afterwards:

```bash
# List all workshop participants
./cleanup_workshop.sh --list

# Clean up specific participant
./cleanup_workshop.sh --participant john_doe

# Clean up ALL workshop resources (⚠️ DESTRUCTIVE)
./cleanup_workshop.sh --all
```

### Monitor Workshop Usage

```bash
# View participant resources
./cleanup_workshop.sh --list

# Check catalog sizes
databricks sql query "SELECT catalog_name, SIZE_GB FROM information_schema.catalog_storage WHERE catalog_name LIKE 'mcp_workshop_%'"

# List workshop apps
databricks apps list | grep "mcp-workshop-app-"
```


## 🆘 Troubleshooting

### Common Issues

**App won't start**: Check that all required environment variables are set in the bundle configuration.

**Authentication errors**: Ensure user authorization is enabled and required scopes are configured.

**Resource access denied**: Verify Unity Catalog permissions for the workshop catalog and resources.

**Health check failing**: Check that the app is listening on port 3000 and `/api/health` endpoint responds.

**Setup script fails**: Ensure Databricks CLI is configured and you have catalog creation permissions.

### Getting Help

- Check the app logs in Databricks workspace
- Verify bundle deployment with `databricks bundle validate`
- Review [Databricks Apps documentation](https://docs.databricks.com/aws/en/dev-tools/databricks-apps/)
- For participant setup issues, see [WORKSHOP_SETUP.md](./WORKSHOP_SETUP.md)
- Submit issues to the workshop repository

## 🔀 Choosing Your MCP Approach

This workshop uses a simplified approach based on **[databrickslabs/mcp](https://github.com/databrickslabs/mcp)** - perfect for learning MCP fundamentals.

### This Workshop: databrickslabs/mcp
✅ **Simpler structure** - fewer files, easier to understand  
✅ **Focus on tool creation** - `@mcp.tool()` decorator pattern  
✅ **Officially supported** - maintained by Databricks Labs  
✅ **Quick deployment** - streamlined for Databricks Apps  

### Alternative: databricks-solutions Repository

For **Claude Code/Cursor users** wanting enhanced IDE integration:

**[databricks-solutions/custom-mcp-databricks-app](https://github.com/databricks-solutions/custom-mcp-databricks-app)**

Features:
- Enhanced IDE integration (Claude Code, Cursor)
- `.claude/commands` directory support
- FastMCP framework with routers
- Built-in MCP inspector
- More production-ready patterns

**💡 Recommendation:** Start with this workshop to learn the fundamentals. If you're a heavy Claude Code or Cursor user, explore the databricks-solutions repository as your next step!

## 📖 Additional Resources

- [databrickslabs/mcp Repository](https://github.com/databrickslabs/mcp) - Official examples
- [Databricks MCP Documentation](https://docs.databricks.com/mcp)
- [Model Context Protocol Specification](https://modelcontextprotocol.io)
- [Databricks Apps Guide](https://docs.databricks.com/dev-tools/databricks-apps)
- [FastMCP Documentation](https://fastmcp.org/)

## 📄 License

&copy; 2025 Databricks, Inc. All rights reserved. The source in this notebook is provided subject to the Databricks License [https://databricks.com/db-license-source]. All included or referenced third party libraries are subject to the licenses set forth below.

---

**Ready to learn?** Deploy the workshop and start exploring! 🚀