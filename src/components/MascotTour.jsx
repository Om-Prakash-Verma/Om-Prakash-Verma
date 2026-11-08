import { useState, useEffect, useRef } from 'react';
import MascotBot from './MascotBot';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  X, 
  MessageSquare,
  Bot
} from 'lucide-react';

export default function MascotTour() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [botReaction, setBotReaction] = useState(null);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);

  const tourSteps = [
    {
      title: "Hey there! 👋",
      tag: "Spark // Assistant",
      message: "I'm Spark, Om's lab assistant! Welcome to his digital engineering workshop.",
      highlight: "greeting",
    },
    {
      title: "Beneath the Surface 🔍",
      tag: "Philosophy",
      message: "Om is driven by curiosity—he doesn't just use tools, he explores how compilers and systems tick underneath.",
      highlight: "philosophy",
    },
    {
      title: "Full-Stack & 3D 🛠️",
      tag: "Engineering Craft",
      message: "From resilient backend architectures to interactive 3D WebGL experiences, he turns unconventional ideas into reality.",
      highlight: "skills",
    },
    {
      title: "Take a Look Around! 🚀",
      tag: "The Workshop",
      message: "Explore his projects, inspect his code, or click on me anytime for a trick! Have fun exploring!",
      highlight: "ready",
    },
  ];

  const funReactions = [
    "Whoosh! 🌀 Let's build something epic!",
    "Fun fact: Om loves fitness, photography & 3D art! 📸",
    "Curiosity is the engine of engineering! ⚡",
    "All systems nominal! Ready to collaborate. 🤝",
  ];

  // Auto-advance timer (6 seconds per step)
  useEffect(() => {
    if (!isAutoPlaying || isMinimized) {
      setProgress(0);
      return;
    }

    const duration = 6500;
    const interval = 50;
    const stepIncrement = (interval / duration) * 100;

    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentStep((step) => {
            if (step < tourSteps.length - 1) {
              return step + 1;
            } else {
              setIsAutoPlaying(false);
              return step;
            }
          });
          return 0;
        }
        return prev + stepIncrement;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [currentStep, isAutoPlaying, isMinimized, tourSteps.length]);

  const handleNext = () => {
    setProgress(0);
    if (currentStep < tourSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsAutoPlaying(false);
    }
  };

  const handlePrev = () => {
    setProgress(0);
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReplay = () => {
    setCurrentStep(0);
    setProgress(0);
    setIsAutoPlaying(true);
    setIsMinimized(false);
  };

  const handleBotClick = () => {
    const randomReaction = funReactions[Math.floor(Math.random() * funReactions.length)];
    setBotReaction(randomReaction);
    setTimeout(() => setBotReaction(null), 3200);
  };

  const currentDialogue = tourSteps[currentStep];

  return (
    <div className="w-full flex flex-col items-center relative">
      
      {/* 3D Mascot Interactive Canvas Container */}
      <div className="clay-card w-full max-w-md md:max-w-none p-3 sm:p-4 relative group">
        
        {/* Top Minimal Inspector Bar */}
        <div className="flex items-center justify-between px-2.5 py-1.5 border-b border-white/5 mb-2 font-mono-code text-[11px] text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
            <span className="text-slate-200 font-medium pl-1 text-[11px]">spark_assistant.droid</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsMinimized(!isMinimized)}
              className="text-[10px] text-slate-400 hover:text-white px-2 py-0.5 rounded clay-button flex items-center gap-1"
              title={isMinimized ? "Show Tour" : "Minimize Tour"}
            >
              {isMinimized ? <MessageSquare className="w-3 h-3 text-emerald-400" /> : <X className="w-3 h-3" />}
              <span>{isMinimized ? "Tour" : "Hide"}</span>
            </button>
          </div>
        </div>

        {/* 3D Visual Mesh Box */}
        <div className="relative w-full h-[240px] xs:h-[280px] sm:h-[300px] md:h-[320px] lg:h-[360px] rounded-xl overflow-hidden bg-gradient-to-b from-[#0e111a]/95 to-[#07090e]/95 flex items-center justify-center border border-white/5 shadow-inner">
          <MascotBot 
            currentStep={currentStep} 
            onBotClick={handleBotClick} 
            botReaction={botReaction}
          />

          {/* Quick Interaction Tap Hint */}
          <div className="absolute top-2.5 right-2.5 text-[9px] font-mono-code text-cyan-300 bg-cyan-950/70 border border-cyan-800/50 px-2 py-1 rounded backdrop-blur-md pointer-events-none select-none flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5" />
            <span>tap Spark to flip</span>
          </div>

          {/* Bot Reaction Toast Overlay */}
          {botReaction && (
            <div className="absolute bottom-4 left-4 right-4 bg-slate-900/95 border border-cyan-500/40 text-cyan-200 text-xs font-mono-code px-3.5 py-2 rounded-xl backdrop-blur-xl shadow-2xl animate-in fade-in slide-in-from-bottom-2 duration-200 text-center">
              {botReaction}
            </div>
          )}
        </div>

        {/* Dynamic Tactile Speech Bubble (Auto-Tour Dialogue) */}
        {!isMinimized && (
          <div className="mt-3 p-3.5 rounded-xl clay-card border border-white/10 bg-[#121520]/95 backdrop-blur-xl relative">
            
            {/* Auto-Advance Progress Bar */}
            {isAutoPlaying && (
              <div className="w-full bg-slate-800/80 h-1 rounded-full overflow-hidden mb-2.5">
                <div 
                  className="bg-gradient-to-r from-cyan-400 to-emerald-400 h-full transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Bubble Header */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded bg-cyan-950/80 border border-cyan-800/40 text-cyan-300 font-semibold">
                  {currentDialogue.tag}
                </span>
                <span className="text-xs font-bold text-slate-100 font-heading">
                  {currentDialogue.title}
                </span>
              </div>
              <span className="text-[10px] font-mono-code text-slate-400">
                {currentStep + 1}/{tourSteps.length}
              </span>
            </div>

            {/* Bubble Text */}
            <p className="text-xs sm:text-[13px] text-slate-300 leading-relaxed mb-3">
              {currentDialogue.message}
            </p>

            {/* Bubble Controls */}
            <div className="flex items-center justify-between pt-1 border-t border-white/5">
              <button
                onClick={handleReplay}
                className="text-[10px] font-mono-code text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                title="Restart Tour"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Replay</span>
              </button>

              <div className="flex items-center gap-1.5">
                {currentStep > 0 && (
                  <button
                    onClick={handlePrev}
                    className="clay-button p-1.5 text-slate-300 hover:text-white"
                    title="Previous step"
                    aria-label="Previous step"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                )}

                {currentStep < tourSteps.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="clay-button-primary px-3 py-1 rounded-lg text-[11px] flex items-center gap-1 font-semibold"
                  >
                    <span>Next</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                ) : (
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="clay-button-primary px-3 py-1 rounded-lg text-[11px] font-semibold"
                  >
                    Got it! 👍
                  </button>
                )}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* Quick Action Badges Under Mascot */}
      <div className="flex items-center justify-between w-full mt-3 px-1 text-[11px] font-mono-code text-slate-400">
        <span className="flex items-center gap-1 text-slate-300">
          <Bot className="w-3.5 h-3.5 text-cyan-400" />
          <span>Interactive Droid</span>
        </span>
        <span className="text-[10px] text-slate-400">
          WebGL &bull; 60 FPS
        </span>
      </div>

    </div>
  );
}
