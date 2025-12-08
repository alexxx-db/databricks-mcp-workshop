# 🚀 MCP Workshop - Participant Quick Start

**Your workshop admin has already set up your environment!** Follow these steps to get started.

---

## What You Need From Your Admin

Before starting, get this info from your workshop admin:

| Info | Example | Your Value |
|------|---------|------------|
| **Catalog Name** | `customer_dec9_2025` | _____________ |
| **Your Schema Name** | `john_doe` | _____________ |

---

## Setup (5 Minutes)

### Step 1: Clone the Repository

```bash
git clone https://github.com/databricks-solutions/mcp-workshop
cd mcp-workshop
```

### Step 2: Authenticate to Databricks

```bash
# Replace with your workspace URL
databricks auth login --host https://YOUR-WORKSPACE.cloud.databricks.com

# Verify it works
databricks current-user me
```

### Step 3: Create Configuration Files

Create **two** files with your workshop details.

#### File 1: `mcp-workshop/.env.local` (in the repo root)

```bash
# Replace YOUR_CATALOG and YOUR_SCHEMA with values from your admin
cat > .env.local << 'EOF'
WORKSHOP_CATALOG=YOUR_CATALOG
WORKSHOP_SCHEMA=YOUR_SCHEMA
PARTICIPANT_NAME=YOUR_SCHEMA
PARTICIPANT_PREFIX=YOUR_SCHEMA
MCP_APP_NAME=mcp-custom-server-YOUR_SCHEMA
CREATE_CATALOG=false
EOF
```

**Example** (catalog=`customer_dec9_2025`, schema=`john_doe`):
```bash
cat > .env.local << 'EOF'
WORKSHOP_CATALOG=customer_dec9_2025
WORKSHOP_SCHEMA=john_doe
PARTICIPANT_NAME=john_doe
PARTICIPANT_PREFIX=john_doe
MCP_APP_NAME=mcp-custom-server-john-doe
CREATE_CATALOG=false
EOF
```

#### File 2: `mcp-workshop/frontend/.env.local`

```bash
# Replace YOUR_CATALOG and YOUR_SCHEMA with values from your admin
cat > frontend/.env.local << 'EOF'
NEXT_PUBLIC_WORKSHOP_CATALOG=YOUR_CATALOG
NEXT_PUBLIC_WORKSHOP_SCHEMA=YOUR_SCHEMA
EOF
```

**Example** (catalog=`customer_dec9_2025`, schema=`john_doe`):
```bash
cat > frontend/.env.local << 'EOF'
NEXT_PUBLIC_WORKSHOP_CATALOG=customer_dec9_2025
NEXT_PUBLIC_WORKSHOP_SCHEMA=john_doe
EOF
```

### Step 4: Start the Workshop

```bash
cd frontend
npm install
npm run dev
```

Open **http://localhost:3000** in your browser.

---

## ⚠️ Important: Using YOUR Schema

The workshop shows examples like:
```sql
mcp_workshop_<your_prefix>.default.products
```

**You should use YOUR catalog and schema instead:**
```sql
YOUR_CATALOG.YOUR_SCHEMA.products
```

### Example Substitutions

| Workshop Shows | You Type |
|---------------|----------|
| `mcp_workshop_<your_prefix>` | `customer_dec9_2025` (your catalog) |
| `.default.` | `.john_doe.` (your schema) |
| `mcp_workshop_<your_prefix>.default.products` | `customer_dec9_2025.john_doe.products` |

### Your Tables

Your sample data is already loaded:
- `YOUR_CATALOG.YOUR_SCHEMA.products` (100 rows)
- `YOUR_CATALOG.YOUR_SCHEMA.customers` (500 rows)
- `YOUR_CATALOG.YOUR_SCHEMA.sales` (1000 rows)

---

## Workshop Sections

| Section | What You'll Do |
|---------|---------------|
| **1. Managed MCP** | Create Unity Catalog functions, use Genie spaces |
| **2. External MCP** | Connect to external MCP servers (GitHub, etc.) |
| **3. Custom MCP** | Build and deploy your own MCP server |
| **4. Local IDE** | Set up local development tools |

---

## Section-Specific Notes

### Section 1: Managed MCP - Creating Functions

When creating Unity Catalog functions, use YOUR catalog and schema:

```sql
-- Workshop example shows:
CREATE FUNCTION mcp_workshop_<your_prefix>.default.get_customer_orders(...)

-- You type (with your actual catalog/schema):
CREATE FUNCTION customer_dec9_2025.john_doe.get_customer_orders(...)
```

### Section 3: Custom MCP - Deploying Your Server

When you reach the Custom MCP section:

```bash
cd custom-mcp-template

# Load your config
source ../.env.local

# Verify your prefix is set
echo "Your prefix: $PARTICIPANT_PREFIX"

# Deploy (only when instructed in the workshop)
./deploy.sh
```

---

## Troubleshooting

### "Command not found: databricks"

Install the Databricks CLI: https://docs.databricks.com/dev-tools/cli/install.html

### "npm: command not found"

Install Node.js: https://nodejs.org/

### Frontend shows wrong catalog name

Check that `frontend/.env.local` exists and has the correct catalog:
```bash
cat frontend/.env.local
```

Should show:
```
NEXT_PUBLIC_WORKSHOP_CATALOG=customer_dec9_2025
```

### "Permission denied" errors in Databricks

Contact your workshop admin - they may need to re-run permissions for your account.

---

## Quick Reference

```
Your Catalog:  ____________________
Your Schema:   ____________________

Your Tables:
  - <catalog>.<schema>.products
  - <catalog>.<schema>.customers
  - <catalog>.<schema>.sales

Workshop URL: http://localhost:3000
```

---

**Questions?** Ask your workshop facilitator! 🙋

