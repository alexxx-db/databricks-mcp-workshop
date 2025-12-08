# Databricks notebook source
# MAGIC %md
# MAGIC # Admin Bulk Workshop Setup
# MAGIC 
# MAGIC This notebook is for **workshop administrators** to create isolated environments for multiple participants.
# MAGIC 
# MAGIC **What this does:**
# MAGIC 1. Creates a shared workshop catalog
# MAGIC 2. Creates a separate schema for each participant
# MAGIC 3. Loads sample data (products, customers, sales) into each schema
# MAGIC 4. Grants appropriate permissions to each participant
# MAGIC 
# MAGIC **Run this ONCE before the workshop begins.**

# COMMAND ----------

# MAGIC %md
# MAGIC ## Configuration
# MAGIC 
# MAGIC Edit the variables below before running.

# COMMAND ----------

# CONFIGURATION - EDIT THESE VALUES!

# Name of the catalog to create (e.g., "customer_dec9_2025", "acme_workshop", etc.)
CATALOG_NAME = "mcp_workshop_shared"

# List of participants - one per line in format: schema_name, email
# Schema names should be lowercase with underscores (no spaces, no special chars)
# Email is used for granting permissions
PARTICIPANTS = """
john_doe, john.doe@example.com
jane_smith, jane.smith@example.com
bob_wilson, bob.wilson@example.com
"""

# Set to True to grant permissions (requires user accounts to exist)
# Set to False if you just want to create schemas/data without permissions
GRANT_PERMISSIONS = True

# COMMAND ----------

# MAGIC %md
# MAGIC ## Parse Participant List

# COMMAND ----------

def parse_participants(participants_text):
    """Parse the participant list into a structured format."""
    participant_list = []
    
    for line in participants_text.strip().split('\n'):
        line = line.strip()
        if not line or line.startswith('#'):
            continue
            
        parts = [p.strip() for p in line.split(',')]
        
        if len(parts) >= 2:
            schema_name = parts[0].lower().replace(' ', '_').replace('-', '_').replace('.', '_')
            email = parts[1]
        elif len(parts) == 1:
            schema_name = parts[0].lower().replace(' ', '_').replace('-', '_').replace('.', '_')
            email = None
        else:
            continue
            
        # Validate schema name (only lowercase letters, numbers, underscores)
        import re
        schema_name = re.sub(r'[^a-z0-9_]', '', schema_name)
        
        if schema_name:
            participant_list.append({
                'schema': schema_name,
                'email': email
            })
    
    return participant_list

# Parse and display
participant_list = parse_participants(PARTICIPANTS)

print(f"📋 Found {len(participant_list)} participants:")
print("-" * 50)
for p in participant_list:
    email_display = p['email'] if p['email'] else "(no email - permissions will be skipped)"
    print(f"  Schema: {p['schema']:20} | Email: {email_display}")
print("-" * 50)

# COMMAND ----------

# MAGIC %md
# MAGIC ## Create Catalog

# COMMAND ----------

# Create the catalog
try:
    spark.sql(f"DESCRIBE CATALOG {CATALOG_NAME}")
    print(f"✅ Catalog '{CATALOG_NAME}' already exists")
except:
    print(f"📦 Creating catalog: {CATALOG_NAME}")
    spark.sql(f"""
        CREATE CATALOG IF NOT EXISTS {CATALOG_NAME}
        COMMENT 'MCP Workshop Catalog - Admin Managed'
    """)
    print(f"✅ Created catalog: {CATALOG_NAME}")

# COMMAND ----------

# MAGIC %md
# MAGIC ## Create Schemas and Sample Data for Each Participant

# COMMAND ----------

def create_participant_environment(catalog_name, schema_name, email, grant_permissions):
    """Create schema, sample data, and permissions for one participant."""
    
    full_schema = f"{catalog_name}.{schema_name}"
    
    print(f"\n{'='*60}")
    print(f"Setting up: {schema_name}")
    print(f"{'='*60}")
    
    # Create schema
    spark.sql(f"""
        CREATE SCHEMA IF NOT EXISTS {full_schema}
        COMMENT 'Workshop schema for {schema_name}'
    """)
    print(f"  ✅ Schema created: {full_schema}")
    
    # Grant permissions if email provided and permissions enabled
    if grant_permissions and email:
        try:
            spark.sql(f"GRANT USE CATALOG ON CATALOG {catalog_name} TO `{email}`")
            spark.sql(f"GRANT USE SCHEMA ON SCHEMA {full_schema} TO `{email}`")
            spark.sql(f"GRANT CREATE TABLE ON SCHEMA {full_schema} TO `{email}`")
            spark.sql(f"GRANT CREATE FUNCTION ON SCHEMA {full_schema} TO `{email}`")
            spark.sql(f"GRANT SELECT, MODIFY ON SCHEMA {full_schema} TO `{email}`")
            print(f"  ✅ Permissions granted to: {email}")
        except Exception as e:
            print(f"  ⚠️  Permission grant issue (user may not exist yet): {str(e)[:100]}")
    elif not email:
        print(f"  ⏭️  Skipping permissions (no email provided)")
    else:
        print(f"  ⏭️  Skipping permissions (GRANT_PERMISSIONS=False)")
    
    # Create products table (100 rows)
    spark.sql(f"""
        CREATE OR REPLACE TABLE {full_schema}.products AS
        SELECT 
          concat('P', lpad(cast(id as string), 3, '0')) as product_id,
          concat('Product ', chr(65 + (id % 26)), id) as product_name,
          (array('Electronics', 'Clothing', 'Books', 'Home', 'Sports'))[int(floor(rand() * 5))] as category,
          round(rand() * 490 + 10, 2) as price,
          concat('High-quality product for ', 
                 (array('electronics', 'clothing', 'book', 'home', 'sports'))[int(floor(rand() * 5))],
                 ' enthusiasts') as description
        FROM range(1, 101) as t(id)
    """)
    print(f"  ✅ Created {full_schema}.products (100 rows)")
    
    # Create customers table (500 rows)
    spark.sql(f"""
        CREATE OR REPLACE TABLE {full_schema}.customers AS
        SELECT 
          concat('C', lpad(cast(id as string), 4, '0')) as customer_id,
          concat('Customer ', id) as customer_name,
          concat('customer', id, '@example.com') as email,
          (array('North', 'South', 'East', 'West'))[int(floor(rand() * 4))] as region,
          date_sub(current_date(), int(floor(rand() * 365))) as signup_date
        FROM range(1, 501) as t(id)
    """)
    print(f"  ✅ Created {full_schema}.customers (500 rows)")
    
    # Create sales table (1000 rows)
    spark.sql(f"""
        CREATE OR REPLACE TABLE {full_schema}.sales AS
        SELECT 
          concat('S', lpad(cast(id as string), 5, '0')) as sale_id,
          concat('C', lpad(cast(int(floor(rand() * 500 + 1)) as string), 4, '0')) as customer_id,
          concat('P', lpad(cast(int(floor(rand() * 100 + 1)) as string), 3, '0')) as product_id,
          int(floor(rand() * 4 + 1)) as quantity,
          date_sub(current_date(), int(floor(rand() * 90))) as sale_date,
          round(rand() * 980 + 20, 2) as revenue
        FROM range(1, 1001) as t(id)
    """)
    print(f"  ✅ Created {full_schema}.sales (1000 rows)")
    
    return True

# COMMAND ----------

# Create environment for each participant
success_count = 0
for participant in participant_list:
    try:
        create_participant_environment(
            CATALOG_NAME, 
            participant['schema'], 
            participant['email'],
            GRANT_PERMISSIONS
        )
        success_count += 1
    except Exception as e:
        print(f"  ❌ Failed to setup {participant['schema']}: {e}")

print(f"\n{'='*60}")
print(f"✅ SETUP COMPLETE!")
print(f"Successfully created {success_count}/{len(participant_list)} participant environments")
print(f"Catalog: {CATALOG_NAME}")
print(f"{'='*60}")

# COMMAND ----------

# MAGIC %md
# MAGIC ## Verification

# COMMAND ----------

# Show all schemas created
print(f"Schemas in {CATALOG_NAME}:")
display(spark.sql(f"SHOW SCHEMAS IN {CATALOG_NAME}"))

# COMMAND ----------

# Verify row counts for each participant
print("Table row counts per participant:")
verification_data = []

for participant in participant_list:
    schema = participant['schema']
    full_schema = f"{CATALOG_NAME}.{schema}"
    try:
        products_count = spark.sql(f"SELECT count(*) FROM {full_schema}.products").collect()[0][0]
        customers_count = spark.sql(f"SELECT count(*) FROM {full_schema}.customers").collect()[0][0]
        sales_count = spark.sql(f"SELECT count(*) FROM {full_schema}.sales").collect()[0][0]
        verification_data.append((schema, products_count, customers_count, sales_count, "✅"))
    except Exception as e:
        verification_data.append((schema, 0, 0, 0, f"❌ {str(e)[:50]}"))

verification_df = spark.createDataFrame(verification_data, 
    ["participant", "products", "customers", "sales", "status"])
display(verification_df)

# COMMAND ----------

# MAGIC %md
# MAGIC ## Participant Information to Share
# MAGIC 
# MAGIC Copy and share this information with each participant:

# COMMAND ----------

print("=" * 70)
print("SHARE THIS WITH PARTICIPANTS")
print("=" * 70)
print(f"\nWorkshop Catalog: {CATALOG_NAME}")
print("\nEach participant should use THEIR schema name in the workshop:")
print("-" * 70)
for p in participant_list:
    print(f"  {p['email'] if p['email'] else 'Participant'}: {CATALOG_NAME}.{p['schema']}")
print("-" * 70)
print("\nParticipants should create frontend/.env.local with:")
print(f"  NEXT_PUBLIC_WORKSHOP_CATALOG={CATALOG_NAME}")
print("=" * 70)

# COMMAND ----------

# MAGIC %md
# MAGIC ## Cleanup (Run AFTER Workshop)
# MAGIC 
# MAGIC **⚠️ WARNING: This will delete ALL workshop data!**
# MAGIC 
# MAGIC Uncomment and run the cell below only when you want to clean up.

# COMMAND ----------

# CLEANUP - UNCOMMENT TO DELETE EVERYTHING
# print(f"🧹 Deleting catalog {CATALOG_NAME} and all contents...")
# spark.sql(f"DROP CATALOG IF EXISTS {CATALOG_NAME} CASCADE")
# print(f"✅ Deleted catalog {CATALOG_NAME}")

