import React from "react";
import { Zap, Github, Twitter, Layers, ArrowUpRight } from "lucide-react";

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    onNavigate(id);
  };

  return (
    <footer className="bg-[#0b0f19] border-t border-slate-900 pt-16 pb-12 relative overflow-hidden">
      {/* Background neon light sphere */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-80 h-80 radial-glow rounded-full pointer-events-none filter blur-2xl opacity-20" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 border-b border-slate-900 pb-12">
          
          {/* Logo column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavigate("hero")}>
              <div className="relative w-8.5 h-8.5 flex items-center justify-center">
                {/* Elegant shield-like gradient icon for MicroJet matching modern Angular.dev style exactly */}
                <svg viewBox="0 0 100 100" className="w-8.5 h-8.5 text-pink-500 fill-none stroke-current">
                  <defs>
                    <linearGradient id="angularFooterGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FF007A" />
                      <stop offset="60%" stopColor="#8100E2" />
                      <stop offset="100%" stopColor="#4A00E0" />
                    </linearGradient>
                  </defs>
                  <polygon points="50,5 92,23 92,72 50,95 8,72 8,23" fill="url(#angularFooterGrad)" stroke="none" />
                  {/* High fidelity white 'M' lines inside the angular style octagon */}
                  <path d="M 28,68 L 28,34 L 50,54 L 72,34 L 72,68" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                </svg>
              </div>
              <span className="font-display font-bold text-base tracking-tight text-white">
                Micro<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Jet</span>
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-slate-400 max-w-sm font-normal leading-relaxed">
              The high-performance, lightweight Python web API framework built for speed, developer ergonomics, and rock-solid architectural stability.
            </p>

            <div className="flex gap-3 pt-2">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer"
                className="w-8 h-8 rounded-full bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-slate-700 transition-all"
              >
                <Twitter className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Links Column 1 */}
          <div className="md:col-span-2.5 space-y-3">
            <h5 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              Framework
            </h5>
            <ul className="space-y-2.5">
              <li>
                <a href="#features" onClick={(e) => handleLinkClick(e, "features")} className="text-xs text-slate-400 hover:text-blue-400 transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#sandbox" onClick={(e) => handleLinkClick(e, "sandbox")} className="text-xs text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-1">
                  Interactive Tutorial <span className="text-[9px] font-mono px-1 bg-blue-950 text-blue-400 rounded">Live</span>
                </a>
              </li>
              <li>
                <a href="#benchmarks" onClick={(e) => handleLinkClick(e, "benchmarks")} className="text-xs text-slate-400 hover:text-blue-400 transition-colors">
                  Benchmarks
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 2 */}
          <div className="md:col-span-2.5 space-y-3">
            <h5 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              Resources
            </h5>
            <ul className="space-y-2.5">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-0.5">
                  GitHub Repository <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://pypi.org" target="_blank" rel="noreferrer" className="text-xs text-slate-400 hover:text-blue-400 transition-colors flex items-center gap-0.5">
                  PyPI Package <ArrowUpRight className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="#sandbox" onClick={(e) => handleLinkClick(e, "sandbox")} className="text-xs text-slate-400 hover:text-blue-400 transition-colors">
                  Quick Start Guide
                </a>
              </li>
            </ul>
          </div>

          {/* Links Column 3 */}
          <div className="md:col-span-2 space-y-3">
            <h5 className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-widest">
              Ecosystem
            </h5>
            <ul className="space-y-2.5">
              <li>
                <a href="#sandbox" onClick={(e) => handleLinkClick(e, "sandbox")} className="text-xs text-slate-400 hover:text-blue-400 transition-colors">
                  CLI Tools
                </a>
              </li>
              <li>
                <a href="#features" onClick={(e) => handleLinkClick(e, "features")} className="text-xs text-slate-400 hover:text-blue-400 transition-colors">
                  First-Party Plugins
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Copyright and status footer */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500 font-light">
            &copy; {currentYear} MicroJet Core Authors. Released under the Apache 2.0 License.
          </p>

          <div className="flex items-center gap-4 text-xs text-slate-500 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
              <span>Dev Server: Port 3000 Active</span>
            </div>
            <span className="text-slate-800">|</span>
            <span className="text-[10px]">Secure sandbox preview environment</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
