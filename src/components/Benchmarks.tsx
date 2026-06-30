import { useState } from "react";
import { Activity, Zap, Cpu, BarChart3, HelpCircle } from "lucide-react";
import { BenchmarkData } from "../types";

export default function Benchmarks() {
  const [metric, setMetric] = useState<"throughput" | "latency" | "memory">("throughput");

  const benchmarkData: BenchmarkData[] = [
    { framework: "MicroJet (Python)", throughput: 142000, latency: 0.12, memory: 18, isMicroJet: true },
    { framework: "Sanic (ASGI)", throughput: 84000, latency: 0.32, memory: 38, isMicroJet: false },
    { framework: "FastAPI (Uvicorn)", throughput: 62000, latency: 0.45, memory: 48, isMicroJet: false },
    { framework: "Flask (Gunicorn)", throughput: 12000, latency: 2.15, memory: 26, isMicroJet: false },
    { framework: "Django (WSGI)", throughput: 8500, latency: 3.20, memory: 75, isMicroJet: false }
  ];

  // Maximum limits for normalization/scaling in the bar chart
  const maxValues = {
    throughput: 150000,
    latency: 4.0,
    memory: 100
  };

  const getMetricLabel = () => {
    switch (metric) {
      case "throughput":
        return "Throughput (requests/sec)";
      case "latency":
        return "Avg Latency (milliseconds)";
      case "memory":
        return "Memory Footprint (Megabytes)";
    }
  };

  const formatValue = (val: number) => {
    if (metric === "throughput") {
      return val.toLocaleString() + " reqs/s";
    } else if (metric === "latency") {
      return val.toFixed(2) + " ms";
    } else {
      return val + " MB";
    }
  };

  return (
    <section id="benchmarks" className="py-24 bg-slate-950/40 relative overflow-hidden border-t border-slate-900">
      {/* Background decorations */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] radial-glow-cyan rounded-full pointer-events-none filter blur-3xl opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs font-mono font-semibold text-blue-400 uppercase tracking-widest bg-blue-950/40 border border-blue-900/60 px-3.5 py-1.5 rounded-full inline-block mb-4">
            Proven Performance
          </span>
          <h2 className="font-display font-bold text-3xl sm:text-4xl md:text-5xl text-white tracking-tight leading-tight">
            Where performance matters
          </h2>
          <p className="mt-4 text-slate-400 text-sm sm:text-base font-light">
            Engineered from scratch to achieve maximal concurrency. Compare MicroJet against other industry standards.
          </p>
        </div>

        {/* Dynamic Controls & Visualization */}
        <div className="mt-14 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center" id="benchmarks-container">
          
          {/* Detailed benchmark explanation */}
          <div className="lg:col-span-5 space-y-6">
            <h3 className="font-display font-bold text-2xl text-white tracking-tight leading-tight">
              Saturate your CPU threads with zero waste
            </h3>
            <p className="text-slate-400 font-light text-sm sm:text-base leading-relaxed">
              Most frameworks waste precious memory allocations inside request handlers. MicroJet is designed with strict performance optimizations:
            </p>

            <div className="space-y-4">
              <div className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800/40 hover:border-slate-800 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-900 flex items-center justify-center flex-shrink-0">
                  <Cpu className="w-5 h-5 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Cache-Aligned Routing</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    Compact trie data structures fit snugly into the L1/L2 caches, guaranteeing sub-microsecond route lookups.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 p-4 rounded-xl bg-slate-900/30 border border-slate-800/40 hover:border-slate-800 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-blue-950 border border-blue-900 flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-white">Zero Garbage Collection Overhead</h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    By recycling buffer objects and string segments, MicroJet decreases GC pressure, avoiding sudden latency spikes.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Interactive Chart Panel */}
          <div className="lg:col-span-7 bg-slate-900/20 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-sm shadow-xl flex flex-col justify-between">
            
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800/60 pb-5 mb-6">
              <div>
                <h4 className="text-sm font-semibold text-white tracking-wide uppercase font-display">
                  System Benchmarks
                </h4>
                <p className="text-[11px] text-slate-500 mt-0.5 font-mono">
                  Environment: Ubuntu 22.04 LTS | 8-Core Intel vCPU
                </p>
              </div>

              {/* Metric Selector Tabs */}
              <div className="flex gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800/60">
                {(["throughput", "latency", "memory"] as const).map((m) => (
                  <button
                    key={m}
                    onClick={() => setMetric(m)}
                    className={`px-3 py-1.5 text-[10px] font-mono font-semibold rounded-lg capitalize transition-all cursor-pointer ${
                      metric === m
                        ? "bg-cyan-500 text-slate-950 font-bold"
                        : "text-slate-400 hover:text-white"
                    }`}
                    id={`benchmark-tab-${m}`}
                  >
                    {m === "throughput" ? "Speed" : m}
                  </button>
                ))}
              </div>
            </div>

            {/* Simulated Animated Bar Chart */}
            <div className="space-y-6" id="benchmark-bars">
              {benchmarkData.map((data) => {
                const value = data[metric];
                const max = maxValues[metric];
                // Invert percentage calculation for latency and memory (lower is better!)
                const isLowerBetter = metric === "latency" || metric === "memory";
                
                // Percent calculations
                let pct = (value / max) * 100;
                if (pct > 100) pct = 100;
                if (pct < 3) pct = 3; // minimal width for tiny values

                return (
                  <div key={data.framework} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className={`text-xs font-semibold ${data.isMicroJet ? "text-cyan-400 font-bold" : "text-slate-300"}`}>
                          {data.framework}
                        </span>
                        {data.isMicroJet && (
                          <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-cyan-950 border border-cyan-800 text-[9px] font-mono text-cyan-400 uppercase leading-none font-bold">
                            🏆 Fastest
                          </span>
                        )}
                      </div>
                      <span className={`text-xs font-mono font-semibold ${data.isMicroJet ? "text-cyan-400" : "text-slate-400"}`}>
                        {formatValue(value)}
                      </span>
                    </div>

                    {/* Bar container */}
                    <div className="h-6 bg-slate-950 rounded-lg overflow-hidden border border-slate-900 flex items-center relative">
                      <div
                        className={`h-full rounded-r-md transition-all duration-700 ease-out flex items-center justify-end pr-3 ${
                          data.isMicroJet
                            ? "bg-gradient-to-r from-blue-600/80 to-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] border-r-2 border-cyan-300"
                            : isLowerBetter 
                              ? "bg-slate-800/80 hover:bg-slate-700/80" 
                              : "bg-slate-800/40 hover:bg-slate-700/40"
                        }`}
                        style={{ width: `${pct}%` }}
                      >
                        {pct > 15 && data.isMicroJet && (
                          <span className="text-[9px] font-mono font-bold text-slate-950">
                            100%
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Note text */}
            <div className="mt-8 flex gap-2 items-start text-[10px] text-slate-500 bg-slate-950/40 p-3 rounded-lg border border-slate-900 font-light leading-relaxed">
              <HelpCircle className="w-4 h-4 text-slate-600 flex-shrink-0" />
              <span>
                Throughput measures absolute requests handled per second. Latency is average response times over 10M concurrent requests. Memory represents heap consumption at static rest.
              </span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
