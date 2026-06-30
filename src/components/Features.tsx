import { useState } from "react";
import { Zap, Shield, Cpu, Box, Check, Terminal, Layers, Sparkles } from "lucide-react";
import { InteractiveTab, Feature } from "../types";

export default function Features() {
  const [activeTab, setActiveTab] = useState<string>("routing");

  const tabs: InteractiveTab[] = [
    {
      id: "routing",
      tabLabel: "Ultra-Fast Routing",
      title: "Radix-Tree High-Speed Router",
      subtitle: "Route matching at O(k) complexity",
      description: "MicroJet utilizes a customized radix tree algorithm designed for minimal path-traversal overhead. Match static, parameterized, and wildcard Python routes with zero allocation in the hot path.",
      featuresList: [
        "Parameter extraction with zero-copy substring views",
        "Deterministic routing priority with custom filters",
        "Nested sub-router mounts with inherited middlewares",
        "Supports HTTP/2 and WebSockets ASGI routing out-of-the-box"
      ],
      codeSnippet: `from microjet import MicroJet
app = MicroJet()

# Parameterized route matching instantly
@app.get("/api/v1/users/{userId}/posts/{postId}")
async def get_post(userId: str, postId: str):
    return {"userId": userId, "postId": postId}

# Wildcard routing with catch-all handlers
@app.get("/static/{path:path}")
async def serve_static(path: str):
    return f"Serving asset: {path}"`
    },
    {
      id: "validation",
      tabLabel: "Type-Safe Validation",
      title: "Zero-Overhead Schema Validation",
      subtitle: "No manual parsing, compile-time safe",
      description: "Declare request structures using standard Pydantic models. MicroJet validates incoming JSON objects, query strings, and headers, compiling assertions to optimized Python bytecode.",
      featuresList: [
        "Inferred static typing directly from schemas",
        "Ultra-fast custom deserialization compiled on launch",
        "Support for standard Pydantic Field restrictions",
        "Detailed, developer-friendly validation error payloads"
      ],
      codeSnippet: `from microjet import MicroJet
from pydantic import BaseModel, Field
from uuid import UUID

app = MicroJet()

class OrderSchema(BaseModel):
    id: UUID
    quantity: int = Field(..., gt=0)
    notes: str | None = None

# Input payload is fully validated before function execution
@app.post("/api/orders", schema=OrderSchema)
async def create_order(order: OrderSchema):
    # order is parsed and typed fully
    return {"success": True, "orderId": str(order.id)}`
    },
    {
      id: "clustering",
      tabLabel: "Dynamic Clustering",
      title: "Automatic Multi-Process Scaling",
      subtitle: "Saturate every thread effortlessly",
      description: "Scale your Python APIs horizontally across all available hardware cores. MicroJet orchestrates native worker processes with zero-downtime hot-reloads and shared state synchronization.",
      featuresList: [
        "Automatic core count detection with custom process caps",
        "Shared state storage with atomic lock-free structures",
        "Zero-downtime hot reload - swap logic without losing requests",
        "Isolated error recovery - crashed worker processes reboot instantly"
      ],
      codeSnippet: `from microjet import MicroJet
app = MicroJet()

@app.get("/api/ping")
async def ping():
    return "pong"

# Deploy cluster mode with a single line of code
app.run(
    workers="auto", # Spawns process per CPU core
    graceful_shutdown_ms=5000,
    sync_state=True # Dynamic sync across worker processes
)`
    },
    {
      id: "footprint",
      tabLabel: "Tiny Footprint",
      title: "Extremely Lightweight Architecture",
      subtitle: "Zero-dependency build packaged standalone",
      description: "A framework engineered with strict architectural discipline. MicroJet features zero runtime dependencies outside standard library modules, providing high resilience and faster serverless cold-starts.",
      featuresList: [
        "Zero runtime external PIP dependencies required",
        "Standalone pyinstaller deployment compatible",
        "Cold starts of less than 2ms - optimized for Serverless / Cloud Run",
        "Hardened security surface area - no supply chain leaks"
      ],
      codeSnippet: `# MicroJet relies purely on high-performance native Python C-extensions.
# To run, package, and deploy, you only need main.py!

from microjet import MicroJet
app = MicroJet()

@app.get("/")
async def index():
    return "Minimal. Mighty."

app.run(port=3000)

# CLI Packager stats:
# [Build] Compiling api/main.py...
# [Build] Complete! Standalone executable: dist/api (8.4 MB)
# [Build] Zero third-party packages needed in production.`
    }
  ];

  const gridFeatures: Feature[] = [
    {
      id: "ai-forward",
      title: "AI-Forward Engineering",
      description: "Built-in SDK adapters, telemetry hooks, and fast context optimization for Gemini models and automated AI API agents.",
      icon: "Sparkles"
    },
    {
      id: "opinionated",
      title: "Opinionated & Versatile",
      description: "Modular controller layers, dependency injection, and clean class decorators that structure simple microservices into robust enterprise backends.",
      icon: "Layers"
    },
    {
      id: "high-perf",
      title: "High-Performance Core",
      description: "Features a dedicated native serialization layer that benchmarks up to 5x faster than native JSON.stringify for large payload responses.",
      icon: "Cpu"
    },
    {
      id: "fully-featured",
      title: "Production Ready Ecosystem",
      description: "Equipped with first-party modules for CORS, body parsers, cookie encryption, helmet-inspired security headers, and rate limiting.",
      icon: "Shield"
    }
  ];

  // Render icon dynamically helper
  const renderIcon = (iconName: string) => {
    switch (iconName) {
      case "Sparkles":
        return <Sparkles className="w-5 h-5 text-blue-400" />;
      case "Layers":
        return <Layers className="w-5 h-5 text-blue-500" />;
      case "Cpu":
        return <Cpu className="w-5 h-5 text-indigo-400" />;
      case "Shield":
        return <Shield className="w-5 h-5 text-blue-400" />;
      default:
        return <Box className="w-5 h-5 text-slate-400" />;
    }
  };

  const currentTab = tabs.find((t) => t.id === activeTab) || tabs[0];

  return (
    <section id="features" className="py-24 relative overflow-hidden bg-[#0b0f19]">
      {/* Decorative Diagonal Slashes Mesh */}
      <div className="absolute inset-0 slash-mesh-blue opacity-[0.15] pointer-events-none" />
      <div className="absolute inset-0 slash-mesh-white opacity-[0.08] pointer-events-none" />

      {/* Background decoration elements */}
      <div className="absolute top-1/2 left-0 w-80 h-80 radial-glow-cyan rounded-full pointer-events-none filter blur-3xl opacity-30" />
      <div className="absolute bottom-10 right-0 w-96 h-96 radial-glow rounded-full pointer-events-none filter blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Features that actually help you solve problems
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base font-normal">
            No fluff. Just pristine developer ergonomics, high performance structures, and extreme execution speed.
          </p>
        </div>

        {/* Tab Buttons bar - scrollable on mobile */}
        <div className="mt-12 flex justify-start md:justify-center overflow-x-auto pb-4 gap-2 md:gap-3 no-scrollbar scroll-smooth">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-shrink-0 px-6 py-2.5 text-xs sm:text-sm font-semibold rounded-lg border transition-all cursor-pointer ${
                activeTab === tab.id
                  ? "bg-white border-white text-slate-950 shadow-[0_0_15px_rgba(255,255,255,0.1)]"
                  : "bg-slate-900/60 border-slate-800/80 text-slate-400 hover:text-white hover:border-slate-700"
              }`}
              id={`tab-btn-${tab.id}`}
            >
              {tab.tabLabel}
            </button>
          ))}
        </div>

        {/* Tab Content Panel */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch" id="features-tab-content">
          
          {/* Detailed Description Panel */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-[#0f1423] border border-slate-800/80 rounded-xl p-6 sm:p-8 backdrop-blur-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 radial-glow-cyan rounded-full pointer-events-none filter blur-xl opacity-20" />
            
            <div>
              <span className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-widest block mb-2">
                {currentTab.subtitle}
              </span>
              <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
                {currentTab.title}
              </h3>
              <p className="mt-4 text-slate-400 font-normal text-sm sm:text-base leading-relaxed">
                {currentTab.description}
              </p>

              {/* Bullet checklist */}
              <ul className="mt-6 flex flex-col gap-3.5">
                {currentTab.featuresList.map((item, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-5 h-5 rounded-full bg-blue-950/80 border border-blue-900/60 flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-blue-400" />
                    </span>
                    <span className="text-slate-300 text-xs sm:text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quick performance indicator footer */}
            <div className="mt-8 pt-6 border-t border-slate-800/60 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800/80 flex items-center justify-center">
                <Zap className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <div className="text-xs font-semibold text-white">Engine Metric</div>
                <div className="text-[10px] font-mono text-slate-500 mt-0.5">Sub-millisecond routing traversal</div>
              </div>
            </div>
          </div>

          {/* Interactive Code Snippet Box */}
          <div className="lg:col-span-7 rounded-xl bg-slate-950 border border-slate-800/80 flex flex-col overflow-hidden shadow-xl min-h-[350px] lg:min-h-[450px]">
            {/* Code Box Header */}
            <div className="bg-[#0f1423] px-5 py-3.5 flex items-center justify-between border-b border-slate-800/80">
              <div className="flex items-center gap-1.5">
                <Terminal className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-mono text-slate-400 font-medium">main.py</span>
              </div>
              <div className="flex items-center gap-1 bg-slate-950 px-2.5 py-0.5 rounded text-[10px] font-mono text-slate-500 border border-slate-900">
                Python / ASGI
              </div>
            </div>

            {/* Code content block with light highlight logic */}
            <div className="flex-1 p-5 sm:p-6 overflow-x-auto font-mono text-xs sm:text-sm leading-relaxed text-slate-300 text-left bg-slate-950/50">
              <pre>{currentTab.codeSnippet}</pre>
            </div>
          </div>
        </div>

        {/* Dynamic features secondary grid: "Enabling you to build smarter and faster" */}
        <div className="mt-28">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="font-display font-bold text-2xl sm:text-3xl text-white tracking-tight">
              Enabling you to build smarter and faster
            </h3>
            <p className="mt-3 text-slate-400 text-sm font-normal">
              We did the heavy lifting so you can focus on building outstanding web API interfaces with Pydantic.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6" id="features-grid">
            {gridFeatures.map((feat) => (
              <div
                key={feat.id}
                className="group relative rounded-xl bg-slate-900/10 border border-slate-800/60 p-6 backdrop-blur-sm hover:bg-slate-900/30 hover:border-slate-700/80 transition-all duration-300"
                id={`feature-card-${feat.id}`}
              >
                <div className="w-10 h-10 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-center group-hover:border-blue-500/50 transition-colors">
                  {renderIcon(feat.icon)}
                </div>
                <h4 className="mt-5 font-display font-semibold text-lg text-white group-hover:text-blue-300 transition-colors">
                  {feat.title}
                </h4>
                <p className="mt-3 text-slate-400 text-xs sm:text-sm font-light leading-relaxed">
                  {feat.description}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
