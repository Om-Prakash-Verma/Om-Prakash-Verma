import { useState, useEffect } from 'react';
import { Menu, X, ArrowUpRight, Gamepad2 } from 'lucide-react';

export default function Navbar({ onSwitchToSpatialView }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Skills', href: '#skills' },
    { name: 'Beyond Code', href: '#beyond' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 flex justify-center px-3 sm:px-6 pt-3 sm:pt-4 pointer-events-none">
      <nav 
        className={`w-full max-w-6xl transition-all duration-300 rounded-2xl px-3.5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between pointer-events-auto ${
          scrolled 
            ? 'clay-card !bg-[#0b0d14]/92 !backdrop-blur-xl border border-white/10 shadow-2xl' 
            : 'bg-[#0b0d14]/60 backdrop-blur-md sm:bg-transparent sm:backdrop-blur-none border border-white/5 sm:border-transparent'
        }`}
        aria-label="Primary Navigation"
      >
        {/* Brand Monogram */}
        <a href="#" className="flex items-center gap-2.5 group shrink-0">
          <div className="w-8 sm:w-9 h-8 sm:h-9 rounded-xl clay-button flex items-center justify-center text-white font-mono-code font-bold text-xs sm:text-sm group-hover:border-slate-400/30">
            OP
          </div>
          <div className="flex flex-col">
            <span className="text-xs sm:text-sm font-bold tracking-tight text-white font-heading group-hover:text-slate-200">
              Om Prakash Verma
            </span>
            <span className="text-[9px] sm:text-[10px] font-mono-code text-slate-400">
              Developer &amp; Builder
            </span>
          </div>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1 p-1 rounded-full clay-card text-xs font-mono-code">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-3.5 py-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/5 transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Action Button & 3D Spatial World Switcher */}
        <div className="hidden sm:flex items-center gap-2.5">
          {onSwitchToSpatialView && (
            <button
              onClick={onSwitchToSpatialView}
              className="clay-button px-3.5 py-2 rounded-xl text-xs flex items-center gap-1.5 font-mono-code text-cyan-300 hover:text-white transition-colors cursor-pointer border border-cyan-500/20"
              title="Enter 3D Spatial Walkthrough"
            >
              <Gamepad2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>3D Spatial Lab</span>
            </button>
          )}

          <a
            href="#contact"
            className="clay-button-primary px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 font-semibold"
          >
            <span>Let&apos;s Build</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden clay-button p-2 text-slate-300 hover:text-white min-h-[40px] min-w-[40px] flex items-center justify-center"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 md:hidden pointer-events-auto"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />
          <div className="md:hidden fixed top-20 left-4 right-4 clay-card p-5 border border-white/10 bg-[#0e1017]/98 backdrop-blur-2xl z-50 flex flex-col gap-3 font-mono-code text-sm pointer-events-auto animate-in fade-in zoom-in-95 duration-200">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-xl hover:bg-white/5 text-slate-200 active:bg-white/10"
              >
                {link.name}
              </a>
            ))}
            {onSwitchToSpatialView && (
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onSwitchToSpatialView();
                }}
                className="clay-button py-2.5 px-3 rounded-xl text-center text-xs flex items-center justify-center gap-2 text-cyan-300 font-semibold"
              >
                <Gamepad2 className="w-4 h-4 text-cyan-400" />
                <span>Enter 3D Spatial Lab</span>
              </button>
            )}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="clay-button-primary py-3 rounded-xl text-center text-xs mt-1 font-semibold"
            >
              Let&apos;s Build
            </a>
          </div>
        </>
      )}
    </header>
  );
}
