import WorkshopStep from "@/components/WorkshopStep";
import CodeBlock from "@/components/CodeBlock";
import InfoBox from "@/components/InfoBox";

export default function ManagedMcpPage() {
  // Use the workshop catalog configured during setup, or show placeholder if not set
  const workshopCatalog = process.env.NEXT_PUBLIC_WORKSHOP_CATALOG || 'mcp_workshop_<your_prefix>';
  
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-5xl mx-auto px-8 py-12">
        {/* Header */}
        <div className="mb-16">
          <div className="flex items-center gap-6 mb-8">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 text-4xl text-white shadow-lg">
              🔧
            </div>
            <div>
              <h1 className="text-5xl font-bold text-slate-900 mb-2">UC Tools, Genie Spaces as Managed MCP Servers</h1>
              <p className="text-xl text-slate-600">Production-ready tools with zero setup</p>
            </div>
          </div>
          
          {/* Narrative Context */}
          <div className="bg-gradient-to-r from-blue-50 to-sky-50 rounded-2xl p-8 border-2 border-blue-100 mb-8">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">What We're Building</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              Imagine you're building a customer service AI agent that needs to access your company's data and business logic. 
              Traditional approaches require building custom APIs, managing authentication, and maintaining infrastructure. 
              <strong className="text-blue-700"> Managed MCP servers eliminate this complexity entirely.</strong>
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl p-6 border border-blue-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  ❌ Traditional Approach
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Build custom REST APIs for each data source</li>
                  <li>• Manage authentication and authorization</li>
                  <li>• Handle scaling and reliability</li>
                  <li>• Maintain separate infrastructure</li>
                </ul>
              </div>
              
              <div className="bg-white rounded-xl p-6 border border-green-200">
                <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                  ✅ Managed MCP Approach
                </h3>
                <ul className="space-y-2 text-slate-700">
                  <li>• Unity Catalog functions become instant tools</li>
                  <li>• Genie spaces provide natural language access</li>
                  <li>• Built-in security and governance</li>
                  <li>• Zero infrastructure to manage</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Workshop Goals */}
          <div className="bg-slate-50 rounded-2xl p-8 border-2 border-slate-200">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Workshop Goals</h2>
            <p className="text-lg text-slate-700 leading-relaxed mb-6">
              By the end of this section, you'll have a complete customer service agent that can:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="h-16 w-16 bg-blue-100 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">🔍</div>
                <h3 className="font-bold text-slate-900 mb-2">Query Customer Data</h3>
                <p className="text-sm text-slate-600">Look up order history, preferences, and account details</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-green-100 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">💬</div>
                <h3 className="font-bold text-slate-900 mb-2">Chat with Data</h3>
                <p className="text-sm text-slate-600">Ask natural language questions about sales and trends</p>
              </div>
              
              <div className="text-center">
                <div className="h-16 w-16 bg-purple-100 rounded-xl flex items-center justify-center text-2xl mx-auto mb-3">⚡</div>
                <h3 className="font-bold text-slate-900 mb-2">Execute Business Logic</h3>
                <p className="text-sm text-slate-600">Run complex analytics and data transformations</p>
              </div>
            </div>

            <InfoBox type="info" title="What you'll learn in this section">
              <ul className="space-y-2 mt-3">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  How to create Unity Catalog functions that become MCP tools
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  Setting up Genie spaces for natural language data access
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  Prototyping agents in AI Playground with your tools
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">•</span>
                  Testing and iterating on agent behavior
                </li>
              </ul>
            </InfoBox>
          </div>
        </div>

        {/* Workshop Steps */}
        <WorkshopStep number={1} title="Set Up Workshop Data">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              First, let's create the sample data we'll use throughout this workshop. We'll create a simple e-commerce dataset 
              with products, customers, and sales data that mirrors real-world customer service scenarios.
            </p>

            <InfoBox type="success" title="Workshop Setup Complete! ✓">
              <p className="mb-3">If you've already run <code className="bg-emerald-100 px-2 py-1 rounded text-emerald-900 font-mono">./setup.sh</code>, your workshop environment is ready! The setup script has:</p>
              <ul className="space-y-2 ml-4">
                <li>• Created your personalized catalog: <code className="bg-emerald-100 px-2 py-1 rounded text-emerald-900 font-mono">{workshopCatalog}</code></li>
                <li>• Loaded sample e-commerce data (products, customers, sales)</li>
                <li>• Deployed your Databricks App and MCP server</li>
              </ul>
              <p className="mt-3 text-sm text-slate-600">If you haven't run setup yet, go back to the project root and run: <code className="bg-slate-200 px-2 py-1 rounded text-slate-800 font-mono">./setup.sh</code></p>
            </InfoBox>

            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Sample Data Overview</h4>
              <p className="text-lg text-slate-700 mb-4">Our workshop data includes:</p>
              <div className="bg-slate-50 rounded-lg p-6 border border-slate-200">
                <ul className="space-y-3 text-slate-700">
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 bg-blue-500 rounded-full"></span>
                    <strong className="text-slate-900">products</strong> - 100 products across different categories (Electronics, Clothing, Books, etc.)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                    <strong className="text-slate-900">customers</strong> - 500 customers from different regions (North, South, East, West)
                  </li>
                  <li className="flex items-center gap-3">
                    <span className="h-2 w-2 bg-purple-500 rounded-full"></span>
                    <strong className="text-slate-900">sales</strong> - 1000 sales transactions with revenue data
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </WorkshopStep>

        <WorkshopStep number={2} title="Create Unity Catalog Functions">
          <div className="space-y-8">
            {/* What are UC Functions */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-6 border-2 border-purple-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">🎯 What are Unity Catalog Functions?</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                Unity Catalog functions are <strong>user-defined functions (UDFs)</strong> that can be written in SQL or Python. 
                They're stored in Unity Catalog alongside your data, inheriting all the governance, security, and versioning benefits.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Think of them as <strong>reusable business logic</strong> that can query tables, perform calculations, and return structured results. 
                When you expose them as MCP tools, AI agents can automatically discover and use them!
              </p>
            </div>

            {/* Why They Matter */}
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-6 border-2 border-blue-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">💡 Why Unity Catalog Functions Matter for AI Agents</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2">🔒 Secure & Governed</h4>
                  <p className="text-sm text-slate-700">Functions inherit Unity Catalog's security model. Agents can only access data they're authorized to see.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2">🚀 Zero Infrastructure</h4>
                  <p className="text-sm text-slate-700">Functions run on serverless compute. No APIs to build, no servers to manage, no scaling concerns.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2">📊 Direct Data Access</h4>
                  <p className="text-sm text-slate-700">Functions query your lakehouse directly. No data copying, no ETL pipelines, always fresh data.</p>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <h4 className="font-bold text-blue-900 mb-2">🔄 Automatic Discovery</h4>
                  <p className="text-sm text-slate-700">When you add a function to a catalog/schema, agents immediately see it as an available tool.</p>
                </div>
              </div>
            </div>

            {/* How It Works */}
            <div className="border-2 border-slate-200 rounded-xl p-6 bg-slate-50">
              <h3 className="text-xl font-bold text-slate-900 mb-4">🔧 How UC Functions Become MCP Tools</h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex-shrink-0">1</span>
                  <div>
                    <p className="font-semibold text-slate-900">Create a function in Unity Catalog</p>
                    <p className="text-sm text-slate-600">Write SQL or Python function with clear documentation (COMMENT clauses or docstrings)</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex-shrink-0">2</span>
                  <div>
                    <p className="font-semibold text-slate-900">Databricks exposes an MCP endpoint</p>
                    <p className="text-sm text-slate-600">Automatically available at: <code className="bg-slate-200 px-1.5 py-0.5 rounded text-xs">https://&lt;workspace&gt;/api/2.0/mcp/functions/&lt;catalog&gt;/&lt;schema&gt;</code></p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue-100 text-blue-700 font-bold text-sm flex-shrink-0">3</span>
                  <div>
                    <p className="font-semibold text-slate-900">AI agents discover and use your functions</p>
                    <p className="text-sm text-slate-600">LLMs read function signatures and documentation to understand when and how to call them</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Documentation Best Practices */}
            <InfoBox type="warning" title="📝 Documentation is Critical!">
              <p className="mb-3">Good documentation helps LLMs understand <strong>when</strong> and <strong>how</strong> to use your functions. Without it, agents may misuse or ignore your tools.</p>
              <div className="bg-white rounded-lg p-4 mt-3 border border-yellow-200">
                <h4 className="font-bold text-slate-900 mb-2">Best Practices:</h4>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>• <strong>Function COMMENT</strong>: Clearly describe what the function does and when to use it</li>
                  <li>• <strong>Parameter COMMENT</strong>: Explain each parameter's purpose and expected format</li>
                  <li>• <strong>Be specific</strong>: "Returns customer order history with product details" beats "Gets orders"</li>
                  <li>• <strong>Include examples</strong>: "Use customer_id like 'C0001'" helps the LLM understand the format</li>
                </ul>
              </div>
              <p className="text-xs text-slate-600 mt-3">
                Learn more: <a href="https://docs.databricks.com/aws/en/generative-ai/agent-framework/create-custom-tool" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Creating Custom Tools with UC Functions</a>
              </p>
            </InfoBox>

            <div className="border-t-2 border-slate-200 pt-6">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Let's Create Four Customer Service Functions</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                We'll create functions that a customer service agent would need. Notice how we use detailed COMMENT clauses to help the LLM understand each function's purpose.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Function 1: Customer Order History</h4>
              <p className="text-slate-700 mb-4">
                Retrieve a customer's complete order history - essential for customer service inquiries. 
                <strong className="text-purple-700"> Notice the COMMENT clauses</strong> that help the LLM understand when and how to use this function.
              </p>
              <CodeBlock
                language="sql"
                title="Customer Order History Function"
                code={`CREATE OR REPLACE FUNCTION ${workshopCatalog}.default.get_customer_orders(
  input_customer_id STRING COMMENT 'The customer ID to look up (format: C0001, C0002, etc.)'
)
RETURNS TABLE
COMMENT 'Returns the complete order history for a specific customer, including product details, quantities, and prices. Use this when a customer asks about their past purchases or order status.'
RETURN
  SELECT
    s.sale_id,
    s.sale_date,
    p.product_name,
    p.category,
    s.quantity,
    s.revenue,
    ROUND(s.revenue / s.quantity, 2) as unit_price
  FROM ${workshopCatalog}.default.sales s
  JOIN ${workshopCatalog}.default.products p ON s.product_id = p.product_id
  WHERE s.customer_id = input_customer_id
  ORDER BY s.sale_date DESC;`}
              />
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Function 2: Product Performance Analytics</h4>
              <p className="text-slate-700 mb-4">
                Analyze product performance across categories - useful for recommendations and inventory insights. 
                <strong className="text-purple-700">Optional parameters</strong> let the agent filter by category or get all products.
              </p>
              <CodeBlock
                language="sql"
                title="Product Performance Function"
                code={`CREATE OR REPLACE FUNCTION ${workshopCatalog}.default.get_product_performance(
  input_category STRING DEFAULT NULL COMMENT 'Optional: Filter by product category (Electronics, Clothing, Books, etc.). Leave NULL for all categories.'
)
RETURNS TABLE
COMMENT 'Analyzes product sales performance with metrics like total revenue, units sold, and pricing variance. Use this when asked about product performance, best sellers, or inventory insights.'
RETURN
  SELECT
    p.product_id,
    p.product_name,
    p.category,
    p.price,
    COUNT(s.sale_id) as total_sales,
    SUM(s.quantity) as total_quantity,
    SUM(s.revenue) as total_revenue,
    AVG(s.revenue / s.quantity) as avg_selling_price,
    ROUND((AVG(s.revenue / s.quantity) - p.price) / p.price * 100, 2) as price_variance_pct
  FROM ${workshopCatalog}.default.products p
  LEFT JOIN ${workshopCatalog}.default.sales s ON p.product_id = s.product_id
  WHERE input_category IS NULL OR p.category = input_category
  GROUP BY p.product_id, p.product_name, p.category, p.price
  ORDER BY total_revenue DESC NULLS LAST;`}
              />
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Function 3: Regional Sales Summary</h4>
              <p className="text-slate-700 mb-4">
                Get regional performance metrics - helpful for understanding customer distribution and regional trends.
              </p>
              <CodeBlock
                language="sql"
                title="Regional Sales Summary Function"
                code={`CREATE OR REPLACE FUNCTION ${workshopCatalog}.default.get_regional_sales(
  input_region STRING DEFAULT NULL COMMENT 'Optional: Filter by region (North, South, East, West). Leave NULL for all regions.'
)
RETURNS TABLE
COMMENT 'Provides regional sales performance summary including customer counts, order volumes, and revenue metrics. Use this for regional comparisons or territory analysis.'
RETURN
  SELECT
    c.region,
    COUNT(DISTINCT c.customer_id) as total_customers,
    COUNT(s.sale_id) as total_orders,
    SUM(s.revenue) as total_revenue,
    AVG(s.revenue) as avg_order_value,
    SUM(s.quantity) as total_items_sold
  FROM ${workshopCatalog}.default.customers c
  LEFT JOIN ${workshopCatalog}.default.sales s ON c.customer_id = s.customer_id
  WHERE input_region IS NULL OR c.region = input_region
  GROUP BY c.region
  ORDER BY total_revenue DESC NULLS LAST;`}
              />
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Function 4: Customer Insights</h4>
              <p className="text-slate-700 mb-4">
                Generate customer insights including lifetime value and purchase patterns. Perfect for understanding customer behavior and identifying opportunities.
              </p>
              <CodeBlock
                language="sql"
                title="Customer Insights Function"
                code={`CREATE OR REPLACE FUNCTION ${workshopCatalog}.default.get_customer_insights(
  input_customer_id STRING COMMENT 'The customer ID to analyze (format: C0001, C0002, etc.)'
)
RETURNS TABLE
COMMENT 'Returns comprehensive customer analytics including lifetime value, purchase frequency, recency, and product preferences. Use this to understand customer behavior and identify upsell opportunities.'
RETURN
  SELECT
    c.customer_id,
    c.customer_name,
    c.email,
    c.region,
    c.signup_date,
    COUNT(s.sale_id) as total_orders,
    SUM(s.revenue) as lifetime_value,
    AVG(s.revenue) as avg_order_value,
    MAX(s.sale_date) as last_purchase_date,
    DATEDIFF(CURRENT_DATE(), MAX(s.sale_date)) as days_since_last_purchase,
    COUNT(DISTINCT p.category) as categories_purchased
  FROM ${workshopCatalog}.default.customers c
  LEFT JOIN ${workshopCatalog}.default.sales s ON c.customer_id = s.customer_id
  LEFT JOIN ${workshopCatalog}.default.products p ON s.product_id = p.product_id
  WHERE c.customer_id = input_customer_id
  GROUP BY c.customer_id, c.customer_name, c.email, c.region, c.signup_date;`}
              />
            </div>

            <InfoBox type="success" title="Functions Created! 🎉">
              <p className="mb-3">Your Unity Catalog functions are now available as MCP tools at:</p>
              <code className="block p-3 bg-emerald-100 rounded-lg text-emerald-900 font-mono text-sm">
                https://&lt;workspace-hostname&gt;/api/2.0/mcp/functions/{workshopCatalog}/default
              </code>
              <p className="mt-4 text-sm">These functions will automatically appear as available tools when you connect an AI agent to this MCP endpoint.</p>
              <div className="mt-4 pt-4 border-t border-emerald-200">
                <p className="text-sm font-semibold mb-2">Key Takeaway:</p>
                <p className="text-sm">The LLM reads your COMMENT clauses to decide when and how to call each function. Clear documentation = better agent performance!</p>
                <p className="text-xs mt-3 text-slate-600">
                  📚 Deep dive: <a href="https://community.databricks.com/t5/technical-blog/a-how-to-guide-on-uc-functions-with-agents-in-databricks/ba-p/118900" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">How-to Guide on UC Functions with Agents</a>
                </p>
              </div>
            </InfoBox>

            <div className="border-t-2 border-slate-200 pt-6 mt-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-4">Test Your Functions in AI Playground</h3>
              <p className="text-lg text-slate-700 leading-relaxed mb-6">
                Before moving on, let's verify that your functions work correctly and that an LLM can use them effectively.
                We'll use AI Playground to quickly test the functions with real queries.
              </p>

              <div className="space-y-4 mb-6">
                <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">1</span>
                    <h4 className="text-lg font-bold text-slate-900">Open AI Playground</h4>
                  </div>
                  <p className="text-slate-700 ml-11">
                    Navigate to <strong>AI Playground</strong> in your Databricks workspace sidebar and select a model with the <strong>"Tools enabled"</strong> label (e.g., Claude Sonnet 4 or GPT-OSS).
                  </p>
                </div>

                <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">2</span>
                    <h4 className="text-lg font-bold text-slate-900">Add Your Schema as Tools</h4>
                  </div>
                  <div className="ml-11">
                    <p className="text-slate-700 mb-3">
                      Click <strong>Tools → + Add tool → Hosted Function</strong>. Instead of selecting individual functions,
                      select your entire schema to add all four functions at once:
                    </p>
                    <code className="block p-3 bg-white rounded-lg text-slate-800 font-mono text-sm border border-blue-200">
                      {workshopCatalog}.default
                    </code>
                    <p className="text-sm text-slate-600 mt-2">
                      This will automatically add all functions in the schema as available tools for the LLM to use.
                    </p>
                  </div>
                </div>

                <div className="border-2 border-blue-200 rounded-xl p-6 bg-blue-50">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm">3</span>
                    <h4 className="text-lg font-bold text-slate-900">Test with Queries</h4>
                  </div>
                  <div className="ml-11">
                    <p className="text-slate-700 mb-4">Try these test queries to verify your functions work correctly:</p>

                    <div className="space-y-4">
                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <p className="font-semibold text-slate-900 mb-2">Test Query 1: Customer Insights</p>
                        <code className="block p-3 bg-slate-50 rounded text-slate-800 font-mono text-sm mb-3">
                          "What might be a good upsell offer for customer C0015?"
                        </code>
                        <div className="text-xs text-slate-600">
                          <p className="font-semibold mb-1">Expected behavior:</p>
                          <ul className="list-disc ml-5 space-y-1">
                            <li>LLM should call <code className="bg-slate-200 px-1 py-0.5 rounded">get_customer_insights("C0015")</code></li>
                            <li>May also call <code className="bg-slate-200 px-1 py-0.5 rounded">get_customer_orders("C0015")</code> to see purchase history</li>
                            <li>Should analyze the customer's purchase patterns and lifetime value</li>
                            <li>Provides personalized upsell recommendations based on their data</li>
                          </ul>
                        </div>
                      </div>

                      <div className="bg-white rounded-lg p-4 border border-blue-200">
                        <p className="font-semibold text-slate-900 mb-2">Test Query 2: Product Performance</p>
                        <code className="block p-3 bg-slate-50 rounded text-slate-800 font-mono text-sm mb-3">
                          "What are the highest priced sporting items?"
                        </code>
                        <div className="text-xs text-slate-600">
                          <p className="font-semibold mb-1">Expected behavior:</p>
                          <ul className="list-disc ml-5 space-y-1">
                            <li>LLM should call <code className="bg-slate-200 px-1 py-0.5 rounded">get_product_performance("Sports")</code></li>
                            <li>Should understand "sporting items" maps to the "Sports" category</li>
                            <li>Returns product performance data sorted by price</li>
                            <li>May highlight products with high prices and their sales performance</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <InfoBox type="tip" title="What to Look For">
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span><strong>Correct function calls:</strong> Check that the LLM is calling the right functions with appropriate parameters</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span><strong>Parameter understanding:</strong> The LLM should understand natural language queries and map them to the correct parameter values (e.g., "sporting items" → "Sports")</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span><strong>Results interpretation:</strong> The LLM should provide meaningful insights based on the data returned</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-blue-600 mt-0.5">✓</span>
                    <span><strong>Error handling:</strong> If a function fails, check the error message to debug any issues with your SQL</span>
                  </li>
                </ul>
              </InfoBox>
            </div>
          </div>
        </WorkshopStep>

        <WorkshopStep number={3} title="Set Up Genie Space for Natural Language Queries">
          <div className="space-y-6">
            {/* What is Genie */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-xl p-6 border-2 border-indigo-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">🧞 What is Genie?</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Genie</strong> is Databricks' AI-powered business intelligence tool that lets business users ask questions about their data in natural language. 
                It uses a <strong>compound AI system</strong> to translate business questions into SQL queries and return results with visualizations.
              </p>
              <p className="text-slate-700 leading-relaxed">
                Genie spaces are configured with datasets, column descriptions, sample queries, and business-specific instructions that help it understand your organization's terminology and data relationships.
              </p>
              <p className="text-xs text-slate-600 mt-3">
                Learn more: <a href="https://docs.databricks.com/aws/en/genie/" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">What is an AI/BI Genie space</a>
              </p>
            </div>

            {/* Genie as MCP Tool */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl p-6 border-2 border-green-200">
              <h3 className="text-xl font-bold text-slate-900 mb-4">🎯 Why Genie as an MCP Tool Changes Everything</h3>
              <p className="text-slate-700 leading-relaxed mb-4">
                <strong>Genie excels at answering "WHAT" questions</strong> - descriptive analytics like "What are our top products?" or "Which region has the most sales?"
              </p>
              <p className="text-slate-700 leading-relaxed mb-4">
                But when you expose Genie as an MCP tool, <strong>LLMs can make multiple sequential Genie calls</strong> to answer complex "HOW" and "WHY" questions that require analytical reasoning across your data.
              </p>
              
              <div className="bg-white rounded-lg p-5 border border-green-200 mt-4">
                <h4 className="font-bold text-slate-900 mb-3">Example: Complex Multi-Step Analysis</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex items-start gap-3">
                    <span className="text-blue-600 font-bold">❓</span>
                    <div>
                      <p className="font-semibold text-slate-900">"Why did sales decline in Q3, and what should we do about it?"</p>
                    </div>
                  </div>
                  <div className="ml-6 space-y-2 text-slate-600">
                    <p><strong>→ Step 1:</strong> "What were Q3 sales vs Q2?" (Genie call #1)</p>
                    <p><strong>→ Step 2:</strong> "Which product categories declined?" (Genie call #2)</p>
                    <p><strong>→ Step 3:</strong> "Which regions showed the biggest drop?" (Genie call #3)</p>
                    <p><strong>→ Step 4:</strong> "What customer segments were affected?" (Genie call #4)</p>
                    <p className="pt-2 font-semibold text-green-700">💡 Then synthesizes insights and recommendations</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 p-4 bg-emerald-100 rounded-lg border border-emerald-300">
                <p className="text-sm text-emerald-900">
                  <strong>🚀 The Power:</strong> This transforms Genie from a question-answering tool into an <strong>enhanced business analytics engine</strong> that can help you understand trends, diagnose problems, and plan strategies.
                </p>
              </div>
            </div>

            <InfoBox type="warning" title="Manual Setup Required">
              <p>Genie spaces cannot be created programmatically. Follow these steps in your Databricks workspace to create your Genie space.</p>
            </InfoBox>

            <div className="space-y-4">
              <div className="border-2 border-slate-200 rounded-xl p-6 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-sm">1</span>
                  <h4 className="text-lg font-bold text-slate-900">Navigate to Genie</h4>
                </div>
                <p className="text-slate-700 ml-11">
                  In your Databricks workspace, go to the sidebar and click on <strong>Genie</strong>.
                </p>
              </div>

              <div className="border-2 border-slate-200 rounded-xl p-6 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-sm">2</span>
                  <h4 className="text-lg font-bold text-slate-900">Create New Space</h4>
                </div>
                <p className="text-slate-700 ml-11">
                  Click <strong>"Create Genie space"</strong> and name it <code className="bg-slate-200 px-2 py-1 rounded text-slate-800">MCP Workshop Space</code>.
                </p>
              </div>

              <div className="border-2 border-slate-200 rounded-xl p-6 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-sm">3</span>
                  <h4 className="text-lg font-bold text-slate-900">Add Your Tables</h4>
                </div>
                <p className="text-slate-700 ml-11 mb-3">Add your workshop tables to the Genie space:</p>
                <ul className="ml-11 space-y-2">
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-slate-400 rounded-full"></span>
                    <code className="bg-slate-200 px-2 py-1 rounded text-slate-800 text-sm">{workshopCatalog}.default.products</code>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-slate-400 rounded-full"></span>
                    <code className="bg-slate-200 px-2 py-1 rounded text-slate-800 text-sm">{workshopCatalog}.default.customers</code>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 bg-slate-400 rounded-full"></span>
                    <code className="bg-slate-200 px-2 py-1 rounded text-slate-800 text-sm">{workshopCatalog}.default.sales</code>
                  </li>
                </ul>
              </div>

              <div className="border-2 border-slate-200 rounded-xl p-6 bg-white">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-sm">4</span>
                  <h4 className="text-lg font-bold text-slate-900">Configure Instructions</h4>
                </div>
                <p className="text-slate-700 ml-11 mb-3">Add these instructions to help Genie understand your data:</p>
                <div className="ml-11">
                  <CodeBlock
                    language="text"
                    title="Genie Instructions"
                    code={`This dataset contains e-commerce data with three main tables:

1. Products: Contains product information including names, categories, and prices
2. Customers: Contains customer information including regions and signup dates  
3. Sales: Contains transaction data linking customers to products with quantities and revenue

When answering questions:
- Always include relevant context about time periods
- Format monetary values with currency symbols
- Provide insights about trends when showing data
- Suggest follow-up questions when appropriate

Common questions users might ask:
- "What are our top-selling products?"
- "Which region generates the most revenue?"
- "Show me sales trends over time"
- "What's the average order value by customer segment?"`}
                  />
                </div>
              </div>
            </div>

            <InfoBox type="tip" title="Test Your Genie Space">
              <p>Try asking questions like:</p>
              <ul className="mt-3 space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">💬</span>
                  "What are the top 5 products by revenue?"
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">💬</span>
                  "Which region has the most customers?"
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-emerald-600">💬</span>
                  "Show me sales trends by category"
                </li>
              </ul>
            </InfoBox>

            <div>
              <p className="text-slate-700 mb-4">
                Once your Genie space is created, note the space ID from the URL. You'll use it to access the MCP endpoint:
              </p>
              <CodeBlock
                language="text"
                title="Genie MCP Endpoint"
                code={`https://<workspace-hostname>/api/2.0/mcp/genie/{genie_space_id}`}
              />
            </div>
          </div>
        </WorkshopStep>

        <WorkshopStep number={4} title="Prototype Your Agent in AI Playground">
          <div className="space-y-6">
            <p className="text-lg text-slate-700 leading-relaxed">
              Now let's test our MCP tools by creating an agent in AI Playground. This gives us a visual way to 
              prototype and test our agent before deploying it.
            </p>

            <div className="bg-blue-50 rounded-xl p-6 border-2 border-blue-200">
              <h4 className="text-lg font-bold text-blue-900 mb-3">🎯 Agent Goal</h4>
              <p className="text-blue-800">
                Create a customer service agent that can look up customer information, analyze order history, 
                and answer business questions using natural language.
              </p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Set Up AI Playground Agent</h4>
              
              <div className="space-y-4">
                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <h5 className="font-bold text-slate-900 mb-2">Step 1: Open AI Playground</h5>
                  <p className="text-slate-700 text-sm">
                    Navigate to <strong>AI Playground</strong> in your Databricks workspace and select a model with the <strong>"Tools enabled"</strong> label.
                  </p>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <h5 className="font-bold text-slate-900 mb-2">Step 2: Add Unity Catalog Functions</h5>
                  <p className="text-slate-700 text-sm mb-3">
                    Click <strong>Tools → + Add tool</strong> and select <strong>Hosted Function</strong>. Add your personalized functions:
                  </p>
                  <ul className="text-sm text-slate-600 space-y-1 ml-4">
                    <li>• <code>{workshopCatalog}.default.get_customer_orders</code></li>
                    <li>• <code>{workshopCatalog}.default.get_product_performance</code></li>
                    <li>• <code>{workshopCatalog}.default.get_regional_sales</code></li>
                    <li>• <code>{workshopCatalog}.default.get_customer_insights</code></li>
                  </ul>
                </div>

                <div className="border border-slate-200 rounded-lg p-4 bg-slate-50">
                  <h5 className="font-bold text-slate-900 mb-2">Step 3: Add Genie Space as (Databricks Managed) MCP Server</h5>
                  <p className="text-slate-700 text-sm">
                    Add your Genie space as another tool by clicking on <strong>Tools → + Add tool</strong> and select <strong>MCP Servers</strong>. Add your personalized Genie Space from the dropdown.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4">Test Your Agent with These Scenarios</h4>
              <p className="text-slate-700 mb-6">
                Let's test different capabilities systematically, from simple tool calls to complex multi-step reasoning:
              </p>
              
              {/* Test 1: UC Function */}
              <div className="border-2 border-purple-200 rounded-xl p-6 mb-6 bg-purple-50">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-purple-600 text-white font-bold">1</span>
                  <h5 className="text-lg font-bold text-slate-900">Test UC Function Call</h5>
                </div>
                <div className="bg-white rounded-lg p-4 border border-purple-200">
                  <p className="font-mono text-sm text-slate-700 mb-3">💬 "Show me the complete order history for customer C0001"</p>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p><strong>Expected behavior:</strong> Agent calls <code className="bg-slate-200 px-1 py-0.5 rounded">get_customer_orders()</code></p>
                    <p><strong>What you'll see:</strong> Direct database query returning customer's purchase history with product details</p>
                    <p><strong>Why this matters:</strong> Tests precise, structured data retrieval for specific business entities</p>
                  </div>
                </div>
              </div>

              {/* Test 2: Simple Genie */}
              <div className="border-2 border-blue-200 rounded-xl p-6 mb-6 bg-blue-50">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white font-bold">2</span>
                  <h5 className="text-lg font-bold text-slate-900">Test Simple Genie Query</h5>
                </div>
                <div className="bg-white rounded-lg p-4 border border-blue-200">
                  <p className="font-mono text-sm text-slate-700 mb-3">💬 "What are the top 5 products by revenue?"</p>
                  <div className="text-xs text-slate-600 space-y-1">
                    <p><strong>Expected behavior:</strong> Agent calls Genie space with natural language question</p>
                    <p><strong>What you'll see:</strong> Genie translates to SQL, returns aggregated results with product rankings</p>
                    <p><strong>Why this matters:</strong> Tests Genie's ability to answer descriptive "WHAT" questions</p>
                  </div>
                </div>
              </div>

              {/* Test 3: Complex Multi-Step Genie */}
              <div className="border-2 border-green-200 rounded-xl p-6 mb-6 bg-green-50">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-green-600 text-white font-bold">3</span>
                  <h5 className="text-lg font-bold text-slate-900">Test Complex Multi-Step Analysis</h5>
                </div>
                <div className="bg-white rounded-lg p-4 border border-green-200">
                  <p className="font-mono text-sm text-slate-700 mb-3">💬 "Which product categories are growing the fastest, and which regions are driving that growth? Should we invest more in those regions?"</p>
                  <div className="text-xs text-slate-600 space-y-1 mb-4">
                    <p><strong>Expected behavior:</strong> Agent makes <strong>multiple sequential Genie calls</strong> to gather insights:</p>
                    <div className="ml-4 mt-2 space-y-1 text-xs">
                      <p>→ Call #1: "Show me revenue growth by product category"</p>
                      <p>→ Call #2: "For the fastest growing categories, break down by region"</p>
                      <p>→ Call #3: "What's the current market penetration in those regions?"</p>
                      <p>→ Then synthesizes findings into strategic recommendations</p>
                    </div>
                  </div>
                  <div className="bg-green-100 rounded p-3 border border-green-300">
                    <p className="text-xs text-green-900">
                      <strong>🎯 This is the magic moment!</strong> Watch the agent orchestrate multiple Genie calls to answer "WHY" and "HOW" questions that require analytical reasoning.
                    </p>
                  </div>
                </div>
              </div>

              {/* Test 4: Hybrid */}
              <div className="border-2 border-orange-200 rounded-xl p-6 bg-orange-50">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-orange-600 text-white font-bold">4</span>
                  <h5 className="text-lg font-bold text-slate-900">Test Hybrid Approach (UC Functions + Genie)</h5>
                </div>
                <div className="bg-white rounded-lg p-4 border border-orange-200">
                  <p className="font-mono text-sm text-slate-700 mb-3">💬 "Customer C0025 is asking about our Electronics bestsellers. Show me their past purchases and recommend products they might like."</p>
                  <div className="text-xs text-slate-600 space-y-1 mb-4">
                    <p><strong>Expected behavior:</strong> Agent combines both tools strategically:</p>
                    <div className="ml-4 mt-2 space-y-1 text-xs">
                      <p>→ <strong>UC Function:</strong> <code className="bg-slate-200 px-1 py-0.5 rounded">get_customer_orders("C0025")</code> for precise customer history</p>
                      <p>→ <strong>UC Function:</strong> <code className="bg-slate-200 px-1 py-0.5 rounded">get_customer_insights("C0025")</code> for behavioral patterns</p>
                      <p>→ <strong>Genie:</strong> "What are the top Electronics products by revenue?" for recommendations</p>
                      <p>→ Then creates personalized product recommendations</p>
                    </div>
                  </div>
                  <div className="bg-orange-100 rounded p-3 border border-orange-300">
                    <p className="text-xs text-orange-900">
                      <strong>💡 Real-world scenario:</strong> This mimics actual customer service workflows where you need both specific customer data (UC Functions) and general business insights (Genie).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <InfoBox type="info" title="AI Playground Benefits">
              <p>Using AI Playground for prototyping gives you:</p>
              <ul className="mt-3 space-y-2">
                <li>• <strong>Visual testing environment</strong> - See how your agent behaves in real-time</li>
                <li>• <strong>Tool selection interface</strong> - Easily add/remove tools to test different combinations</li>
                <li>• <strong>Export capability</strong> - Generate Python code for deployment when ready</li>
                <li>• <strong>Iteration speed</strong> - Quickly test different prompts and tool configurations</li>
              </ul>
            </InfoBox>
          </div>
        </WorkshopStep>

        {/* Next Steps */}
        <div className="mt-16 p-8 rounded-2xl border-2 border-sky-200 bg-sky-50">
          <h3 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
            🎉 Section Complete!
          </h3>
          <p className="text-lg text-slate-700 mb-6 leading-relaxed">
            You now have a complete customer service agent with access to both structured data queries (Unity Catalog functions) 
            and natural language analytics (Genie space). Your agent can handle complex customer inquiries with enterprise-grade security.
          </p>
          
          <h4 className="text-lg font-bold text-slate-900 mb-4">What You've Accomplished</h4>
          <ul className="space-y-3 text-slate-700 mb-8">
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">✓</span>
              Created Unity Catalog functions that automatically become MCP tools
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">✓</span>
              Set up Genie space for natural language data queries
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">✓</span>
              Prototyped and tested your agent in AI Playground
            </li>
            <li className="flex items-start gap-3">
              <span className="text-green-600 mt-1">✓</span>
              Learned how to export agents for production deployment
            </li>
          </ul>

          <div className="flex flex-wrap gap-4">
            <a
              href="/external-mcp"
              className="inline-flex items-center gap-2 rounded-lg bg-sky-600 px-6 py-3 text-lg font-bold text-white hover:bg-sky-700 transition-colors shadow-lg"
            >
              Next: External MCP
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="https://docs.databricks.com/aws/en/generative-ai/mcp/managed-mcp"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-lg font-bold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              Official Docs
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <a
              href="https://docs.databricks.com/aws/en/generative-ai/agent-framework/ai-playground-agent"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-lg border-2 border-slate-300 bg-white px-6 py-3 text-lg font-bold text-slate-700 hover:border-slate-400 hover:bg-slate-50 transition-colors"
            >
              AI Playground Guide
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