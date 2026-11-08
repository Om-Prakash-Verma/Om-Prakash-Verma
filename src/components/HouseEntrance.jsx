import React, { useState, useEffect } from 'react';
import { sound } from '../utils/audioEffects';

export default function HouseEntrance({ onEnter, isMuted }) {
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [doorHovered, setDoorHovered] = useState(false);
  const [doorsOpening, setDoorsOpening] = useState(false);

  // Simulated paper loader 0% -> 100% as seen in video frame 0
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 15) + 5;
      if (current >= 100) {
        current = 100;
        setLoadingProgress(100);
        clearInterval(interval);
        setTimeout(() => setIsLoaded(true), 400);
      } else {
        setLoadingProgress(current);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  const handleDoorClick = () => {
    if (doorsOpening) return;
    sound.playDoorOpen();
    setDoorsOpening(true);
    setTimeout(() => {
      onEnter();
    }, 900);
  };

  if (!isLoaded) {
    return (
      <div className="fixed inset-0 bg-[#f7f5ee] flex flex-col items-center justify-center select-none z-50">
        {/* Paper fold line & percent circle matching frame 0 */}
        <div className="relative flex flex-col items-center justify-center">
          {/* Vertical hand-drawn jagged line */}
          <svg className="w-16 h-72 text-neutral-800" viewBox="0 0 40 200" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M 20,0 L 25,40 L 15,70 L 28,100 L 12,130 L 24,165 L 18,200" />
          </svg>

          {/* Center Progress Circle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-dashed border-neutral-800 flex items-center justify-center bg-[#f7f5ee]/95 shadow-sm">
              <span className="font-sketch font-bold text-2xl text-neutral-900">
                {loadingProgress}%
              </span>
            </div>
          </div>
        </div>
        <p className="font-sketch text-neutral-500 mt-6 text-sm tracking-wider">Unfolding Om&apos;s Sketch World...</p>
      </div>
    );
  }

  return (
    <div className={`fixed inset-0 bg-[#f7f5ee] overflow-hidden flex flex-col items-center justify-center select-none transition-transform duration-1000 ${doorsOpening ? 'scale-125 opacity-0' : 'scale-100 opacity-100'}`}>
      
      {/* House Front Façade Container */}
      <div className="relative w-full max-w-4xl h-[620px] max-h-screen flex items-center justify-center px-4">
        
        {/* Brick Wall Background Pattern */}
        <div 
          className="absolute inset-0 border-4 border-neutral-800 rounded-sm overflow-hidden"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(30,30,30,0.12) 2px, transparent 2px),
              linear-gradient(to bottom, rgba(30,30,30,0.12) 2px, transparent 2px)
            `,
            backgroundSize: '80px 36px',
            backgroundColor: '#fbf9f4'
          }}
        >
          {/* Subtle ink brick lines */}
          <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#222_1px,transparent_1px)] [background-size:16px_16px]" />
        </div>

        {/* 1. Tree on the left with hanging computer mouse (as seen in video!) */}
        <div className="absolute left-2 sm:left-8 bottom-0 w-48 sm:w-64 h-96 pointer-events-none z-10">
          <svg viewBox="0 0 200 300" className="w-full h-full fill-none stroke-neutral-800" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            {/* Tree Trunk */}
            <path d="M 60,300 C 65,220 50,160 30,120 C 70,110 100,70 120,40" />
            <path d="M 90,300 C 95,230 85,170 110,130 C 130,110 150,90 170,80" />
            
            {/* Tree Foliage Clouds */}
            <path d="M 10,140 Q 0,110 30,90 Q 40,60 80,70 Q 120,40 150,70 Q 190,80 180,120 Q 190,150 150,160 Q 120,180 80,160 Q 30,170 10,140 Z" fill="#ffffff" fillOpacity="0.8" />
            <path d="M 50,90 Q 70,50 110,60 Q 140,40 160,70" />

            {/* Wire hanging down with computer mouse */}
            <path d="M 130,140 C 130,180 120,210 125,230" strokeDasharray="3 3" />
            {/* Computer Mouse */}
            <rect x="115" y="230" width="20" height="32" rx="10" fill="#ffffff" stroke="#222" strokeWidth="2.5" />
            <line x1="125" y1="230" x2="125" y2="242" stroke="#222" strokeWidth="2" />
          </svg>
        </div>

        {/* 2. White Cat sitting next to the door (as in video!) */}
        <div className="absolute left-[24%] sm:left-[28%] bottom-6 w-14 h-20 pointer-events-none z-20">
          <svg viewBox="0 0 60 80" className="w-full h-full fill-white stroke-neutral-800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Body */}
            <path d="M 15,80 C 10,60 15,45 25,40 C 35,45 40,60 35,80 Z" />
            {/* Head & Ears */}
            <circle cx="25" cy="30" r="14" />
            <polygon points="14,22 18,10 24,18" />
            <polygon points="26,18 32,10 36,22" />
            {/* Tail */}
            <path d="M 35,75 C 48,75 52,60 50,50" />
            {/* Eyes & Nose */}
            <circle cx="20" cy="28" r="1.5" fill="#222" />
            <circle cx="30" cy="28" r="1.5" fill="#222" />
            <polygon points="24,33 26,33 25,35" fill="#222" />
          </svg>
        </div>

        {/* 3. Window with planter box & rubber duck on the right */}
        <div className="absolute right-4 sm:right-12 top-28 w-36 sm:w-48 h-36 border-4 border-neutral-800 bg-white/90 z-10 flex flex-col justify-between">
          <div className="w-full h-full grid grid-cols-2 grid-rows-2 border-b-4 border-neutral-800">
            <div className="border-r-2 border-b-2 border-neutral-800"></div>
            <div className="border-l-2 border-b-2 border-neutral-800"></div>
            <div className="border-r-2 border-t-2 border-neutral-800"></div>
            <div className="border-l-2 border-t-2 border-neutral-800"></div>
          </div>
          {/* Planter box with succulents and rubber duck */}
          <div className="relative -bottom-4 w-full h-8 border-3 border-neutral-800 bg-[#dfc093] flex items-center justify-around px-2 shadow-sm">
            <span className="text-xs">🌵</span>
            <span className="text-xs">🌿</span>
            <span className="text-xs" title="Rubber Duck">🦆</span>
            <span className="text-xs">🌸</span>
          </div>
        </div>

        {/* 4. Center Entrance: Hanging Wooden "PORTFOLIO" Sign */}
        <div className="absolute top-8 z-30 flex flex-col items-center">
          {/* Hanging Chains */}
          <div className="flex justify-between w-44 px-4 h-6">
            <div className="w-1 border-r-2 border-dashed border-neutral-800 h-full"></div>
            <div className="w-1 border-r-2 border-dashed border-neutral-800 h-full"></div>
          </div>
          {/* Wood Signboard */}
          <div className="wood-sign px-8 py-2.5 flex items-center justify-center transform -rotate-1 shadow-md hover:rotate-0 transition-transform">
            <h1 className="font-marker text-2xl sm:text-3xl text-neutral-900 tracking-wider">
              PORTFOLIO
            </h1>
          </div>
        </div>

        {/* 5. Center Double Doors with Tech Badge Stickers */}
        <div 
          onClick={handleDoorClick}
          onMouseEnter={() => {
            sound.playClick();
            setDoorHovered(true);
          }}
          onMouseLeave={() => setDoorHovered(false)}
          className="relative z-20 mt-16 w-56 sm:w-64 h-80 sm:h-96 border-4 border-neutral-900 rounded-t-sm flex cursor-pointer shadow-xl group overflow-hidden bg-neutral-900"
          title="Click to enter Om's Portfolio"
        >
          {/* Left Door Leaf */}
          <div 
            className={`w-1/2 h-full border-r-2 border-neutral-800 p-2 flex flex-col justify-between transition-transform duration-700 origin-left ${
              doorsOpening ? '-rotate-y-80 opacity-40' : doorHovered ? '-rotate-y-12' : 'rotate-y-0'
            }`}
            style={{
              background: doorHovered ? 'linear-gradient(135deg, #d8b27c, #c49a62)' : '#ede5d5',
            }}
          >
            {/* Tech Stickers Left: HTML5, JS, React */}
            <div className="space-y-3 pt-4">
              <div className="w-10 h-8 rounded border-2 border-neutral-800 bg-[#e34f26] text-white font-sketch text-[10px] font-bold flex items-center justify-center transform -rotate-6 shadow-xs">
                HTML5
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-neutral-800 bg-[#f7df1e] text-neutral-900 font-sketch text-xs font-bold flex items-center justify-center transform rotate-12 shadow-xs">
                JS
              </div>
              <div className="w-11 h-9 rounded border-2 border-neutral-800 bg-[#3178c6] text-white font-sketch text-[10px] font-bold flex items-center justify-center transform -rotate-3 shadow-xs">
                TS
              </div>
            </div>

            {/* Left Door Handle */}
            <div className="self-end mr-1 w-3 h-8 rounded-sm bg-neutral-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full"></div>
            </div>

            <div className="w-12 h-6 border-2 border-neutral-800 bg-[#61dafb] text-neutral-900 font-sketch text-[9px] font-bold flex items-center justify-center transform rotate-6">
              REACT
            </div>
          </div>

          {/* Right Door Leaf */}
          <div 
            className={`w-1/2 h-full border-l-2 border-neutral-800 p-2 flex flex-col justify-between transition-transform duration-700 origin-right ${
              doorsOpening ? 'rotate-y-80 opacity-40' : doorHovered ? 'rotate-y-12' : 'rotate-y-0'
            }`}
            style={{
              background: doorHovered ? 'linear-gradient(135deg, #c49a62, #d8b27c)' : '#ede5d5',
            }}
          >
            {/* Tech Stickers Right: Node.js, CSS3, Python */}
            <div className="space-y-3 pt-4 items-end flex flex-col">
              <div className="w-11 h-9 rounded-full border-2 border-neutral-800 bg-[#68a063] text-white font-sketch text-[10px] font-bold flex items-center justify-center transform rotate-6 shadow-xs">
                NODE
              </div>
              <div className="w-10 h-8 rounded border-2 border-neutral-800 bg-[#1572b6] text-white font-sketch text-[10px] font-bold flex items-center justify-center transform -rotate-12 shadow-xs">
                CSS3
              </div>
              <div className="w-12 h-7 rounded border-2 border-neutral-800 bg-[#ffca28] text-neutral-900 font-sketch text-[9px] font-bold flex items-center justify-center transform rotate-3 shadow-xs">
                FIREBASE
              </div>
            </div>

            {/* Right Door Handle */}
            <div className="self-start ml-1 w-3 h-8 rounded-sm bg-neutral-800 flex items-center justify-center">
              <div className="w-1.5 h-1.5 bg-neutral-400 rounded-full"></div>
            </div>

            <div className="self-end w-12 h-6 border-2 border-neutral-800 bg-[#f38020] text-white font-sketch text-[8px] font-bold flex items-center justify-center transform -rotate-6">
              EDGE D1
            </div>
          </div>

          {/* Door Frame Inner Glow when hovered */}
          {doorHovered && !doorsOpening && (
            <div className="absolute inset-0 pointer-events-none border-2 border-amber-400/50 bg-amber-200/10 animate-pulse"></div>
          )}
        </div>

        {/* Stone Path leading to the door */}
        <div className="absolute bottom-0 w-36 h-12 flex justify-center gap-1 z-10 pointer-events-none">
          <div className="w-10 h-6 border-2 border-neutral-700 bg-white/70 rounded-full transform -rotate-6"></div>
          <div className="w-12 h-7 border-2 border-neutral-700 bg-white/70 rounded-full transform rotate-12"></div>
          <div className="w-9 h-5 border-2 border-neutral-700 bg-white/70 rounded-full transform -rotate-3"></div>
        </div>

      </div>

      {/* 6. Bottom Prompt on Torn Paper Card (Matching video frame 8) */}
      <div className="mt-4 z-30">
        <div 
          onClick={handleDoorClick}
          className="paper-torn bg-white px-6 py-3 cursor-pointer hover:bg-neutral-50 transition-transform hover:scale-105 flex flex-col items-center shadow-lg"
        >
          <span className="font-marker text-sm tracking-widest text-neutral-900">
            EXPLORER
          </span>
          <span className="font-sketch text-xs text-neutral-600 mt-0.5">
            Click the door to enter. Audio is currently [{isMuted ? 'MUTED' : 'ON'}]
          </span>
        </div>
      </div>

    </div>
  );
}
