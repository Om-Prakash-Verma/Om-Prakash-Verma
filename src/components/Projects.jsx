import { useState } from 'react';
import { projectsData } from '../data/projectsData';
import ProjectDetailDialog from './ProjectDetailDialog';
import { 
  ArrowUpRight, 
  Cpu, 
  Terminal, 
  Layers, 
  Sparkles, 
  ExternalLink,
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

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('featured');
  const [selectedProject, setSelectedProject] = useState(null);

  const filterTabs = [
    { id: 'featured', label: 'Flagship Core' },
    { id: 'all', label: 'All Systems' },
    { id: 'ai', label: 'AI & Algorithms' },
    { id: 'edge', label: 'Edge & Full-Stack' },
    { id: 'creative', label: 'Creative & Mobile' },
  ];

  const filteredProjects = projectsData.filter((project) => {
    if (activeFilter === 'featured') return project.isFeatured;
    if (activeFilter === 'all') return true;
    return project.category === activeFilter;
  });

  return (
    <section id="projects" className="relative py-24 px-4 sm:px-6 md:px-8 lg:px-12 max-w-7xl mx-auto">
      
      {/* Section Header */}
      <div className="flex flex-col items-start mb-12 sm:mb-16">
        
        {/* Section Identifier Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full clay-card text-xs font-mono-code text-slate-300 mb-4">
          <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
          <span>01 // THE WORKSHOP</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white font-heading tracking-tight mb-4">
          Featured Engineering Projects
        </h2>

        <p className="text-sm sm:text-base text-slate-400 max-w-2xl leading-relaxed">
          Production systems, AI models, and full-stack architectures engineered from first principles.
          Click <span className="text-slate-200 font-medium">&ldquo;Inspect Architecture&rdquo;</span> on any system to uncover what happens beneath the surface.
        </p>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mt-8 p-1.5 rounded-2xl clay-card">
          {filterTabs.map((tab) => {
            const isActive = activeFilter === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveFilter(tab.id)}
                className={`px-4 py-2 rounded-xl text-xs font-mono-code transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'clay-button-primary !text-[#090a0f] font-bold shadow-md'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
        {filteredProjects.map((project) => (
          <div
            key={project.id}
            className="clay-card p-5 sm:p-6 flex flex-col justify-between group hover:border-slate-500/30 transition-all duration-300 relative"
          >
            {/* Top Tag & Metric */}
            <div>
              <div className="flex items-center justify-between gap-2 mb-3 font-mono-code text-[11px]">
                <span className="px-2 py-0.5 rounded-full bg-cyan-950/70 border border-cyan-800/40 text-cyan-300 uppercase tracking-wider text-[10px] font-semibold">
                  {project.category}
                </span>
                {project.isFeatured && (
                  <span className="flex items-center gap-1 text-amber-400 text-[10px]">
                    <Sparkles className="w-3 h-3" />
                    <span>FLAGSHIP</span>
                  </span>
                )}
              </div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-white font-heading tracking-tight mb-2 group-hover:text-cyan-300 transition-colors">
                {project.title}
              </h3>

              {/* Tagline / Subtitle */}
              <p className="text-xs font-mono-code text-slate-400 mb-3 line-clamp-1">
                {project.tagline}
              </p>

              {/* Summary */}
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4 line-clamp-3">
                {project.summary}
              </p>

              {/* Architecture Highlight Badge */}
              <div className="p-2.5 rounded-lg bg-black/40 border border-white/5 font-mono-code text-[11px] text-slate-300 mb-5 flex items-center gap-2">
                <Cpu className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span className="truncate text-slate-300">{project.engineeringMetric}</span>
              </div>
            </div>

            {/* Bottom Stack & Actions */}
            <div>
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {project.techStack.slice(0, 4).map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] font-mono-code bg-white/5 text-slate-300 border border-white/5"
                  >
                    {tech}
                  </span>
                ))}
                {project.techStack.length > 4 && (
                  <span className="px-1.5 py-0.5 rounded text-[10px] font-mono-code text-slate-400">
                    +{project.techStack.length - 4}
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 pt-3 border-t border-white/5">
                <button
                  onClick={() => setSelectedProject(project)}
                  className="clay-button-primary px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 flex-1 group/btn cursor-pointer"
                >
                  <Terminal className="w-3.5 h-3.5 text-slate-900" />
                  <span>Inspect System</span>
                </button>

                {project.githubUrl && project.githubUrl !== '#' && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="clay-button p-2 text-slate-400 hover:text-white rounded-xl min-h-[36px] min-w-[36px] flex items-center justify-center"
                    title="View GitHub Repository"
                    aria-label={`View GitHub repository for ${project.title}`}
                  >
                    <GithubIcon className="w-4 h-4" />
                  </a>
                )}

                {project.liveUrl && project.liveUrl !== '#' && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="clay-button p-2 text-slate-400 hover:text-white rounded-xl min-h-[36px] min-w-[36px] flex items-center justify-center"
                    title="Open Live System"
                    aria-label={`Open live system for ${project.title}`}
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Inspect System Native Modal Dialog */}
      <ProjectDetailDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </section>
  );
}
