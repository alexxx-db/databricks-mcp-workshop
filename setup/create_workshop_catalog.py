# Databricks notebook source
# MAGIC %md
# MAGIC # Create or Verify Workshop Catalog
# MAGIC 
# MAGIC This notebook creates or verifies the Unity Catalog resources needed for the MCP workshop.
# MAGIC Handles both regular and serverless workspaces.

# COMMAND ----------

# MAGIC %python
import os

# Get parameters
catalog_name = dbutils.widgets.get("catalog_name") if "dbutils" in globals() else "mcp_workshop"
create_catalog = dbutils.widgets.get("create_catalog") if "dbutils" in globals() else "true"

print(f"Catalog: {catalog_name}")
print(f"Create if not exists: {create_catalog}")

# COMMAND ----------

# MAGIC %python
# Check if catalog exists
try:
    spark.sql(f"DESCRIBE CATALOG {catalog_name}")
    catalog_exists = True
    print(f"✅ Catalog '{catalog_name}' already exists")
except Exception as e:
    catalog_exists = False
    print(f"ℹ️  Catalog '{catalog_name}' does not exist")

# COMMAND ----------

# MAGIC %python
# Create catalog if needed and requested
if not catalog_exists and create_catalog == "true":
    print(f"📦 Creating catalog: {catalog_name}")
    try:
        spark.sql(f"""
            CREATE CATALOG IF NOT EXISTS {catalog_name}
            COMMENT 'Catalog for Prototyping with Confidence on Databricks Workshop'
        """)
        print(f"✅ Successfully created catalog: {catalog_name}")
    except Exception as e:
        error_msg = str(e)
        if "storage root URL does not exist" in error_msg or "INVALID_STATE" in error_msg:
            print("=" * 80)
            print("❌ ERROR: Serverless workspace detected!")
            print("=" * 80)
            print("")
            print("Your workspace requires a storage location for catalogs.")
            print("")
            print("📋 Options to fix this:")
            print("")
            print("  Option 1: Create catalog via Databricks UI")
            print("  ----------------------------------------")
            print(f"     1. Go to Data Explorer > Create Catalog")
            print(f"     2. Name it: {catalog_name}")
            print(f"     3. Select 'Unity Catalog Managed Storage'")
            print(f"     4. Then re-run: ./setup.sh")
            print("")
            print("  Option 2: Use an existing catalog")
            print("  ---------------------------------")
            print("     1. Re-run: ./setup.sh")
            print("     2. Choose option 2 (use existing catalog)")
            print("     3. Enter the name of your existing catalog")
            print("")
            print("=" * 80)
            raise Exception("Catalog creation failed - serverless workspace requires UI setup or existing catalog")
        else:
            print(f"❌ Failed to create catalog: {error_msg}")
            raise
elif not catalog_exists:
    print("=" * 80)
    print(f"❌ ERROR: Catalog '{catalog_name}' does not exist")
    print("=" * 80)
    print("")
    print("📋 Options to fix this:")
    print("")
    print("  1. Create the catalog via Databricks UI")
    print(f"     - Go to Data Explorer > Create Catalog")
    print(f"     - Name it: {catalog_name}")
    print("")
    print("  2. OR re-run setup and choose a different catalog")
    print("     - Run: ./setup.sh")
    print("")
    print("=" * 80)
    raise Exception(f"Catalog {catalog_name} not found")

# COMMAND ----------

# MAGIC %sql
-- Use the catalog and create default schema
USE CATALOG ${catalog_name};

CREATE SCHEMA IF NOT EXISTS default
COMMENT 'Default schema for workshop tables and functions';

USE SCHEMA default;

# COMMAND ----------

# MAGIC %python
print("=" * 80)
print(f"✅ Workshop catalog ready: {catalog_name}")
print(f"✅ Default schema created")
print("Ready for workshop setup!")
print("=" * 80)
