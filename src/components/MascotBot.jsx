import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function MascotBot({ 
  currentStep = 0, 
  isInteracting = false, 
  onBotClick,
  botReaction = null
}) {
  const containerRef = useRef(null);
  const botGroupRef = useRef(null);
  const eyesRef = useRef([]);
  const targetPosRef = useRef({ x: 0, y: 0, z: 0, rotY: 0, rotX: 0 });
  const spinRef = useRef(0);

  // Waypoints for each dialogue step (in 3D world units)
  const waypoints = [
    { x: 0, y: 0.1, z: 0, rotY: -0.15, rotX: 0 },         // Step 0: Center stage greeting
    { x: -0.6, y: -0.2, z: 0.3, rotY: 0.25, rotX: 0.05 },   // Step 1: Leaning toward the narrative / philosophy
    { x: 0.5, y: -0.3, z: 0.2, rotY: -0.3, rotX: -0.05 },   // Step 2: Hovering near the stack badges
    { x: 0, y: 0.2, z: 0.1, rotY: 0, rotX: 0 },            // Step 3: Proud hero hover
  ];

  useEffect(() => {
    const wp = waypoints[currentStep] || waypoints[0];
    targetPosRef.current = wp;
  }, [currentStep]);

  // Trigger spin on bot click or reaction
  useEffect(() => {
    if (botReaction) {
      spinRef.current += Math.PI * 2;
    }
  }, [botReaction]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 360;
    const height = container.clientHeight || 360;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // Main Mascot Master Group
    const mascotGroup = new THREE.Group();
    scene.add(mascotGroup);
    botGroupRef.current = mascotGroup;

    // --- MATERIALS (Tactile Dark Clay & Glowing Accents) ---
    const clayMat = new THREE.MeshPhysicalMaterial({
      color: 0x1e2230,
      roughness: 0.38,
      metalness: 0.1,
      clearcoat: 0.4,
      clearcoatRoughness: 0.25,
      reflectivity: 0.6,
    });

    const accentMat = new THREE.MeshPhysicalMaterial({
      color: 0x333b52,
      roughness: 0.3,
      metalness: 0.2,
      clearcoat: 0.5,
    });

    const visorMat = new THREE.MeshPhysicalMaterial({
      color: 0x07090e,
      roughness: 0.15,
      metalness: 0.8,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
    });

    const eyeGlowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8, // Cyan LED
    });

    const thrusterGlowMat = new THREE.MeshBasicMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.8,
    });

    // 1. HEAD (Capsule / Pill)
    const headGeo = new THREE.CapsuleGeometry(0.72, 0.45, 16, 24);
    const headMesh = new THREE.Mesh(headGeo, clayMat);
    headMesh.rotation.z = Math.PI / 2;
    headMesh.position.y = 0.35;
    mascotGroup.add(headMesh);

    // 2. VISOR SCREEN (Curved dark screen)
    const visorGeo = new THREE.CapsuleGeometry(0.55, 0.25, 12, 20);
    const visorMesh = new THREE.Mesh(visorGeo, visorMat);
    visorMesh.rotation.z = Math.PI / 2;
    visorMesh.position.set(0, 0.35, 0.45);
    visorMesh.scale.set(0.9, 0.9, 0.4);
    mascotGroup.add(visorMesh);

    // 3. EXPRESSIVE LED EYES (Two rounded capsules on visor)
    const eyeGeo = new THREE.CapsuleGeometry(0.08, 0.12, 8, 12);
    
    const leftEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
    leftEye.position.set(-0.22, 0.35, 0.65);
    leftEye.rotation.z = 0;
    mascotGroup.add(leftEye);

    const rightEye = new THREE.Mesh(eyeGeo, eyeGlowMat);
    rightEye.position.set(0.22, 0.35, 0.65);
    rightEye.rotation.z = 0;
    mascotGroup.add(rightEye);

    eyesRef.current = [leftEye, rightEye];

    // 4. FLOATING EARS / HEADPHONES
    const earGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.18, 16);
    const leftEar = new THREE.Mesh(earGeo, accentMat);
    leftEar.rotation.z = Math.PI / 2;
    leftEar.position.set(-0.85, 0.35, 0);
    mascotGroup.add(leftEar);

    const rightEar = new THREE.Mesh(earGeo, accentMat);
    rightEar.rotation.z = Math.PI / 2;
    rightEar.position.set(0.85, 0.35, 0);
    mascotGroup.add(rightEar);

    // 5. ANTENNA & GLOWING TIP
    const stalkGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.35, 8);
    const stalkMesh = new THREE.Mesh(stalkGeo, accentMat);
    stalkMesh.position.set(0, 1.05, 0);
    mascotGroup.add(stalkMesh);

    const tipGeo = new THREE.SphereGeometry(0.1, 12, 12);
    const tipMesh = new THREE.Mesh(tipGeo, eyeGlowMat);
    tipMesh.position.set(0, 1.25, 0);
    mascotGroup.add(tipMesh);

    // 6. FLOATING TORSO (Chassis)
    const bodyGeo = new THREE.SphereGeometry(0.55, 16, 16);
    const bodyMesh = new THREE.Mesh(bodyGeo, clayMat);
    bodyMesh.scale.set(0.9, 0.8, 0.8);
    bodyMesh.position.y = -0.45;
    mascotGroup.add(bodyMesh);

    // Chest Emblem / Tactile core
    const chestPlateGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.08, 16);
    const chestPlate = new THREE.Mesh(chestPlateGeo, accentMat);
    chestPlate.rotation.x = Math.PI / 2;
    chestPlate.position.set(0, -0.42, 0.42);
    mascotGroup.add(chestPlate);

    // 7. FLOATING HANDS
    const handGeo = new THREE.SphereGeometry(0.18, 12, 12);
    const leftHand = new THREE.Mesh(handGeo, accentMat);
    leftHand.position.set(-0.75, -0.35, 0.2);
    mascotGroup.add(leftHand);

    const rightHand = new THREE.Mesh(handGeo, accentMat);
    rightHand.position.set(0.75, -0.35, 0.2);
    mascotGroup.add(rightHand);

    // 8. THRUSTER RING & JET GLOW
    const thrusterRingGeo = new THREE.TorusGeometry(0.22, 0.06, 8, 20);
    const thrusterRing = new THREE.Mesh(thrusterRingGeo, accentMat);
    thrusterRing.rotation.x = Math.PI / 2;
    thrusterRing.position.set(0, -0.85, 0);
    mascotGroup.add(thrusterRing);

    const jetConeGeo = new THREE.ConeGeometry(0.18, 0.45, 12, 1, true);
    const jetCone = new THREE.Mesh(jetConeGeo, thrusterGlowMat);
    jetCone.rotation.x = Math.PI;
    jetCone.position.set(0, -1.05, 0);
    mascotGroup.add(jetCone);

    // LIGHTING (Tactile & Soft Rim Lights)
    const ambientLight = new THREE.AmbientLight(0x0e111a, 2.8);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(3, 4, 3);
    scene.add(keyLight);

    const cyanRim = new THREE.PointLight(0x38bdf8, 2.8, 8);
    cyanRim.position.set(-2, 1, 2);
    scene.add(cyanRim);

    const thrusterLight = new THREE.PointLight(0x38bdf8, 3.0, 4);
    thrusterLight.position.set(0, -1.2, 0);
    scene.add(thrusterLight);

    // MOUSE PARALLAX TRACKING
    let mouseX = 0;
    let mouseY = 0;
    const handlePointerMove = (e) => {
      mouseX = (e.clientX / window.innerWidth) - 0.5;
      mouseY = (e.clientY / window.innerHeight) - 0.5;
    };
    window.addEventListener('pointermove', handlePointerMove, { passive: true });

    // RESIZE OBSERVER
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: nw, height: nh } = entry.contentRect;
        if (nw > 0 && nh > 0) {
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh, false);
        }
      }
    });
    resizeObserver.observe(container);

    // ANIMATION & BLINK LOGIC
    let animationFrameId;
    const clock = new THREE.Clock();
    let nextBlinkTime = 2.0;
    let isBlinking = false;
    let currentSpin = 0;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Waypoint Smooth Lerp
      const target = targetPosRef.current;
      mascotGroup.position.x += (target.x - mascotGroup.position.x) * 0.04;
      mascotGroup.position.y += (target.y + Math.sin(elapsedTime * 2.8) * 0.12 - mascotGroup.position.y) * 0.04;
      mascotGroup.position.z += (target.z - mascotGroup.position.z) * 0.04;

      // Spin physics (when clicked)
      if (spinRef.current > currentSpin) {
        currentSpin += 0.18;
        if (currentSpin >= spinRef.current) {
          currentSpin = spinRef.current;
        }
      }

      // Rotations with mouse tracking + spin
      const targetRotY = target.rotY + (mouseX * 0.6) + currentSpin;
      const targetRotX = target.rotX + (mouseY * 0.4) + Math.sin(elapsedTime * 2.0) * 0.05;
      const targetRotZ = (target.x - mascotGroup.position.x) * -0.4; // Bank into turn

      mascotGroup.rotation.y += (targetRotY - mascotGroup.rotation.y) * 0.06;
      mascotGroup.rotation.x += (targetRotX - mascotGroup.rotation.x) * 0.06;
      mascotGroup.rotation.z += (targetRotZ - mascotGroup.rotation.z) * 0.06;

      // Floating Hands Animation
      leftHand.position.y = -0.35 + Math.sin(elapsedTime * 3.0 + 1) * 0.05;
      rightHand.position.y = -0.35 + Math.sin(elapsedTime * 3.0 + 2.5) * 0.05;
      leftHand.position.z = 0.2 + Math.cos(elapsedTime * 2.0) * 0.04;
      rightHand.position.z = 0.2 + Math.cos(elapsedTime * 2.0 + 1.5) * 0.04;

      // Jet Thruster Flicker
      const thrusterPulse = 0.8 + Math.sin(elapsedTime * 18.0) * 0.25;
      jetCone.scale.set(thrusterPulse, thrusterPulse * 1.1, thrusterPulse);
      thrusterLight.intensity = 2.5 + Math.sin(elapsedTime * 20.0) * 1.0;

      // Blink Logic
      if (elapsedTime > nextBlinkTime) {
        isBlinking = true;
        nextBlinkTime = elapsedTime + 3.0 + Math.random() * 3.5;
      }
      if (isBlinking) {
        const blinkProgress = (elapsedTime - (nextBlinkTime - 3.0 - Math.random() * 3.5));
        leftEye.scale.y = 0.15;
        rightEye.scale.y = 0.15;
        if (blinkProgress > 0.15) {
          leftEye.scale.y = 1.0;
          rightEye.scale.y = 1.0;
          isBlinking = false;
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
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
      thrusterGlowMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onClick={onBotClick}
      className="w-full h-full relative cursor-pointer select-none flex items-center justify-center transition-transform hover:scale-105 active:scale-95"
      title="Click Spark the Droid!"
      aria-label="3D Interactive Mascot Bot Spark"
    />
  );
}
