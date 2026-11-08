import { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useScene } from '../../../../context/SceneContext';
import { GLOBAL_INFO } from '../../../../data/portfolioData';

const RUBIK_SCRIBBLE = '/fonts/RubikScribble-Regular.ttf';
const CABIN_SKETCH = '/fonts/CabinSketch-Bold.ttf';
const CABIN_REGULAR = '/fonts/CabinSketch-Regular.ttf';

/**
 * EducationRoom Component
 * 
 * Interactive 3D chamber showcasing academic foundation and engineering credentials:
 * - Degree: B.Tech Computer Science & Engineering (2024 - 2028)
 * - College: ABES Engineering College (AKTU)
 * - Schooling: Shree Jain Vidyalaya, Kolkata (2012 - 2023, Class 12)
 * - Core Computer Science pillars & technical coursework
 */
const EducationRoom = ({ showRoom, onReady, isExiting }) => {
    const { openOverlay } = useScene();
    const groupRef = useRef();
    const hasSignaledReady = useRef(false);

    // Floor texture
    const floorTexture = useTexture('/textures/corridor/kawalekpodlogi.webp');

    useEffect(() => {
        if (!hasSignaledReady.current) {
            hasSignaledReady.current = true;
            onReady?.();
        }
    }, [onReady]);

    // Academic cards data
    const cards = useMemo(() => [
        {
            id: 'degree',
            title: 'B.TECH CSE',
            subtitle: '2024 - 2028',
            institution: 'ABES Engineering College',
            affiliation: 'AKTU (Dr. A.P.J. Abdul Kalam Technical University)',
            tagline: 'Computer Science & Engineering',
            desc: '4-year engineering program specializing in computer systems, algorithms, operating systems, and distributed networks.',
            x: -4.2,
            y: 0.4,
            z: -7.5,
            accent: '#3b82f6',
            highlights: ['Data Structures & Algorithms', 'Operating Systems', 'Computer Networks', 'Database Management Systems']
        },
        {
            id: 'schooling',
            title: 'SCHOOLING',
            subtitle: '2012 - 2023',
            institution: 'Shree Jain Vidyalaya, Kolkata',
            affiliation: 'Primary to Higher Secondary (Class 12)',
            tagline: 'Foundation & Academic Excellence',
            desc: 'Comprehensive 11-year schooling foundation culminating in Higher Secondary (Class 12) education with a strong emphasis on Mathematics and Sciences.',
            x: 0,
            y: 0.7,
            z: -8.5,
            accent: '#10b981',
            highlights: ['Higher Secondary (Class 12)', 'Mathematics & Physical Sciences', 'Foundational Logic & Computing', 'Academic Discipline']
        },
        {
            id: 'systems-ai',
            title: 'CORE SYSTEMS & AI',
            subtitle: 'Specialization',
            institution: 'Applied Systems & Research',
            affiliation: 'High-Scale Edge & Full-Stack Systems',
            tagline: 'Applied Engineering',
            desc: 'Designing high-performance full-stack architectures, AI reasoning pipelines, vector search engines, and serverless edge databases.',
            x: 4.2,
            y: 0.4,
            z: -7.5,
            accent: '#8b5cf6',
            highlights: ['Full-Stack (React 19, Next.js, Node)', 'AI Reasoning Pipelines (Gemini 32k)', 'Cloudflare Edge & Serverless D1', '3D WebGL & Three.js Graphics']
        }
    ], []);

    const handleCardClick = (card) => {
        openOverlay({
            title: `${card.title} — ${card.institution}`,
            subtitle: `${card.tagline} (${card.subtitle})`,
            content: (
                <div style={{ color: '#1a1a1a', lineHeight: '1.6', fontFamily: 'inherit' }}>
                    <p style={{ fontSize: '1.1rem', marginBottom: '1rem', fontWeight: '500' }}>
                        {card.desc}
                    </p>
                    <div style={{ marginBottom: '1.5rem', background: '#f5f5f5', padding: '1rem', borderRadius: '8px' }}>
                        <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>Institution & Board:</p>
                        <p style={{ margin: 0 }}>{card.institution} — {card.affiliation}</p>
                    </div>
                    <p style={{ fontWeight: 'bold', marginBottom: '0.5rem' }}>Core Modules & Competencies:</p>
                    <ul style={{ paddingLeft: '1.2rem', margin: 0 }}>
                        {card.highlights.map((h, i) => (
                            <li key={i} style={{ marginBottom: '0.3rem' }}>{h}</li>
                        ))}
                    </ul>
                </div>
            )
        });
    };

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            {/* Ambient Room Lighting */}
            <ambientLight intensity={0.9} />
            <directionalLight position={[0, 10, 5]} intensity={0.6} />

            {/* Chamber Floor */}
            <mesh position={[0, -1.8, -10]} rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[26, 30]} />
                <meshBasicMaterial map={floorTexture} color="#fafafa" />
            </mesh>

            {/* Main Chamber Heading */}
            <Float speed={1.5} rotationIntensity={0.05} floatIntensity={0.2}>
                <group position={[0, 4.2, -8]}>
                    <Text
                        font={RUBIK_SCRIBBLE}
                        fontSize={0.85}
                        color="#ffffff"
                        outlineWidth={0.012}
                        outlineColor="#1a1a1a"
                        anchorX="center"
                        anchorY="middle"
                    >
                        EDUCATION & SYSTEMS
                    </Text>
                    <Text
                        font={CABIN_SKETCH}
                        fontSize={0.28}
                        color="#444444"
                        position={[0, -0.65, 0.05]}
                        anchorX="center"
                        anchorY="middle"
                    >
                        ABES Engineering College (2024 - 2028) • Shree Jain Vidyalaya, Kolkata (2012 - 2023)
                    </Text>
                </group>
            </Float>

            {/* 3 Interactive Floating Academic Pillar Cards */}
            {cards.map((card) => (
                <Float key={card.id} speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
                    <group
                        position={[card.x, card.y, card.z]}
                        onClick={(e) => {
                            e.stopPropagation();
                            handleCardClick(card);
                        }}
                        onPointerOver={(e) => {
                            e.stopPropagation();
                            document.body.style.cursor = 'pointer';
                        }}
                        onPointerOut={() => {
                            document.body.style.cursor = 'auto';
                        }}
                    >
                        {/* Parchment Card Backdrop */}
                        <mesh position={[0, 0, 0]}>
                            <planeGeometry args={[3.2, 3.8]} />
                            <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
                        </mesh>

                        {/* Hand-drawn Outline Border */}
                        <lineSegments>
                            <edgesGeometry args={[new THREE.PlaneGeometry(3.2, 3.8)]} />
                            <lineBasicMaterial color="#1a1a1a" linewidth={2} />
                        </lineSegments>

                        {/* Card Title */}
                        <Text
                            font={CABIN_SKETCH}
                            fontSize={0.34}
                            color="#1a1a1a"
                            position={[0, 1.35, 0.02]}
                            anchorX="center"
                            anchorY="middle"
                        >
                            {card.title}
                        </Text>

                        {/* Subtitle / Period */}
                        <Text
                            font={CABIN_REGULAR}
                            fontSize={0.18}
                            color="#666666"
                            position={[0, 0.98, 0.02]}
                            anchorX="center"
                            anchorY="middle"
                        >
                            {card.subtitle}
                        </Text>

                        {/* Institution Line */}
                        <Text
                            font={CABIN_SKETCH}
                            fontSize={0.20}
                            color="#222222"
                            position={[0, 0.55, 0.02]}
                            maxWidth={2.8}
                            textAlign="center"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {card.institution}
                        </Text>

                        {/* Description Summary */}
                        <Text
                            font={CABIN_REGULAR}
                            fontSize={0.15}
                            color="#444444"
                            position={[0, -0.2, 0.02]}
                            maxWidth={2.7}
                            textAlign="center"
                            anchorX="center"
                            anchorY="middle"
                        >
                            {card.desc}
                        </Text>

                        {/* Click to Inspect Pill */}
                        <group position={[0, -1.35, 0.02]}>
                            <mesh>
                                <planeGeometry args={[2.0, 0.42]} />
                                <meshBasicMaterial color="#1a1a1a" />
                            </mesh>
                            <Text
                                font={CABIN_SKETCH}
                                fontSize={0.16}
                                color="#ffffff"
                                position={[0, 0, 0.01]}
                                anchorX="center"
                                anchorY="middle"
                            >
                                CLICK TO INSPECT
                            </Text>
                        </group>
                    </group>
                </Float>
            ))}
        </group>
    );
};

export default EducationRoom;
