import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '../utils/audioEffects';
import { createPaperPlaneGeometry } from '../utils/sketchTextures';
import { portfolioData } from '../data/portfolioData';

export default function JourneyScene({ onBack }) {
  const mountRef = useRef(null);
  const [activeMilestone, setActiveMilestone] = useState(null);
  const milestones = portfolioData.journeyMilestones;

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    sound.playWhoosh();

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf6f4ee);
    scene.fog = new THREE.FogExp2(0xf6f4ee, 0.02);

    const camera = new THREE.PerspectiveCamera(
      50,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 1.8, 6);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // 1. Folded Paper Airplane Mesh (Foreground protagonist)
    const planeGeom = createPaperPlaneGeometry();
    const planeMat = new THREE.MeshBasicMaterial({ 
      color: 0xffffff,
      wireframe: false 
    });
    const paperPlane = new THREE.Mesh(planeGeom, planeMat);

    // Ink line outline for the paper plane
    const wireframeMat = new THREE.MeshBasicMaterial({ color: 0x1c1c1c, wireframe: true });
    const planeWire = new THREE.Mesh(planeGeom, wireframeMat);
    paperPlane.add(planeWire);

    paperPlane.position.set(0, 0.2, 2.5);
    paperPlane.scale.set(0.65, 0.65, 0.65);
    scene.add(paperPlane);

    // 2. Floating 3D Clouds (Ink sketch spheres/blobs with outline)
    const clouds = [];
    for (let i = 0; i < 28; i++) {
      const cloudGroup = new THREE.Group();
      const numPuffs = 4 + Math.floor(Math.random() * 3);

      for (let p = 0; p < numPuffs; p++) {
        const puffGeom = new THREE.SphereGeometry(1 + Math.random() * 0.8, 8, 8);
        const puffMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
        const puff = new THREE.Mesh(puffGeom, puffMat);
        puff.position.set((p - 1.5) * 1.2, (Math.random() - 0.5) * 0.6, (Math.random() - 0.5) * 0.6);

        // Black sketch outline
        const outlineMat = new THREE.MeshBasicMaterial({ color: 0x222222, wireframe: true });
        const outline = new THREE.Mesh(puffGeom, outlineMat);
        puff.add(outline);

        cloudGroup.add(puff);
      }

      cloudGroup.position.set(
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 12 + 1,
        -Math.random() * 60 - 5
      );
      scene.add(cloudGroup);
      clouds.push(cloudGroup);
    }

    // 3. Floating Sky Islands (Milestones along the flight path)
    const islands = [];
    milestones.forEach((ms, idx) => {
      const islandGroup = new THREE.Group();

      // Rock Island Base
      const rockGeom = new THREE.ConeGeometry(2.2, 2.5, 6);
      const rockMat = new THREE.MeshBasicMaterial({ color: 0xe8e4d8, wireframe: true });
      const rock = new THREE.Mesh(rockGeom, rockMat);
      rock.rotation.x = Math.PI; // Point down
      islandGroup.add(rock);

      // Top grass/dirt cap
      const capGeom = new THREE.CylinderGeometry(2.3, 2.0, 0.4, 6);
      const capMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
      const cap = new THREE.Mesh(capGeom, capMat);
      cap.position.y = 0.2;
      islandGroup.add(cap);

      // Position along flight path
      islandGroup.position.set(
        (idx % 2 === 0 ? -4.5 : 4.5),
        0.5 + idx * 0.4,
        -idx * 14 - 8
      );

      islandGroup.userData = ms;
      scene.add(islandGroup);
      islands.push(islandGroup);
    });

    // Mouse Tracking for flight banking & steering
    let targetX = 0;
    let targetY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      targetY = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    container.addEventListener('mousemove', handleMouseMove);

    // Animation Loop
    let animId;
    let flightProgress = 0;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      flightProgress += 0.08;

      // Paper plane tilt & gentle banking
      paperPlane.position.x += (targetX * 2.5 - paperPlane.position.x) * 0.06;
      paperPlane.position.y += (targetY * 1.5 + 0.2 - paperPlane.position.y) * 0.06;

      // Roll & pitch banking
      paperPlane.rotation.z = -targetX * 0.45;
      paperPlane.rotation.x = -targetY * 0.25 + Math.sin(flightProgress * 0.8) * 0.05;
      paperPlane.rotation.y = -targetX * 0.2;

      // Clouds gliding backwards towards camera
      clouds.forEach((c) => {
        c.position.z += 0.25;
        if (c.position.z > 8) {
          c.position.z = -60;
          c.position.x = (Math.random() - 0.5) * 35;
        }
      });

      // Islands gliding towards camera
      islands.forEach((isl) => {
        isl.position.z += 0.18;
        isl.rotation.y += 0.005;

        // Check if near camera to trigger active milestone
        if (isl.position.z > -4 && isl.position.z < 2) {
          setActiveMilestone(isl.userData);
        }

        if (isl.position.z > 10) {
          isl.position.z = -55;
        }
      });

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
      window.removeEventListener('resize', handleResize);
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [milestones]);

  return (
    <div className="relative w-full h-screen overflow-hidden select-none">
      {/* Three.js Canvas */}
      <div ref={mountRef} className="w-full h-full" />

      {/* Top Title Banner */}
      <div className="fixed top-12 left-1/2 -translate-x-1/2 z-30 text-center pointer-events-none">
        <div className="wood-sign inline-block px-8 py-2 transform -rotate-1 shadow-md mb-1">
          <h1 className="font-marker text-2xl sm:text-3xl text-neutral-900">
            JOURNEY FLIGHT
          </h1>
        </div>
        <p className="font-sketch text-xs sm:text-sm text-neutral-600">
          Move your cursor to steer the paper airplane through milestones in the sky
        </p>
      </div>

      {/* Floating Active Milestone Card (When flying past an island) */}
      {activeMilestone && (
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-40 max-w-md w-full px-4 animate-in fade-in slide-in-from-bottom-4 duration-200">
          <div className="paper-torn bg-white p-5 border-2 border-neutral-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-neutral-300 pb-1.5 mb-2">
              <span className="font-mono-code text-xs font-bold px-2 py-0.5 bg-neutral-900 text-white rounded">
                {activeMilestone.year}
              </span>
              <span className="font-sketch font-bold text-amber-700 text-xs">
                {activeMilestone.label}
              </span>
            </div>
            <h3 className="font-marker text-lg text-neutral-900">
              {activeMilestone.title}
            </h3>
            <span className="font-sketch text-xs text-neutral-500 block mb-2">
              {activeMilestone.institution}
            </span>
            <p className="font-sketch text-sm text-neutral-700 leading-relaxed">
              {activeMilestone.detail}
            </p>
          </div>
        </div>
      )}

      {/* Bottom Hint */}
      {!activeMilestone && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
          <span className="font-sketch text-xs text-neutral-500 bg-white/80 px-3 py-1 rounded shadow-xs">
            ✈️ Gliding through clouds • Steer mouse to explore milestones
          </span>
        </div>
      )}
    </div>
  );
}
