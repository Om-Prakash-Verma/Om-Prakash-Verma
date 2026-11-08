import React, { useState } from 'react';
import { 
  ArrowLeft, 
  Menu, 
  X, 
  Volume2, 
  VolumeX, 
  Trophy, 
  ExternalLink,
  Mail,
  Home,
  Image,
  Tv,
  Send,
  Compass
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { sound } from '../utils/audioEffects';

export default function NavigationOverlay({ 
  currentScene, 
  onNavigate, 
  isMuted, 
  onToggleMute 
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [achievementsOpen, setAchievementsOpen] = useState(false);

  const rooms = [
    { id: 'house', label: 'Entrance', icon: Home },
    { id: 'hallway', label: 'Hallway Hub', icon: Compass },
    { id: 'gallery', label: 'The Gallery (Projects)', icon: Image },
    { id: 'studio', label: 'The Studio (Systems)', icon: Tv },
    { id: 'journey', label: 'Journey (Flight)', icon: Send },
    { id: 'contact', label: 'Contact (The Pier)', icon: Mail },
  ];

  const achievements = [
    { title: "First Flight", desc: "Visited the 3D paper plane flight experience", earned: true },
    { title: "Master of Systems", desc: "Inspected Om's compiler and runtime architecture", earned: true },
    { title: "IRCTC Edge Cracker", desc: "Built 15ms cache across 6,563 Indian trains", earned: true },
    { title: "NP-Complete Slayer", desc: "Engineered zero-conflict academic timetabler", earned: true },
    { title: "Curious Explorer", desc: "Walked down the entire hand-drawn sketch corridor", earned: true }
  ];

  return (
    <>
      {/* Top Left: Back Button (Shows when in a specific room) */}
      <div className="fixed top-5 left-5 z-40">
        {currentScene !== 'house' && currentScene !== 'hallway' && (
          <button
            onClick={() => {
              sound.playClick();
              onNavigate('hallway');
            }}
            className="paper-button px-3.5 py-2 flex items-center gap-1.5 text-sm font-sketch font-bold text-neutral-800 shadow-md"
            title="Return to Hallway"
          >
            <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
            <span>Back to Hallway</span>
          </button>
        )}
      </div>

      {/* Top Right: System Buttons */}
      <div className="fixed top-5 right-5 z-40 flex items-center gap-2">
        {/* Menu Button */}
        <button
          onClick={() => {
            sound.playClick();
            setMenuOpen(!menuOpen);
          }}
          className="paper-button w-10 h-10 flex items-center justify-center text-neutral-800"
          title="Navigation Menu"
        >
          {menuOpen ? <X className="w-5 h-5 stroke-[2.5]" /> : <Menu className="w-5 h-5 stroke-[2.5]" />}
        </button>

        {/* Sound Toggle */}
        <button
          onClick={() => {
            sound.playClick();
            onToggleMute();
          }}
          className="paper-button w-10 h-10 flex items-center justify-center text-neutral-800"
          title={isMuted ? "Unmute Sound" : "Mute Sound"}
        >
          {isMuted ? (
            <VolumeX className="w-5 h-5 text-neutral-500 stroke-[2.5]" />
          ) : (
            <Volume2 className="w-5 h-5 text-amber-600 stroke-[2.5]" />
          )}
        </button>

        {/* Achievements / Trophy Button */}
        <button
          onClick={() => {
            sound.playClick();
            setAchievementsOpen(!achievementsOpen);
          }}
          className="paper-button w-10 h-10 flex items-center justify-center text-neutral-800"
          title="Achievements & Trophies"
        >
          <Trophy className="w-5 h-5 text-amber-500 stroke-[2.5]" />
        </button>
      </div>

      {/* Drawer Menu Modal */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="paper-torn bg-white p-6 sm:p-8 max-w-sm w-full relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                sound.playClick();
                setMenuOpen(false);
              }}
              className="absolute top-4 right-4 text-neutral-700 hover:text-black font-bold p-1 cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            <h2 className="font-marker text-2xl text-neutral-900 mb-1">PORTFOLIO ROOMS</h2>
            <p className="font-sketch text-sm text-neutral-600 mb-5">Click any door to travel directly through the world:</p>

            <div className="space-y-2">
              {rooms.map((room) => {
                const Icon = room.icon;
                const isActive = currentScene === room.id;
                return (
                  <button
                    key={room.id}
                    onClick={() => {
                      sound.playClick();
                      onNavigate(room.id);
                      setMenuOpen(false);
                    }}
                    className={`w-full text-left px-4 py-2.5 rounded-sm flex items-center gap-3 transition-colors ${
                      isActive 
                        ? 'bg-amber-100 border-2 border-amber-500 font-bold text-neutral-900' 
                        : 'paper-button text-neutral-800'
                    }`}
                  >
                    <Icon className="w-5 h-5 text-neutral-700 stroke-[2.5]" />
                    <span className="font-sketch text-base">{room.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="mt-6 pt-4 border-t-2 border-neutral-200 flex justify-center gap-4 text-neutral-700">
              <a 
                href="https://github.com/Om-Prakash-Verma" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-black flex items-center gap-1 text-sm font-sketch font-bold"
              >
                <GithubIcon className="w-4 h-4" /> GitHub
              </a>
              <a 
                href="https://www.linkedin.com/in/om-prakash-verma-9a6741270/" 
                target="_blank" 
                rel="noreferrer"
                className="hover:text-black flex items-center gap-1 text-sm font-sketch font-bold"
              >
                <LinkedinIcon className="w-4 h-4" /> LinkedIn
              </a>
            </div>
          </div>
        </div>
      )}

      {/* Trophy / Achievements Modal */}
      {achievementsOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="paper-torn bg-white p-6 sm:p-8 max-w-md w-full relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                sound.playClick();
                setAchievementsOpen(false);
              }}
              className="absolute top-4 right-4 text-neutral-700 hover:text-black font-bold p-1 cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-6 h-6 text-amber-500 stroke-[2.5]" />
              <h2 className="font-marker text-2xl text-neutral-900">ACHIEVEMENTS</h2>
            </div>
            <p className="font-sketch text-sm text-neutral-600 mb-4">Milestones unlocked in Om&apos;s Engineering Laboratory:</p>

            <div className="space-y-3 max-h-80 overflow-y-auto pr-1">
              {achievements.map((ach, idx) => (
                <div key={idx} className="p-3 bg-amber-50/60 border border-amber-300 rounded-sm">
                  <div className="flex items-center justify-between">
                    <span className="font-sketch font-bold text-neutral-900 text-base">★ {ach.title}</span>
                    <span className="text-xs font-mono-code text-amber-700 bg-amber-200/60 px-1.5 py-0.5 rounded">UNLOCKED</span>
                  </div>
                  <p className="font-sketch text-xs text-neutral-600 mt-0.5">{ach.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
