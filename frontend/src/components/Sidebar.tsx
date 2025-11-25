"use client";

import { useState } from "react";
import Link from "next/link";

const navigationItems = [
  {
    href: "/managed-mcp",
    label: "Managed Servers",
    description: "Built-in MCP tools",
    icon: "🔧",
    steps: ["Unity Catalog Functions", "Genie Spaces", "Vector Search"]
  },
  {
    href: "/external-mcp",
    label: "External Servers", 
    description: "Third-party integrations",
    icon: "🔗",
    steps: ["HTTP Connections", "OAuth Setup", "AI Playground"]
  },
  {
    href: "/custom-mcp",
    label: "Custom Servers",
    description: "Build your own",
    icon: "⚙️", 
    steps: ["Server Development", "Databricks Apps", "Deployment"]
  },
  {
    href: "/local-ide",
    label: "Local IDE Setup",
    description: "Development environment", 
    icon: "💻",
    steps: ["Environment Setup", "Agent Building", "SDK Integration"]
  }
];

export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside className={`hidden lg:flex flex-col border-r border-dark-navy bg-dark-navy transition-all duration-300 sticky top-0 h-screen ${
      isCollapsed ? 'w-16' : 'w-80'
    }`}>
      <div className="flex h-full flex-col">
        {/* Header */}
        <div className="p-4 border-b border-white/10 flex items-center justify-between">
          <Link href="/" className={`block ${isCollapsed ? 'hidden' : ''}`}>
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-lg bg-innovation-orange flex items-center justify-center">
                <span className="text-white font-bold text-lg">DB</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">Prototyping with Confidence</h1>
                <p className="text-xs text-warm-gray">on Databricks</p>
              </div>
            </div>
          </Link>
          
          {isCollapsed && (
            <Link href="/" className="block">
              <div className="h-8 w-8 rounded-md bg-innovation-orange flex items-center justify-center">
                <span className="text-white font-bold text-sm">DB</span>
              </div>
            </Link>
          )}

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-md hover:bg-white/10 text-warm-gray hover:text-white transition-colors"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg 
              className={`h-4 w-4 transition-transform ${isCollapsed ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              strokeWidth={2} 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 space-y-3 overflow-y-auto ${isCollapsed ? 'p-2' : 'p-4'}`}>
          {navigationItems.map((item, index) => (
            <div key={item.href} className="space-y-2">
              <Link
                href={item.href}
                className={`group flex items-center rounded-lg border border-white/10 bg-white/5 hover:border-innovation-orange hover:bg-innovation-orange/20 transition-all ${
                  isCollapsed ? 'p-2 justify-center' : 'gap-3 p-3'
                }`}
                title={isCollapsed ? `${item.label} - ${item.description}` : ''}
              >
                <div className={`flex items-center justify-center rounded-md bg-white/10 text-white text-sm flex-shrink-0 ${
                  isCollapsed ? 'h-10 w-10' : 'h-8 w-8'
                }`}>
                  {item.icon}
                </div>
                {!isCollapsed && (
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-warm-gray/80">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <h3 className="text-sm font-semibold text-white truncate">{item.label}</h3>
                    </div>
                    <p className="text-xs text-warm-gray/70 truncate">{item.description}</p>
                  </div>
                )}
              </Link>
              
              {/* Sub-steps - only show when expanded */}
              {!isCollapsed && (
                <div className="ml-11 space-y-1">
                  {item.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="flex items-center gap-2 py-1">
                      <div className="h-1.5 w-1.5 rounded-full bg-warm-gray/50 flex-shrink-0"></div>
                      <span className="text-xs text-warm-gray/70 truncate">{step}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!isCollapsed && (
          <div className="p-4 border-t border-white/10">
            <div className="text-xs text-warm-gray/70 text-center">
              © {new Date().getFullYear()} Databricks
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
