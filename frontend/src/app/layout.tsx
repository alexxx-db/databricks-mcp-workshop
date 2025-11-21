import type { Metadata } from "next";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Databricks MCP Workshop",
  description: "A comprehensive workshop to learn about Databricks Model Context Protocol",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="bg-true-white text-dark-navy antialiased">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />

          {/* Main Content */}
          <main className="flex-1 overflow-hidden bg-true-white">
            {/* Mobile Header */}
            <header className="lg:hidden border-b border-warm-gray/20 bg-true-white px-4 py-3 shadow-sm">
              <Link href="/" className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-md bg-dark-navy flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-sm">DB</span>
                </div>
                <div>
                  <h1 className="text-lg font-bold text-dark-navy">MCP Workshop</h1>
                </div>
              </Link>
            </header>

            {/* Content Area */}
            <div className="h-full overflow-y-auto bg-true-white text-dark-navy">
              {children}
            </div>
          </main>
        </div>
      </body>
    </html>
  );
}