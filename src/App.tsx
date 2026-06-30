import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import InteractivePlayground from "./components/InteractivePlayground";
import Benchmarks from "./components/Benchmarks";
import Footer from "./components/Footer";
import Docs from "./components/Docs";
import { ArrowUpRight, Zap, Terminal, Layers, Star, Cpu, Shield, HelpCircle, Code } from "lucide-react";

export default function App() {
  const [view, setView] = useState<"home" | "docs">("home");
  const [activeSection, setActiveSection] = useState<string>("hero");

  // Track scroll position to update active navbar state
  useEffect(() => {
    if (view !== "home") return;
    const handleScroll = () => {
      const sections = ["hero", "features", "sandbox", "benchmarks", "ecosystem"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [view]);

  const handleNavigate = (sectionId: string) => {
    if (view !== "home") {
      setView("home");
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
          setActiveSection(sectionId);
        }
      }, 100);
    } else {
      const el = document.getElementById(sectionId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        setActiveSection(sectionId);
      }
    }
  };

  if (view === "docs") {
    return <Docs onBackToHome={() => setView("home")} />;
  }

  return (
    <div className="min-h-screen bg-[#0b0f19] text-slate-100 flex flex-col selection:bg-blue-500/30 selection:text-blue-300">
      
      {/* Translucent Global Accent Light overlay */}
      <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[400px] radial-glow rounded-full pointer-events-none filter blur-3xl opacity-40 z-0" />

      {/* Floating Header Navbar */}
      <Navbar onNavigate={handleNavigate} activeSection={activeSection} currentView={view} onViewChange={setView} />

      {/* Main content blocks */}
      <main className="flex-1 relative z-10">
        
        {/* HERO SECTION */}
        <Hero onGetStarted={() => handleNavigate("sandbox")} onReadDocs={() => setView("docs")} />

        {/* FEATURES SECTION WITH TABS */}
        <Features />

        {/* INTERACTIVE CODING TUTORIAL SANDBOX */}
        <InteractivePlayground />

        {/* PERFORMANCE COMPARISON BENCHMARKS */}
        <Benchmarks />

        {/* ECOSYSTEM INTEGRATION BANNER */}
        <section id="ecosystem" className="py-24 relative overflow-hidden bg-[#0b0f19] border-t border-slate-900">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 radial-glow-cyan rounded-full pointer-events-none filter blur-2xl opacity-20" />
          
          <div className="max-w-7xl mx-auto px-6 relative z-10">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight">
                Designed to run anywhere
              </h2>
              <p className="mt-4 text-slate-400 text-sm sm:text-base font-normal">
                MicroJet compiles standard Python async routers. Run it seamlessly across ASGI servers, serverless containers, or production clusters.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto" id="ecosystem-cards">
              
              {/* Card 1: Python 3.10+ */}
              <div className="p-6 rounded-xl bg-slate-900/10 border border-slate-800/60 hover:border-slate-700 transition-all group flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-950/40 border border-blue-900/40 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                    Py
                  </div>
                  <h4 className="mt-4 font-semibold text-white group-hover:text-blue-300 transition-colors">
                    Python 3.10+ & PyPy
                  </h4>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                    Fully compatible with standard Python modules and asyncio. Runs with maximum efficiency on PyPy compilers.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Compatible
                </div>
              </div>

              {/* Card 2: ASGI */}
              <div className="p-6 rounded-xl bg-slate-900/10 border border-slate-800/60 hover:border-slate-700 transition-all group flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-950/40 border border-blue-900/40 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                    ASGI
                  </div>
                  <h4 className="mt-4 font-semibold text-white group-hover:text-blue-300 transition-colors">
                    ASGI Engine Native
                  </h4>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                    Achieve extreme performance gains by binding directly to standard ASGI specification servers.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Highly Optimized
                </div>
              </div>

              {/* Card 3: Cloud Run */}
              <div className="p-6 rounded-xl bg-slate-900/10 border border-slate-800/60 hover:border-slate-700 transition-all group flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-950/40 border border-blue-900/40 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                    Cloud
                  </div>
                  <h4 className="mt-4 font-semibold text-white group-hover:text-blue-300 transition-colors">
                    Serverless & Containers
                  </h4>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                    Sub-2ms cold-start boot ensures zero lag inside autoscaled Google Cloud Run or AWS Lambda containers.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  Compatible
                </div>
              </div>

              {/* Card 4: WebSockets */}
              <div className="p-6 rounded-xl bg-slate-900/10 border border-slate-800/60 hover:border-slate-700 transition-all group flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-lg bg-blue-950/40 border border-blue-900/40 text-blue-400 flex items-center justify-center font-mono font-bold text-xs">
                    WS
                  </div>
                  <h4 className="mt-4 font-semibold text-white group-hover:text-blue-300 transition-colors">
                    High-Frequency Sockets
                  </h4>
                  <p className="mt-2 text-xs text-slate-500 leading-relaxed font-normal">
                    First-class real-time pub/sub features for web applications, live dashboards, or async telemetry APIs.
                  </p>
                </div>
                <div className="mt-4 flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                  Interactive
                </div>
              </div>

            </div>

            {/* Micro FAQ block for extra developer reassurance */}
            <div className="mt-20 max-w-3xl mx-auto border border-slate-800 bg-[#0f1423] rounded-xl p-6 sm:p-8 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 radial-glow rounded-full pointer-events-none filter blur-lg opacity-10" />
              <div className="flex items-center gap-2 mb-4">
                <HelpCircle className="w-4.5 h-4.5 text-blue-400" />
                <h4 className="text-sm font-semibold text-white font-display uppercase tracking-wider">
                  Developer Frequently Asked Questions
                </h4>
              </div>
              
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="border-b border-slate-900/50 pb-4">
                  <h5 className="font-semibold text-white">How does MicroJet achieve such speed?</h5>
                  <p className="text-slate-400 font-normal mt-1 text-xs leading-relaxed">
                    MicroJet compiles Pydantic validations directly into optimized bytecode checks. It uses a cache-aligned radix tree structure for O(k) path traversal, completely bypassing routing heap-allocation overhead typical in traditional FastAPI or Flask servers.
                  </p>
                </div>
                <div>
                  <h5 className="font-semibold text-white">Is it fully production ready?</h5>
                  <p className="text-slate-400 font-normal mt-1 text-xs leading-relaxed">
                    Yes, MicroJet is fully covered with comprehensive unit and stress validation pipelines. It handles gracefully nested router boundaries, automatic multi-process cluster scaling, and ASGI payload boundaries, providing enterprise-grade reliability in production.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </section>

      </main>

      {/* Modern footer with navigation links */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
