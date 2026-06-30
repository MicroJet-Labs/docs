import { useState } from "react";
import { ArrowUpRight, Terminal, Copy, Check, ChevronRight } from "lucide-react";

interface HeroProps {
  onGetStarted: () => void;
  onReadDocs?: () => void;
}

// Gorgeous, high-fidelity grid of colored slanted ticks matching the exact angular.dev background
function SlashesBackground() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-[0.22] select-none">
      <div className="flex flex-wrap gap-x-12 gap-y-14 justify-center py-16 px-8 h-full w-full">
        {Array.from({ length: 240 }).map((_, i) => {
          const col = i % 16;
          const row = Math.floor(i / 16);
          const ratio = (row + col) / 36;
          
          // Beautiful shifting gradient: pink/magenta -> purple -> indigo/blue
          let colorClass = "from-pink-500/90 to-rose-500/90";
          if (ratio < 0.3) {
            colorClass = "from-blue-500/90 to-indigo-500/90";
          } else if (ratio < 0.55) {
            colorClass = "from-indigo-500/90 to-purple-500/90";
          } else if (ratio < 0.8) {
            colorClass = "from-purple-500/90 to-pink-500/90";
          }
          
          return (
            <div 
              key={i} 
              className={`w-[2px] h-4 bg-gradient-to-b ${colorClass} rounded-full rotate-[28deg] transform transition-transform duration-300 hover:scale-125`}
            />
          );
        })}
      </div>
    </div>
  );
}

export default function Hero({ onGetStarted, onReadDocs }: HeroProps) {
  const [copied, setCopied] = useState(false);
  const installCmd = "pip install microjet";

  const handleCopy = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section 
      id="hero" 
      className="relative pt-32 pb-24 md:pt-40 md:pb-36 overflow-hidden bg-[#050814]"
    >
      {/* High fidelity background slashes mesh */}
      <SlashesBackground />
      
      {/* Glowing orbs backing the center content */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-pink-500/10 to-blue-500/10 rounded-full pointer-events-none filter blur-3xl opacity-60" />
      <div className="absolute top-1/3 right-1/4 translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 rounded-full pointer-events-none filter blur-2xl opacity-40" />

      {/* Grid overlay */}
      <div className="absolute inset-0 dot-grid opacity-10 pointer-events-none" />
      
      {/* Bottom overlay blend */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#050814] to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10 flex flex-col items-center text-center">
        
        {/* Banner Alert badge - exact modern Angular rectangular card style from screenshot */}
        <div 
          onClick={onGetStarted}
          className="group flex flex-col items-center justify-center text-center p-6 rounded-xl bg-[#090d22]/80 border border-slate-800/90 hover:border-pink-500/30 transition-all duration-300 cursor-pointer mb-12 max-w-sm w-full backdrop-blur-md shadow-lg"
          id="hero-banner-badge"
        >
          <span className="text-pink-400 font-display font-semibold text-sm sm:text-base tracking-tight group-hover:text-pink-300 transition-colors">
            MicroJet Python v1.2 is here!
          </span>
          <span className="text-slate-400 text-xs sm:text-sm mt-1.5 group-hover:text-slate-300 transition-colors flex items-center justify-center gap-1">
            Explore what's new <ChevronRight className="w-4 h-4 text-slate-500 group-hover:translate-x-0.5 transition-transform" />
          </span>
        </div>

        {/* Dynamic headings - exact high-impact modern Angular hierarchy, casing and weights from screenshot */}
        <h1 className="font-display font-semibold text-5xl sm:text-7xl md:text-[85px] leading-[1.08] tracking-tight text-white max-w-5xl">
          Productivity<br />
          Meets<br />
          <span className="text-white lowercase font-semibold">
            scalability
          </span>
        </h1>

        <p className="mt-8 text-base sm:text-lg md:text-xl text-slate-400 max-w-2xl font-normal leading-relaxed">
          The framework for building scalable web apps with confidence
        </p>

        {/* Action button triggers - exact high contrast outline button from screenshot */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4.5 w-full max-w-md">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto px-10 py-3.5 text-sm font-semibold text-white bg-transparent border border-white rounded-md hover:bg-white hover:text-slate-950 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-200 cursor-pointer"
            id="hero-cta-get-started"
          >
            Get Started
          </button>
          {onReadDocs && (
            <button
              onClick={onReadDocs}
              className="w-full sm:w-auto px-10 py-3.5 text-sm font-semibold text-slate-300 bg-[#090d22]/80 border border-slate-800/80 rounded-md hover:bg-slate-900 hover:text-white transition-all duration-200 cursor-pointer"
              id="hero-cta-read-docs"
            >
              Read Docs
            </button>
          )}
        </div>

        {/* Copy command box */}
        <div className="mt-10 flex items-center gap-3 bg-slate-950/60 border border-slate-800/80 rounded-xl p-2.5 pl-4 max-w-sm w-full font-mono text-xs text-slate-400 backdrop-blur-sm shadow-inner">
          <span className="text-pink-500 select-none">$</span>
          <span className="flex-1 text-left select-all text-slate-300">{installCmd}</span>
          <button
            onClick={handleCopy}
            className="p-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white transition-all cursor-pointer active:scale-95"
            title="Copy to clipboard"
            id="hero-copy-cmd-btn"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
          </button>
        </div>

        {/* Visual Showcase with fine borders and glowing backing */}
        <div className="mt-16 w-full max-w-4xl relative group">
          <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-pink-600 to-indigo-500 opacity-20 blur-xl group-hover:opacity-30 transition-opacity duration-500" />
          
          <div className="relative rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden shadow-2xl">
            {/* Window control bar */}
            <div className="bg-[#0f1423] border-b border-slate-800/80 px-5 py-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-500/80" />
                <span className="ml-2 text-xs font-mono text-slate-500">api/main.py</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-md border border-slate-800/60">
                <span className="w-1.5 h-1.5 rounded-full bg-pink-500 animate-pulse" />
                <span className="text-[10px] font-mono text-slate-400">MicroJet worker active</span>
              </div>
            </div>

            {/* Code content */}
            <div className="p-6 text-left font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto whitespace-pre bg-slate-950/80 text-slate-300">
              <span className="text-blue-400">from</span> microjet <span className="text-blue-400">import</span> MicroJet, Schema{"\n"}
              <span className="text-blue-400">from</span> pydantic <span className="text-blue-400">import</span> BaseModel, EmailStr{"\n\n"}
              <span className="text-slate-500"># Initialize lightweight, lightning-fast instance</span>{"\n"}
              app = <span className="text-yellow-400">MicroJet</span>(){"\n\n"}
              <span className="text-slate-500"># Define Pydantic request schema model</span>{"\n"}
              <span className="text-blue-400">class</span> <span className="text-yellow-400">UserSchema</span>(BaseModel):{"\n"}
              {"    "}name: str{"\n"}
              {"    "}email: EmailStr{"\n\n"}
              <span className="text-slate-500"># Blazing fast POST route with automatic body validation</span>{"\n"}
              <span className="text-purple-400">@app.post</span>(<span className="text-emerald-400">"/api/users"</span>, schema=UserSchema){"\n"}
              <span className="text-blue-400">async def</span> <span className="text-cyan-400">create_user</span>(request):{"\n"}
              {"    "}new_user = <span className="text-blue-400">await</span> request.json(){"\n"}
              {"    "}<span className="text-blue-400">return</span> {"{"} <span className="text-emerald-400">"success"</span>: <span className="text-amber-400">True</span>, <span className="text-emerald-400">"data"</span>: new_user {"}"}{"\n\n"}
              <span className="text-blue-400">if</span> __name__ == <span className="text-emerald-400">"__main__"</span>:{"\n"}
              {"    "}app.<span className="text-cyan-400">run</span>(port=<span className="text-purple-400">3000</span>)
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
