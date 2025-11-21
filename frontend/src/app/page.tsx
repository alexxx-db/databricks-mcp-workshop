import Link from "next/link";

const workshopSections = [
  {
    title: "Managed MCP Servers",
    description: "Start here! Use Databricks' built-in MCP servers for Vector Search, Unity Catalog functions, and Genie spaces.",
    href: "/managed-mcp",
    icon: "🔧",
    color: "bg-teal",
    difficulty: "Beginner",
    duration: "30 mins",
    highlights: ["No setup required", "Production ready", "Secure by default"]
  },
  {
    title: "External MCP Servers", 
    description: "Connect to third-party MCP servers using Unity Catalog HTTP connections for seamless integration.",
    href: "/external-mcp",
    icon: "🔗", 
    color: "bg-green",
    difficulty: "Intermediate", 
    duration: "45 mins",
    highlights: ["HTTP connections", "OAuth integration", "Third-party tools"]
  },
  {
    title: "Custom MCP Servers",
    description: "Build and deploy your own MCP servers as Databricks Apps to create custom tools and integrations.", 
    href: "/custom-mcp",
    icon: "⚙️",
    color: "bg-innovation-orange",
    difficulty: "Advanced",
    duration: "60 mins", 
    highlights: ["Custom development", "Databricks Apps", "Full control"]
  },
  {
    title: "Local IDE Setup",
    description: "Set up your local development environment to work with Databricks MCP servers and build agents.",
    href: "/local-ide", 
    icon: "💻",
    color: "bg-burgundy",
    difficulty: "Intermediate",
    duration: "20 mins",
    highlights: ["Local development", "Agent building", "SDK integration"]
  }
];

export default function Home() {
  return (
    <div className="min-h-screen bg-true-white">
      <div className="max-w-6xl mx-auto px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-innovation-orange/30 bg-innovation-orange/5 px-4 py-2 text-sm text-innovation-orange font-medium mb-8">
            <span className="inline-flex h-2 w-2 rounded-full bg-innovation-orange animate-pulse"></span>
            Interactive Workshop • Copy-Paste Ready • Production Patterns
          </div>
          
          <h1 className="text-6xl font-bold text-dark-navy mb-8 leading-tight">
            Master Databricks<br />
            <span className="text-innovation-orange font-extrabold">
              Model Context Protocol
            </span>
          </h1>
          
          <p className="text-xl text-dark-navy/80 max-w-4xl mx-auto mb-10 leading-relaxed">
            Build intelligent agents that safely access data, tools, and custom services across Databricks. 
            Follow our hands-on workshop with real examples using your own data.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/managed-mcp"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-innovation-orange px-10 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-orange-dark hover:shadow-xl"
            >
              Start Workshop
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
            <Link
              href="#overview"
              className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-warm-gray bg-white px-10 py-4 text-lg font-semibold text-dark-navy transition hover:border-dark-navy hover:bg-warm-gray/10"
            >
              Learn More
            </Link>
          </div>
        </div>

        {/* Workshop Overview */}
        <section id="overview" className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-dark-navy mb-6">Workshop Structure</h2>
            <p className="text-lg text-dark-navy/70 max-w-3xl mx-auto leading-relaxed">
              This hands-on workshop guides you through building MCP-powered agents step by step, 
              from managed services to custom implementations.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {workshopSections.map((section, index) => (
              <Link
                key={section.href}
                href={section.href}
                className="group relative overflow-hidden rounded-2xl border-2 border-warm-gray/30 bg-white p-8 shadow-lg transition-all duration-300 hover:border-innovation-orange hover:shadow-2xl hover:shadow-innovation-orange/10 hover:-translate-y-1"
              >
                <div className="flex items-start gap-6 mb-6">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-xl text-3xl text-white shadow-lg ${section.color} flex-shrink-0`}>
                    {section.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-sm font-bold text-innovation-orange bg-innovation-orange/10 px-2 py-1 rounded">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-xl font-bold text-dark-navy">{section.title}</h3>
                    </div>
                    <p className="text-dark-navy/70 leading-relaxed">{section.description}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-dark-navy/5 px-3 py-1.5 text-sm font-medium text-dark-navy border border-dark-navy/10">
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {section.duration}
                  </span>
                  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm font-medium border ${
                    section.difficulty === 'Beginner' ? 'bg-green/15 text-green-dark border-green/30' :
                    section.difficulty === 'Intermediate' ? 'bg-yellow/15 text-yellow-dark border-yellow/30' :
                    'bg-innovation-orange/15 text-orange-dark border-innovation-orange/30'
                  }`}>
                    {section.difficulty}
                  </span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {section.highlights.map((highlight, i) => (
                    <span
                      key={i}
                      className="rounded-full border border-dark-navy/20 bg-dark-navy/5 px-3 py-1 text-xs font-medium text-dark-navy/80"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
                
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <svg className="h-6 w-6 text-innovation-orange" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Prerequisites */}
        <section className="mb-20">
          <div className="rounded-2xl border-2 border-slate-200 bg-slate-50 p-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-8">Prerequisites</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  Required
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700">
                    <svg className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Databricks workspace with Unity Catalog enabled</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <svg className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Basic SQL and Python knowledge</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <svg className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                    <span>Access to create catalogs and functions</span>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <span className="text-amber-600">+</span>
                  Optional
                </h4>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3 text-slate-700">
                    <svg className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Local development environment</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <svg className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Experience with REST APIs</span>
                  </li>
                  <li className="flex items-start gap-3 text-slate-700">
                    <svg className="h-5 w-5 text-amber-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>Familiarity with AI/ML concepts</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Getting Started */}
        <section className="text-center">
          <div className="rounded-2xl border-2 border-sky-200 bg-sky-50 p-10">
            <h3 className="text-3xl font-bold text-slate-900 mb-6">Ready to Begin?</h3>
            <p className="text-lg text-slate-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Start with Managed MCP Servers to get familiar with the concepts, then progress through 
              external integrations and custom development.
            </p>
            <Link
              href="/managed-mcp"
              className="inline-flex items-center justify-center gap-3 rounded-full bg-sky-600 px-10 py-4 text-lg font-bold text-white shadow-lg transition hover:bg-sky-700 hover:shadow-xl"
            >
              Begin Workshop
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}