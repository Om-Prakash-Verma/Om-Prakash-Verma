import React, { useState } from 'react';
import { Mail, Send, X, ExternalLink, CheckCircle } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { portfolioData } from '../data/portfolioData';
import { sound } from '../utils/audioEffects';

export default function ContactScene({ onBack }) {
  const [messageOpen, setMessageOpen] = useState(false);
  const [formSent, setFormSent] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const signs = portfolioData.contactSigns;

  const handleSignClick = (sign) => {
    sound.playClick();
    if (sign.id === 'message') {
      setMessageOpen(true);
    } else if (sign.href) {
      window.open(sign.href, '_blank', 'noreferrer');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sound.playWaterChime();
    setFormSent(true);
    setTimeout(() => {
      setMessageOpen(false);
      setFormSent(false);
      setFormData({ name: '', email: '', message: '' });
    }, 2500);
  };

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f7f5ee] select-none flex flex-col justify-between">
      
      {/* 1. Sky & Clouds */}
      <div className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none">
        <div className="absolute top-10 left-12 w-48 opacity-75">
          <svg viewBox="0 0 100 50" className="w-full fill-white stroke-neutral-800" strokeWidth="2.5">
            <path d="M 10,40 Q 25,20 40,30 Q 60,10 80,30 Q 95,30 90,45 Z" />
          </svg>
        </div>
        <div className="absolute top-6 right-20 w-60 opacity-75">
          <svg viewBox="0 0 100 50" className="w-full fill-white stroke-neutral-800" strokeWidth="2.5">
            <path d="M 10,40 Q 25,20 40,30 Q 60,10 80,30 Q 95,30 90,45 Z" />
          </svg>
        </div>

        {/* Lighthouse on Rocky Outcrop (Matching video frame 14) */}
        <div className="absolute top-24 left-[18%] sm:left-[22%] w-20 sm:w-28 h-36">
          <svg viewBox="0 0 80 120" className="w-full h-full fill-white stroke-neutral-800" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            {/* Rocky base */}
            <path d="M 10,115 C 20,100 30,105 45,95 C 60,105 70,100 80,115 Z" fill="#e8e4d8" />
            {/* Lighthouse tower */}
            <polygon points="28,100 34,35 50,35 56,100" fill="#fcfbf7" />
            {/* Red/dark stripes */}
            <line x1="31" y1="80" x2="53" y2="80" />
            <line x1="33" y1="55" x2="51" y2="55" />
            {/* Top lantern room */}
            <rect x="33" y="22" width="18" height="13" fill="#ffffff" />
            {/* Dome roof */}
            <path d="M 31,22 Q 42,12 53,22 Z" fill="#222" />
          </svg>
        </div>

        {/* Paper Boat Bobbing on the Water (Matching video frame 14) */}
        <div className="absolute top-44 left-[12%] sm:left-[15%] w-16 h-10 animate-bounce duration-1000">
          <svg viewBox="0 0 60 40" className="w-full h-full fill-white stroke-neutral-800" strokeWidth="2" strokeLinejoin="round">
            {/* Boat hull */}
            <polygon points="5,25 55,25 45,38 15,38" />
            {/* Boat sail */}
            <polygon points="30,5 5,25 30,25" />
            <polygon points="30,5 30,25 48,25" />
          </svg>
        </div>
      </div>

      {/* 2. Swirling Hand-Drawn Sea Waves (Middle third) */}
      <div className="relative z-10 w-full h-64 mt-36 overflow-hidden flex items-center justify-center">
        {/* Swirling wave SVG rows */}
        <div className="absolute inset-0 opacity-40">
          {Array.from({ length: 6 }).map((_, rIdx) => (
            <div key={rIdx} className="w-full h-10 flex gap-4 -ml-12 overflow-hidden">
              {Array.from({ length: 14 }).map((_, wIdx) => (
                <svg key={wIdx} viewBox="0 0 80 30" className="w-24 h-8 shrink-0 fill-none stroke-neutral-700" strokeWidth="2">
                  <path d="M 0,20 C 20,5 40,28 60,18 C 70,12 75,18 80,20" />
                </svg>
              ))}
            </div>
          ))}
        </div>

        {/* Floating Barrels with Wooden Signs (Matching video frame 14) */}
        <div className="relative z-20 flex flex-wrap items-center justify-center gap-4 sm:gap-8 px-4">
          {signs.map((sign, sIdx) => (
            <div
              key={sign.id}
              onClick={() => handleSignClick(sign)}
              className="relative flex flex-col items-center cursor-pointer group transform hover:-translate-y-2 hover:rotate-1 transition-all duration-200"
              title={sign.desc}
            >
              {/* Wooden Signboard */}
              <div className="wood-sign px-5 py-2 flex items-center gap-1.5 shadow-md border-2 border-neutral-900 group-hover:bg-[#e6c99c]">
                <span className="font-marker text-xs sm:text-sm text-neutral-900 tracking-wider">
                  {sign.label}
                </span>
                {sign.isAction ? (
                  <Mail className="w-3.5 h-3.5 text-neutral-800" />
                ) : (
                  <ExternalLink className="w-3.5 h-3.5 text-neutral-800" />
                )}
              </div>

              {/* Wooden post stuck in barrel */}
              <div className="w-2.5 h-8 bg-[#3d2b1f] border-x border-neutral-900 -my-0.5"></div>

              {/* Wooden floating barrel buoy */}
              <div className="w-12 h-10 border-2 border-neutral-900 bg-[#c9a36f] rounded-lg flex flex-col justify-around py-1 shadow-md">
                <div className="w-full h-1 bg-neutral-900"></div>
                <div className="w-full h-1 bg-neutral-900"></div>
              </div>

              {/* Water ripple underneath */}
              <div className="w-16 h-2 border-b-2 border-neutral-600 rounded-full opacity-60 mt-0.5"></div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Foreground: Wooden Boardwalk / Pier Planks (Matching video frame 14) */}
      <div className="relative z-20 w-full max-w-2xl mx-auto h-40 border-t-4 border-x-4 border-neutral-900 bg-[#dfc093] flex justify-around px-2 shadow-2xl">
        {Array.from({ length: 9 }).map((_, pIdx) => (
          <div
            key={pIdx}
            className="w-12 sm:w-16 h-full border-r-2 border-neutral-900 bg-[#d8b27c] flex flex-col justify-between py-2"
          >
            {/* Pier nails */}
            <div className="flex justify-around">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900"></div>
            </div>
            <div className="flex justify-around">
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900"></div>
              <div className="w-1.5 h-1.5 rounded-full bg-neutral-900"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Message Modal (Parchment letter form) */}
      {messageOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="paper-torn bg-white p-6 sm:p-8 max-w-lg w-full relative animate-in fade-in zoom-in-95 duration-150">
            <button
              onClick={() => {
                sound.playClick();
                setMessageOpen(false);
              }}
              className="absolute top-4 right-4 text-neutral-700 hover:text-black font-bold p-1 cursor-pointer"
            >
              <X className="w-6 h-6 stroke-[2.5]" />
            </button>

            {formSent ? (
              <div className="py-8 text-center flex flex-col items-center">
                <CheckCircle className="w-12 h-12 text-emerald-600 mb-2" />
                <h3 className="font-marker text-2xl text-neutral-900">MESSAGE DISPATCHED!</h3>
                <p className="font-sketch text-neutral-600 text-sm mt-1">
                  Thank you for reaching out to Om Prakash Verma. He will respond promptly!
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="wood-sign inline-block px-4 py-1.5 mb-3">
                  <h3 className="font-marker text-lg text-neutral-900">
                    DISPATCH A MESSAGE
                  </h3>
                </div>
                <p className="font-sketch text-xs text-neutral-600 mb-4">
                  Send a collaboration invitation, engineering query, or interview request directly to Om.
                </p>

                <div className="space-y-3">
                  <div>
                    <label className="block font-sketch text-xs font-bold text-neutral-800 mb-1">
                      YOUR NAME
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Jane Doe / Hiring Partner"
                      className="w-full p-2.5 bg-[#fcfbf7] border-2 border-neutral-800 rounded-sm font-sketch text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-sketch text-xs font-bold text-neutral-800 mb-1">
                      EMAIL ADDRESS
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="jane@company.com"
                      className="w-full p-2.5 bg-[#fcfbf7] border-2 border-neutral-800 rounded-sm font-sketch text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>

                  <div>
                    <label className="block font-sketch text-xs font-bold text-neutral-800 mb-1">
                      PROJECT / OPPORTUNITY MESSAGE
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Hi Om, let's discuss building something together..."
                      className="w-full p-2.5 bg-[#fcfbf7] border-2 border-neutral-800 rounded-sm font-sketch text-sm focus:outline-none focus:ring-2 focus:ring-amber-500"
                    />
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between pt-2 border-t-2 border-neutral-200">
                  <span className="font-sketch text-xs text-neutral-500">
                    Direct: omprakash.verma.dev@gmail.com
                  </span>
                  <button
                    type="submit"
                    className="paper-button bg-amber-400 hover:bg-amber-300 px-6 py-2 font-marker text-xs sm:text-sm text-neutral-900 flex items-center gap-1.5 shadow-md"
                  >
                    <span>SEND MESSAGE</span>
                    <Send className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

    </div>
  );
}
