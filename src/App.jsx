import { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Projects from './components/Projects';
import SpatialLabWorld from './components/SpatialLabWorld';

export default function App() {
  // 'spatial' (3D ITom-style game walkthrough) or 'reader' (standard high-speed reader view)
  const [viewMode, setViewMode] = useState('spatial');

  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col selection:bg-slate-700 selection:text-white">
      {viewMode === 'spatial' ? (
        <SpatialLabWorld onSwitchToReaderView={() => setViewMode('reader')} />
      ) : (
        <>
          {/* Navigation with Mode Switcher */}
          <Navbar onSwitchToSpatialView={() => setViewMode('spatial')} />

          {/* Main Content */}
          <main className="flex-1">
            {/* Hero Section */}
            <Hero />

            {/* Featured Projects & Architecture Workshop */}
            <Projects />
          </main>

          {/* Footer */}
          <footer className="py-8 border-t border-white/5 text-center text-xs font-mono-code text-slate-400">
            <p>© {new Date().getFullYear()} Om Prakash Verma. Crafted with tactile engineering &amp; 3D interaction.</p>
          </footer>
        </>
      )}
    </div>
  );
}
