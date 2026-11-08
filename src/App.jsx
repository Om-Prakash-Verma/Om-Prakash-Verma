import Navbar from './components/Navbar';
import Hero from './components/Hero';

export default function App() {
  return (
    <div className="min-h-screen bg-[#08090d] text-slate-100 flex flex-col selection:bg-slate-700 selection:text-white">
      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Hero Section */}
        <Hero />
      </main>

      {/* Footer minimal teaser while we build subsequent sections */}
      <footer className="py-8 border-t border-white/5 text-center text-xs font-mono-code text-slate-400">
        <p>© {new Date().getFullYear()} Om Prakash Verma. Crafted with tactile engineering &amp; 3D interaction.</p>
      </footer>
    </div>
  );
}
