# Example - custom MCP server on Databricks Apps

This example shows how to create and launch a custom agent on Databricks Apps.
Please note that this example doesn't use any Databricks SDK, and is independent of the `mcp` package in the root dir of this repo.

## Prerequisites

- Databricks CLI installed and configured
- `uv`

## Local development

- run `uv` sync:

```bash
uv sync
```

- start the server locally. Changes will trigger a reload:

```bash
uvicorn custom_server.app:app --reload
```

## Deploying a custom MCP server on Databricks Apps (Workshop)

For the MCP Workshop, deployment is streamlined using the `databricks bundle` CLI.

### Prerequisites

Make sure you've completed the initial workshop setup by running `./setup.sh` from the root directory.
This creates your workshop catalog and configures authentication.

### Deployment Steps

1. **Navigate to the custom-mcp-template directory:**
   ```bash
   cd custom-mcp-template
   ```

2. **Build the Python wheel:**
   ```bash
   uv build --wheel
   ```
   This packages your MCP server and creates the `.build/` directory with all dependencies.

3. **Deploy to Databricks Apps:**
   ```bash
   unset DATABRICKS_AUTH_TYPE && databricks bundle deploy --var="participant_prefix=<your-prefix>"
   ```
   Replace `<your-prefix>` with your participant prefix (use dashes, not underscores).
   For example: `unset DATABRICKS_AUTH_TYPE && databricks bundle deploy --var="participant_prefix=amine-elhelo"`

   This creates an app named: `mcp-custom-server-<your-prefix>`

4. **Verify deployment:**
   ```bash
   databricks apps list | grep mcp-custom-server
   ```

### Important Notes

- **App naming:** The app name MUST start with `mcp-` to appear in the Databricks MCP playground
- **Naming restrictions:** App names can only contain lowercase letters, numbers, and dashes (no underscores or special characters)
- **Participant prefix:** You must pass your prefix via `--var="participant_prefix=your-prefix"` when deploying
- **Unique naming:** Each participant gets a unique app name to avoid conflicts in shared workspaces
- **Updates:** Just re-run `uv build --wheel` and the deploy command to update

### Troubleshooting

**If you see "App does not exist or is deleted" error:**
This happens when there's cached Terraform state referencing an old app name.
```bash
# Clear local state
rm -rf .databricks

# Clear remote workspace state
unset DATABRICKS_AUTH_TYPE && databricks workspace delete --recursive /Workspace/Users/<your-email>@databricks.com/.bundle/custom-mcp-server/dev/state/

# Then re-deploy
uv build --wheel
unset DATABRICKS_AUTH_TYPE && databricks bundle deploy --var="participant_prefix=<your-prefix>"
```

**If you see "auth type 'profile' not found" error:**
Your environment has conflicting auth settings. Always use:
```bash
unset DATABRICKS_AUTH_TYPE && databricks bundle deploy --var="participant_prefix=<your-prefix>"
```

**If you see "App name must contain only lowercase letters, numbers, and dashes" error:**
Your participant prefix contains underscores or special characters. Convert them to dashes:
```bash
# Example: if your prefix is "john_doe", use "john-doe" instead
unset DATABRICKS_AUTH_TYPE && databricks bundle deploy --var="participant_prefix=john-doe"
```

**To check app status:**
```bash
./app_status.sh
```

**To view logs:**
Visit Databricks workspace → Apps → your app → Logs

## Connecting to the MCP server

To connect to the MCP server, use the `Streamable HTTP` transport with the following URL:

```
https://your-app-url.usually.ends.with.databricksapps.com/mcp/
```

For authentication, you can use the `Bearer` token from your Databricks profile.
You can get the token by running the following command:

```bash
databricks auth token -p <name-of-your-profile>
```

Please note that the URL should end with `/mcp/` (including the trailing slash), as this is required for the server to work correctly.

Resources:
 *[Connect to a custom MCP Server](https://docs.databricks.com/aws/en/generative-ai/mcp/custom-mcp#connect-to-the-custom-mcp-server)
 *[Example notebook](https://docs.databricks.com/aws/en/generative-ai/mcp/custom-mcp#example-notebooks-build-an-agent-with-databricks-mcp-servers)