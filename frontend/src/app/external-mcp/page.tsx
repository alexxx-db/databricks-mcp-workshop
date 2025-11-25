import WorkshopStep from "@/components/WorkshopStep";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";

export default function ExternalMcpPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 text-4xl text-white shadow-lg">
              🔗
            </div>
            <div>
              <h1 className="text-5xl font-bold text-slate-900 mb-2">External MCP Servers</h1>
              <p className="text-xl text-slate-600">Connect to third-party MCP tools</p>
            </div>
          </div>
          
          {/* Narrative Context */}
          <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl p-8 border-2 border-green-100 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Expanding Your Agent&apos;s Capabilities</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              While managed MCP servers give you instant access to Databricks tools, external MCP servers unlock 
              the entire ecosystem of third-party tools and services. Connect to GitHub, Slack, Google Drive, 
              weather APIs, and thousands of other services through their MCP implementations.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  🔒 Secure by Design
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Unity Catalog HTTP connections manage authentication</li>
                  <li>• Databricks proxies handle token refresh automatically</li>
                  <li>• No credentials exposed to end users</li>
                  <li>• Enterprise-grade security controls</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  ⚡ Easy Integration
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Connect any MCP-compatible service</li>
                  <li>• Test in AI Playground before coding</li>
                  <li>• Automatic tool discovery</li>
                  <li>• OAuth 2.0 and token-based auth support</li>
                </ul>
              </div>
            </div>
          </div>

          <InfoBox type="info" title="What you&apos;ll learn in this section">
            <ul className="space-y-2 mt-3">
              <li className="flex items-center gap-2">
                <span className="text-green-600">•</span>
                How to create Unity Catalog HTTP connections for MCP servers
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">•</span>
                Setting up OAuth 2.0 authentication for external services
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">•</span>
                Testing external MCP tools in AI Playground
              </li>
              <li className="flex items-center gap-2">
                <span className="text-green-600">•</span>
                Using the MCP SDK to connect from code
              </li>
            </ul>
          </InfoBox>
        </div>

        {/* Workshop Steps */}
        <WorkshopStep number={1} title="Create Unity Catalog HTTP Connection">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Let&apos;s create a Unity Catalog HTTP connection to connect to an external MCP server. 
              For this example, we&apos;ll set up a connection to a GitHub MCP server.
            </p>

            <InfoBox type="warning" title="Prerequisites">
              <p>You need <strong>CREATE CONNECTION</strong> privileges on the Unity Catalog metastore to create HTTP connections.</p>
            </InfoBox>

            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Get Your GitHub Personal Access Token</h4>
              <p className="text-slate-700 mb-4">
                Before creating the connection, you&apos;ll need a GitHub Personal Access Token (PAT) to authenticate with the GitHub API.
              </p>
              
              <div className="space-y-3 mb-6">
                <div className="border-2 border-blue-200 rounded-xl p-4 bg-blue-50">
                  <p className="text-slate-700 mb-2">
                    <strong>1.</strong> Go to <a href="https://github.com/settings/apps" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline font-semibold">Developer Settings → Personal Access Tokens</a>
                  </p>
                  <p className="text-slate-700 mb-2">
                    <strong>2.</strong> Create a new token (fine-grained or classic)
                  </p>
                  <p className="text-slate-700">
                    <strong>3.</strong> Grant the necessary permissions (repo, issues, etc.)
                  </p>
                </div>
              </div>

              <h4 className="text-xl font-bold text-slate-900 mb-4">Create the HTTP Connection</h4>
              <p className="text-slate-700 mb-4">
                In your Databricks workspace, navigate to <strong>Catalog</strong> → <strong>External Data</strong> → <strong>Connections</strong> and click on <strong>+ Create connection</strong> and select <strong>HTTP</strong>. Enter the following details:
              </p>
              <div className="space-y-3 mb-6">
                <ul className="space-y-2 text-slate-700">
                  <li>• Connection name: github_mcp_connection_(name_prefix)</li>
                  <li>• Connection type: HTTP</li>
                  <li>• Auth type: Bearer token</li>
                  <li>• Click <strong>Next</strong></li>
                  <li>• Host: https://api.github.com</li>
                  <li>• Port: 443</li>
                  <li>• Bearer token: _insert_token_here_</li>
                  <li>• Click <strong>Create</strong></li>
                  <li>• Base path: /mcp</li>
                  <li>• Check "Is MCP connection" (set to True)</li>
                  <li>• Click <strong>Create connection</strong></li>
                </ul>
              </div>
              
              <CodeBlock
                language="sql"
                title="[Alternative] Create GitHub MCP Connection programmatically using SQL (SQL Editor or Notebook)"
                code={`-- Create HTTP connection for GitHub MCP server
-- Replace {name_prefix} with your unique identifier (e.g., your username)
-- Replace <insert_token_here> with your GitHub Personal Access Token
CREATE CONNECTION github_mcp_connection_{name_prefix}
  TYPE HTTP
  OPTIONS (
    host 'https://api.githubcopilot.com',
    port '443',
    base_path '/mcp',
    is_mcp_connection 'true',
    bearer_token '<insert_token_here>'
  );`}
              />

              <InfoBox type="tip" title="Important Configuration Notes">
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Replace <code className="bg-blue-100 px-1.5 py-0.5 rounded text-sm">&#123;name_prefix&#125;</code> with your unique identifier to avoid naming conflicts (e.g., your username)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Replace <code className="bg-blue-100 px-1.5 py-0.5 rounded text-sm">&lt;insert_token_here&gt;</code> with your actual GitHub PAT</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">•</span>
                    <span>Make sure to set <code className="bg-blue-100 px-1.5 py-0.5 rounded text-sm">is_mcp_connection</code> to <code className="bg-blue-100 px-1.5 py-0.5 rounded text-sm">&apos;true&apos;</code> to enable MCP functionality</span>
                  </li>
                </ul>
              </InfoBox>
            </div>

            <InfoBox type="success" title="Connection Created!">
              <p>Your external MCP server is now available at:</p>
              <code className="block mt-3 p-3 bg-slate-100 rounded-lg text-slate-800 font-mono text-sm">
                https://&lt;workspace-hostname&gt;/api/2.0/mcp/external/github_mcp_connection_&#123;name_prefix&#125;
              </code>
            </InfoBox>
          </div>
        </WorkshopStep>

        <WorkshopStep number={2} title="Test in AI Playground">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              AI Playground provides the easiest way to test external MCP servers without writing any code.
            </p>

            <div className="space-y-4">
              <div className="border-2 border-slate-200 rounded-xl p-6 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">1</span>
                  <h4 className="text-lg font-bold text-slate-900">Open AI Playground</h4>
                </div>
                <p className="text-slate-700 ml-11">
                  Navigate to <strong>AI Playground</strong> and select a model with <strong>&quot;Tools enabled&quot;</strong> label.
                </p>
              </div>

              <div className="border-2 border-slate-200 rounded-xl p-6 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-600 font-bold text-sm">2</span>
                  <h4 className="text-lg font-bold text-slate-900">Add External MCP Server</h4>
                </div>
                <div className="ml-11">
                  <p className="text-slate-700 mb-3">
                    Click <strong>Tools → + Add tool</strong> and select <strong>MCP Servers</strong>.
                  </p>
                  <p className="text-slate-700 mb-3">
                    Choose <strong>External MCP servers</strong> and select your connection: <code>github_mcp_connection_&#123;name_prefix&#125;</code>
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Sample Test Prompts</h4>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <h5 className="font-semibold text-emerald-900 mb-2">GitHub MCP Tests</h5>
                <ul className="space-y-2 text-sm text-emerald-800">
                  <li>💬 &quot;List recent commits in the mlflow/mlflow repository&quot;</li>
                  <li>💬 &quot;Show me open issues in my repository&quot;</li>
                  <li>💬 &quot;Create a new issue about documentation&quot;</li>
                  <li>💬 &quot;Search for repositories related to machine learning&quot;</li>
                </ul>
              </div>
            </div>
          </div>
        </WorkshopStep>

        {/* Next Steps */}
        <div className="mt-16 p-8 rounded-2xl border-2 border-green-200 bg-green-50">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            🎉 Section Complete!
          </h3>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            You&apos;ve successfully connected external MCP servers to Databricks! Your agents can now securely 
            access third-party services while maintaining enterprise security and governance.
          </p>

          <div className="flex flex-wrap gap-4">
            <a
              href="/custom-mcp"
              className="inline-flex items-center gap-2 rounded-lg bg-green-600 px-6 py-3 text-lg font-bold text-white hover:bg-green-700 transition-colors shadow-lg"
            >
              Next: Custom MCP
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://docs.databricks.com/aws/en/generative-ai/mcp/external-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-lg font-bold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              Official Docs
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