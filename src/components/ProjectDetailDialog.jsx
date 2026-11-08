import { useEffect, useRef } from 'react';
import { X, ExternalLink, Terminal, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

function GithubIcon({ className = "w-4 h-4" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

export default function ProjectDetailDialog({ project, onClose }) {
  const dialogRef = useRef(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [project]);

  // Handle click on backdrop to close (light dismiss)
  const handleBackdropClick = (e) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  if (!project) return null;

  return (
    <dialog
      ref={dialogRef}
      id="project-detail-dialog"
      aria-labelledby="dialog-title"
      onClick={handleBackdropClick}
      onClose={onClose}
      className="p-0 bg-transparent text-slate-100 max-w-3xl w-[92vw] sm:w-full rounded-2xl border border-white/10 shadow-2xl m-auto"
    >
      <div className="clay-card p-5 sm:p-7 bg-[#0b0e17]/98 backdrop-blur-2xl max-h-[88vh] overflow-y-auto">
        
        {/* Header Bar */}
        <div className="flex items-start justify-between gap-4 pb-4 border-b border-white/10 mb-5">
          <div>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-800/50 text-cyan-300 font-semibold uppercase tracking-wider">
                {project.category}
              </span>
              <span className="text-[11px] font-mono-code text-slate-400">
                {project.engineeringMetric}
              </span>
            </div>
            <h2 id="dialog-title" className="text-xl sm:text-2xl font-extrabold text-white font-heading">
              {project.title}
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 leading-relaxed">
              {project.tagline}
            </p>
          </div>

          <button
            onClick={onClose}
            className="clay-button p-2 text-slate-400 hover:text-white shrink-0 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-xl"
            aria-label="Close dialog"
            autoFocus
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* System Architecture Flow Diagram */}
        {project.architecture && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2 font-mono-code text-xs text-slate-300">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-300">Architecture &amp; Data Pipeline</span>
            </div>
            <div className="p-4 rounded-xl bg-[#06080d] border border-white/5 font-mono-code text-[11px] sm:text-xs text-cyan-200 overflow-x-auto whitespace-pre leading-relaxed shadow-inner">
              {project.architecture}
            </div>
          </div>
        )}

        {/* Engineering Highlights */}
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3 font-mono-code text-xs text-slate-300">
            <Terminal className="w-3.5 h-3.5 text-emerald-400" />
            <span className="font-semibold uppercase tracking-wider text-[11px] text-slate-300">Key Engineering Decisions &amp; Internals</span>
          </div>
          <div className="space-y-2.5">
            {project.highlights.map((highlight, idx) => (
              <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{highlight}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack Pills */}
        <div className="mb-6">
          <span className="text-[10px] font-mono-code uppercase tracking-wider text-slate-400 block mb-2">
            Technologies &amp; Protocols
          </span>
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.map((tech) => (
              <span 
                key={tech}
                className="px-2.5 py-1 rounded-lg text-xs font-mono-code bg-white/5 text-slate-200 border border-white/5"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-white/10 flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            {project.githubUrl && project.githubUrl !== '#' && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="clay-button px-4 py-2 text-xs font-mono-code text-slate-200 hover:text-white flex items-center gap-2"
              >
                <GithubIcon className="w-3.5 h-3.5" />
                <span>Source Code</span>
              </a>
            )}
            {project.liveUrl && project.liveUrl !== '#' && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="clay-button-primary px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 font-semibold"
              >
                <span>Live System</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="text-xs font-mono-code text-slate-400 hover:text-white ml-auto"
          >
            Press Esc or Close
          </button>
        </div>

      </div>
    </dialog>
  );
}
