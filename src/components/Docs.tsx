import React, { useState, useEffect, useMemo } from "react";
import Markdown from "react-markdown";
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  Menu, 
  X, 
  Check, 
  Copy, 
  ExternalLink, 
  BookOpen, 
  FileText, 
  Lightbulb, 
  Terminal, 
  Info,
  Layers
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Import raw markdown contents using Vite's ?raw suffix
import tocRaw from "../docs/table_of_contents.md?raw";
import quickstartRaw from "../docs/quikstart.md?raw";
import introRaw from "../docs/introduction.md?raw";
import installRaw from "../docs/installation.md?raw";
import routingRaw from "../docs/routing.md?raw";
import validationRaw from "../docs/validation.md?raw";

interface DocsProps {
  onBackToHome: () => void;
}

interface DocChapter {
  id: string;
  title: string;
  category: "Getting Started" | "Core Concepts" | "Advanced Guides";
  content: string;
}

const CHAPTERS: DocChapter[] = [
  {
    id: "introduction",
    title: "Introduction",
    category: "Getting Started",
    content: introRaw,
  },
  {
    id: "quick-start",
    title: "Quick Start Guide",
    category: "Getting Started",
    content: quickstartRaw,
  },
  {
    id: "installation",
    title: "Installation Guide",
    category: "Getting Started",
    content: installRaw,
  },
  {
    id: "routing",
    title: "Routing & Path Traversals",
    category: "Core Concepts",
    content: routingRaw,
  },
  {
    id: "request-validation",
    title: "Request & Schema Validation",
    category: "Core Concepts",
    content: validationRaw,
  },
];

// Simple helper to create slug IDs for headings
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export default function Docs({ onBackToHome }: DocsProps) {
  const [activeChapterId, setActiveChapterId] = useState("introduction");
  const [searchQuery, setSearchQuery] = useState("");
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolledHeading, setScrolledHeading] = useState("");

  const activeChapter = CHAPTERS.find((c) => c.id === activeChapterId) || CHAPTERS[0];

  // Auto scroll to top of content on chapter change
  useEffect(() => {
    window.scrollTo({ top: 0 });
    const contentEl = document.getElementById("docs-content-area");
    if (contentEl) {
      contentEl.scrollTop = 0;
    }
  }, [activeChapterId]);

  // Extract headings from active chapter markdown text for right-hand "On This Page" outline
  const headings = useMemo(() => {
    const lines = activeChapter.content.split("\n");
    const foundHeadings: { id: string; text: string; level: number }[] = [];
    lines.forEach((line) => {
      const h2Match = line.match(/^##\s+(.*)$/);
      const h3Match = line.match(/^###\s+(.*)$/);
      if (h2Match) {
        const text = h2Match[1].trim();
        foundHeadings.push({ id: slugify(text), text, level: 2 });
      } else if (h3Match) {
        const text = h3Match[1].trim();
        foundHeadings.push({ id: slugify(text), text, level: 3 });
      }
    });
    return foundHeadings;
  }, [activeChapter]);

  // Handle active heading tracking on scroll
  useEffect(() => {
    const handleScroll = () => {
      const headingElements = headings.map((h) => document.getElementById(h.id)).filter(Boolean);
      let currentActiveId = "";
      
      for (const el of headingElements) {
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 120) {
            currentActiveId = el.id;
          }
        }
      }
      setScrolledHeading(currentActiveId || (headings[0]?.id ?? ""));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [headings]);

  const handleCopyCode = (codeText: string) => {
    navigator.clipboard.writeText(codeText);
    setCopiedCode(codeText);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  // Organize chapters by category
  const categories = ["Getting Started", "Core Concepts", "Advanced Guides"] as const;

  // Filter chapters by search query
  const filteredChapters = CHAPTERS.filter((chapter) => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      chapter.title.toLowerCase().includes(query) ||
      chapter.content.toLowerCase().includes(query) ||
      chapter.category.toLowerCase().includes(query)
    );
  });

  // Next and Previous pagination computation
  const currentIndex = CHAPTERS.findIndex((c) => c.id === activeChapterId);
  const prevChapter = currentIndex > 0 ? CHAPTERS[currentIndex - 1] : null;
  const nextChapter = currentIndex < CHAPTERS.length - 1 ? CHAPTERS[currentIndex + 1] : null;

  // Render markdown tags with custom sleek high-fidelity styling matching VitePress
  const customMarkdownComponents = {
    h1: ({ children, ...props }: any) => {
      return (
        <h1 className="font-display font-bold text-3xl sm:text-4xl text-white tracking-tight mb-6 pb-4 border-b border-slate-800/80" {...props}>
          {children}
        </h1>
      );
    },
    h2: ({ children, ...props }: any) => {
      const text = typeof children === "string" ? children : String(children);
      const id = slugify(text);
      return (
        <h2 
          id={id} 
          className="font-display font-semibold text-xl sm:text-2xl text-slate-100 tracking-tight mt-10 mb-4 pb-2 border-b border-slate-900 flex items-center group scroll-mt-24" 
          {...props}
        >
          {children}
          <a href={`#${id}`} className="ml-2 text-slate-600 hover:text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity text-sm font-mono font-normal">
            #
          </a>
        </h2>
      );
    },
    h3: ({ children, ...props }: any) => {
      const text = typeof children === "string" ? children : String(children);
      const id = slugify(text);
      return (
        <h3 
          id={id} 
          className="font-display font-medium text-lg text-slate-200 tracking-tight mt-8 mb-3 flex items-center group scroll-mt-24" 
          {...props}
        >
          {children}
          <a href={`#${id}`} className="ml-2 text-slate-600 hover:text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono font-normal">
            #
          </a>
        </h3>
      );
    },
    p: ({ children, ...props }: any) => {
      return (
        <p className="text-slate-400 text-sm sm:text-base leading-relaxed mb-5 font-normal" {...props}>
          {children}
        </p>
      );
    },
    hr: () => {
      return <hr className="border-slate-800/80 my-8" />;
    },
    ul: ({ children, ...props }: any) => {
      return <ul className="list-disc pl-5 text-slate-400 space-y-2 mb-5 text-sm sm:text-base" {...props}>{children}</ul>;
    },
    ol: ({ children, ...props }: any) => {
      return <ol className="list-decimal pl-5 text-slate-400 space-y-2 mb-5 text-sm sm:text-base" {...props}>{children}</ol>;
    },
    li: ({ children, ...props }: any) => {
      return <li className="text-slate-300" {...props}>{children}</li>;
    },
    blockquote: ({ children, ...props }: any) => {
      return (
        <div className="my-6 p-4 rounded-xl bg-[#090d22]/80 border-l-4 border-pink-500/80 flex gap-3.5 backdrop-blur-md" {...props}>
          <div className="mt-0.5 text-pink-400 flex-shrink-0">
            <Info className="w-5 h-5" />
          </div>
          <div className="text-slate-300 text-sm leading-relaxed italic">
            {children}
          </div>
        </div>
      );
    },
    pre: ({ children }: any) => {
      // Find the code element children to extract code and language
      const childrenArray = React.Children.toArray(children);
      const codeElement = childrenArray.find(
        (child) => React.isValidElement(child) && ((child as any).type === "code" || (child as any).type?.name === "code")
      ) as any;
      
      const codeText = codeElement && codeElement.props && codeElement.props.children
        ? String(codeElement.props.children).trim()
        : "";
      
      const className = codeElement && codeElement.props ? codeElement.props.className || "" : "";
      const langMatch = className.match(/language-(\w+)/);
      const language = langMatch ? langMatch[1] : "bash";

      const isCopied = copiedCode === codeText;

      return (
        <div className="relative my-6 rounded-xl bg-slate-950 border border-slate-800/80 overflow-hidden shadow-xl font-mono text-xs sm:text-sm group">
          {/* Header block */}
          <div className="bg-[#0f1423] px-4 py-2 flex items-center justify-between border-b border-slate-900/80 select-none">
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-pink-500" />
              <span className="text-[11px] text-slate-400 font-medium">{language}</span>
            </div>
            <button
              onClick={() => handleCopyCode(codeText)}
              className="flex items-center gap-1.5 px-2.5 py-1 rounded bg-slate-900 hover:bg-slate-800 border border-slate-800/60 text-slate-400 hover:text-white text-[10px] font-semibold transition-all cursor-pointer"
            >
              {isCopied ? (
                <>
                  <Check className="w-3 h-3 text-emerald-400" />
                  <span className="text-emerald-400">Copied</span>
                </>
              ) : (
                <>
                  <Copy className="w-3 h-3" />
                  <span>Copy</span>
                </>
              )}
            </button>
          </div>
          {/* Main code text */}
          <div className="p-4 overflow-x-auto leading-relaxed text-slate-300 font-mono scrollbar-thin">
            {codeText}
          </div>
        </div>
      );
    },
    code: ({ children, ...props }: any) => {
      return (
        <code className="bg-slate-900 text-pink-400 border border-slate-800 rounded px-1.5 py-0.5 text-xs font-mono font-medium" {...props}>
          {children}
        </code>
      );
    },
    a: ({ href, children, ...props }: any) => {
      const isExternal = href?.startsWith("http");
      
      // If internal hash link to another chapter, switch chapter instead of reloading page
      const handleAnchorClick = (e: React.MouseEvent) => {
        if (!isExternal && href?.startsWith("#")) {
          e.preventDefault();
          const targetId = href.substring(1);
          const foundChapter = CHAPTERS.find((c) => c.id === targetId);
          if (foundChapter) {
            setActiveChapterId(targetId);
          } else {
            const element = document.getElementById(targetId);
            if (element) {
              element.scrollIntoView({ behavior: "smooth" });
            }
          }
        }
      };

      return (
        <a 
          href={href} 
          onClick={handleAnchorClick}
          className="text-pink-400 hover:text-pink-300 font-medium underline transition-colors inline-flex items-center gap-0.5" 
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noopener noreferrer" : undefined}
          {...props}
        >
          {children}
          {isExternal && <ExternalLink className="w-3 h-3 inline" />}
        </a>
      );
    }
  };

  return (
    <div className="min-h-screen bg-[#050814] text-slate-100 flex flex-col font-sans relative">
      {/* Background slashes mesh decoration */}
      <div className="absolute inset-0 slash-mesh-blue opacity-[0.06] pointer-events-none" />

      {/* Header Bar of Docs */}
      <header className="sticky top-0 z-40 bg-[#050814]/85 border-b border-slate-900 backdrop-blur-md px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={onBackToHome}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-800 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white hover:border-slate-700 hover:bg-slate-900/40 transition-all cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
            Home
          </button>
          
          <div className="h-6 w-px bg-slate-800" />
          
          <div className="flex items-center gap-2.5">
            <div className="relative w-7 h-7 flex items-center justify-center">
              <svg viewBox="0 0 100 100" className="w-7 h-7 text-pink-500 fill-none stroke-current">
                <defs>
                  <linearGradient id="angularLogoGradDocs" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#FF007A" />
                    <stop offset="60%" stopColor="#8100E2" />
                    <stop offset="100%" stopColor="#4A00E0" />
                  </linearGradient>
                </defs>
                <polygon points="50,5 92,23 92,72 50,95 8,72 8,23" fill="url(#angularLogoGradDocs)" stroke="none" />
                <path d="M 28,68 L 28,34 L 50,54 L 72,34 L 72,68" stroke="white" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </div>
            <span className="font-display font-bold text-sm sm:text-base text-white">
              Micro<span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">Jet</span> Docs
            </span>
          </div>
        </div>

        {/* Right side options: Active channel indicator or Search toggle for mobile */}
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-mono text-slate-500 bg-[#090d22] border border-slate-800 px-2 py-0.5 rounded-md">
            v1.2.0-stable
          </span>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg border border-slate-800 text-slate-400 hover:text-white hover:bg-slate-900 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* Main Grid Workspace */}
      <div className="flex-1 max-w-8xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-0 relative items-stretch">
        
        {/* Left Sidebar Table of Contents (VitePress style list) */}
        <aside className="hidden lg:block lg:col-span-3 border-r border-slate-900/60 p-6 space-y-6 bg-[#050814]/40 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto">
          {/* Search Bar filter */}
          <div className="relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
            <input 
              type="text" 
              placeholder="Search docs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9.5 pr-4 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-pink-500/50 focus:shadow-[0_0_15px_rgba(255,0,122,0.05)] transition-all"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300"
              >
                Clear
              </button>
            )}
          </div>

          {/* Chapters Directory */}
          <div className="space-y-6">
            {categories.map((category) => {
              const categoryChapters = filteredChapters.filter((c) => c.category === category);
              if (categoryChapters.length === 0) return null;
              
              return (
                <div key={category} className="space-y-2">
                  <h4 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3">
                    {category}
                  </h4>
                  <ul className="space-y-1">
                    {categoryChapters.map((chapter) => {
                      const isActive = chapter.id === activeChapterId;
                      return (
                        <li key={chapter.id}>
                          <button
                            onClick={() => setActiveChapterId(chapter.id)}
                            className={`w-full text-left px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                              isActive 
                                ? "bg-pink-500/10 text-pink-400 border-l-2 border-pink-500"
                                : "text-slate-400 hover:text-slate-200 hover:bg-slate-900/30"
                            }`}
                          >
                            <span>{chapter.title}</span>
                            {isActive && <ChevronRight className="w-3.5 h-3.5 text-pink-400" />}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })}
          </div>
        </aside>

        {/* Central Article Container */}
        <main 
          id="docs-content-area"
          className="col-span-1 lg:col-span-6 px-6 sm:px-10 py-10 overflow-y-auto max-w-3xl mx-auto w-full"
        >
          {/* Article breadcrumb path */}
          <div className="flex items-center gap-1.5 text-xs text-slate-500 font-mono mb-6">
            <span>Docs</span>
            <ChevronRight className="w-3 h-3 text-slate-700" />
            <span>{activeChapter.category}</span>
            <ChevronRight className="w-3 h-3 text-slate-700" />
            <span className="text-pink-400">{activeChapter.title}</span>
          </div>

          {/* Main article body */}
          <article className="prose prose-invert max-w-none">
            <Markdown components={customMarkdownComponents as any}>
              {activeChapter.content}
            </Markdown>
          </article>

          {/* Bottom quick pagination navigations */}
          <div className="mt-16 pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4">
            {prevChapter ? (
              <button
                onClick={() => setActiveChapterId(prevChapter.id)}
                className="w-full sm:w-auto flex flex-col items-start p-4 rounded-xl border border-slate-900 hover:border-slate-800 bg-[#090d22]/40 hover:bg-[#090d22]/80 transition-all text-left cursor-pointer group"
              >
                <span className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  <ChevronLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" /> Previous
                </span>
                <span className="text-sm font-semibold text-slate-200 mt-1">{prevChapter.title}</span>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}

            {nextChapter ? (
              <button
                onClick={() => setActiveChapterId(nextChapter.id)}
                className="w-full sm:w-auto flex flex-col items-end p-4 rounded-xl border border-slate-900 hover:border-slate-800 bg-[#090d22]/40 hover:bg-[#090d22]/80 transition-all text-right cursor-pointer group ml-auto"
              >
                <span className="text-[10px] font-mono font-medium text-slate-500 uppercase tracking-wider flex items-center gap-1">
                  Next <ChevronRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                </span>
                <span className="text-sm font-semibold text-pink-400 mt-1">{nextChapter.title}</span>
              </button>
            ) : (
              <div className="hidden sm:block" />
            )}
          </div>
        </main>

        {/* Right Sidebar Outline List ("On This Page" - VitePress style helper) */}
        <aside className="hidden lg:block lg:col-span-3 p-6 space-y-6 bg-[#050814]/10 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto">
          {headings.length > 0 && (
            <div className="space-y-3.5 border-l border-slate-900 pl-4 py-1">
              <h5 className="text-[11px] font-mono font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5 select-none">
                <Layers className="w-3.5 h-3.5 text-pink-500" />
                On This Page
              </h5>
              <ul className="space-y-2.5 text-xs">
                {headings.map((h) => {
                  const isActive = h.id === scrolledHeading;
                  return (
                    <li 
                      key={h.id}
                      style={{ paddingLeft: `${(h.level - 2) * 12}px` }}
                    >
                      <a
                        href={`#${h.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(h.id);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth" });
                          }
                        }}
                        className={`block font-semibold hover:text-pink-400 transition-colors ${
                          isActive ? "text-pink-500" : "text-slate-500"
                        }`}
                      >
                        {h.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          {/* Quick links box */}
          <div className="p-4 rounded-xl bg-[#090d22]/60 border border-slate-900 space-y-3">
            <h6 className="text-[10px] font-mono font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1 text-slate-400">
              <Lightbulb className="w-3.5 h-3.5 text-pink-500" /> Useful Resources
            </h6>
            <ul className="space-y-2 text-xs font-semibold text-slate-300">
              <li>
                <a href="https://github.com" target="_blank" rel="noreferrer" className="flex items-center justify-between text-slate-400 hover:text-white transition-colors">
                  <span>GitHub Repo</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://pypi.org" target="_blank" rel="noreferrer" className="flex items-center justify-between text-slate-400 hover:text-white transition-colors">
                  <span>PyPI Package</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
              <li>
                <a href="https://pydantic-docs.helpmanual.io" target="_blank" rel="noreferrer" className="flex items-center justify-between text-slate-400 hover:text-white transition-colors">
                  <span>Pydantic v2 Docs</span>
                  <ExternalLink className="w-3 h-3 text-slate-600" />
                </a>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Mobile Menu Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 lg:hidden"
          >
            <motion.div 
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute left-0 top-0 bottom-0 w-4/5 max-w-sm bg-[#050814] border-r border-slate-900 p-6 flex flex-col gap-6 overflow-y-auto"
            >
              <div className="flex items-center justify-between">
                <span className="font-display font-bold text-sm tracking-tight text-white flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-pink-500" /> Table of Contents
                </span>
                <button 
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-lg border border-slate-800 text-slate-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Mobile Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-500" />
                <input 
                  type="text" 
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 text-xs rounded-lg bg-slate-950 border border-slate-800 text-slate-200 placeholder-slate-500"
                />
              </div>

              {/* Directory Content List */}
              <div className="flex-1 space-y-6">
                {categories.map((category) => {
                  const categoryChapters = filteredChapters.filter((c) => c.category === category);
                  if (categoryChapters.length === 0) return null;
                  
                  return (
                    <div key={category} className="space-y-2">
                      <h4 className="text-[9px] font-mono font-bold uppercase tracking-wider text-slate-500 px-3">
                        {category}
                      </h4>
                      <ul className="space-y-1">
                        {categoryChapters.map((chapter) => {
                          const isActive = chapter.id === activeChapterId;
                          return (
                            <li key={chapter.id}>
                              <button
                                onClick={() => {
                                  setActiveChapterId(chapter.id);
                                  setMobileMenuOpen(false);
                                }}
                                className={`w-full text-left px-3 py-2 rounded-md text-xs sm:text-sm font-semibold transition-all cursor-pointer flex items-center justify-between ${
                                  isActive 
                                    ? "bg-pink-500/10 text-pink-400 border-l-2 border-pink-500"
                                    : "text-slate-400 hover:text-slate-200"
                                }`}
                              >
                                <span>{chapter.title}</span>
                                {isActive && <ChevronRight className="w-3.5 h-3.5 text-pink-400" />}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  );
                })}
              </div>

              <button
                onClick={onBackToHome}
                className="w-full py-3 rounded-lg border border-slate-800 text-xs sm:text-sm font-semibold text-slate-400 hover:text-white hover:bg-slate-900/40 text-center transition-colors mt-auto cursor-pointer"
              >
                Return to Main Site
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
