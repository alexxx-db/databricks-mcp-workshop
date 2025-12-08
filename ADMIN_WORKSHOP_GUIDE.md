# 🎓 MCP Workshop - Admin Setup Guide

This guide is for **workshop administrators** who want to pre-create resources for participants.

---

## When to Use This

| Scenario | Which Guide |
|----------|-------------|
| Participants have `CREATE CATALOG` permission | Use standard `./setup.sh` ([WORKSHOP_SETUP.md](./WORKSHOP_SETUP.md)) |
| **Admin pre-creates resources** | **Use this guide** |

---

## Quick Overview

| Step | Who | What |
|------|-----|------|
| 1 | **Admin** | Run `setup/admin_bulk_setup.py` notebook in Databricks |
| 2 | **Admin** | Share catalog name + schema assignments with participants |
| 3 | **Participants** | Follow [PARTICIPANT_QUICK_START.md](./PARTICIPANT_QUICK_START.md) |
| 4 | **Admin** | Cleanup after workshop |

---

## Admin Setup (Before Workshop)

### Prerequisites

- Databricks workspace admin access (or `CREATE CATALOG` permission)
- List of participant names and emails
- Access to run notebooks in the workspace

### Step 1.1: Prepare Participant List

Gather participant information in this format:
```
schema_name, email@company.com
```

**Schema naming rules:**
- Lowercase letters, numbers, underscores only
- No spaces, dashes, or special characters
- Keep it short (first name or username works well)

**Example list:**
```
john_doe, john.doe@acme.com
jane_smith, jane.smith@acme.com
bob_wilson, bob.wilson@acme.com
```

### Step 1.2: Run the Admin Setup Notebook

1. **Open Databricks Workspace**

2. **Navigate to the notebook:**
   - If you cloned the repo to workspace: `Repos > mcp-workshop > setup > admin_bulk_setup`
   - Or import `setup/admin_bulk_setup.py` from the repo

3. **Edit the configuration variables** at the top:

   ```python
   # Name your catalog (e.g., "customer_dec9_2025", "acme_mcp_workshop")
   CATALOG_NAME = "mcp_workshop_shared"
   
   # Paste your participant list
   PARTICIPANTS = """
   john_doe, john.doe@acme.com
   jane_smith, jane.smith@acme.com
   bob_wilson, bob.wilson@acme.com
   """
   
   # Set to True to grant permissions
   GRANT_PERMISSIONS = True
   ```

4. **Run All Cells**

   The notebook will:
   - Create the catalog (if it doesn't exist)
   - Create a schema for each participant
   - Load sample data (products, customers, sales) into each schema
   - Grant permissions to each participant's email

5. **Verify the output:**
   - Check that all schemas were created
   - Note any permission errors (users may need to log in first)

### Step 1.3: Share Information with Participants

Send each participant:

1. **The catalog name:** e.g., `customer_dec9_2025`
2. **Their schema name:** e.g., `john_doe`
3. **Link to the participant guide:** [PARTICIPANT_QUICK_START.md](./PARTICIPANT_QUICK_START.md)

**Example email/message:**
```
Hi [Name],

Your workshop environment is ready!

Catalog: customer_dec9_2025
Your Schema: john_doe

To get started:
1. Go to: https://github.com/databricks-solutions/mcp-workshop
2. Follow the PARTICIPANT_QUICK_START.md guide
3. Use the catalog and schema above when prompted

See you at the workshop!
```

---

## Participant Instructions

**Direct participants to:** [PARTICIPANT_QUICK_START.md](./PARTICIPANT_QUICK_START.md)

This standalone guide walks them through:
- Cloning the repo
- Creating their configuration files  
- Starting the workshop frontend
- Using their assigned schema throughout the workshop

---

## Admin Cleanup (After Workshop)

### Option A: Run Cleanup Cell in Notebook

Open `setup/admin_bulk_setup.py` and run the cleanup cell at the bottom:

```python
# Uncomment and run:
spark.sql(f"DROP CATALOG IF EXISTS {CATALOG_NAME} CASCADE")
```

### Option B: Manual SQL Cleanup

```sql
-- Drop the entire catalog and all contents
DROP CATALOG IF EXISTS mcp_workshop_shared CASCADE;
```

### Option C: Cleanup Individual Schemas

```sql
-- Drop specific participant schema
DROP SCHEMA IF EXISTS mcp_workshop_shared.john_doe CASCADE;
```

### Clean Up Custom MCP Apps

If participants deployed custom MCP servers, clean them up:

```bash
# List all workshop apps
databricks apps list | grep mcp-custom-server-

# Delete specific app
databricks apps delete mcp-custom-server-john-doe --yes
```

---

## Troubleshooting

### Participant Can't See Their Schema

1. Verify the admin ran the setup notebook with their email
2. Have them log into Databricks workspace (creates their account)
3. Re-run the permission grants in the notebook

### Permission Errors When Creating Functions

```
Error: User does not have CREATE FUNCTION on schema
```

**Solution:** Admin needs to grant `CREATE FUNCTION` permission:
```sql
GRANT CREATE FUNCTION ON SCHEMA mcp_workshop_shared.john_doe TO `john.doe@company.com`;
```

### Frontend Shows `mcp_workshop_<your_prefix>`

The `frontend/.env.local` file is missing or incorrect.

**Fix:**
```bash
cat > frontend/.env.local << 'EOF'
NEXT_PUBLIC_WORKSHOP_CATALOG=mcp_workshop_shared
NEXT_PUBLIC_WORKSHOP_SCHEMA=john_doe
EOF
```

Then restart the frontend: `npm run dev`

### Custom MCP Deploy Fails

```
Error: PARTICIPANT_PREFIX not set
```

**Fix:** Make sure root `.env.local` exists and is sourced:
```bash
source .env.local
echo $PARTICIPANT_PREFIX  # Should show your schema name
```

---

## Environment Variables Reference

### Root `.env.local` Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `WORKSHOP_CATALOG` | Catalog name for Unity Catalog resources | `mcp_workshop_shared` |
| `WORKSHOP_SCHEMA` | Your schema within the catalog | `john_doe` |
| `PARTICIPANT_NAME` | Display name | `john_doe` |
| `PARTICIPANT_PREFIX` | Used for resource naming | `john_doe` |
| `MCP_APP_NAME` | Custom MCP server app name | `mcp-custom-server-john-doe` |
| `CREATE_CATALOG` | Whether setup creates catalog | `false` (admin-managed) |

### Frontend `.env.local` Variables

| Variable | Purpose | Example |
|----------|---------|---------|
| `NEXT_PUBLIC_WORKSHOP_CATALOG` | Catalog name displayed in workshop UI | `mcp_workshop_shared` |
| `NEXT_PUBLIC_WORKSHOP_SCHEMA` | Schema name displayed in workshop UI | `john_doe` |

### Variables NOT Used in Admin-Managed Mode

These are only used when running `./setup.sh` in self-service mode:

- `DATABRICKS_AUTH_TYPE`
- `DATABRICKS_HOST` / `DATABRICKS_TOKEN`
- `DATABRICKS_CONFIG_PROFILE`

---

## Quick Reference

### Admin Checklist

```
BEFORE WORKSHOP:
1. Get participant list (names + emails)
2. Import setup/admin_bulk_setup.py into Databricks workspace
3. Edit CATALOG_NAME and PARTICIPANTS in the notebook
4. Run all cells
5. Share with participants:
   - Catalog name
   - Their schema name
   - Link to PARTICIPANT_QUICK_START.md

AFTER WORKSHOP:
1. Run cleanup cell in notebook, OR
2. SQL: DROP CATALOG <name> CASCADE
3. Clean up any deployed MCP apps
```

### Participant Guide

**See:** [PARTICIPANT_QUICK_START.md](./PARTICIPANT_QUICK_START.md)
