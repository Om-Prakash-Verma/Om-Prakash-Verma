import { useRef, useEffect, useMemo, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, Float, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { useScene } from '../../../../context/SceneContext';
import { GLOBAL_INFO } from '../../../../data/portfolioData';

const RUBIK_SCRIBBLE = '/fonts/RubikScribble-Regular.ttf';
const CABIN_SKETCH = '/fonts/CabinSketch-Bold.ttf';
const CABIN_REGULAR = '/fonts/CabinSketch-Regular.ttf';

const TOTAL_AVATAR_FRAMES = 9;
const AVATAR_FRAME_PATHS = Array.from(
    { length: TOTAL_AVATAR_FRAMES },
    (_, i) => `/textures/corridor/avatar_anim/${i + 1}.webp`
);

/**
 * EducationSpotlightCharacter Component
 * 
 * Hand-drawn signature character that stands and waves inside the spotlight:
 * - Appears on LEFT when School card is opened (spotlight on left)
 * - Appears on RIGHT when College card is opened (spotlight on right)
 * - Features animated ping-pong sketch frames, soft floor shadow, floor light ring,
 *   and thematic academic icons (cap/books + sparkles)
 */
const EducationSpotlightCharacter = ({ activeCardId }) => {
    const characterGroupRef = useRef();
    const meshRef = useRef();
    const currentScale = useRef(0);
    const currentX = useRef(activeCardId === 'degree' ? 2.6 : -2.6);
    const currentFrame = useRef(0);
    const isReversing = useRef(false);
    const frameTimer = useRef(0);

    // Load animated sketch frames
    const avatarTextures = useTexture(AVATAR_FRAME_PATHS);

    useEffect(() => {
        avatarTextures.forEach(tex => {
            tex.colorSpace = THREE.SRGBColorSpace;
        });

        if (meshRef.current && avatarTextures[currentFrame.current]) {
            meshRef.current.material.map = avatarTextures[currentFrame.current];
            meshRef.current.material.needsUpdate = true;
        }
    }, [avatarTextures]);

    const isVisible = Boolean(activeCardId === 'schooling' || activeCardId === 'degree');
    const targetX = activeCardId === 'degree' ? 2.6 : -2.6;
    const targetScale = isVisible ? 1 : 0;
    const isCollege = activeCardId === 'degree';

    useFrame((state, delta) => {
        if (!characterGroupRef.current) return;

        // Smoothly lerp scale and position
        currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.1);
        currentX.current = THREE.MathUtils.lerp(currentX.current, targetX, 0.12);

        characterGroupRef.current.scale.setScalar(currentScale.current);
        characterGroupRef.current.position.x = currentX.current;
        // Positioned prominently in the upper-center of the circular spotlight with a gentle float
        characterGroupRef.current.position.y = 0.52 + Math.sin(state.clock.elapsedTime * 2.2) * 0.06;
        characterGroupRef.current.position.z = -8.0;

        // Subtle orientation glance toward screen center
        const targetRotY = activeCardId === 'degree' ? -0.12 : 0.12;
        characterGroupRef.current.rotation.y = THREE.MathUtils.lerp(
            characterGroupRef.current.rotation.y,
            targetRotY,
            0.1
        );

        characterGroupRef.current.visible = currentScale.current > 0.01;

        // Frame-by-frame ping-pong sketch animation
        if (isVisible && meshRef.current) {
            const FPS = 18;
            const frameDuration = 1 / FPS;
            frameTimer.current += delta;

            if (frameTimer.current >= frameDuration) {
                frameTimer.current = 0;

                if (currentFrame.current >= TOTAL_AVATAR_FRAMES - 1) {
                    isReversing.current = true;
                } else if (currentFrame.current <= 0) {
                    isReversing.current = false;
                }

                currentFrame.current += isReversing.current ? -1 : 1;
                const safeIndex = Math.max(0, Math.min(TOTAL_AVATAR_FRAMES - 1, currentFrame.current));

                meshRef.current.material.map = avatarTextures[safeIndex];
                meshRef.current.material.needsUpdate = true;
            }
        }
    });

    return (
        <group ref={characterGroupRef} position={[targetX, 0.52, -8.0]}>
            {/* Ground Contact Shadow on the floor */}
            <mesh position={[0, -2.28, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <circleGeometry args={[1.05, 32]} />
                <meshBasicMaterial color="#1a1a1a" transparent opacity={0.24} depthWrite={false} />
            </mesh>

            {/* Subtle Floor Spotlight Glow Ring */}
            <mesh position={[0, -2.29, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.4, 2.3, 32]} />
                <meshBasicMaterial color="#ffffff" transparent opacity={0.14} depthWrite={false} />
            </mesh>

            {/* Hero-sized Hand-drawn Character Billboard - filling the spotlight center */}
            <mesh ref={meshRef} position={[0, 0, 0]}>
                <planeGeometry args={[4.8, 4.8]} />
                <meshBasicMaterial
                    transparent={true}
                    side={THREE.DoubleSide}
                    depthWrite={false}
                />
            </mesh>

            {/* Subtle Hand-Drawn Sketch Sparkles around spotlight periphery */}
            <Text font={CABIN_SKETCH} fontSize={0.34} color="#eab308" position={[-2.1, 1.5, 0.05]}>★</Text>
            <Text font={CABIN_SKETCH} fontSize={0.26} color="#eab308" position={[2.1, 1.7, 0.05]}>★</Text>
            <Text font={CABIN_SKETCH} fontSize={0.22} color="#eab308" position={[-1.9, -1.0, 0.05]}>★</Text>
            <Text font={CABIN_SKETCH} fontSize={0.28} color="#eab308" position={[1.95, -0.8, 0.05]}>★</Text>
        </group>
    );
};

/**
 * EducationRoom Component
 * 
 * Interactive 3D chamber showcasing academic foundation and engineering credentials:
 * - Degree: B.Tech Computer Science & Engineering (2024 - 2028)
 * - College: ABES Engineering College (AKTU)
 * - Schooling: Shree Jain Vidyalaya, Kolkata (2012 - 2023, Class 12)
 * - Dynamic spotlight avatar presentation matching opened modal card side
 */
const EducationRoom = ({ showRoom, onReady, isExiting }) => {
    const { openOverlay, overlayContent } = useScene();
    const groupRef = useRef();
    const hasSignaledReady = useRef(false);

    const activeCardId = overlayContent?.cardId;

    // Floor texture
    const floorTexture = useTexture('/textures/corridor/kawalekpodlogi.webp');

    useEffect(() => {
        if (!hasSignaledReady.current) {
            hasSignaledReady.current = true;
            onReady?.();
        }
    }, [onReady]);

    // Academic cards data - 2 primary pillars: B.Tech Degree & Schooling with grades & key pillars
    const cards = useMemo(() => [
        {
            id: 'degree',
            icon: '🎓',
            title: 'B.TECH CSE',
            subtitle: '2024 - 2028',
            institution: 'ABES Engineering College',
            affiliation: 'AKTU (Dr. A.P.J. Abdul Kalam Technical University)',
            tagline: 'Computer Science & Engineering',
            badge: '★ CURRENT CGPA: 6.43',
            scoreDetail: 'Current CGPA: 6.43 / 10.0',
            desc: '4-year engineering curriculum specializing in core computer science, software architecture, algorithms, and distributed computing.',
            x: -2.6,
            y: 0.45,
            z: -8.0,
            accent: '#2563eb',
            badgeBg: '#eff6ff',
            bulletPoints: [
                '• Data Structures & Algorithms',
                '• Operating Systems & Low-Level Design',
                '• Database Management & Distributed Systems',
                '• Computer Networks & Web Architectures'
            ]
        },
        {
            id: 'schooling',
            icon: '📚',
            title: 'SCHOOLING',
            subtitle: '2012 - 2023',
            institution: 'Shree Jain Vidyalaya, Kolkata',
            affiliation: 'Secondary & Higher Secondary (Class 10 & 12)',
            tagline: 'Academic Rigor & Foundation',
            badge: '★ 10th: 76.5% • 12th: 68.4%',
            scoreDetail: 'Class 10 (Secondary): 76.5% | Class 12 (Higher Secondary): 68.4%',
            desc: 'Foundational schooling culminating in Higher Secondary Class 12 with a strong mathematical and scientific problem-solving focus.',
            x: 2.6,
            y: 0.45,
            z: -8.0,
            accent: '#059669',
            badgeBg: '#ecfdf5',
            bulletPoints: [
                '• Class 10 (Secondary): 76.5%',
                '• Class 12 (Higher Secondary): 68.4%',
                '• PCM Science & Mathematics Stream',
                '• Analytical Problem Solving & Logic'
            ]
        }
    ], []);

    const handleCardClick = (card) => {
        const isCollege = card.id === 'degree';
        openOverlay({
            cardId: card.id,
            cardPosition: isCollege ? 'left' : 'right',
            spotlightPosition: isCollege ? 'right' : 'left',
            title: `${card.title} — ${card.institution}`,
            date: card.badge,
            description: card.desc,
            details: [
                { label: 'Institution', value: card.institution },
                { label: 'Affiliation', value: card.affiliation },
                { label: 'Performance', value: card.scoreDetail }
            ],
            bulletPoints: card.bulletPoints,
            url: 'https://github.com/Om-Prakash-Verma',
            platformConfig: {
                label: 'ACADEMIC RECORD'
            }
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
                        EDUCATION
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

            {/* Interactive 3D Academic Cards with smooth hide when character is in spotlight */}
            {cards.map((card) => (
                <AcademicCardItem
                    key={card.id}
                    card={card}
                    activeCardId={activeCardId}
                    onCardClick={handleCardClick}
                />
            ))}

            {/* The Spotlight Character appearing dynamically inside the spotlight beam */}
            <EducationSpotlightCharacter activeCardId={activeCardId} />
        </group>
    );
};

/**
 * AcademicCardItem Component
 * 
 * Individual 3D card item with smooth scale transition when the character replaces it in the spotlight
 */
const AcademicCardItem = ({ card, activeCardId, onCardClick }) => {
    const cardGroupRef = useRef();
    const currentScale = useRef(1);

    // Hide card when character takes its place in the spotlight:
    // - When schooling card is open, character occupies left (-2.6), so degree card hides.
    // - When degree card is open, character occupies right (2.6), so schooling card hides.
    const isReplacedByCharacter = (activeCardId === 'schooling' && card.id === 'degree') ||
                                 (activeCardId === 'degree' && card.id === 'schooling');
    const targetScale = isReplacedByCharacter ? 0 : 1;

    useFrame(() => {
        if (!cardGroupRef.current) return;
        currentScale.current = THREE.MathUtils.lerp(currentScale.current, targetScale, 0.1);
        cardGroupRef.current.scale.setScalar(currentScale.current);
        cardGroupRef.current.visible = currentScale.current > 0.01;
    });

    return (
        <Float speed={2} rotationIntensity={0.1} floatIntensity={0.3}>
            <group
                ref={cardGroupRef}
                position={[card.x, card.y, card.z]}
                onClick={(e) => {
                    e.stopPropagation();
                    onCardClick(card);
                }}
                onPointerOver={(e) => {
                    e.stopPropagation();
                    document.body.style.cursor = 'pointer';
                }}
                onPointerOut={() => {
                    document.body.style.cursor = 'auto';
                }}
            >
                {/* Drop shadow plane */}
                <mesh position={[0.07, -0.07, -0.01]}>
                    <planeGeometry args={[3.4, 4.4]} />
                    <meshBasicMaterial color="#d4d4d4" transparent opacity={0.6} side={THREE.DoubleSide} />
                </mesh>

                {/* Parchment Card Backdrop */}
                <mesh position={[0, 0, 0]}>
                    <planeGeometry args={[3.4, 4.4]} />
                    <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
                </mesh>

                {/* Hand-drawn Outline Border */}
                <lineSegments>
                    <edgesGeometry args={[new THREE.PlaneGeometry(3.4, 4.4)]} />
                    <lineBasicMaterial color="#1a1a1a" linewidth={2} />
                </lineSegments>

                {/* Card Icon & Title */}
                <Text
                    font={CABIN_SKETCH}
                    fontSize={0.34}
                    color="#1a1a1a"
                    position={[0, 1.62, 0.02]}
                    anchorX="center"
                    anchorY="middle"
                >
                    {`${card.icon} ${card.title}`}
                </Text>

                {/* Subtitle / Period */}
                <Text
                    font={CABIN_REGULAR}
                    fontSize={0.17}
                    color="#666666"
                    position={[0, 1.25, 0.02]}
                    anchorX="center"
                    anchorY="middle"
                >
                    {card.subtitle}
                </Text>

                {/* Institution Line */}
                <Text
                    font={CABIN_SKETCH}
                    fontSize={0.21}
                    color="#222222"
                    position={[0, 0.88, 0.02]}
                    maxWidth={3.0}
                    textAlign="center"
                    anchorX="center"
                    anchorY="middle"
                >
                    {card.institution}
                </Text>

                {/* Tactile Score / Grade Badge */}
                <group position={[0, 0.42, 0.02]}>
                    <mesh>
                        <planeGeometry args={[2.7, 0.38]} />
                        <meshBasicMaterial color={card.badgeBg} />
                    </mesh>
                    <lineSegments>
                        <edgesGeometry args={[new THREE.PlaneGeometry(2.7, 0.38)]} />
                        <lineBasicMaterial color={card.accent} linewidth={2} />
                    </lineSegments>
                    <Text
                        font={CABIN_SKETCH}
                        fontSize={0.18}
                        color={card.accent}
                        position={[0, 0, 0.01]}
                        anchorX="center"
                        anchorY="middle"
                    >
                        {card.badge}
                    </Text>
                </group>

                {/* Bullet Highlights */}
                <group position={[0, -0.42, 0.02]}>
                    {card.bulletPoints.map((bullet, idx) => (
                        <Text
                            key={idx}
                            font={CABIN_REGULAR}
                            fontSize={0.15}
                            color="#333333"
                            position={[-1.35, 0.38 - idx * 0.28, 0]}
                            maxWidth={2.8}
                            textAlign="left"
                            anchorX="left"
                            anchorY="middle"
                        >
                            {bullet}
                        </Text>
                    ))}
                </group>

                {/* Click to Inspect Pill */}
                <group position={[0, -1.68, 0.02]}>
                    <mesh>
                        <planeGeometry args={[2.2, 0.44]} />
                        <meshBasicMaterial color="#1a1a1a" />
                    </mesh>
                    <Text
                        font={CABIN_SKETCH}
                        fontSize={0.17}
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
    );
};

export default EducationRoom;
