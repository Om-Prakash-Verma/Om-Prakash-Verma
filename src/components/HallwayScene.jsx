import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audioEffects';
import { createWoodFloorTexture, createBrickWallTexture, createDoorTexture } from '../utils/sketchTextures';

export default function HallwayScene({ onEnterRoom }) {
  const mountRef = useRef(null);
  const [hoveredDoor, setHoveredDoor] = useState(null);
  const [cameraZ, setCameraZ] = useState(14);
  const targetZRef = useRef(14);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f4ee);
    scene.fog = new THREE.FogExp2(0xf6f4ee, 0.025);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.6, 14);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Ambient & Directional Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const dirLight = new THREE.DirectionalLight(0xffffff, 0.4);
    dirLight.position.set(5, 10, 7);
    scene.add(dirLight);

    // 1. Hand-Drawn Wooden Plank Floor
    const floorTexture = createWoodFloorTexture();
    floorTexture.repeat.set(3, 12);
    const floorMaterial = new THREE.MeshBasicMaterial({ 
      map: floorTexture,
      side: THREE.DoubleSide
    });
    const floorGeometry = new THREE.PlaneGeometry(8, 50);
    const floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0, -10);
    scene.add(floor);

    // 2. Ceiling with fluorescent lights
    const ceilingMaterial = new THREE.MeshBasicMaterial({ color: 0xf9f8f3 });
    const ceiling = new THREE.Mesh(floorGeometry, ceilingMaterial);
    ceiling.rotation.x = Math.PI / 2;
    ceiling.position.set(0, 4.2, -10);
    scene.add(ceiling);

    // Fluorescent light boxes on ceiling
    for (let lz = 10; lz >= -30; lz -= 10) {
      const lightMesh = new THREE.Mesh(
        new THREE.PlaneGeometry(1.6, 3.2),
        new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true })
      );
      lightMesh.rotation.x = Math.PI / 2;
      lightMesh.position.set(0, 4.18, lz);
      scene.add(lightMesh);
    }

    // 3. Walls
    const wallTexture = createBrickWallTexture();
    wallTexture.repeat.set(8, 2);
    const wallMaterial = new THREE.MeshBasicMaterial({ map: wallTexture, side: THREE.DoubleSide });

    // Left Wall
    const leftWall = new THREE.Mesh(new THREE.PlaneGeometry(50, 4.2), wallMaterial);
    leftWall.rotation.y = Math.PI / 2;
    leftWall.position.set(-4, 2.1, -10);
    scene.add(leftWall);

    // Right Wall
    const rightWall = new THREE.Mesh(new THREE.PlaneGeometry(50, 4.2), wallMaterial);
    rightWall.rotation.y = -Math.PI / 2;
    rightWall.position.set(4, 2.1, -10);
    scene.add(rightWall);

    // 4. Interactive Doors along the Corridor
    const doorGeometry = new THREE.PlaneGeometry(1.8, 3.2);
    const doorObjects = [];

    const doorConfigs = [
      { id: 'gallery', label: 'THE GALLERY', side: 'left', z: 8, sub: 'Projects & Architecture' },
      { id: 'studio', label: 'THE STUDIO', side: 'right', z: 3, sub: 'Systems & Compilers' },
      { id: 'journey', label: 'JOURNEY', side: 'left', z: -2, sub: 'Paper Airplane Flight' },
      { id: 'contact', label: 'CONTACT', side: 'right', z: -7, sub: 'The Ocean Pier' }
    ];

    doorConfigs.forEach((cfg) => {
      const tex = createDoorTexture(cfg.label, cfg.sub, true);
      const mat = new THREE.MeshBasicMaterial({ map: tex });
      const doorMesh = new THREE.Mesh(doorGeometry, mat);

      if (cfg.side === 'left') {
        doorMesh.position.set(-3.94, 1.6, cfg.z);
        doorMesh.rotation.y = Math.PI / 2;
      } else {
        doorMesh.position.set(3.94, 1.6, cfg.z);
        doorMesh.rotation.y = -Math.PI / 2;
      }

      doorMesh.userData = { id: cfg.id, label: cfg.label, sub: cfg.sub, targetZ: cfg.z + (cfg.side === 'left' ? 2 : 2) };
      scene.add(doorMesh);
      doorObjects.push(doorMesh);

      // Wooden door frame border
      const frameGeom = new THREE.BoxGeometry(0.1, 3.4, 2.0);
      const frameMat = new THREE.MeshBasicMaterial({ color: 0x3d2b1f });
      const frame = new THREE.Mesh(frameGeom, frameMat);
      frame.position.copy(doorMesh.position);
      if (cfg.side === 'left') {
        frame.position.x -= 0.05;
      } else {
        frame.position.x += 0.05;
      }
      scene.add(frame);
    });

    // 5. End of Corridor: Double Doors with "while(true) explore()" and Avatar
    const endWall = new THREE.Mesh(
      new THREE.PlaneGeometry(8, 4.2),
      new THREE.MeshBasicMaterial({ color: 0xf7f5ee })
    );
    endWall.position.set(0, 2.1, -25);
    scene.add(endWall);

    // End Double Door Texture
    const endDoorTex = createDoorTexture('EXPLORE', 'while(true) { explore(); }', false);
    const endDoor = new THREE.Mesh(new THREE.PlaneGeometry(2.8, 3.4), new THREE.MeshBasicMaterial({ map: endDoorTex }));
    endDoor.position.set(0, 1.7, -24.9);
    scene.add(endDoor);

    // Raycaster for Hover & Click
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(doorObjects);
      if (intersects.length > 0) {
        setHoveredDoor(intersects[0].object.userData);
        container.style.cursor = 'pointer';
      } else {
        setHoveredDoor(null);
        container.style.cursor = 'default';
      }
    };

    const handleClick = (e) => {
      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(doorObjects);
      if (intersects.length > 0) {
        const doorData = intersects[0].object.userData;
        sound.playDoorOpen();
        onEnterRoom(doorData.id);
      }
    };

    // Scroll & Keyboard to walk through hallway
    const handleWheel = (e) => {
      targetZRef.current = THREE.MathUtils.clamp(
        targetZRef.current - e.deltaY * 0.015,
        -18,
        14
      );
    };

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        targetZRef.current = THREE.MathUtils.clamp(targetZRef.current - 1.5, -18, 14);
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        targetZRef.current = THREE.MathUtils.clamp(targetZRef.current + 1.5, -18, 14);
      }
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('click', handleClick);
    window.addEventListener('wheel', handleWheel, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // Animation Loop
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Smooth camera interpolation
      camera.position.z += (targetZRef.current - camera.position.z) * 0.1;
      setCameraZ(camera.position.z);

      // Gentle walking bob
      camera.position.y = 1.6 + Math.sin(camera.position.z * 1.5) * 0.04;

      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('click', handleClick);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [onEnterRoom]);

  return (
    <div className="relative w-full h-screen overflow-hidden select-none">
      {/* Three.js Canvas Container */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Floating Door Inspection Badge when Hovered */}
      {hoveredDoor && (
        <div className="fixed top-24 left-1/2 -translate-x-1/2 z-30 pointer-events-none animate-in fade-in zoom-in-95 duration-100">
          <div className="paper-torn bg-white px-6 py-2.5 shadow-xl border-2 border-neutral-900 flex flex-col items-center">
            <span className="font-marker text-lg text-neutral-900">
              🚪 {hoveredDoor.label}
            </span>
            <span className="font-sketch text-xs text-neutral-600">
              {hoveredDoor.sub} — Click to enter!
            </span>
          </div>
        </div>
      )}

      {/* Corridor Quick Dock / Navigation HUD at Bottom */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center">
        {/* Navigation buttons */}
        <div className="paper-box bg-white/95 backdrop-blur-xs px-4 py-2 flex items-center gap-2 shadow-lg">
          <button
            onClick={() => {
              sound.playDoorOpen();
              onEnterRoom('gallery');
            }}
            className="paper-button px-3 py-1.5 font-sketch font-bold text-xs text-neutral-800 hover:text-black"
          >
            🖼️ The Gallery
          </button>
          <button
            onClick={() => {
              sound.playDoorOpen();
              onEnterRoom('studio');
            }}
            className="paper-button px-3 py-1.5 font-sketch font-bold text-xs text-neutral-800 hover:text-black"
          >
            📺 The Studio
          </button>
          <button
            onClick={() => {
              sound.playWhoosh();
              onEnterRoom('journey');
            }}
            className="paper-button px-3 py-1.5 font-sketch font-bold text-xs text-neutral-800 hover:text-black"
          >
            ✈️ Journey (Flight)
          </button>
          <button
            onClick={() => {
              sound.playWaterChime();
              onEnterRoom('contact');
            }}
            className="paper-button px-3 py-1.5 font-sketch font-bold text-xs text-neutral-800 hover:text-black"
          >
            🌊 Contact (Pier)
          </button>
        </div>

        <div className="mt-2 text-center">
          <span className="font-sketch text-xs text-neutral-500 bg-white/80 px-2.5 py-0.5 rounded shadow-xs">
            Scroll or press [W / S] to walk down the hall • Click doors to enter
          </span>
        </div>
      </div>
    </div>
  );
}
