import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  RotateCcw, 
  X, 
  MessageSquare,
  Bot,
  Heart
} from 'lucide-react';

export default function FreeFloatingMascot() {
  const mountRef = useRef(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [bubblePos, setBubblePos] = useState({ x: 0, y: 0, visible: false });
  const [botReaction, setBotReaction] = useState(null);
  const [progress, setProgress] = useState(0);

  const stepRef = useRef(0);
  const spinRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });
  const mascotPos3D = useRef(new THREE.Vector3());

  // Personal, human-to-human narrative describing Om as a friend/advocate would
  const tourSteps = [
    {
      stepLabel: "Meet Om",
      tag: "Introducing Om",
      headline: "Hey! Come on in 👋",
      message: "Let me introduce you to Om! If you're looking for someone who genuinely cares about craft and problem-solving, you're in the right place.",
      target: { x: 2.2, y: 0.6, z: 0, rotY: -0.25, rotX: 0 },
    },
    {
      stepLabel: "How He Thinks",
      tag: "The Mindset",
      headline: "He never just stays on the surface 🔍",
      message: "The first thing you'll notice about Om: he's obsessively curious. While most people just import packages, Om is the person who wants to know: 'How does the compiler actually parse this? What's the engine doing beneath the hood?'",
      target: { x: -0.5, y: 1.1, z: 0.5, rotY: 0.35, rotX: 0.1 },
    },
    {
      stepLabel: "How He Learns",
      tag: "The Builder",
      headline: "His golden rule: Learn by Building 🛠️",
      message: "He doesn't just read tutorials. If he wants to master something—whether it's resilient full-stack systems or interactive 3D WebGL scenes—he rolls up his sleeves and builds working products from scratch.",
      target: { x: -0.8, y: -0.6, z: 0.3, rotY: 0.45, rotX: -0.1 },
    },
    {
      stepLabel: "His Foundation",
      tag: "Engineering Base",
      headline: "Rigorous fundamentals 🎓",
      message: "He's pursuing his B.Tech in Computer Science at ABES Engineering College here in India. He blends strong computer science fundamentals with modern software craftsmanship.",
      target: { x: 0.8, y: -0.9, z: 0.2, rotY: -0.2, rotX: 0.05 },
    },
    {
      stepLabel: "Beyond The Code",
      tag: "The Person",
      headline: "He's more than just a terminal ⚡",
      message: "Beyond coding, Om is super grounded—he's passionate about fitness, photography, and creative design. He brings that same discipline and eye for detail to everything he touches.",
      target: { x: 2.0, y: -0.3, z: 0.1, rotY: -0.15, rotX: 0 },
    },
    {
      stepLabel: "Collaborate",
      tag: "Work Together",
      headline: "He's ready to build with you 🚀",
      message: "He's currently open for high-impact roles and collaborations. Check out his work below, grab his resume, or hit his email—and tap me anytime if you want to say hi!",
      target: { x: -0.4, y: 0.2, z: 0.3, rotY: 0.2, rotX: 0 },
    },
  ];

  const funReactions = [
    "Haha, Om told me you might tap me! Want to hear more about him?",
    "Honestly, Om is one of the most dedicated builders I know. 💯",
    "Ask Om about compilers or 3D web—he could talk about that for hours! ⚡",
    "Fun fact: When Om tackles a bug, he doesn't stop until he understands the root cause! 🧠",
  ];

  useEffect(() => {
    stepRef.current = currentStep;
  }, [currentStep]);

  // Auto-advance dialogue timer (7.5s per beat so the user can comfortably read)
  useEffect(() => {
    if (!isAutoPlaying || isMinimized) {
      setProgress(0);
      return;
    }

    const duration = 7500;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const intervalId = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setCurrentStep((curr) => {
            if (curr < tourSteps.length - 1) {
              return curr + 1;
            } else {
              setIsAutoPlaying(false);
              return curr;
            }
          });
          return 0;
        }
        return prev + increment;
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

  const triggerBotReaction = () => {
    spinRef.current += Math.PI * 2;
    const randomReaction = funReactions[Math.floor(Math.random() * funReactions.length)];
    setBotReaction(randomReaction);
    setTimeout(() => setBotReaction(null), 3600);
  };

  // Three.js Scene Setup (Transparent, Unconstrained across Hero)
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // Mascot Master Group
    const mascotGroup = new THREE.Group();
    scene.add(mascotGroup);

    // Starting position (floats in from the top right)
    mascotGroup.position.set(2.5, 2.0, 0);

    // --- TACTILE CLAY & LED MATERIALS ---
    const clayMat = new THREE.MeshPhysicalMaterial({
      color: 0x1f2433,
      roughness: 0.35,
      metalness: 0.1,
      clearcoat: 0.45,
      clearcoatRoughness: 0.2,
      reflectivity: 0.65,
    });

    const accentMat = new THREE.MeshPhysicalMaterial({
      color: 0x364059,
      roughness: 0.3,
      metalness: 0.2,
      clearcoat: 0.5,
    });

    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x05070a,
      roughness: 0.12,
      metalness: 0.9,
      clearcoat: 1.0,
    });

    const eyeGlowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const jetGlowMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8, transparent: true, opacity: 0.85 });

    // 1. HEAD
    const headGeo = new THREE.CapsuleGeometry(0.68, 0.4, 16, 24);
    const headMesh = new THREE.Mesh(headGeo, clayMat);
    headMesh.rotation.z = Math.PI / 2;
    headMesh.position.y = 0.35;
    mascotGroup.add(headMesh);

    // 2. VISOR SCREEN
    const visorGeo = new THREE.CapsuleGeometry(0.52, 0.22, 12, 20);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.rotation.z = Math.PI / 2;
    visorMesh.position.set(0, 0.35, 0.43);
    visorMesh.scale.set(0.9, 0.9, 0.35);
    mascotGroup.add(visorMesh);

    // 3. LED EYES
    const eyeGeo = new THREE.CapsuleGeometry(0.075, 0.11, 8, 12);
    const leftEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
    leftEye.position.set(-0.2, 0.35, 0.62);
    mascotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
    rightEye.position.set(0.2, 0.35, 0.62);
    mascotGroup.add(rightEye);

    // 4. FLOATING EARS
    const earGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.16, 16);
    const leftEar = new THREE.Mesh(earGeo, accentMat);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.set(-0.8, 0.35, 0);
    mascotGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, accentMat);
    rightEar.rotation.z = Math.PI / 2;
    rightEar.position.set(0.8, 0.35, 0);
    mascotGroup.add(rightEar);

    // 5. ANTENNA
    const stalkGeo = new THREE.CylinderGeometry(0.025, 0.025, 0.32, 8);
    const stalkMesh = new THREE.Mesh(stalkGeo, accentMat);
    stalkMesh.position.set(0, 1.0, 0);
    mascotGroup.add(stalkMesh);

    const tipGeo = new THREE.SphereGeometry(0.09, 12, 12);
    const tipMesh = new THREE.Mesh(tipGeo, eyeGlowMat);
    tipMesh.position.set(0, 1.2, 0);
    mascotGroup.add(tipMesh);

    // 6. BODY & CHEST PLATE
    const bodyGeo = new THREE.SphereGeometry(0.5, 16, 16);
    const bodyMesh = new THREE.Mesh(bodyGeo, clayMat);
    bodyMesh.scale.set(0.9, 0.8, 0.8);
    bodyMesh.position.y = -0.42;
    mascotGroup.add(bodyMesh);

    const chestPlateGeo = new THREE.CylinderGeometry(0.16, 0.16, 0.08, 16);
    const chestPlate = new THREE.Mesh(chestPlateGeo, accentMat);
    chestPlate.rotation.x = Math.PI / 2;
    chestPlate.position.set(0, -0.4, 0.38);
    mascotGroup.add(chestPlate);

    // 7. FLOATING HANDS
    const handGeo = new THREE.SphereGeometry(0.16, 12, 12);
    const leftHand = new THREE.Mesh(handGeo, accentMat);
    leftHand.position.set(-0.7, -0.32, 0.2);
    mascotGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, accentMat);
    rightHand.position.set(0.7, -0.32, 0.2);
    mascotGroup.add(rightHand);

    // 8. THRUSTER CONE & PARTICLES
    const thrusterRingGeo = new THREE.TorusGeometry(0.2, 0.05, 8, 20);
    const thrusterRing = new THREE.Mesh(thrusterRingGeo, accentMat);
    thrusterRing.rotation.x = Math.PI / 2;
    thrusterRing.position.set(0, -0.8, 0);
    mascotGroup.add(thrusterRing);

    const jetConeGeo = new THREE.ConeGeometry(0.16, 0.4, 12, 1, true);
    const jetCone = new THREE.Mesh(jetConeGeo, jetGlowMat);
    jetCone.rotation.x = Math.PI;
    jetCone.position.set(0, -0.98, 0);
    mascotGroup.add(jetCone);

    // LIGHTING
    const ambientLight = new THREE.AmbientLight(0x0e111a, 2.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const cyanRim = new THREE.PointLight(0x38bdf8, 3.0, 7);
    cyanRim.position.set(-2, 1, 2);
    scene.add(cyanRim);

    const thrusterLight = new THREE.PointLight(0x38bdf8, 3.2, 4);
    thrusterLight.position.set(0, -1.1, 0);
    scene.add(thrusterLight);

    // RAYCASTER FOR DIRECT CLICK
    const raycaster = new THREE.Raycaster();
    const mouseVector = new THREE.Vector2();

    const handleCanvasClick = (event) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseVector.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouseVector.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseVector, camera);
      const intersects = raycaster.intersectObjects(mascotGroup.children, true);

      if (intersects.length > 0) {
        triggerBotReaction();
      }
    };

    renderer.domElement.addEventListener('click', handleCanvasClick);

    // Pointer move for parallax
    const handlePointerMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth) - 0.5;
      mouseRef.current.y = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: nw, height: nh } = entry.contentRect;
        if (nw > 0 && nh > 0) {
          width = nw;
          height = nh;
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh, false);
        }
      }
    });
    resizeObserver.observe(container);

    // ANIMATION LOOP
    let animationFrameId;
    const clock = new THREE.Clock();
    let currentSpin = 0;
    let nextBlinkTime = 2.0;
    let isBlinking = false;
    let screenProjectTimer = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Look up current destination waypoint
      const currentStepIdx = stepRef.current;
      const targetWp = tourSteps[currentStepIdx]?.target || tourSteps[0].target;

      const isMobile = window.innerWidth < 768;
      const adaptedTargetX = isMobile ? targetWp.x * 0.45 : targetWp.x;
      const adaptedTargetY = isMobile ? targetWp.y * 0.65 : targetWp.y;

      // Smooth flight lerp
      mascotGroup.position.x += (adaptedTargetX - mascotGroup.position.x) * 0.04;
      mascotGroup.position.y += (adaptedTargetY + Math.sin(elapsedTime * 2.5) * 0.14 - mascotGroup.position.y) * 0.04;
      mascotGroup.position.z += (targetWp.z - mascotGroup.position.z) * 0.04;

      // Spin physics on click
      if (spinRef.current > currentSpin) {
        currentSpin += 0.2;
        if (currentSpin >= spinRef.current) currentSpin = spinRef.current;
      }

      // Smooth Rotation
      const targetRotY = targetWp.rotY + (mouseRef.current.x * 0.6) + currentSpin;
      const targetRotX = targetWp.rotX + (mouseRef.current.y * 0.4) + Math.sin(elapsedTime * 2.0) * 0.06;
      const targetRotZ = (adaptedTargetX - mascotGroup.position.x) * -0.3;

      mascotGroup.rotation.y += (targetRotY - mascotGroup.rotation.y) * 0.06;
      mascotGroup.rotation.x += (targetRotX - mascotGroup.rotation.x) * 0.06;
      mascotGroup.rotation.z += (targetRotZ - mascotGroup.rotation.z) * 0.06;

      // Floating Hands
      leftHand.position.y = -0.32 + Math.sin(elapsedTime * 3.0 + 1) * 0.06;
      rightHand.position.y = -0.32 + Math.sin(elapsedTime * 3.0 + 2.5) * 0.06;
      leftHand.position.z = 0.2 + Math.cos(elapsedTime * 2.0) * 0.04;
      rightHand.position.z = 0.2 + Math.cos(elapsedTime * 2.0 + 1.5) * 0.04;

      // Thruster Flicker
      const pulse = 0.8 + Math.sin(elapsedTime * 18.0) * 0.25;
      jetCone.scale.set(pulse, pulse * 1.1, pulse);
      thrusterLight.intensity = 2.4 + Math.sin(elapsedTime * 20.0) * 1.2;

      // Blinking
      if (elapsedTime > nextBlinkTime) {
        isBlinking = true;
        nextBlinkTime = elapsedTime + 3.0 + Math.random() * 3.5;
      }
      if (isBlinking) {
        leftEye.scale.y = 0.15;
        rightEye.scale.y = 0.15;
        if (elapsedTime - (nextBlinkTime - 3.0 - Math.random() * 3.5) > 0.15) {
          leftEye.scale.y = 1.0;
          rightEye.scale.y = 1.0;
          isBlinking = false;
        }
      }

      // Project 3D Mascot position to 2D Screen space for Speech Bubble (every 2 frames)
      screenProjectTimer++;
      if (screenProjectTimer % 2 === 0) {
        mascotGroup.getWorldPosition(mascotPos3D.current);
        mascotPos3D.current.y += 0.8;
        const projected = mascotPos3D.current.clone().project(camera);

        const screenX = (projected.x * 0.5 + 0.5) * width;
        const screenY = (-(projected.y) * 0.5 + 0.5) * height;

        setBubblePos({
          x: Math.round(screenX),
          y: Math.round(screenY),
          visible: true,
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      renderer.domElement.removeEventListener('click', handleCanvasClick);
      window.removeEventListener('pointermove', handlePointerMove);
      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      headGeo.dispose();
      visorGeo.dispose();
      eyeGeo.dispose();
      earGeo.dispose();
      stalkGeo.dispose();
      tipGeo.dispose();
      bodyGeo.dispose();
      chestPlateGeo.dispose();
      handGeo.dispose();
      thrusterRingGeo.dispose();
      jetConeGeo.dispose();
      clayMat.dispose();
      accentMat.dispose();
      visorMat.dispose();
      eyeGlowMat.dispose();
      jetGlowMat.dispose();
      renderer.dispose();
    };
  }, []);

  const currentDialogue = tourSteps[currentStep];

  return (
    <>
      {/* 1. Full-Hero Floating Canvas (No border, No background, Pure transparency) */}
      <div 
        ref={mountRef}
        className="absolute inset-0 z-20 pointer-events-auto cursor-pointer overflow-hidden"
        title="Tap Spark to interact!"
        aria-hidden="true"
      />

      {/* 2. Floating Speech Bubble with personal human introduction tone */}
      {bubblePos.visible && !isMinimized && (
        <div 
          className="absolute z-30 pointer-events-auto transition-all duration-300 ease-out"
          style={{
            left: `${Math.min(Math.max(bubblePos.x - 150, 16), window.innerWidth - 340)}px`,
            top: `${Math.max(bubblePos.y - 200, 80)}px`,
            width: '320px',
          }}
        >
          {/* Tactile Speech Bubble */}
          <div className="clay-card p-4 border border-cyan-500/25 bg-[#0b0e17]/95 backdrop-blur-2xl shadow-2xl relative">
            
            {/* Auto-Advance Progress Bar */}
            {isAutoPlaying && (
              <div className="w-full bg-slate-800/80 h-1 rounded-full overflow-hidden mb-2.5">
                <div 
                  className="bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400 h-full transition-all duration-75 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            )}

            {/* Bubble Header */}
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <div className="flex items-center gap-1.5">
                <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-cyan-950/90 border border-cyan-800/60 text-cyan-300 font-semibold">
                  {currentDialogue.tag}
                </span>
                <span className="text-[11px] font-mono-code text-slate-400">
                  {currentStep + 1} of {tourSteps.length}
                </span>
              </div>
              <button
                onClick={() => setIsMinimized(true)}
                className="text-slate-400 hover:text-white p-1 rounded-md hover:bg-white/10 transition-colors"
                title="Minimize tour"
                aria-label="Minimize tour"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Headline */}
            <h4 className="text-xs sm:text-sm font-bold text-slate-100 font-heading mb-1.5 flex items-center gap-1.5">
              <span>{currentDialogue.headline}</span>
            </h4>

            {/* Narrative Message in Human Voice */}
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {currentDialogue.message}
            </p>

            {/* Bubble Controls */}
            <div className="flex items-center justify-between pt-1.5 border-t border-white/5 text-xs">
              <button
                onClick={handleReplay}
                className="text-[10px] font-mono-code text-slate-400 hover:text-white flex items-center gap-1 transition-colors"
                title="Start from beginning"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Restart</span>
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
                    Explore Om&apos;s Work 🚀
                  </button>
                )}
              </div>
            </div>

            {/* Speech Bubble Arrow pointing toward Spark */}
            <div 
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-3.5 h-3.5 bg-[#0b0e17] border-r border-b border-cyan-500/25 rotate-45"
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      {/* Floating Spark Reaction Toast */}
      {botReaction && (
        <div 
          className="absolute z-40 pointer-events-none transition-all duration-300 ease-out"
          style={{
            left: `${Math.min(Math.max(bubblePos.x - 120, 16), window.innerWidth - 260)}px`,
            top: `${Math.max(bubblePos.y - 70, 40)}px`,
          }}
        >
          <div className="bg-slate-900/95 border border-cyan-400/60 text-cyan-200 text-xs font-mono-code px-3.5 py-2 rounded-xl backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 text-center max-w-xs">
            {botReaction}
          </div>
        </div>
      )}

      {/* Minimized Floating Tour Trigger */}
      {isMinimized && (
        <button
          onClick={() => setIsMinimized(false)}
          className="fixed bottom-6 right-6 z-40 clay-button-primary px-4 py-2.5 rounded-full text-xs flex items-center gap-2 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300 font-semibold"
          title="Open tour with Spark"
        >
          <Bot className="w-4 h-4 text-cyan-900" />
          <span>About Om (from Spark)</span>
        </button>
      )}
    </>
  );
}
