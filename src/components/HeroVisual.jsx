import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function HeroVisual() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Scene Setup
    const scene = new THREE.Scene();
    const width = container.clientWidth || 300;
    const height = container.clientHeight || 300;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 6.2;

    const renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true,
      powerPreference: 'high-performance'
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    // Group for mouse & pointer interaction
    const mainGroup = new THREE.Group();
    scene.add(mainGroup);

    // 1. Tactile Claymorphic Core (Matte Icosahedron)
    const coreGeometry = new THREE.IcosahedronGeometry(1.5, 2);
    const coreMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x181a24,
      roughness: 0.45,
      metalness: 0.1,
      clearcoat: 0.3,
      clearcoatRoughness: 0.2,
      flatShading: true,
      reflectivity: 0.6,
    });
    const coreMesh = new THREE.Mesh(coreGeometry, coreMaterial);
    mainGroup.add(coreMesh);

    // 2. Outer Wireframe Cage (Structural insight)
    const wireframeGeometry = new THREE.IcosahedronGeometry(1.95, 1);
    const wireframeMaterial = new THREE.MeshBasicMaterial({
      color: 0x5a637a,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wireframeMesh = new THREE.Mesh(wireframeGeometry, wireframeMaterial);
    mainGroup.add(wireframeMesh);

    // 3. Orbiting Data Nodes / Particles
    const particleCount = 120;
    const particlePositions = new Float32Array(particleCount * 3);
    const particleSizes = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
      const radius = 2.2 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      particlePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      particlePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      particlePositions[i * 3 + 2] = radius * Math.cos(phi);
      particleSizes[i] = Math.random() * 2 + 1;
    }

    const particlesGeo = new THREE.BufferGeometry();
    particlesGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    particlesGeo.setAttribute('size', new THREE.BufferAttribute(particleSizes, 1));

    const particlesMat = new THREE.PointsMaterial({
      color: 0x8b9bb4,
      size: 0.05,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
    });
    const particleSystem = new THREE.Points(particlesGeo, particlesMat);
    mainGroup.add(particleSystem);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0x0f111a, 2.5);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.8);
    keyLight.position.set(4, 5, 4);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x405075, 2.2);
    rimLight.position.set(-5, -3, -3);
    scene.add(rimLight);

    const subtleFill = new THREE.PointLight(0xa5b4fc, 1.5, 10);
    subtleFill.position.set(0, 0, 3);
    scene.add(subtleFill);

    // Mouse & Touch Pointer Handling
    let targetRotationX = 0;
    let targetRotationY = 0;
    let isInteracting = false;
    let startX = 0;
    let startY = 0;
    let baseRotationX = 0;
    let baseRotationY = 0;

    const handlePointerMoveWindow = (event) => {
      // Window level subtle parallax for desktop mouse
      if (event.pointerType === 'mouse' && !isInteracting) {
        const x = (event.clientX / window.innerWidth) - 0.5;
        const y = (event.clientY / window.innerHeight) - 0.5;
        targetRotationY = x * 0.9;
        targetRotationX = y * 0.6;
      }
    };

    // Direct touch / drag on canvas
    const handlePointerDown = (event) => {
      isInteracting = true;
      startX = event.clientX;
      startY = event.clientY;
      baseRotationX = targetRotationX;
      baseRotationY = targetRotationY;
      container.setPointerCapture?.(event.pointerId);
    };

    const handlePointerMoveContainer = (event) => {
      if (!isInteracting) return;
      const deltaX = event.clientX - startX;
      const deltaY = event.clientY - startY;
      targetRotationY = baseRotationY + (deltaX / 120);
      targetRotationX = baseRotationX + (deltaY / 120);
    };

    const handlePointerUp = (event) => {
      isInteracting = false;
      container.releasePointerCapture?.(event.pointerId);
    };

    window.addEventListener('pointermove', handlePointerMoveWindow, { passive: true });
    container.addEventListener('pointerdown', handlePointerDown);
    container.addEventListener('pointermove', handlePointerMoveContainer);
    container.addEventListener('pointerup', handlePointerUp);
    container.addEventListener('pointercancel', handlePointerUp);

    // Responsive Resize Observer
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: newWidth, height: newHeight } = entry.contentRect;
        if (newWidth > 0 && newHeight > 0) {
          camera.aspect = newWidth / newHeight;
          camera.updateProjectionMatrix();
          renderer.setSize(newWidth, newHeight, false);
        }
      }
    });

    resizeObserver.observe(container);

    // Animation Loop
    let animationFrameId;
    const clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Continuous Idle Rotation
      coreMesh.rotation.y = elapsedTime * 0.15;
      coreMesh.rotation.x = elapsedTime * 0.08;

      wireframeMesh.rotation.y = -elapsedTime * 0.1;
      wireframeMesh.rotation.z = elapsedTime * 0.05;

      particleSystem.rotation.y = elapsedTime * 0.06;
      particleSystem.rotation.x = -elapsedTime * 0.03;

      // Smooth interpolation for user interaction
      mainGroup.rotation.y += (targetRotationY - mainGroup.rotation.y) * 0.08;
      mainGroup.rotation.x += (targetRotationX - mainGroup.rotation.x) * 0.08;

      // Subtle breathing
      const breath = 1 + Math.sin(elapsedTime * 1.5) * 0.025;
      coreMesh.scale.set(breath, breath, breath);

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      window.removeEventListener('pointermove', handlePointerMoveWindow);
      container.removeEventListener('pointerdown', handlePointerDown);
      container.removeEventListener('pointermove', handlePointerMoveContainer);
      container.removeEventListener('pointerup', handlePointerUp);
      container.removeEventListener('pointercancel', handlePointerUp);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      coreGeometry.dispose();
      coreMaterial.dispose();
      wireframeGeometry.dispose();
      wireframeMaterial.dispose();
      particlesGeo.dispose();
      particlesMat.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative touch-pan-y cursor-grab active:cursor-grabbing select-none flex items-center justify-center overflow-hidden"
      aria-label="Interactive 3D structural model"
    />
  );
}
