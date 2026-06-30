import { useState, useEffect } from "react";
import { Terminal, Menu, X, ArrowUpRight, Zap } from "lucide-react";

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  currentView: "home" | "docs";
  onViewChange: (view: "home" | "docs") => void;
}

export default function Navbar({ onNavigate, activeSection, currentView, onViewChange }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Features", id: "features" },
    { label: "Interactive Tutorial", id: "sandbox" },
    { label: "Benchmarks", id: "benchmarks" },
    { label: "Documentation", id: "docs" },
  ];

  const handleNavItemClick = (id: string) => {
    if (id === "docs") {
      onViewChange("docs");
    } else {
      if (currentView === "docs") {
        onViewChange("home");
        setTimeout(() => {
          onNavigate(id);
        }, 80);
      } else {
        onNavigate(id);
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-md border-b border-slate-800/60 py-3 shadow-lg"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <div 
          onClick={() => handleNavItemClick("hero")}
          className="flex items-center gap-3 cursor-pointer group"
          id="nav-logo"
        >
          <div className="relative w-9 h-9 flex items-center justify-center">
            {/* Elegant shield-like gradient icon for MicroJet matching modern Angular.dev style exactly */}
            <svg viewBox="0 0 100 100" className="w-9 h-9 text-pink-500 fill-none stroke-current transition-all duration-300 group-hover:scale-105">
              <defs>
                <linearGradient id="angularLogoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#FF007A" />
                  <stop offset="60%" stopColor="#8100E2" />
                  <stop offset="100%" stopColor="#4A00E0" />
                </linearGradient>
              </defs>
              <polygon points="50,5 92,23 92,72 50,95 8,72 8,23" fill="url(#angularLogoGrad)" stroke="none" />
              {/* High fidelity white 'M' lines inside the angular style octagon */}
              <path d="M 28,68 L 28,34 L 50,54 L 72,34 L 72,68" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
            </svg>
            <div className="absolute inset-0 rounded-full bg-pink-500 opacity-0 group-hover:opacity-20 blur-md transition-opacity duration-300" />
          </div>
          <div>
            <span className="font-display font-bold text-lg tracking-tight text-white group-hover:text-pink-400 transition-colors">
              Micro<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Jet</span>
            </span>
            <span className="block text-[8px] font-mono tracking-widest text-slate-500 uppercase leading-none mt-0.5">
              python-v1.2.0
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => {
            const isActive = item.id === "docs" ? currentView === "docs" : (currentView === "home" && activeSection === item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className={`font-sans text-sm font-medium transition-colors cursor-pointer relative py-1 ${
                  isActive
                    ? "text-pink-400 font-semibold"
                    : "text-slate-400 hover:text-white"
                }`}
                id={`nav-item-${item.id}`}
              >
                {item.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-pink-500 to-purple-500 rounded-full" />
                )}
              </button>
            );
          })}
        </div>

        {/* Action Button */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => handleNavItemClick("docs")}
            className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-300 bg-slate-900/60 border border-slate-800/80 rounded-lg hover:bg-slate-800/80 hover:text-white transition-all cursor-pointer"
            id="nav-docs-btn"
          >
            <Terminal className="w-3.5 h-3.5 text-pink-400" />
            Read Docs
          </button>
          <button
            onClick={() => handleNavItemClick("sandbox")}
            className="flex items-center gap-1 px-4.5 py-2 text-xs font-semibold text-slate-950 bg-white rounded-lg hover:bg-slate-100 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all cursor-pointer"
            id="nav-get-started-btn"
          >
            Get Started
            <ArrowUpRight className="w-3.5 h-3.5 text-slate-950" />
          </button>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="md:hidden p-2 text-slate-400 hover:text-white rounded-lg focus:outline-none cursor-pointer"
          aria-label="Toggle Menu"
          id="mobile-menu-toggle"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950 border-b border-slate-800 py-6 px-6 shadow-xl flex flex-col gap-5">
          {navItems.map((item) => {
            const isActive = item.id === "docs" ? currentView === "docs" : (currentView === "home" && activeSection === item.id);
            return (
              <button
                key={item.id}
                onClick={() => handleNavItemClick(item.id)}
                className={`text-left font-sans text-base font-medium py-2 border-b border-slate-900 ${
                  isActive ? "text-pink-400 font-semibold" : "text-slate-400"
                }`}
                id={`mobile-nav-${item.id}`}
              >
                {item.label}
              </button>
            );
          })}
          <div className="flex flex-col gap-3 mt-2">
            <button
              onClick={() => handleNavItemClick("docs")}
              className="flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-white bg-slate-900 border border-slate-800 rounded-xl cursor-pointer"
              id="mobile-nav-docs"
            >
              <Terminal className="w-4 h-4 text-pink-400" />
              Read Docs
            </button>
            <button
              onClick={() => handleNavItemClick("sandbox")}
              className="flex items-center justify-center gap-2 py-3 px-4 text-sm font-semibold text-slate-950 bg-white rounded-xl cursor-pointer"
              id="mobile-nav-start"
            >
              Get Started
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}
