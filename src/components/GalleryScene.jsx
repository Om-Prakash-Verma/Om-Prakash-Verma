import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Code, Sparkles } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audioEffects';

export default function GalleryScene({ onBack }) {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const projects = portfolioData.galleryProjects;
  const currentProject = projects[selectedIndex];

  const handleNext = () => {
    sound.playClick();
    setSelectedIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    sound.playClick();
    setSelectedIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f7f5ee] select-none flex flex-col justify-between">
      
      {/* 1. Sketched Sky, Clouds & City Skyline Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Distant sketched clouds */}
        <div className="absolute top-12 left-10 w-44 opacity-80 animate-pulse duration-1000">
          <svg viewBox="0 0 100 50" className="w-full fill-white stroke-neutral-800" strokeWidth="2.5">
            <path d="M 10,40 Q 25,20 40,30 Q 60,10 80,30 Q 95,30 90,45 Z" />
          </svg>
        </div>
        <div className="absolute top-8 right-16 w-52 opacity-80">
          <svg viewBox="0 0 100 50" className="w-full fill-white stroke-neutral-800" strokeWidth="2.5">
            <path d="M 10,40 Q 25,20 40,30 Q 60,10 80,30 Q 95,30 90,45 Z" />
          </svg>
        </div>

        {/* Distant sketched cityscape skyline */}
        <div className="absolute bottom-36 left-0 right-0 h-40 opacity-30 flex items-end justify-around">
          {[40, 70, 55, 90, 65, 80, 50, 75, 60, 85, 45, 95].map((h, i) => (
            <div
              key={i}
              className="w-16 border-t-2 border-x-2 border-neutral-700 bg-white/40"
              style={{ height: `${h}%` }}
            >
              <div className="w-full h-2 border-b border-neutral-700"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Clothesline with Projects Hanging on Clothespins (Matching video frame 4) */}
      <div className="relative z-20 w-full pt-16 px-4">
        {/* The horizontal clothesline cord */}
        <div className="relative w-full h-1 border-b-2 border-neutral-800 shadow-xs">
          {/* Hanging bird / peg on the clothesline */}
          <div className="absolute top-[-10px] left-[65%] w-6 h-4 border border-neutral-800 bg-white rounded-full flex items-center justify-center text-[10px]">
            🐦
          </div>
        </div>

        {/* Hanging cards carousel */}
        <div className="flex items-start justify-center gap-4 sm:gap-6 mt-1 overflow-x-auto py-2 no-scrollbar">
          {projects.map((proj, idx) => {
            const isSelected = idx === selectedIndex;
            return (
              <div
                key={proj.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedIndex(idx);
                }}
                className={`relative flex flex-col items-center cursor-pointer transition-all duration-200 transform ${
                  isSelected ? 'scale-105 -translate-y-1' : 'opacity-65 hover:opacity-100 hover:-translate-y-0.5'
                }`}
              >
                {/* Clothespin peg */}
                <div className="w-3.5 h-6 border-2 border-neutral-800 bg-[#dfc093] rounded-xs z-30 shadow-xs -mb-2"></div>

                {/* Hanging sheet */}
                <div className={`w-28 sm:w-36 h-36 sm:h-44 border-2 border-neutral-800 bg-white p-2.5 flex flex-col justify-between shadow-md transition-shadow ${
                  isSelected ? 'border-amber-600 ring-2 ring-amber-400/40 bg-amber-50/30' : ''
                }`}>
                  <div className="border-b border-neutral-300 pb-1">
                    <span className="font-marker text-xs sm:text-sm text-neutral-900 line-clamp-1">
                      {proj.title}
                    </span>
                  </div>

                  {/* Blueprint schematic sketch preview */}
                  <div className="w-full h-16 sm:h-20 border border-dashed border-neutral-400 bg-neutral-50 flex items-center justify-center p-1 text-center">
                    <span className="font-sketch text-[10px] text-neutral-500 line-clamp-3">
                      {proj.highlight}
                    </span>
                  </div>

                  <div className="flex justify-between items-center text-[9px] font-mono-code text-neutral-600">
                    <span>№ 0{idx + 1}</span>
                    <span className="font-bold text-amber-600">VIEW</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Center Wooden Easel Board: "PROJECT DETAILS:" (Matching video frame 4) */}
      <div className="relative z-30 flex-1 flex items-center justify-center px-4 py-2">
        <div className="relative w-full max-w-xl wood-sign p-4 sm:p-6 shadow-2xl animate-in fade-in zoom-in-95 duration-200">
          
          {/* Inner parchment frame */}
          <div className="bg-[#fcfbf7] border-2 border-neutral-800 p-4 sm:p-5 shadow-inner">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b-2 border-neutral-800 pb-2 mb-3">
              <h2 className="font-marker text-xl sm:text-2xl text-neutral-900 tracking-wide">
                PROJECT DETAILS: {currentProject.title}
              </h2>
              <span className="font-mono-code text-xs px-2 py-0.5 bg-neutral-200 text-neutral-800 rounded">
                0{selectedIndex + 1} / 0{projects.length}
              </span>
            </div>

            {/* Tagline & Description */}
            <p className="font-sketch font-bold text-neutral-800 text-sm mb-1.5">
              {currentProject.tagline}
            </p>
            <p className="font-sketch text-xs sm:text-sm text-neutral-700 leading-relaxed mb-4">
              {currentProject.description}
            </p>

            {/* Architectural Highlight Banner */}
            <div className="p-2 border border-dashed border-amber-500 bg-amber-50/60 rounded-xs mb-4">
              <div className="flex items-center gap-1.5 text-amber-900 font-sketch text-xs font-bold">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Core Metric: {currentProject.highlight}</span>
              </div>
            </div>

            {/* TECH STACK (Hand-Drawn / Watercolor Badges) */}
            <div className="border-t border-b border-neutral-300 py-3 mb-4">
              <span className="font-marker text-xs text-neutral-500 block mb-2 tracking-wider">
                TECH STACK:
              </span>
              <div className="flex flex-wrap gap-2">
                {currentProject.techStack.map((tech, tIdx) => (
                  <div
                    key={tIdx}
                    className="paper-button px-2.5 py-1 text-xs font-sketch font-bold flex items-center gap-1.5"
                    style={{ borderColor: tech.color }}
                  >
                    <span 
                      className="w-2.5 h-2.5 rounded-full border border-neutral-800 shadow-xs"
                      style={{ backgroundColor: tech.color }}
                    />
                    <span className="text-neutral-900">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Buttons: "OPEN PROJECT" & "VIEW CODE" */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex items-center gap-2">
                <button
                  onClick={handlePrev}
                  className="paper-button p-2 text-neutral-800"
                  title="Previous Project"
                >
                  <ChevronLeft className="w-5 h-5 stroke-[2.5]" />
                </button>
                <button
                  onClick={handleNext}
                  className="paper-button p-2 text-neutral-800"
                  title="Next Project"
                >
                  <ChevronRight className="w-5 h-5 stroke-[2.5]" />
                </button>
              </div>

              <div className="flex items-center gap-2">
                {currentProject.githubUrl && (
                  <a
                    href={currentProject.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="paper-button px-4 py-2 font-sketch font-bold text-xs sm:text-sm text-neutral-800 flex items-center gap-1.5"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>Source Code</span>
                  </a>
                )}
                {currentProject.liveUrl && currentProject.liveUrl !== '#' && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="paper-button bg-amber-400 hover:bg-amber-300 px-5 py-2 font-marker text-xs sm:text-sm text-neutral-900 flex items-center gap-1.5 border-2 border-neutral-900 shadow-md"
                  >
                    <span>OPEN PROJECT</span>
                    <ExternalLink className="w-4 h-4 stroke-[2.5]" />
                  </a>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* 4. Balcony Balustrade Foreground (Matching video frame 4) */}
      <div className="relative z-20 w-full h-24 border-t-4 border-neutral-800 bg-[#ede5d5] flex items-center justify-around px-2 shadow-inner">
        {Array.from({ length: 18 }).map((_, bIdx) => (
          <div key={bIdx} className="w-3 sm:w-4 h-full border-x-2 border-neutral-800 bg-[#dfc093] flex flex-col justify-around py-1">
            <div className="w-full h-2 bg-neutral-800"></div>
            <div className="w-full h-2 bg-neutral-800"></div>
          </div>
        ))}
      </div>

    </div>
  );
}
