import React, { useState } from 'react';
import HouseEntrance from './components/HouseEntrance';
import HallwayScene from './components/HallwayScene';
import GalleryScene from './components/GalleryScene';
import StudioScene from './components/StudioScene';
import JourneyScene from './components/JourneyScene';
import ContactScene from './components/ContactScene';
import NavigationOverlay from './components/NavigationOverlay';
import { sound } from './utils/audioEffects';

export default function App() {
  // Available scenes: 'house' | 'hallway' | 'gallery' | 'studio' | 'journey' | 'contact'
  const [currentScene, setCurrentScene] = useState('house');
  const [isMuted, setIsMuted] = useState(false);

  const handleToggleMute = () => {
    const nextMuted = !isMuted;
    setIsMuted(nextMuted);
    sound.setMuted(nextMuted);
  };

  const handleNavigate = (sceneId) => {
    setCurrentScene(sceneId);
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#f7f5ee] font-sketch select-none">
      {/* Top Persistent Navigation Overlay (Always available) */}
      <NavigationOverlay
        currentScene={currentScene}
        onNavigate={handleNavigate}
        isMuted={isMuted}
        onToggleMute={handleToggleMute}
      />

      {/* Main 3D Spatial Scenes */}
      {currentScene === 'house' && (
        <HouseEntrance 
          onEnter={() => handleNavigate('hallway')} 
          isMuted={isMuted}
        />
      )}

      {currentScene === 'hallway' && (
        <HallwayScene 
          onEnterRoom={handleNavigate} 
        />
      )}

      {currentScene === 'gallery' && (
        <GalleryScene 
          onBack={() => handleNavigate('hallway')} 
        />
      )}

      {currentScene === 'studio' && (
        <StudioScene 
          onBack={() => handleNavigate('hallway')} 
        />
      )}

      {currentScene === 'journey' && (
        <JourneyScene 
          onBack={() => handleNavigate('hallway')} 
        />
      )}

      {currentScene === 'contact' && (
        <ContactScene 
          onBack={() => handleNavigate('hallway')} 
        />
      )}
    </div>
  );
}
