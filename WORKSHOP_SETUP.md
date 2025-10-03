# 🎓 Databricks MCP Workshop Setup

Welcome to the Databricks Model Context Protocol (MCP) Workshop! This interactive setup will create your personal workshop environment with isolated resources.

## 🚀 Quick Start for Participants

### Prerequisites
- Access to a Databricks workspace
- A Databricks Personal Access Token OR configured profile
- Git and basic command line familiarity

### One-Command Setup
```bash
git clone [<your-workshop-repo>](https://github.com/databricks-solutions/mcp-workshop/)
cd mcp-workshop
./setup.sh
```

That's it! The script will:
- ✅ Install required dependencies automatically
- ✅ Set up your authentication
- ✅ Create your personal Unity Catalog with sample data
- ✅ Deploy your own Databricks App instance
- ✅ Configure your local development environment
- ✅ Set up your custom MCP server

## 🎯 What You Get

Each participant gets their own isolated environment:

### Your Personal Resources
```
Participant: john_doe
├── Unity Catalog: mcp_workshop_john_doe
│   └── Schema: default
│       ├── products (sample data)
│       ├── customers (sample data)
│       └── sales (sample data)
├── Databricks App: mcp-workshop-app-john-doe
│   └── Interactive workshop interface
├── MCP Server: databricks-mcp-john-doe
│   └── Custom SQL tools
└── Local Development Environment
    └── Connected to your resources
```

### Resource Naming Convention
- **Prefix**: Your username (cleaned: lowercase, underscores only)
- **Catalog**: `mcp_workshop_{your_prefix}`
- **App**: `mcp-workshop-app-{your_prefix}`
- **MCP Server**: `databricks-mcp-{your_prefix}`

## 🔧 Setup Process

The setup script walks you through:

1. **👤 Identity Setup**: Choose your workshop username
2. **🔐 Authentication**: Configure Databricks access (PAT or profile)
3. **⚙️ Resource Creation**: Deploy your personal environment
4. **🚀 Application Setup**: Configure local development
5. **🎉 Ready to Learn**: Start the workshop!

## 📁 Generated Files

After setup, you'll have:
- `.env.local` - Your workshop configuration
- `databricks.{prefix}.yml` - Your personal DABS config
- `frontend/.env.local` - Frontend configuration

## 🎮 Using Your Workshop

### Start Local Development
```bash
cd frontend
npm run dev
# Visit: http://localhost:3000
```

### Access Your Databricks App
Check the Databricks Apps page for: `mcp-workshop-app-{your_prefix}`

### Workshop Sections
1. **Managed MCP** - Use built-in Unity Catalog functions
2. **External MCP** - Connect to external MCP servers
3. **Custom MCP** - Build your own MCP server
4. **Local IDE** - Integrate with development tools

## 🧹 Cleanup (For Instructors)

### List All Participants
```bash
./cleanup_workshop.sh --list
```

### Clean Up Specific Participant
```bash
./cleanup_workshop.sh --participant john_doe
```

### Clean Up All Resources (⚠️ DESTRUCTIVE)
```bash
./cleanup_workshop.sh --all
```

## 🔍 Troubleshooting

### Authentication Issues
```bash
# Refresh your Databricks token
databricks auth login

# Test connection
databricks current-user me
```

### Resource Creation Failed
```bash
# Check DABS status
databricks bundle validate -t dev

# Re-run resource setup
databricks bundle run setup_resources -t dev
```

### Frontend Issues
```bash
# Reinstall dependencies
cd frontend
rm -rf node_modules package-lock.json
npm install
```

### Permission Issues
- Make sure you have `CREATE CATALOG` permissions in Databricks
- Some organizations require admin approval for new catalogs
- Contact your Databricks admin if needed

## 💡 Tips for Success

### For Participants
- Use a simple, unique username (your first name or initials work great)
- Keep your PAT secure and don't share it
- If something breaks, just run `./setup.sh` again - it's safe to re-run
- Ask for help early and often!

### For Instructors
- Test the setup in your workspace before the workshop
- Have backup PATs ready for participants who need help
- Use `./cleanup_workshop.sh --list` to monitor participant progress
- Consider pre-creating some resources for large workshops

## 🎯 Workshop Objectives

By the end of this workshop, you'll understand:
- What MCP (Model Context Protocol) is and why it matters
- How to use Databricks' managed MCP functions
- How to integrate external MCP servers
- How to build and deploy custom MCP servers
- How to integrate MCP with local development workflows

## 🤝 Support

Need help?
- Check the troubleshooting section above
- Ask your instructor or workshop facilitator
- Review the workshop frontend at http://localhost:3000
- Check your Databricks workspace for deployed resources

---

**Happy Learning with Databricks MCP! 🚀**
