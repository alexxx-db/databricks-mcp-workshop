import WorkshopStep from "@/components/WorkshopStep";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";

export default function CustomMcpPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 text-4xl text-white shadow-lg">
              🛠️
            </div>
            <div>
              <h1 className="text-5xl font-bold text-slate-900 mb-2">Build Your Custom MCP Server</h1>
              <p className="text-xl text-slate-600">Start with a clean databrickslabs/mcp template</p>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-200 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">✨ What You're Building</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-4">
              Your workshop setup created <code className="bg-green-200 px-1.5 py-0.5 rounded font-mono">custom-mcp-template/</code> - a clean MCP server 
              based on <a href="https://github.com/databrickslabs/mcp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">databrickslabs/mcp</a>.
              You'll learn to extend it with Databricks capabilities!
            </p>
            <ul className="space-y-2 text-slate-700">
              <li>• 📦 <strong>Already set up for you</strong> - ready to explore and modify</li>
              <li>• 🎯 Uses simple <code className="bg-green-100 px-1 py-0.5 rounded text-sm">@mcp.tool()</code> decorator pattern</li>
              <li>• 🚀 Includes everything needed for Databricks Apps deployment</li>
              <li>• 🔨 You'll add Databricks SDK features in this workshop!</li>
            </ul>
          </div>

          <InfoBox type="info" title="Learning by Doing">
            <p>This workshop teaches you to build MCP servers by <strong>starting simple and adding features incrementally</strong>. 
            You'll understand not just what each piece does, but WHY it's there and how to customize it for your needs.</p>
          </InfoBox>
        </div>

        <WorkshopStep number={1} title="Understand Your MCP Server Structure">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              The workshop setup created <code className="bg-orange-200 px-1.5 py-0.5 rounded font-mono">custom-mcp-template/</code> for you. 
              Let's understand what each file does and how they work together:
            </p>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200 mb-4">
              <p className="text-sm text-slate-700">
                <strong>💡 Pro Tip:</strong> Open the <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">custom-mcp-template/</code> folder 
                in your code editor while following along. You'll be editing these files!
              </p>
            </div>

            <CodeBlock
              language="bash"
              title="Project Structure"
              code={`custom-mcp-template/
├── src/
│   └── custom_server/
│       ├── app.py              # Main MCP server file
│       ├── main.py             # Entry point for local dev
│       ├── __init__.py
│       └── static/
│           └── index.html      # Landing page
├── hooks/
│   └── apps_build.py           # Databricks Apps build hook
├── app.yaml                    # App configuration
├── databricks.yml              # Bundle configuration
├── pyproject.toml              # Python dependencies
└── README.md                   # Documentation`}
            />

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">🎯 Key Files You'll Modify</h3>
              <div className="space-y-4 text-slate-700">
                <div>
                  <p className="font-bold">src/custom_server/app.py</p>
                  <p className="text-sm">This is YOUR canvas! Add MCP tools here using the <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">@mcp.tool()</code> decorator. 
                  Each tool becomes callable by AI assistants connected to your server.</p>
                </div>
                <div>
                  <p className="font-bold">pyproject.toml</p>
                  <p className="text-sm">Manages Python dependencies. When you need new libraries (like <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">databricks-sdk</code>), 
                  you'll add them here.</p>
                </div>
                <div>
                  <p className="font-bold">databricks.yml</p>
                  <p className="text-sm">Tells Databricks how to deploy your MCP server as an App. You'll customize the app name and settings here.</p>
                </div>
                <div>
                  <p className="font-bold">app.yaml</p>
                  <p className="text-sm">Specifies the command that runs your server inside the Databricks App container.</p>
                </div>
              </div>
            </div>
          </div>
        </WorkshopStep>

        <WorkshopStep number={2} title="Examine the Simple MCP Server">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Open <code className="bg-orange-200 px-1.5 py-0.5 rounded font-mono">custom-mcp-template/src/custom_server/app.py</code> and you'll see a clean, minimal MCP server:
            </p>

            <CodeBlock
              language="python"
              title="src/custom_server/app.py - Current State"
              code={`from pathlib import Path
from mcp.server.fastmcp import FastMCP
from fastapi import FastAPI
from fastapi.responses import FileResponse

STATIC_DIR = Path(__file__).parent / "static"

# Create an MCP server
mcp = FastMCP("Custom MCP Server on Databricks Apps")


# Add an addition tool
@mcp.tool()
def add(a: int, b: int) -> int:
    """Add two numbers"""
    return a + b


# Add a dynamic greeting resource
@mcp.resource("greeting://{name}")
def get_greeting(name: str) -> str:
    """Get a personalized greeting"""
    return f"Hello, {name}!"


mcp_app = mcp.streamable_http_app()

app = FastAPI(
    lifespan=lambda _: mcp.session_manager.run(),
)


@app.get("/", include_in_schema=False)
async def serve_index():
    return FileResponse(STATIC_DIR / "index.html")


app.mount("/", mcp_app)`}
            />

            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">📚 Understanding the Code</h3>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• <code className="bg-purple-100 px-1 py-0.5 rounded text-xs">FastMCP(...)</code> creates the MCP server instance</li>
                <li>• <code className="bg-purple-100 px-1 py-0.5 rounded text-xs">@mcp.tool()</code> decorator registers a callable tool</li>
                <li>• <code className="bg-purple-100 px-1 py-0.5 rounded text-xs">@mcp.resource(...)</code> registers dynamic resources</li>
                <li>• <code className="bg-purple-100 px-1 py-0.5 rounded text-xs">mcp.streamable_http_app()</code> creates HTTP transport</li>
                <li>• FastAPI app mounts the MCP app and serves static files</li>
              </ul>
            </div>
          </div>
        </WorkshopStep>

        <WorkshopStep number={3} title="Run Locally">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Let's run the MCP server locally to see it in action. We'll use <code className="bg-orange-100 px-1 py-0.5 rounded text-sm">uv</code> to manage dependencies and run the server.
            </p>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">📦 First Time? Install UV</h3>
              <p className="text-sm text-slate-700 mb-3">
                If you don't have <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">uv</code> installed yet, run one of these:
              </p>
              <CodeBlock
                language="bash"
                code={`# macOS/Linux
curl -LsSf https://astral.sh/uv/install.sh | sh

# or via Homebrew
brew install uv

# or via pip
pip install uv`}
              />
              <details className="mt-3">
                <summary className="cursor-pointer text-sm font-semibold text-slate-700 hover:text-slate-900">
                  What is UV? (click to expand)
                </summary>
                <div className="mt-2 text-sm text-slate-600 space-y-2">
                  <p>
                    UV is a fast Python package manager (like pip + virtualenv, but way faster). 
                    It handles dependencies and environments automatically.
                  </p>
                  <ul className="ml-4 space-y-1">
                    <li>• <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">uv sync</code> creates <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">.venv</code> and installs dependencies</li>
                    <li>• <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">uv run</code> runs commands in that environment (no manual activation!)</li>
                  </ul>
                </div>
              </details>
            </div>

            <CodeBlock
              language="bash"
              title="Local Development"
              code={`# Navigate to the template directory
cd custom-mcp-template

# Install dependencies (creates .venv virtual environment)
uv sync

# Start the server (with hot-reload)
uv run uvicorn custom_server.app:app --reload --host 0.0.0.0 --port 8000`}
            />

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm font-semibold text-slate-900 mb-2">✅ Success looks like this:</p>
              <CodeBlock
                language="text"
                code={`✅ Loaded prompt: analyze_workspace
✅ Loaded prompt: check_clusters
✅ Loaded prompt: query_workshop_data
📋 Loaded 3 prompt(s) from .../prompts
INFO:     Uvicorn running on http://0.0.0.0:8000 (Press CTRL+C to quit)
INFO:     Started reloader process`}
              />
            </div>

            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <p className="text-sm text-slate-700">
                <strong>💡 Why <code className="bg-yellow-100 px-1 py-0.5 rounded text-xs">uv run</code>?</strong> It automatically uses the virtual environment created by <code className="bg-yellow-100 px-1 py-0.5 rounded text-xs">uv sync</code>. 
                No need to manually activate it!
              </p>
            </div>

            <InfoBox type="success" title="Test It Out">
              <p className="mb-2">Open <strong>http://localhost:8000</strong> in your browser to see the landing page.</p>
              <p className="text-sm">The MCP endpoint at <code className="bg-emerald-100 px-1 py-0.5 rounded text-xs">/mcp/</code> is ready to accept MCP protocol requests!</p>
            </InfoBox>
          </div>
        </WorkshopStep>

        <WorkshopStep number={4} title="Deploy to Databricks Apps">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Now let's deploy this clean MCP server to Databricks Apps. You can use the automated script or deploy manually:
            </p>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">🚀 Option 1: Automated Deployment (Recommended)</h3>
              <p className="text-slate-700 mb-4">
                The easiest way to deploy is using the included <code className="bg-blue-100 px-1 py-0.5 rounded text-sm">deploy.sh</code> script,
                which handles everything automatically:
              </p>
              <CodeBlock
                language="bash"
                title="Terminal - Automated deployment"
                code={`# Navigate to custom-mcp-template directory
cd custom-mcp-template

# Load your participant prefix from setup
source ../.env.local

# Run the deploy script (builds, deploys, and starts the app)
./deploy.sh

# The script will:
# 1. Build the Python wheel
# 2. Deploy to Databricks with your unique prefix
# 3. Start the app automatically
# 4. Display your MCP connection URL`}
              />
              <div className="bg-blue-100 rounded-lg p-3 mt-3">
                <p className="text-sm text-slate-700">
                  <strong>✨ The script automatically:</strong> Converts underscores to dashes in your prefix,
                  handles authentication, and provides the MCP endpoint URL when done!
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">⚙️ Option 2: Manual Deployment</h3>
              <p className="text-slate-700 mb-4">
                For more control, you can deploy manually step-by-step:
              </p>
              <CodeBlock
                language="bash"
                title="Terminal - Manual deployment"
                code={`cd custom-mcp-template

# 1. Load your participant prefix
source ../.env.local
echo "Participant prefix: $PARTICIPANT_PREFIX"

# 2. Build the Python wheel
uv build --wheel

# 3. Deploy with bundle (converts underscores to dashes automatically)
# Note: App names can only contain lowercase letters, numbers, and dashes
unset DATABRICKS_AUTH_TYPE
CLEAN_PREFIX=$(echo "$PARTICIPANT_PREFIX" | tr '_' '-')
databricks bundle deploy --var="participant_prefix=$CLEAN_PREFIX"

# 4. Start the app
databricks apps start "mcp-custom-server-$CLEAN_PREFIX"

# 5. Get the app URL
databricks apps get "mcp-custom-server-$CLEAN_PREFIX" | grep url`}
              />
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">🔧 What Just Happened?</h3>
              <ol className="space-y-2 text-sm text-slate-700 ml-4">
                <li>1. <code className="bg-yellow-100 px-1 py-0.5 rounded text-xs">uv build --wheel</code> packaged your app into a Python wheel</li>
                <li>2. The build hook created a <code className="bg-yellow-100 px-1 py-0.5 rounded text-xs">.build/</code> directory with dependencies</li>
                <li>3. Your participant prefix was cleaned (underscores → dashes) for app naming</li>
                <li>4. <code className="bg-yellow-100 px-1 py-0.5 rounded text-xs">databricks bundle deploy</code> created your app with unique name</li>
                <li>5. <code className="bg-yellow-100 px-1 py-0.5 rounded text-xs">databricks apps start</code> started the app compute</li>
                <li>6. Your MCP server is now running 24/7 as a Databricks App!</li>
              </ol>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">⚠️ Troubleshooting Common Issues</h3>
              <div className="space-y-4 text-sm text-slate-700">
                <div>
                  <p className="font-bold">Error: "auth type 'profile' not found"</p>
                  <p>Your environment has conflicting auth settings. Always unset DATABRICKS_AUTH_TYPE before deploying:</p>
                  <code className="bg-red-100 px-2 py-1 rounded text-xs block mt-1">unset DATABRICKS_AUTH_TYPE && databricks bundle deploy ...</code>
                </div>
                <div>
                  <p className="font-bold">Error: "App name must contain only lowercase letters, numbers, and dashes"</p>
                  <p>Your prefix contains underscores. The deploy script handles this automatically, or manually convert:</p>
                  <code className="bg-red-100 px-2 py-1 rounded text-xs block mt-1">CLEAN_PREFIX=$(echo "$PARTICIPANT_PREFIX" | tr '_' '-')</code>
                </div>
                <div>
                  <p className="font-bold">Error: "App does not exist or is deleted"</p>
                  <p>Stale Terraform state. Clear it and redeploy:</p>
                  <code className="bg-red-100 px-2 py-1 rounded text-xs block mt-1">rm -rf .databricks && ./deploy.sh</code>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-4">
                💡 See <code className="bg-red-100 px-1 py-0.5 rounded text-xs">README.md</code> for detailed troubleshooting steps.
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">✅ Deployment Success</h3>
              <p className="text-slate-700 mb-3">After deployment completes, you'll see:</p>
              <CodeBlock
                language="text"
                code={`✅ App started successfully!

📋 App Details:
  Name: mcp-custom-server-your-prefix
  URL: https://mcp-custom-server-your-prefix-xxxxx.aws.databricksapps.com/mcp/

🔗 MCP Connection URL (use this in AI assistants):
  https://mcp-custom-server-your-prefix-xxxxx.aws.databricksapps.com/mcp/`}
              />
              <p className="text-sm text-slate-600 mt-3">
                <strong>Save that MCP URL!</strong> You'll use it to connect Claude Desktop, Cursor IDE, or other AI assistants.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">💡 Local vs Production: Different Commands</h3>
              <div className="space-y-3 text-sm text-slate-700">
                <div>
                  <p className="font-bold">Local Development (uses UV):</p>
                  <code className="bg-blue-100 px-2 py-1 rounded text-xs block mt-1">uv run uvicorn custom_server.app:app --reload</code>
                  <p className="text-xs mt-1 text-slate-600">UV manages the virtual environment and dependencies for you locally.</p>
                </div>
                <div>
                  <p className="font-bold">Production on Databricks Apps (no UV needed):</p>
                  <code className="bg-blue-100 px-2 py-1 rounded text-xs block mt-1">uvicorn custom_server.app:app --host 0.0.0.0 --port 8000</code>
                  <p className="text-xs mt-1 text-slate-600">
                    Dependencies are already installed from the wheel. This is configured in <code className="bg-blue-50 px-1 rounded">app.yaml</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </WorkshopStep>

        <WorkshopStep number={5} title="Examine the Databricks SDK Tools">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Great news! Your MCP server template already includes powerful Databricks SDK tools. Let's examine them to understand 
              the patterns for building MCP tools that query Databricks resources.
            </p>

            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">🎯 What You'll Learn</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• How the Databricks SDK is already integrated as a dependency</li>
                <li>• The pattern for creating MCP tools that call Databricks APIs</li>
                <li>• How authentication works (spoiler: it's automatic in Databricks Apps!)</li>
                <li>• Best practices for tool design: clear names, good docstrings, error handling</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-slate-900">The Databricks SDK Dependency</h3>
            <p className="text-slate-700">
              Open <code className="bg-orange-200 px-1.5 py-0.5 rounded font-mono">pyproject.toml</code> and you'll see <code className="bg-orange-100 px-1 py-0.5 rounded text-sm">databricks-sdk</code> already in the dependencies:
            </p>

            <CodeBlock
              language="toml"
              title="pyproject.toml - Already configured"
              code={`[project]
name = "custom-server"
version = "0.1.0"
requires-python = ">=3.11"
dependencies = [
    "fastapi>=0.115.12",
    "mcp[cli]>=1.10.0",
    "uvicorn>=0.34.2",
    "databricks-sdk>=0.42.0",  # ← Already included!
]`}
            />

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-slate-700">
                <strong>💡 Why this matters:</strong> The Databricks SDK provides Python methods for every Databricks API. 
                Instead of making raw HTTP requests, you can just call <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">w.clusters.list()</code> or 
                <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">w.warehouses.get()</code>. Much easier!
              </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-8">The Authentication Helper</h3>
            <p className="text-slate-700">
              In <code className="bg-orange-200 px-1.5 py-0.5 rounded font-mono">src/custom_server/app.py</code>, find the <code className="bg-orange-100 px-1 py-0.5 rounded text-sm">get_workspace_client()</code> function:
            </p>

            <CodeBlock
              language="python"
              title="src/custom_server/app.py - Authentication helper (lines 34-43)"
              code={`def get_workspace_client() -> WorkspaceClient:
    """Get an authenticated Databricks workspace client.
    
    This uses environment variables or Databricks Apps authentication.
    In Databricks Apps, authentication is handled automatically!
    """
    return WorkspaceClient(
        host=os.environ.get('DATABRICKS_HOST'),
        token=os.environ.get('DATABRICKS_TOKEN')
    )`}
            />

            <div className="bg-green-50 rounded-lg p-4 border border-green-200">
              <p className="text-sm text-slate-700 mb-2">
                <strong>🔐 Authentication Magic:</strong>
              </p>
              <ul className="text-sm text-slate-700 space-y-1 ml-4">
                <li>• <strong>In Databricks Apps:</strong> Environment variables are set automatically - no config needed!</li>
                <li>• <strong>Local development:</strong> Set DATABRICKS_HOST and DATABRICKS_TOKEN in your terminal</li>
                <li>• <strong>The SDK handles:</strong> Token refresh, retries, rate limiting - all transparent to you</li>
              </ul>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-8">Example Tool: list_clusters</h3>
            <p className="text-slate-700">
              Scroll down in <code className="bg-orange-200 px-1.5 py-0.5 rounded font-mono">app.py</code> to see the <code className="bg-orange-100 px-1 py-0.5 rounded text-sm">list_clusters</code> tool (around line 46):
            </p>

            <CodeBlock
              language="python"
              title="src/custom_server/app.py - Examine this tool (lines 46-80)"
              code={`@mcp.tool()
def list_clusters(status: str = "RUNNING") -> dict:
    """List Databricks compute clusters filtered by status.
    
    Args:
        status: Filter by cluster state (RUNNING, TERMINATED, PENDING, etc.)
    
    Returns:
        Dictionary with cluster information including ID, name, state, and specs
    
    Example:
        list_clusters("RUNNING") -> Shows all currently running clusters
    """
    try:
        w = get_workspace_client()
        clusters = []
        
        for cluster in w.clusters.list():
            if cluster.state and cluster.state.name == status:
                clusters.append({
                    "id": cluster.cluster_id,
                    "name": cluster.cluster_name,
                    "state": cluster.state.name,
                    "spark_version": cluster.spark_version,
                    "node_type": cluster.node_type_id,
                })
        
        return {
            "success": True,
            "clusters": clusters,
            "count": len(clusters),
            "message": f"Found {len(clusters)} cluster(s) with status {status}"
        }
    except Exception as e:
        return {"success": False, "error": str(e)}`}
            />

            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">🎓 Understanding the MCP Tool Pattern</h3>
              <div className="space-y-3 text-sm text-slate-700">
                <div>
                  <p className="font-bold">@mcp.tool() decorator</p>
                  <p>Tells FastMCP "this function is a tool that AI assistants can call"</p>
                </div>
                <div>
                  <p className="font-bold">Detailed docstring</p>
                  <p>The AI sees this! It helps the AI understand WHEN and HOW to use your tool. Be descriptive!</p>
                </div>
                <div>
                  <p className="font-bold">Type hints (status: str, {'->'} dict)</p>
                  <p>MCP uses these to validate inputs and describe outputs. Always include them!</p>
                </div>
                <div>
                  <p className="font-bold">Try/except error handling</p>
                  <p>Returns <code className="bg-yellow-100 px-1 py-0.5 rounded text-xs">{`{"success": false, "error": "..."}`}</code> instead of crashing. The AI can handle errors gracefully.</p>
                </div>
                <div>
                  <p className="font-bold">Structured return data</p>
                  <p>Returns dictionaries with clear fields. Makes it easy for AI to parse and present results.</p>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="Key Takeaway">
              <p className="mb-2">Notice the pattern: Every MCP tool in this server follows the same structure:</p>
              <ul className="space-y-1 ml-4 text-sm">
                <li>1. <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">@mcp.tool()</code> decorator</li>
                <li>2. Clear docstring explaining what it does</li>
                <li>3. Get authenticated client with <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">get_workspace_client()</code></li>
                <li>4. Call Databricks SDK methods</li>
                <li>5. Return structured data with success/error handling</li>
              </ul>
              <p className="text-sm mt-3">You'll use this exact pattern when building your own tool in Step 7!</p>
            </InfoBox>
          </div>
        </WorkshopStep>

        <WorkshopStep number={6} title="Understand the SQL Tools">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Now let's examine two more powerful tools already in your MCP server: one that lists SQL warehouses and another that executes SQL queries. 
              These show you how MCP tools can interact with Databricks' data layer.
            </p>

            <h3 className="text-xl font-bold text-slate-900">Tool 2: list_warehouses</h3>
            <p className="text-slate-700 mb-4">
              Find this tool in <code className="bg-orange-200 px-1.5 py-0.5 rounded font-mono">app.py</code> (around line 84):
            </p>

            <CodeBlock
              language="python"
              title="src/custom_server/app.py - Examine this tool (lines 84-113)"
              code={`@mcp.tool()
def list_warehouses() -> dict:
    """List all SQL warehouses in the Databricks workspace.
    
    Returns:
        Dictionary with warehouse information including ID, name, state, size, and type
    
    Example:
        list_warehouses() -> Shows all SQL warehouses in your workspace
    """
    try:
        w = get_workspace_client()
        warehouses = []
        
        for warehouse in w.warehouses.list():
            warehouses.append({
                'id': warehouse.id,
                'name': warehouse.name,
                'state': warehouse.state.value if warehouse.state else 'UNKNOWN',
                'size': warehouse.cluster_size,
                'type': warehouse.warehouse_type.value if warehouse.warehouse_type else 'UNKNOWN',
            })
        
        return {
            'success': True,
            'warehouses': warehouses,
            'count': len(warehouses),
            'message': f'Found {len(warehouses)} SQL warehouse(s)'
        }
    except Exception as e:
        return {'success': False, 'error': str(e)}`}
            />

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-slate-700">
                <strong>💡 Notice:</strong> This follows the same pattern as <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">list_clusters</code>, 
                but uses <code className="bg-blue-100 px-1 py-0.5 rounded text-xs">w.warehouses.list()</code> instead. 
                The SDK makes it easy to query different Databricks resources with consistent APIs!
              </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-8">Tool 3: execute_dbsql</h3>
            <p className="text-slate-700 mb-4">
              This is the most powerful tool - it lets AI assistants query your data! Find it in <code className="bg-orange-200 px-1.5 py-0.5 rounded font-mono">app.py</code> (around line 117):
            </p>

            <CodeBlock
              language="python"
              title="src/custom_server/app.py - Examine this tool (lines 117-176)"
              code={`@mcp.tool()
def execute_dbsql(
    query: str,
    warehouse_id: str = None,
    limit: int = 100,
) -> dict:
    """Execute a SQL query on a Databricks SQL warehouse.
    
    Args:
        query: SQL query to execute (e.g., "SELECT * FROM main.default.sales LIMIT 10")
        warehouse_id: SQL warehouse ID (uses DATABRICKS_SQL_WAREHOUSE_ID env var if not provided)
        limit: Maximum rows to return (default: 100)
    
    Returns:
        Dictionary with query results including columns and rows
    
    Example:
        execute_dbsql("SHOW DATABASES", warehouse_id="abc123def456")
    """
    try:
        w = get_workspace_client()
        
        # Get warehouse ID from parameter or environment variable
        warehouse_id = warehouse_id or os.environ.get('DATABRICKS_SQL_WAREHOUSE_ID')
        if not warehouse_id:
            return {
                'success': False,
                'error': 'No SQL warehouse ID provided. Set DATABRICKS_SQL_WAREHOUSE_ID environment variable or pass warehouse_id parameter.'
            }
        
        # Execute the query
        result = w.statement_execution.execute_statement(
            warehouse_id=warehouse_id,
            statement=query,
            wait_timeout='30s'
        )
        
        # Process results
        if result.result and result.result.data_array:
            columns = [col.name for col in result.manifest.schema.columns]
            data = []
            
            for row in result.result.data_array[:limit]:
                row_dict = {}
                for i, col in enumerate(columns):
                    row_dict[col] = row[i]
                data.append(row_dict)
            
            return {
                'success': True,
                'data': {'columns': columns, 'rows': data},
                'row_count': len(data)
            }
        else:
            return {
                'success': True,
                'data': {'message': 'Query executed successfully with no results'},
                'row_count': 0
            }
    except Exception as e:
        return {'success': False, 'error': str(e)}`}
            />

            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
              <h3 className="text-lg font-bold text-red-900 mb-3">⚠️ Security Note: SQL Tool Design</h3>
              <p className="text-sm text-slate-700 mb-3">
                Notice how this tool is designed with safety in mind:
              </p>
              <ul className="space-y-2 text-sm text-slate-700">
                <li>• <strong>Row limit:</strong> Default limit of 100 rows prevents accidentally returning huge datasets</li>
                <li>• <strong>Timeout:</strong> 30-second timeout prevents queries from running forever</li>
                <li>• <strong>Error handling:</strong> Returns errors as structured data instead of crashing</li>
                <li>• <strong>Unity Catalog permissions:</strong> The query respects the user's existing Databricks permissions</li>
              </ul>
              <p className="text-sm text-slate-700 mt-3">
                <strong>Pro tip:</strong> In production, consider adding query validation, logging, and rate limiting!
              </p>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200 mt-6">
              <h3 className="text-lg font-bold text-slate-900 mb-3">🎯 Ready to Build Your Own?</h3>
              <p className="text-slate-700 mb-3">
                You've now examined three different MCP tools that query Databricks:
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• <code className="bg-green-100 px-1 py-0.5 rounded text-sm">list_clusters</code> - Query compute resources</li>
                <li>• <code className="bg-green-100 px-1 py-0.5 rounded text-sm">list_warehouses</code> - Query SQL endpoints</li>
                <li>• <code className="bg-green-100 px-1 py-0.5 rounded text-sm">execute_dbsql</code> - Run SQL queries</li>
              </ul>
              <p className="text-slate-700 mt-3">
                In the next step, you'll build your own tool from scratch using the same pattern!
              </p>
            </div>
          </div>
        </WorkshopStep>

        <WorkshopStep number={7} title="Build Your Own Tool: Unity Catalog Integration">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Time to get your hands dirty! You'll now <strong>build your own MCP tool from scratch</strong> that connects to Unity Catalog, 
              Databricks' data governance layer. This tool will explore the catalog structure created during your workshop setup.
            </p>

            <div className="bg-orange-50 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">🎯 Your Task</h3>
              <p className="text-slate-700 mb-3">
                You've examined existing tools. Now <strong>you'll write the code yourself</strong> for a <code className="bg-orange-100 px-1 py-0.5 rounded text-sm">list_schemas</code> tool 
                that queries your workshop catalog.
              </p>
              <ul className="space-y-2 text-slate-700">
                <li>• ✍️ Add the tool code to <code className="bg-orange-100 px-1 py-0.5 rounded text-sm">app.py</code></li>
                <li>• 🧪 Test it locally with your workshop catalog</li>
                <li>• 📊 See it discover the schemas you created during setup</li>
              </ul>
            </div>

            <div className="bg-purple-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">🎓 Understanding Unity Catalog</h3>
              <p className="text-slate-700 mb-4">
                Unity Catalog organizes data in a <strong>3-level namespace</strong>:
              </p>
              <div className="bg-white rounded-lg p-4 border border-purple-200 mb-4">
                <code className="text-sm font-mono">catalog.schema.table</code>
              </div>
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>Catalog</strong>: Top-level container (e.g., <code className="bg-purple-100 px-1 py-0.5 rounded text-sm">mcp_workshop_john_doe</code>)</li>
                <li>• <strong>Schema</strong>: Database within a catalog (e.g., <code className="bg-purple-100 px-1 py-0.5 rounded text-sm">default</code>)</li>
                <li>• <strong>Table</strong>: Actual data tables (e.g., <code className="bg-purple-100 px-1 py-0.5 rounded text-sm">products</code>, <code className="bg-purple-100 px-1 py-0.5 rounded text-sm">sales</code>)</li>
              </ul>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">🔗 Connecting to Your Workshop Setup</h3>
              <p className="text-slate-700 mb-3">
                Remember when you ran <code className="bg-blue-100 px-1 py-0.5 rounded text-sm">./setup.sh</code>? It created your personal catalog!
              </p>
              <div className="bg-white rounded-lg p-4 border border-blue-200 font-mono text-sm">
                <div className="text-slate-600">Your Workshop Resources:</div>
                <div className="mt-2 ml-2">
                  <div>📁 <strong>mcp_workshop_&lt;your_prefix&gt;</strong> (catalog)</div>
                  <div className="ml-4">└── 📂 <strong>default</strong> (schema)</div>
                  <div className="ml-8">├── 📊 products (100 rows)</div>
                  <div className="ml-8">├── 📊 customers (500 rows)</div>
                  <div className="ml-8">└── 📊 sales (1000 rows)</div>
                </div>
              </div>
              <p className="text-sm text-slate-600 mt-3">
                The tool you're building will let AI assistants discover this structure!
              </p>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-8">Step 1: Add the list_schemas Tool</h3>
            <p className="text-slate-700 mb-4">
              Open <code className="bg-orange-200 px-1.5 py-0.5 rounded font-mono">src/custom_server/app.py</code> and <strong>add this new tool</strong> after the existing tools 
              (after <code className="bg-orange-100 px-1 py-0.5 rounded text-sm">execute_dbsql</code>, around line 177):
            </p>

            <CodeBlock
              language="python"
              title="src/custom_server/app.py - ADD this tool yourself!"
              code={`@mcp.tool()
def list_schemas(catalog_name: str) -> dict:
    """List all schemas in a Unity Catalog catalog.
    
    Args:
        catalog_name: Name of the catalog to list schemas from
    
    Returns:
        Dictionary with schema information including name, catalog, owner, and comment
    
    Example:
        list_schemas("mcp_workshop_john_doe") -> Shows all schemas in your workshop catalog
    """
    try:
        w = get_workspace_client()
        schemas = []
        
        for schema in w.schemas.list(catalog_name=catalog_name):
            schemas.append({
                'name': schema.name,
                'full_name': schema.full_name,
                'catalog': schema.catalog_name,
                'owner': schema.owner,
                'comment': schema.comment or 'No description'
            })
        
        return {
            'success': True,
            'schemas': schemas,
            'count': len(schemas),
            'message': f'Found {len(schemas)} schema(s) in catalog {catalog_name}'
        }
    except Exception as e:
        return {'success': False, 'error': str(e)}`}
            />

            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">📚 Understanding the Schema API</h3>
              <div className="space-y-3 text-sm text-slate-700">
                <div>
                  <p className="font-bold">w.schemas.list(catalog_name)</p>
                  <p>Iterates through all schemas in the catalog. The SDK automatically handles pagination and permissions!</p>
                </div>
                <div>
                  <p className="font-bold">schema.full_name</p>
                  <p>Returns the complete path like <code className="bg-yellow-100 px-1 py-0.5 rounded text-xs">mcp_workshop_john_doe.default</code></p>
                </div>
                <div>
                  <p className="font-bold">Automatic permission filtering</p>
                  <p>Users only see schemas they have the <code className="bg-yellow-100 px-1 py-0.5 rounded text-xs">USE_SCHEMA</code> privilege on. Security is built-in!</p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-slate-900 mt-8">Step 2: Test Locally with Your Workshop Catalog</h3>
            <p className="text-slate-700 mb-4">
              Now test your new tool locally with the catalog created during your workshop setup:
            </p>

            <CodeBlock
              language="bash"
              title="Terminal - Test with your workshop catalog"
              code={`# Get your workshop catalog name from the setup
cd custom-mcp-template
source ../.env.local
echo "Your workshop catalog: $WORKSHOP_CATALOG"

# Make sure the server is running
uv run uvicorn custom_server.app:app --reload --host 0.0.0.0 --port 8000

# In another terminal, test the tool (replace with your actual catalog name)
curl -X POST http://localhost:8000/mcp/tools/call \\
  -H "Content-Type: application/json" \\
  -d '{"name": "list_schemas", "arguments": {"catalog_name": "mcp_workshop_john_doe"}}'`}
            />

            <InfoBox type="success" title="Expected Result">
              <p className="mb-2">You should see output like this:</p>
              <CodeBlock
                language="json"
                code={`{
  "success": true,
  "schemas": [
    {
      "name": "default",
      "full_name": "mcp_workshop_john_doe.default",
      "catalog": "mcp_workshop_john_doe",
      "owner": "your_email@example.com",
      "comment": "Default schema for workshop tables and functions"
    }
  ],
  "count": 1,
  "message": "Found 1 schema(s) in catalog mcp_workshop_john_doe"
}`}
              />
              <p className="text-sm mt-3">
                This confirms your workshop catalog is set up correctly with the <strong>default</strong> schema containing your sample data!
              </p>
            </InfoBox>

            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">💡 Why This Tool Matters</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• <strong>Data Discovery:</strong> AI assistants can explore available schemas before querying</li>
                <li>• <strong>Governance:</strong> Respects Unity Catalog permissions automatically</li>
                <li>• <strong>Context Building:</strong> Combined with <code className="bg-green-100 px-1 py-0.5 rounded text-xs">execute_dbsql</code>, 
                AI can fully understand your data landscape</li>
                <li>• <strong>Workshop Connection:</strong> This directly queries the resources created during setup!</li>
              </ul>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 border border-slate-200 mt-6">
              <p className="text-sm text-slate-700">
                <strong>📖 Learn More:</strong> The Databricks SDK provides similar APIs for <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">w.tables</code>, 
                <code className="bg-slate-100 px-1 py-0.5 rounded text-xs ml-1">w.catalogs</code>, and more. Check the 
                <a href="https://docs.databricks.com/en/dev-tools/sdk-python.html" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline ml-1">
                  Databricks SDK documentation
                </a> to explore!
              </p>
            </div>
          </div>
        </WorkshopStep>

        <WorkshopStep number={8} title="Deploy Your Enhanced MCP Server">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Great work adding the <code className="bg-orange-100 px-1 py-0.5 rounded text-sm">list_schemas</code> tool!
              Now let's deploy your enhanced MCP server with this new Unity Catalog integration.
            </p>

            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">🎯 What You're Deploying</h3>
              <ul className="space-y-2 text-slate-700">
                <li>• Your custom MCP server with the new <code className="bg-green-100 px-1 py-0.5 rounded text-xs">list_schemas</code> tool</li>
                <li>• Packaged as a Python wheel and uploaded to Databricks</li>
                <li>• Running 24/7 as a Databricks App with HTTPS endpoint</li>
                <li>• Ready for AI assistants to discover and query your Unity Catalog data</li>
              </ul>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 border-2 border-blue-200 mb-6">
              <h3 className="text-xl font-bold text-slate-900 mb-3">🚀 Option 1: Automated Deployment (Recommended)</h3>
              <p className="text-slate-700 mb-4">
                Use the <code className="bg-blue-100 px-1 py-0.5 rounded text-sm">deploy.sh</code> script for a fully automated deployment:
              </p>
              <CodeBlock
                language="bash"
                title="Terminal - Automated deployment"
                code={`cd custom-mcp-template

# Load your participant prefix
source ../.env.local

# Run the deploy script
./deploy.sh

# The script automatically:
# 1. Builds the Python wheel with your new tool
# 2. Converts underscores to dashes in your prefix
# 3. Deploys to Databricks with proper authentication
# 4. Starts the app
# 5. Displays your MCP connection URL`}
              />
              <div className="bg-blue-100 rounded-lg p-3 mt-3">
                <p className="text-sm text-slate-700">
                  <strong>✨ After deployment:</strong> The script will show your MCP endpoint URL.
                  Copy it - you'll use it to connect AI assistants in the next section!
                </p>
              </div>
            </div>

            <div className="bg-slate-50 rounded-xl p-6 border-2 border-slate-200">
              <h3 className="text-xl font-bold text-slate-900 mb-3">⚙️ Option 2: Manual Deployment</h3>
              <p className="text-slate-700 mb-4">
                For more control or if you want to understand each step:
              </p>
              <CodeBlock
                language="bash"
                title="Terminal - Manual deployment"
                code={`cd custom-mcp-template

# 1. Load your participant prefix
source ../.env.local

# 2. Build the Python wheel
uv build --wheel

# 3. Convert prefix (app names need dashes, not underscores)
CLEAN_PREFIX=$(echo "$PARTICIPANT_PREFIX" | tr '_' '-')
echo "Deploying as: mcp-custom-server-$CLEAN_PREFIX"

# 4. Deploy with bundle
unset DATABRICKS_AUTH_TYPE
databricks bundle deploy --var="participant_prefix=$CLEAN_PREFIX"

# 5. Start the app
databricks apps start "mcp-custom-server-$CLEAN_PREFIX"

# 6. Get the MCP endpoint URL
databricks apps get "mcp-custom-server-$CLEAN_PREFIX" | grep url`}
              />
            </div>

            <div className="bg-yellow-50 rounded-xl p-6 border-2 border-yellow-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">📋 What's Happening?</h3>
              <ol className="space-y-2 text-sm text-slate-700 ml-4">
                <li>1. <code className="bg-yellow-100 px-1 py-0.5 rounded text-xs">uv build --wheel</code> packages your enhanced MCP server with the new tool</li>
                <li>2. Your prefix is cleaned (underscores → dashes) to meet Databricks Apps naming requirements</li>
                <li>3. The bundle deploys to Databricks with your unique app name</li>
                <li>4. The app is started automatically with <code className="bg-yellow-100 px-1 py-0.5 rounded text-xs">databricks apps start</code></li>
                <li>5. Your enhanced MCP server is now live and accessible!</li>
              </ol>
            </div>

            <div className="bg-green-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">✅ Deployment Success</h3>
              <p className="text-slate-700 mb-3">When deployment completes, you'll see:</p>
              <CodeBlock
                language="text"
                code={`✅ App started successfully!

📋 App Details:
  Name: mcp-custom-server-your-prefix
  URL: https://mcp-custom-server-your-prefix-xxxxx.aws.databricksapps.com/mcp/

🔗 MCP Connection URL (use this in AI assistants):
  https://mcp-custom-server-your-prefix-xxxxx.aws.databricksapps.com/mcp/

📋 Next steps:
  1. Check app status: ./app_status.sh
  2. View logs in Databricks workspace: Apps → mcp-custom-server-your-prefix → Logs
  3. Connect your AI assistant using the MCP URL above`}
              />
              <div className="bg-green-100 rounded-lg p-3 mt-3">
                <p className="text-sm text-slate-700">
                  <strong>💾 Save this URL!</strong> You'll need it in the next section to connect your AI assistant
                  and test your <code className="bg-green-200 px-1 py-0.5 rounded text-xs">list_schemas</code> tool.
                </p>
              </div>
            </div>

            <div className="bg-red-50 rounded-xl p-6 border-2 border-red-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">⚠️ Troubleshooting</h3>
              <div className="space-y-3 text-sm text-slate-700">
                <div>
                  <p className="font-bold">Error: "auth type 'profile' not found"</p>
                  <p className="text-xs mt-1">Solution: Use <code className="bg-red-100 px-1 py-0.5 rounded text-xs">./deploy.sh</code> or manually <code className="bg-red-100 px-1 py-0.5 rounded text-xs">unset DATABRICKS_AUTH_TYPE</code> before deploying</p>
                </div>
                <div>
                  <p className="font-bold">Error: "App name must contain only lowercase letters, numbers, and dashes"</p>
                  <p className="text-xs mt-1">Solution: The deploy script handles this automatically. If deploying manually, use <code className="bg-red-100 px-1 py-0.5 rounded text-xs">tr '_' '-'</code></p>
                </div>
                <div>
                  <p className="font-bold">Error: "App does not exist or is deleted"</p>
                  <p className="text-xs mt-1">Solution: Clear stale state with <code className="bg-red-100 px-1 py-0.5 rounded text-xs">rm -rf .databricks</code> then redeploy</p>
                </div>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                💡 See <code className="bg-red-100 px-1 py-0.5 rounded text-xs">README.md</code> in the custom-mcp-template folder for detailed troubleshooting.
              </p>
            </div>

            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <p className="text-sm text-slate-700">
                <strong>⏱️ Deployment time:</strong> First deployment takes 2-3 minutes. Updates are faster (~30 seconds)
                since only changed files are uploaded.
              </p>
            </div>

            <InfoBox type="success" title="🎉 Your Enhanced MCP Server is Live!">
              <p className="mb-2">Your MCP server now includes:</p>
              <ul className="space-y-1 ml-4 text-sm">
                <li>• ✅ The <code className="bg-emerald-100 px-1 py-0.5 rounded text-xs">list_schemas</code> tool you built</li>
                <li>• ✅ All existing tools: <code className="bg-emerald-100 px-1 py-0.5 rounded text-xs">list_clusters</code>, <code className="bg-emerald-100 px-1 py-0.5 rounded text-xs">list_warehouses</code>, <code className="bg-emerald-100 px-1 py-0.5 rounded text-xs">execute_dbsql</code></li>
                <li>• ✅ Running 24/7 on Databricks with automatic authentication</li>
                <li>• ✅ Ready to connect to AI assistants and explore your Unity Catalog!</li>
              </ul>
            </InfoBox>
          </div>
        </WorkshopStep>

        <WorkshopStep number={9} title="What You Built">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Congratulations! You've built a production-ready MCP server. Let's recap what you learned:
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">✅ What You Learned</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• The <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">@mcp.tool()</code> decorator pattern</li>
                  <li>• How to integrate Databricks SDK</li>
                  <li>• Authentication with WorkspaceClient</li>
                  <li>• Error handling and structured responses</li>
                  <li>• Building MCP tools that query Databricks</li>
                </ul>
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <h4 className="font-bold text-slate-900 mb-2">🛠️ Tools You Built:</h4>
                  <ul className="space-y-1 text-sm text-slate-700">
                    <li>• <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">list_clusters</code> - Query compute resources</li>
                    <li>• <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">list_warehouses</code> - Discover SQL endpoints</li>
                    <li>• <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">execute_dbsql</code> - Run SQL queries</li>
                    <li>• <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">list_schemas</code> - Explore Unity Catalog structure</li>
                  </ul>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 border-2 border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-3">📖 Why This Approach?</h3>
                <p className="text-sm text-slate-700 mb-3">
                  By starting with the <strong>clean databrickslabs template</strong>, you understand:
                </p>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• The core MCP server pattern</li>
                  <li>• How <code className="bg-slate-100 px-1 py-0.5 rounded text-xs">@mcp.tool()</code> works</li>
                  <li>• Databricks Apps deployment basics</li>
                  <li>• What each file does</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-6 border-2 border-orange-200">
              <h3 className="text-lg font-bold text-slate-900 mb-3">🚀 Ready to Continue?</h3>
              <p className="text-slate-700 mb-4">
                The next steps will build on this foundation by adding Databricks SDK integration, custom prompts, and helper scripts.
              </p>
              <p className="text-sm text-slate-600">
                <strong>Coming up next:</strong> We'll add the Databricks SDK to query clusters, run SQL, and access Unity Catalog!
              </p>
            </div>
          </div>
        </WorkshopStep>

        {/* Resources */}
        <div className="mt-16 p-8 rounded-2xl border-2 border-slate-200 bg-slate-50">
          <h3 className="text-2xl font-bold text-slate-900 mb-6">📚 Resources</h3>

          <div className="grid md:grid-cols-3 gap-4">
            <a
              href="https://github.com/databrickslabs/mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              databrickslabs/mcp
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a
              href="https://fastmcp.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              FastMCP Docs
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>

            <a
              href="https://modelcontextprotocol.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-base font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              MCP Spec
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
