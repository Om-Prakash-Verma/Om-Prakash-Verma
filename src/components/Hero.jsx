import { useState } from 'react';
import HeroVisual from './HeroVisual';
import { 
  ArrowUpRight, 
  Terminal, 
  Mail, 
  Layers, 
  Cpu, 
  Sparkles,
  Download,
  Check,
  Code2
} from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

export default function Hero() {
  const [copied, setCopied] = useState(false);
  const email = "omprakash.cse.dev@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <section className="relative min-h-[100dvh] flex items-center justify-center pt-20 sm:pt-24 pb-8 sm:pb-12 px-4 sm:px-6 md:px-8 lg:px-12 overflow-hidden">
      
      {/* Background Subtle Ambient Glow */}
      <div 
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[500px] lg:w-[650px] aspect-square bg-gradient-to-tr from-slate-900/40 via-slate-800/15 to-transparent rounded-full blur-[100px] sm:blur-[140px] pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-7xl mx-auto w-full">
        {/* Changed from lg:grid-cols-12 to md:grid-cols-12 so side-by-side layout activates on tablets and scaled laptops */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-6 lg:gap-10 items-center">
          
          {/* Left Column: Identity, Philosophy & Quick Actions */}
          <div className="md:col-span-7 flex flex-col items-start w-full">
            
            {/* Status Pill */}
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 rounded-full clay-card text-[11px] sm:text-xs font-mono-code text-slate-300 mb-4 sm:mb-5 max-w-full overflow-hidden">
              <span className="relative flex h-2 w-2 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-slate-200 truncate">Open to opportunities</span>
              <span className="text-slate-600 hidden xs:inline">/</span>
              <span className="text-slate-400 hidden xs:inline truncate">Software Developer</span>
            </div>

            {/* Responsive Scaled Heading */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-extrabold tracking-tight text-white font-heading leading-[1.08] mb-3 sm:mb-4">
              Om Prakash <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-slate-400">
                Verma
              </span>
            </h1>

            {/* Core Positioning */}
            <div className="border-l-2 border-slate-700/80 pl-3 sm:pl-4 mb-3 sm:mb-5">
              <p className="text-base sm:text-lg md:text-lg lg:text-xl text-slate-200 font-medium tracking-normal sm:tracking-wide">
                &ldquo;An engineer by curiosity, a developer by passion, and a builder by nature.&rdquo;
              </p>
              <p className="text-xs sm:text-sm font-mono-code text-slate-400 mt-1">
                Full-Stack &bull; Frontend Architecture &bull; 3D Web
              </p>
            </div>

            {/* Descriptive Narrative */}
            <p className="text-xs sm:text-sm md:text-sm lg:text-base text-slate-400 max-w-2xl leading-relaxed mb-5 sm:mb-6">
              Turning complex concepts into functional, resilient digital experiences.
              Driven by understanding how things work <span className="text-slate-200 font-medium">beneath the surface</span>—from 
              system architecture and performance tuning to immersive WebGL interactions.
            </p>

            {/* Tactile Action Buttons - Responsive Wrapping */}
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3.5 mb-6 sm:mb-8 w-full">
              <a 
                href="#projects" 
                className="clay-button-primary min-h-[44px] px-5 sm:px-6 py-2.5 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 font-semibold tracking-wide group flex-1 xs:flex-initial"
              >
                <span>Explore Work</span>
                <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              <a 
                href="#about" 
                className="clay-button min-h-[44px] px-4 sm:px-5 py-2.5 text-xs sm:text-sm text-slate-200 font-medium flex items-center justify-center gap-2 hover:text-white flex-1 xs:flex-initial"
              >
                <Cpu className="w-4 h-4 text-slate-400" />
                <span>Philosophy</span>
              </a>

              <div className="flex items-center gap-2 sm:gap-2.5 w-full xs:w-auto justify-start">
                <button
                  onClick={handleCopyEmail}
                  className="clay-button min-h-[44px] min-w-[44px] p-2.5 text-slate-300 hover:text-white relative flex items-center justify-center"
                  title="Copy email address"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <Check className="w-4 h-4 text-emerald-400" />
                  ) : (
                    <Mail className="w-4 h-4 text-slate-300" />
                  )}
                  {copied && (
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-slate-900 border border-slate-700 text-emerald-300 text-[10px] rounded font-mono-code whitespace-nowrap shadow-xl">
                      Email copied!
                    </span>
                  )}
                </button>

                <a 
                  href="#resume" 
                  className="clay-button min-h-[44px] px-3.5 py-2.5 text-xs font-mono-code text-slate-300 hover:text-white flex items-center gap-2 flex-1 xs:flex-initial justify-center"
                >
                  <Download className="w-3.5 h-3.5 text-slate-400" />
                  <span>Resume</span>
                </a>
              </div>
            </div>

            {/* Engineering Snapshot Cards */}
            <div className="grid grid-cols-1 xs:grid-cols-3 gap-2.5 w-full max-w-xl">
              <div className="clay-card p-3 flex items-center xs:flex-col xs:items-start gap-2 xs:gap-1">
                <span className="text-[10px] sm:text-[11px] font-mono-code uppercase tracking-wider text-slate-400 flex items-center gap-1.5 shrink-0">
                  <Layers className="w-3.5 h-3.5 text-slate-400" /> Stack
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">Full-Stack &amp; Web</span>
              </div>

              <div className="clay-card p-3 flex items-center xs:flex-col xs:items-start gap-2 xs:gap-1">
                <span className="text-[10px] sm:text-[11px] font-mono-code uppercase tracking-wider text-slate-400 flex items-center gap-1.5 shrink-0">
                  <Sparkles className="w-3.5 h-3.5 text-slate-400" /> Focus
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">3D &amp; Architecture</span>
              </div>

              <div className="clay-card p-3 flex items-center xs:flex-col xs:items-start gap-2 xs:gap-1">
                <span className="text-[10px] sm:text-[11px] font-mono-code uppercase tracking-wider text-slate-400 flex items-center gap-1.5 shrink-0">
                  <Terminal className="w-3.5 h-3.5 text-slate-400" /> Base
                </span>
                <span className="text-xs sm:text-sm font-semibold text-slate-200 truncate">B.Tech CSE &bull; India</span>
              </div>
            </div>

          </div>

          {/* Right Column: 3D Interactive Terminal Inspector */}
          <div className="md:col-span-5 w-full flex flex-col items-center justify-center mt-4 md:mt-0">
            
            {/* The Lab Inspector Container */}
            <div className="clay-card w-full max-w-md md:max-w-none p-2.5 sm:p-3.5 relative">
              
              {/* Header Inspector Bar */}
              <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-white/5 mb-2 font-mono-code text-[11px] text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-700 inline-block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-slate-800 inline-block"></span>
                  <span className="text-slate-300 font-medium pl-1 text-[11px]">core_engine.mesh</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400 text-[10px] font-semibold tracking-wider">WebGL 2.0</span>
                </div>
              </div>

              {/* Responsive 3D Canvas Box */}
              <div className="relative w-full h-[240px] xs:h-[280px] sm:h-[300px] md:h-[320px] lg:h-[380px] rounded-xl overflow-hidden bg-[#0a0c12]/90 flex items-center justify-center border border-white/5">
                <HeroVisual />

                {/* Interaction Hint Overlay */}
                <div className="absolute bottom-2.5 right-2.5 text-[9px] sm:text-[10px] font-mono-code text-slate-400 bg-slate-900/80 px-2 py-1 rounded border border-white/10 backdrop-blur-md pointer-events-none select-none">
                  [touch / drag to rotate]
                </div>
              </div>

              {/* Bottom Interactive Code Snippet */}
              <div className="mt-2.5 px-3 py-2 rounded-lg bg-black/40 border border-white/5 font-mono-code text-[11px] text-slate-300 flex items-center justify-between gap-2 overflow-hidden">
                <div className="flex items-center gap-2 truncate">
                  <span className="text-emerald-400 select-none">$</span>
                  <span className="text-slate-300 truncate">om.motto = &ldquo;learn_by_building&rdquo;</span>
                </div>
                <span className="text-[10px] text-slate-400 shrink-0 font-medium">READY</span>
              </div>

            </div>

            {/* Social Channels Row */}
            <div className="flex items-center justify-center gap-2.5 mt-3 sm:mt-4 w-full">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noreferrer"
                className="clay-button min-h-[38px] min-w-[38px] p-2 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer"
                className="clay-button min-h-[38px] min-w-[38px] p-2 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a 
                href={`mailto:${email}`}
                className="clay-button min-h-[38px] min-w-[38px] p-2 text-slate-400 hover:text-white transition-colors flex items-center justify-center"
                aria-label="Send direct email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <div className="h-3.5 w-px bg-slate-800 mx-1"></div>
              <span className="text-[10px] sm:text-[11px] font-mono-code text-slate-400 truncate">
                ABES Engineering College
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
