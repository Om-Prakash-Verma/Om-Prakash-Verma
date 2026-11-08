import React, { useState } from 'react';
import { Tv, Terminal, Cpu, Zap, ExternalLink, X, Sparkles } from 'lucide-react';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audioEffects';

export default function StudioScene({ onBack }) {
  const [selectedScreen, setSelectedScreen] = useState(null);
  const screens = portfolioData.studioScreens;

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f7f5ee] select-none flex flex-col justify-between p-6">
      
      {/* Background ink grid & doodle lines */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage: `radial-gradient(#1c1c1c 1px, transparent 1px)`,
          backgroundSize: '24px 24px'
        }}
      />

      {/* Top Header */}
      <div className="relative z-20 pt-12 text-center max-w-xl mx-auto">
        <div className="wood-sign inline-block px-8 py-2 transform -rotate-1 shadow-md mb-2">
          <h1 className="font-marker text-2xl sm:text-3xl text-neutral-900">
            THE STUDIO LAB
          </h1>
        </div>
        <p className="font-sketch text-sm sm:text-base text-neutral-600">
          Floating systems, compiler experiments, and runtime engineering beneath the surface.
        </p>
      </div>

      {/* Center: Floating Retro CRT Monitors Orbiting in Space */}
      <div className="relative z-20 flex-1 flex items-center justify-center p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10 max-w-3xl w-full">
          {screens.map((item, idx) => {
            const isSelected = selectedScreen?.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => {
                  sound.playClick();
                  setSelectedScreen(item);
                }}
                className={`paper-box p-4 bg-white cursor-pointer transition-all duration-200 transform hover:-translate-y-2 hover:rotate-1 shadow-lg ${
                  isSelected ? 'border-amber-600 ring-2 ring-amber-400' : ''
                }`}
              >
                {/* CRT Monitor Top with Antenna */}
                <div className="flex items-center justify-between border-b-2 border-neutral-800 pb-2 mb-3">
                  <div className="flex items-center gap-2">
                    <Tv className="w-5 h-5 text-neutral-800" />
                    <span className="font-marker text-base text-neutral-900">{item.title}</span>
                  </div>
                  <span className="font-mono-code text-[10px] font-bold px-1.5 py-0.5 bg-neutral-900 text-white rounded-xs">
                    {item.badge}
                  </span>
                </div>

                {/* CRT Screen Tube with Scanlines */}
                <div className="relative h-28 border-2 border-neutral-800 bg-[#f0eee4] rounded-sm p-3 flex flex-col justify-between overflow-hidden shadow-inner">
                  {/* Scanline pattern */}
                  <div className="absolute inset-0 opacity-15 pointer-events-none bg-[linear-gradient(rgba(0,0,0,0.4)_1px,transparent_1px)] [background-size:100%_4px]" />
                  
                  <span className="font-sketch font-bold text-xs text-neutral-800">
                    &gt; {item.subtitle}
                  </span>

                  <p className="font-sketch text-xs text-neutral-600 line-clamp-2">
                    {item.desc}
                  </p>

                  <div className="flex justify-between items-center text-[10px] font-mono-code text-neutral-500 pt-1 border-t border-neutral-300">
                    <span>{item.date}</span>
                    <span className="text-amber-700 font-bold hover:underline">CLICK TO INSPECT →</span>
                  </div>
                </div>

                {/* Monitor Knobs / Dials */}
                <div className="flex items-center justify-end gap-2 pt-2">
                  <div className="w-3 h-3 rounded-full border border-neutral-800 bg-neutral-200"></div>
                  <div className="w-3 h-3 rounded-full border border-neutral-800 bg-neutral-300"></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Hint */}
      <div className="relative z-20 text-center pb-4">
        <span className="font-sketch text-xs text-neutral-500 bg-white/80 px-3 py-1 rounded shadow-xs">
          Click on any retro monitor to inspect runtime specifications and code links
        </span>
      </div>

      {/* Screen Inspector Modal (Torn Paper Sheet) */}
      {selectedScreen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="paper-torn bg-white p-6 sm:p-8 max-w-lg w-full relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                sound.playClick();
                setSelectedScreen(null);
              }}
              className="absolute top-4 right-4 text-neutral-700 hover:text-black font-bold p-1 cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="font-mono-code text-xs px-2 py-0.5 bg-neutral-900 text-white rounded">
                {selectedScreen.badge}
              </span>
              <span className="font-mono-code text-xs text-neutral-500">{selectedScreen.date}</span>
            </div>

            <h2 className="font-marker text-2xl text-neutral-900 mb-1">
              {selectedScreen.title}
            </h2>
            <h3 className="font-sketch font-bold text-amber-800 text-base mb-4">
              {selectedScreen.subtitle}
            </h3>

            <div className="p-4 bg-[#f8f6f0] border-2 border-neutral-800 rounded-sm mb-5 shadow-inner">
              <p className="font-sketch text-sm sm:text-base text-neutral-800 leading-relaxed">
                {selectedScreen.desc}
              </p>
            </div>

            <div className="flex items-center justify-between pt-2 border-t-2 border-neutral-200">
              <span className="font-sketch text-xs text-neutral-500">
                Architectural Domain — Om Prakash Verma
              </span>
              <a
                href={selectedScreen.link}
                target="_blank"
                rel="noreferrer"
                className="paper-button bg-amber-400 hover:bg-amber-300 px-4 py-2 font-marker text-xs text-neutral-900 flex items-center gap-1.5 shadow-sm"
              >
                <span>OPEN REPOSITORY</span>
                <ExternalLink className="w-4 h-4 stroke-[2.5]" />
              </a>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
