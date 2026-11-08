import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { 
  Sparkles, 
  Terminal, 
  Cpu, 
  ArrowRight, 
  ChevronRight, 
  ChevronLeft, 
  Layers, 
  Compass, 
  FileText, 
  Gamepad2,
  ExternalLink,
  Volume2,
  VolumeX,
  X
} from 'lucide-react';
import { projectsData } from '../data/projectsData';
import ProjectDetailDialog from './ProjectDetailDialog';

export default function SpatialLabWorld({ onSwitchToReaderView }) {
  const mountRef = useRef(null);
  const [currentChamberIndex, setCurrentChamberIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [progressVal, setProgressVal] = useState(0);
  const [hoveredStation, setHoveredStation] = useState(null);
  const [sparkDialogue, setSparkDialogue] = useState({
    title: "Welcome to Om's Lab! 👋",
    message: "I'm Spark, your flight companion. Scroll or use arrow keys to navigate down the corridor!",
  });

  const progressRef = useRef(0);
  const targetProgressRef = useRef(0);
  const stationsRef = useRef([]);

  // Chamber definitions along the 0.0 -> 1.0 camera spline
  const chambers = [
    {
      id: 'core',
      name: 'The Core',
      t: 0.05,
      sparkTitle: "Chamber 1: The Core 🧠",
      sparkMessage: "This is where Om's philosophy lives: understanding systems beneath the surface. He doesn't just use tools—he builds to understand how compilers, runtimes, and distributed protocols tick.",
    },
    {
      id: 'workshop-1',
      name: 'Workshop: AI & Systems',
      t: 0.32,
      sparkTitle: "Chamber 2: AI & Algorithms 🔍",
      sparkMessage: "Here are Om's flagship algorithmic systems! Check out Git Forensics (32k thinking budget), AetherSchedule (NP-complete hybrid timetabler), and PixSort (3072-D vector search). Click any terminal to inspect!",
    },
    {
      id: 'workshop-2',
      name: 'Workshop: Edge & Mobile',
      t: 0.58,
      sparkTitle: "Chamber 3: Edge & Mobile ⚡",
      sparkMessage: "Here are Om's high-speed edge platforms! Look at RailSure (reverse-engineered IRCTC vacancy with 15ms edge caching), GhostPocket (native Android with Cloudflare D1 atomic sync), and K9 SNIPERS (Web Crypto RS256).",
    },
    {
      id: 'engine-room',
      name: 'The Engine Room',
      t: 0.80,
      sparkTitle: "Chamber 4: The Engine Room ⚙️",
      sparkMessage: "Om's technical foundation: Full-Stack Engineering, Compilers & Internals, 3D WebGL, and Cloud Edge Infrastructure. Built on solid Computer Science fundamentals from ABES.",
    },
    {
      id: 'hub',
      name: 'Transmission Hub',
      t: 0.98,
      sparkTitle: "Chamber 5: The Transmission Hub 🚀",
      sparkMessage: "You've reached the end of the lab! Om is currently open for high-impact software engineering roles. Download his resume or dispatch a message directly!",
    },
  ];

  const jumpToChamber = (index) => {
    const chamber = chambers[index];
    if (chamber) {
      targetProgressRef.current = chamber.t;
      setCurrentChamberIndex(index);
      setSparkDialogue({
        title: chamber.sparkTitle,
        message: chamber.sparkMessage,
      });
    }
  };

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    let width = container.clientWidth;
    let height = container.clientHeight;

    // --- THREE.JS SCENE SETUP ---
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x06080d, 0.045);

    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 200);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // --- CAMERA SPLINE PATH ---
    // Smooth 3D flight trajectory curving through the corridor
    const splinePoints = [
      new THREE.Vector3(0, 1.8, 14),     // Start (The Core)
      new THREE.Vector3(0, 1.8, 2),      // Approach Core Pedestal
      new THREE.Vector3(-1.8, 1.8, -10), // Curved entry into Workshop
      new THREE.Vector3(2.0, 1.8, -24),  // Mid-Workshop AI & Systems
      new THREE.Vector3(-1.5, 1.8, -38), // Mid-Workshop Edge & Mobile
      new THREE.Vector3(0, 1.8, -52),    // The Engine Room
      new THREE.Vector3(0, 1.8, -66),    // Transmission Hub Terminal
    ];

    const cameraSpline = new THREE.CatmullRomCurve3(splinePoints);
    cameraSpline.curveType = 'catmullrom';
    cameraSpline.tension = 0.45;

    // --- SHARED TACTILE CLAY MATERIALS ---
    const floorMat = new THREE.MeshPhysicalMaterial({
      color: 0x090b10,
      roughness: 0.45,
      metalness: 0.15,
      clearcoat: 0.3,
    });

    const wallMat = new THREE.MeshPhysicalMaterial({
      color: 0x0c0f17,
      roughness: 0.6,
      metalness: 0.1,
    });

    const archRingMat = new THREE.MeshPhysicalMaterial({
      color: 0x161a26,
      roughness: 0.35,
      metalness: 0.2,
      clearcoat: 0.4,
    });

    const glowCyanMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
    const glowEmeraldMat = new THREE.MeshBasicMaterial({ color: 0x34d399 });
    const glowAmberMat = new THREE.MeshBasicMaterial({ color: 0xf59e0b });

    // --- BUILD THE PHYSICAL 3D CORRIDOR ---
    // Floor
    const floorGeo = new THREE.PlaneGeometry(16, 120);
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, 0, -25);
    scene.add(floorMesh);

    // Ceiling
    const ceilingMesh = new THREE.Mesh(floorGeo, wallMat);
    ceilingMesh.rotation.x = Math.PI / 2;
    ceilingMesh.position.set(0, 6.5, -25);
    scene.add(ceilingMesh);

    // Architectural Arches / Structural Portals along corridor
    for (let z = 10; z >= -65; z -= 7) {
      const archGroup = new THREE.Group();
      archGroup.position.set(0, 0, z);

      // Left Pillar
      const pillarGeo = new THREE.BoxGeometry(0.8, 6.5, 0.8);
      const leftPillar = new THREE.Mesh(pillarGeo, archRingMat);
      leftPillar.position.set(-6, 3.25, 0);
      archGroup.add(leftPillar);

      // Right Pillar
      const rightPillar = new THREE.Mesh(pillarGeo, archRingMat);
      rightPillar.position.set(6, 3.25, 0);
      archGroup.add(rightPillar);

      // Cross Beam
      const beamGeo = new THREE.BoxGeometry(12.8, 0.8, 0.8);
      const crossBeam = new THREE.Mesh(beamGeo, archRingMat);
      crossBeam.position.set(0, 6.1, 0);
      archGroup.add(crossBeam);

      // Subtle Neon Light Strip along Arch
      const stripGeo = new THREE.BoxGeometry(11, 0.05, 0.05);
      const neonStrip = new THREE.Mesh(stripGeo, glowCyanMat);
      neonStrip.position.set(0, 5.7, 0);
      archGroup.add(neonStrip);

      scene.add(archGroup);
    }

    // Floor Track Lines (Light guide strips down the hall)
    const trackGeo = new THREE.BoxGeometry(0.08, 0.02, 100);
    const leftTrack = new THREE.Mesh(trackGeo, glowCyanMat);
    leftTrack.position.set(-2.5, 0.01, -25);
    scene.add(leftTrack);

    const rightTrack = new THREE.Mesh(trackGeo, glowCyanMat);
    rightTrack.position.set(2.5, 0.01, -25);
    scene.add(rightTrack);

    // --- 1. CHAMBER 1: THE CORE PEDESTAL ---
    const coreGroup = new THREE.Group();
    coreGroup.position.set(0, 0, 0);

    const pedestalBase = new THREE.Mesh(
      new THREE.CylinderGeometry(2.4, 2.8, 0.5, 32),
      archRingMat
    );
    pedestalBase.position.y = 0.25;
    coreGroup.add(pedestalBase);

    // Floating Holographic Core Crystal
    const coreIcosaGeo = new THREE.IcosahedronGeometry(1.2, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x1a2133,
      roughness: 0.2,
      metalness: 0.2,
      clearcoat: 0.8,
      flatShading: true,
      wireframe: false,
    });
    const coreCrystal = new THREE.Mesh(coreIcosaGeo, coreMat);
    coreCrystal.position.set(0, 2.2, 0);
    coreGroup.add(coreCrystal);

    const coreWireMesh = new THREE.Mesh(
      new THREE.IcosahedronGeometry(1.4, 1),
      new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true, transparent: true, opacity: 0.35 })
    );
    coreWireMesh.position.set(0, 2.2, 0);
    coreGroup.add(coreWireMesh);

    scene.add(coreGroup);

    // --- 2. CHAMBER 2: THE WORKSHOP PHYSICAL PROJECT STATIONS ---
    const stations = [];
    stationsRef.current = stations;

    // Map 6 flagship projects to physical terminal stations in the corridor
    const projectStationsConfig = [
      { project: projectsData[0], pos: new THREE.Vector3(-4.2, 0, -12), rotY: Math.PI / 4, color: 0x38bdf8 },
      { project: projectsData[1], pos: new THREE.Vector3(4.2, 0, -17), rotY: -Math.PI / 4, color: 0x34d399 },
      { project: projectsData[2], pos: new THREE.Vector3(-4.2, 0, -22), rotY: Math.PI / 4, color: 0xf59e0b },
      { project: projectsData[3], pos: new THREE.Vector3(4.2, 0, -28), rotY: -Math.PI / 4, color: 0x38bdf8 },
      { project: projectsData[4], pos: new THREE.Vector3(-4.2, 0, -34), rotY: Math.PI / 4, color: 0xa855f7 },
      { project: projectsData[5], pos: new THREE.Vector3(4.2, 0, -40), rotY: -Math.PI / 4, color: 0x34d399 },
    ];

    projectStationsConfig.forEach((cfg, idx) => {
      const stationGroup = new THREE.Group();
      stationGroup.position.copy(cfg.pos);
      stationGroup.rotation.y = cfg.rotY;

      // Base Console Desk
      const deskGeo = new THREE.BoxGeometry(2.6, 1.3, 1.4);
      const deskMesh = new THREE.Mesh(deskGeo, archRingMat);
      deskMesh.position.y = 0.65;
      stationGroup.add(deskMesh);

      // Angled Terminal Screen
      const screenGeo = new THREE.BoxGeometry(2.4, 1.4, 0.15);
      const screenMat = new THREE.MeshPhysicalMaterial({
        color: 0x07090e,
        roughness: 0.2,
        metalness: 0.8,
        clearcoat: 0.8,
      });
      const screenMesh = new THREE.Mesh(screenGeo, screenMat);
      screenMesh.position.set(0, 1.8, -0.2);
      screenMesh.rotation.x = -0.25;
      stationGroup.add(screenMesh);

      // Glowing Display Canvas Face
      const glowBorderGeo = new THREE.BoxGeometry(2.45, 0.04, 0.2);
      const glowBorder = new THREE.Mesh(glowBorderGeo, new THREE.MeshBasicMaterial({ color: cfg.color }));
      glowBorder.position.set(0, 2.5, -0.38);
      stationGroup.add(glowBorder);

      // Holographic Floating Beacon on top
      const beaconGeo = new THREE.OctahedronGeometry(0.35);
      const beaconMat = new THREE.MeshBasicMaterial({ color: cfg.color, wireframe: true });
      const beaconMesh = new THREE.Mesh(beaconGeo, beaconMat);
      beaconMesh.position.set(0, 2.9, 0);
      stationGroup.add(beaconMesh);

      // Hit area for clicking
      const hitBox = new THREE.Mesh(
        new THREE.BoxGeometry(3.2, 3.5, 2.0),
        new THREE.MeshBasicMaterial({ visible: false })
      );
      hitBox.position.set(0, 1.7, 0);
      hitBox.userData = { project: cfg.project, stationIndex: idx };
      stationGroup.add(hitBox);

      scene.add(stationGroup);

      stations.push({
        group: stationGroup,
        beacon: beaconMesh,
        hitBox: hitBox,
        project: cfg.project,
        color: cfg.color,
      });
    });

    // --- 3. CHAMBER 3: THE ENGINE ROOM (SERVER RACKS) ---
    const rackGroup = new THREE.Group();
    rackGroup.position.set(0, 0, -52);

    for (let r = -4; r <= 4; r += 2.5) {
      if (Math.abs(r) < 1.0) continue; // Leave central walking lane open
      const rackGeo = new THREE.BoxGeometry(1.6, 4.5, 1.4);
      const rackMesh = new THREE.Mesh(rackGeo, archRingMat);
      rackMesh.position.set(r, 2.25, 0);
      rackGroup.add(rackMesh);

      // Blinking status LED matrix on server racks
      for (let s = 1.0; s <= 3.8; s += 0.5) {
        const ledStrip = new THREE.Mesh(
          new THREE.BoxGeometry(1.2, 0.04, 0.05),
          r > 0 ? glowEmeraldMat : glowCyanMat
        );
        ledStrip.position.set(r, s, 0.72);
        rackGroup.add(ledStrip);
      }
    }
    scene.add(rackGroup);

    // --- 4. CHAMBER 4: TRANSMISSION HUB TERMINAL ---
    const hubGroup = new THREE.Group();
    hubGroup.position.set(0, 0, -66);

    const hubConsole = new THREE.Mesh(
      new THREE.CylinderGeometry(2.0, 2.5, 1.1, 24),
      archRingMat
    );
    hubConsole.position.y = 0.55;
    hubGroup.add(hubConsole);

    const hubRing = new THREE.Mesh(
      new THREE.TorusGeometry(3.2, 0.08, 12, 36),
      glowCyanMat
    );
    hubRing.rotation.x = Math.PI / 2;
    hubRing.position.y = 0.05;
    hubGroup.add(hubRing);

    scene.add(hubGroup);

    // --- SPARK THE DROID (Companion flying ahead of camera) ---
    const sparkMascotGroup = new THREE.Group();
    scene.add(sparkMascotGroup);

    // Spark Head & Visor
    const sparkHead = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.5, 0.3, 12, 16),
      new THREE.MeshPhysicalMaterial({ color: 0x1f2433, roughness: 0.35, clearcoat: 0.5 })
    );
    sparkHead.rotation.z = Math.PI / 2;
    sparkMascotGroup.add(sparkHead);

    const sparkVisor = new THREE.Mesh(
      new THREE.CapsuleGeometry(0.38, 0.16, 10, 14),
      new THREE.MeshPhysicalMaterial({ color: 0x05070a, roughness: 0.1, clearcoat: 1.0 })
    );
    sparkVisor.rotation.z = Math.PI / 2;
    sparkVisor.position.set(0, 0, 0.32);
    sparkVisor.scale.set(0.9, 0.9, 0.35);
    sparkMascotGroup.add(sparkVisor);

    // Eyes
    const sparkEyeGeo = new THREE.CapsuleGeometry(0.06, 0.08, 6, 8);
    const leftEye = new THREE.Mesh(sparkEyeGeo, glowCyanMat);
    leftEye.position.set(-0.15, 0, 0.46);
    sparkMascotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(sparkEyeGeo, glowCyanMat);
    rightEye.position.set(0.15, 0, 0.46);
    sparkMascotGroup.add(rightEye);

    // Thruster
    const thrusterCone = new THREE.Mesh(
      new THREE.ConeGeometry(0.12, 0.3, 8, 1, true),
      glowCyanMat
    );
    thrusterCone.rotation.x = Math.PI;
    thrusterCone.position.set(0, -0.65, 0);
    sparkMascotGroup.add(thrusterCone);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0x0a0d15, 2.5);
    scene.add(ambientLight);

    const cameraFollowLight = new THREE.PointLight(0xa5b4fc, 2.5, 18);
    scene.add(cameraFollowLight);

    const coreLight = new THREE.PointLight(0x38bdf8, 3.5, 15);
    coreLight.position.set(0, 3.0, 0);
    scene.add(coreLight);

    const hubLight = new THREE.PointLight(0x38bdf8, 4.0, 18);
    hubLight.position.set(0, 2.5, -66);
    scene.add(hubLight);

    // --- INPUT CONTROLS (SCROLL, TOUCH, KEYS) ---
    const handleWheel = (e) => {
      e.preventDefault();
      const delta = e.deltaY * 0.00045;
      targetProgressRef.current = THREE.MathUtils.clamp(targetProgressRef.current + delta, 0, 1);
    };

    let touchStartY = 0;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchMove = (e) => {
      const deltaY = touchStartY - e.touches[0].clientY;
      touchStartY = e.touches[0].clientY;
      targetProgressRef.current = THREE.MathUtils.clamp(
        targetProgressRef.current + deltaY * 0.0012,
        0,
        1
      );
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S' || e.key === ' ') {
        targetProgressRef.current = THREE.MathUtils.clamp(targetProgressRef.current + 0.04, 0, 1);
      } else if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        targetProgressRef.current = THREE.MathUtils.clamp(targetProgressRef.current - 0.04, 0, 1);
      }
    };

    // Raycaster for Station clicks & hovers
    const raycaster = new THREE.Raycaster();
    const mouseCoord = new THREE.Vector2();

    const handlePointerMove = (e) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouseCoord.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseCoord.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouseCoord, camera);
      const hitCandidates = stations.map(s => s.hitBox);
      const intersects = raycaster.intersectObjects(hitCandidates, false);

      if (intersects.length > 0) {
        const found = intersects[0].object.userData.project;
        setHoveredStation(found);
      } else {
        setHoveredStation(null);
      }
    };

    const handleClick = () => {
      raycaster.setFromCamera(mouseCoord, camera);
      const hitCandidates = stations.map(s => s.hitBox);
      const intersects = raycaster.intersectObjects(hitCandidates, false);

      if (intersects.length > 0) {
        const found = intersects[0].object.userData.project;
        setSelectedProject(found);
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('click', handleClick);
    window.addEventListener('keydown', handleKeyDown);

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

    // --- ANIMATION LOOP ---
    let animId;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth progress lerp
      progressRef.current += (targetProgressRef.current - progressRef.current) * 0.08;
      const t = progressRef.current;
      setProgressVal(t);

      // Camera Position on Spline
      const camPos = cameraSpline.getPointAt(t);
      camera.position.copy(camPos);

      // Camera Look Ahead
      const lookAtT = Math.min(t + 0.05, 1.0);
      const lookTarget = cameraSpline.getPointAt(lookAtT);
      camera.lookAt(lookTarget);

      // Follow Light
      cameraFollowLight.position.copy(camPos);

      // Spark companion positions just ahead of camera and slightly to the right
      const sparkT = Math.min(t + 0.035, 1.0);
      const sparkPathPos = cameraSpline.getPointAt(sparkT);
      sparkMascotGroup.position.set(
        sparkPathPos.x + 0.75,
        sparkPathPos.y - 0.25 + Math.sin(elapsedTime * 3.0) * 0.1,
        sparkPathPos.z
      );
      sparkMascotGroup.rotation.y = Math.PI + Math.sin(elapsedTime * 1.5) * 0.2;

      // Animate Stations
      stations.forEach((st, idx) => {
        st.beacon.rotation.y = elapsedTime * (1.2 + idx * 0.2);
        st.beacon.rotation.x = Math.sin(elapsedTime * 2.0) * 0.2;
      });

      // Animate Core Crystal
      coreCrystal.rotation.y = elapsedTime * 0.3;
      coreCrystal.rotation.x = elapsedTime * 0.15;
      coreWireMesh.rotation.y = -elapsedTime * 0.2;

      // Sync active chamber index based on progress
      let activeIdx = 0;
      for (let i = chambers.length - 1; i >= 0; i--) {
        if (t >= chambers[i].t - 0.08) {
          activeIdx = i;
          break;
        }
      }
      if (activeIdx !== currentChamberIndex) {
        setCurrentChamberIndex(activeIdx);
        setSparkDialogue({
          title: chambers[activeIdx].sparkTitle,
          message: chambers[activeIdx].sparkMessage,
        });
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('keydown', handleKeyDown);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#06080d] select-none overflow-hidden font-mono-code text-slate-100">
      
      {/* 3D WebGL Canvas Viewport */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing" 
      />

      {/* --- TOP HUD BAR --- */}
      <header className="absolute top-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none">
        
        {/* Monogram & Title */}
        <div className="flex items-center gap-3 clay-card px-4 py-2 pointer-events-auto bg-[#0b0e17]/85 backdrop-blur-xl border border-white/10">
          <div className="w-8 h-8 rounded-lg clay-button flex items-center justify-center font-bold text-white text-xs">
            OP
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-bold text-white font-heading">
              Om Prakash Verma
            </span>
            <span className="text-[10px] text-cyan-400">
              The Spatial 3D Lab
            </span>
          </div>
        </div>

        {/* Mode Switcher: 3D Spatial World <-> Fast Recruiter View */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onSwitchToReaderView}
            className="clay-button-primary px-4 py-2 rounded-xl text-xs flex items-center gap-2 font-semibold shadow-2xl cursor-pointer hover:scale-105 transition-transform"
            title="Switch to standard reader view"
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Fast Recruiter View</span>
          </button>
        </div>

      </header>

      {/* --- HOVERED STATION PREVIEW TAG --- */}
      {hoveredStation && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-40 pointer-events-none animate-in fade-in zoom-in-95 duration-200">
          <div className="clay-card px-5 py-2.5 bg-black/90 border border-cyan-500/40 text-center shadow-2xl backdrop-blur-xl">
            <span className="text-[10px] text-cyan-400 uppercase tracking-widest block font-bold">
              [Click Station to Inspect]
            </span>
            <span className="text-sm font-bold text-white font-heading">
              {hoveredStation.title}
            </span>
            <span className="text-xs text-slate-400 block mt-0.5">
              {hoveredStation.engineeringMetric}
            </span>
          </div>
        </div>
      )}

      {/* --- SPARK'S IN-GAME COMPANION DIALOGUE BOX (Bottom-Left) --- */}
      <div className="absolute bottom-20 left-4 sm:left-8 z-40 max-w-sm w-full pointer-events-auto">
        <div className="clay-card p-4 border border-cyan-500/30 bg-[#090c14]/95 backdrop-blur-2xl shadow-2xl">
          
          <div className="flex items-center justify-between gap-2 mb-2 pb-1.5 border-b border-white/5">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse"></span>
              <span className="text-xs font-bold text-white font-heading">
                {sparkDialogue.title}
              </span>
            </div>
            <span className="text-[10px] text-cyan-400 bg-cyan-950/80 px-2 py-0.5 rounded border border-cyan-800/40 font-semibold">
              Spark // Guide
            </span>
          </div>

          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {sparkDialogue.message}
          </p>

          <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
            <span>Scroll or use W/S to fly</span>
            <span className="text-cyan-300">Room {currentChamberIndex + 1} of {chambers.length}</span>
          </div>

        </div>
      </div>

      {/* --- BOTTOM CHAMBER JUMP DOCK (Fast navigation between rooms) --- */}
      <footer className="absolute bottom-4 left-4 right-4 z-40 flex items-center justify-center pointer-events-none">
        <div className="clay-card px-3 sm:px-4 py-2 bg-[#090b12]/90 backdrop-blur-xl border border-white/10 flex items-center gap-1.5 sm:gap-2 pointer-events-auto flex-wrap justify-center">
          
          {chambers.map((ch, idx) => {
            const isActive = idx === currentChamberIndex;
            return (
              <button
                key={ch.id}
                onClick={() => jumpToChamber(idx)}
                className={`px-3 py-1.5 rounded-lg text-xs transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                  isActive
                    ? 'clay-button-primary !text-[#090a0f] font-bold shadow-lg scale-105'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="w-1.5 h-1.5 rounded-full bg-current opacity-80"></span>
                <span>{ch.name}</span>
              </button>
            );
          })}

        </div>
      </footer>

      {/* --- FLIGHT CONTROLS FLOATING HINT (Bottom-Right) --- */}
      <div className="hidden md:flex absolute bottom-4 right-6 z-30 pointer-events-none font-mono-code text-[11px] text-slate-500 gap-3">
        <span>[Scroll / Swipe / W-S to Navigate]</span>
        <span>[Click Station Terminals to Inspect]</span>
      </div>

      {/* --- ARCHITECTURE INSPECT DIALOG --- */}
      <ProjectDetailDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

    </div>
  );
}
