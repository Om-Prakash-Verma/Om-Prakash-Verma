import { useRef, useState, useMemo, useEffect, forwardRef, useImperativeHandle, memo } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { Text, useTexture, Float, PositionalAudio } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';
import { Observer } from 'gsap/all';
import { useScene } from '../../../../context/SceneContext';

gsap.registerPlugin(Observer);
import { useAchievements } from '../../../../context/AchievementsContext';
import PaperMaterial from './PaperMaterial';
import GalleryClouds from './GalleryClouds';
import { useAudio } from '../../../../context/AudioContext';
import { usePaintMaterial } from './usePaintMaterial';
import { useGalleryProjects } from '../../../../hooks/useSanityData';

// Reusable Vector3 to avoid allocations in useFrame
const _tempScale = new THREE.Vector3();

// ============================================
// ⚙️ AUDIO SETTINGS - TWEAK HERE
// Edytuj te wartości, aby zmienić głośność i zasięg słyszalności szumu miasta
// ============================================
export const AUDIO_SETTINGS = {
    volume: 0.6,
    distance: 2,
    rolloff: 1.5
};

export const GALLERY_INTERACTION_AUDIO_SETTINGS = {
    volume: 0.6,      // Volume for the paper clicking sound
    distance: 2,      // Reference distance for spatial audio before it starts dropping off
    rolloff: 2        // How fast the sound fades away (exponential)
};

// Define the unique projects and their textures
const FALLBACK_PROJECTS = [
    {
        id: 'monetune',
        title: 'MONETUNE',
        front: '/textures/gallery/monetuneprzod.webp',
        painted: '/textures/gallery/monetuneprzod_painted.webp',
        url: 'https://monetune.pl',
        description: 'MoneTune is a step-by-step blueprint that teaches beginners how to generate passive income using AI-created music. Without any musical skills, you will learn how to easily produce professional tracks, publish them on platforms like Spotify, and monetize your digital assets.',
        techStack: ['/textures/gallery/wordpresslogo.webp', '/textures/gallery/elementorlogo.webp', '/textures/gallery/phplogo.webp', '/textures/gallery/csslogo.webp']
    },
    {
        id: 'timber',
        title: 'TIMBERKITTY',
        front: '/textures/gallery/timberkittyprzod.webp',
        painted: '/textures/gallery/timberkittyprzod_painted.webp',
        url: 'https://timberkitty.netlify.app',
        description: 'TimberKitty is an addictive, free-to-play browser arcade game built in pure JavaScript. Players control a lumberjack cat to chop wood, save birds, complete daily missions, and compete on global leaderboards.',
        techStack: ['/textures/gallery/jslogo.webp', '/textures/gallery/htmllogo.webp', '/textures/gallery/csslogo.webp', '/textures/gallery/firebaselogo.webp']
    },
    {
        id: 'young',
        title: 'YOUNG MULTI',
        front: '/textures/gallery/youngmultiprzod.webp',
        painted: '/textures/gallery/youngmultiprzod_painted.webp',
        url: 'https://young-multi-strona.netlify.app',
        description: 'A sleek, modern concept website dedicated to the Polish rapper and creator Young Multi. It serves as a promotional landing page designed to highlight his personal brand, music, and online presence.',
        techStack: ['/textures/gallery/reactlogo.webp', '/textures/gallery/tailwindlogo.webp', '/textures/gallery/htmllogo.webp', '/textures/gallery/netlifylogo.webp']
    },
    {
        id: 'bio',
        title: 'BIO',
        front: '/textures/gallery/bioprzod.webp',
        painted: '/textures/gallery/bioprzod_painted.webp',
        url: 'https://tomkingbio.netlify.app',
        description: 'A fast, modern personal bio page serving as a central hub for my digital footprint. It showcases my latest coding projects, web development services, YouTube videos, and recommended music artists.',
        techStack: ['/textures/gallery/htmllogo.webp', '/textures/gallery/csslogo.webp', '/textures/gallery/jslogo.webp', '/textures/gallery/netlifylogo.webp']
    },
];

const PROJECT_COUNT = 12; // Keep the count for the infinite scroll feel
const GAP = 3.6;

// Zmień te wartości aby dopasować proporcje ptaka (legacy ratio 1.41)
const BIRD_WIDTH = 0.49;
const BIRD_HEIGHT = 0.35;

// Adjust this value (0.0 to 1.0) to crop the right side of the "Houses" graphic.
// 0.0 = No crop
// 0.2 = 20% crop from the right (corridor side)
const RIGHT_CROP_AMOUNT = 0.2;

const GalleryRoom = ({ showRoom, onReady, isExiting, isWarmup }) => {
    const { openOverlay, isTeleporting } = useScene();
    const { showTutorial, unlockAchievement, hidePopup } = useAchievements();
    const { globalVolume, isMuted } = useAudio();
    const effectiveVolume = isMuted ? 0 : AUDIO_SETTINGS.volume * globalVolume;

    const audioRef = useRef();
    useEffect(() => {
        if (audioRef.current && audioRef.current.setVolume) {
            audioRef.current.setVolume(effectiveVolume);
        }
    }, [effectiveVolume]);

    const groupRef = useRef();
    const [scrollOffset, setScrollOffset] = useState(0);
    const targetScroll = useRef(0);
    const currentScroll = useRef(0);
    const [selectedCard, setSelectedCard] = useState(null);
    const [globalIsAnimating, setGlobalIsAnimating] = useState(false);
    const cardRefs = useRef([]);

    useEffect(() => {
        if (isExiting || isTeleporting) {
            hidePopup();
        }
    }, [isExiting, isTeleporting, hidePopup]);

    // Setup Paint Transition
    const { onBeforeCompile, animatePaint, resetPaint, uniformsData, updateRoomOrigin } = usePaintMaterial();
    
    // Track transition state to disable interactions
    const [isTransitioning, setIsTransitioning] = useState(false);
    
    // Track if user teleported into this room 
    const wasTeleportedRef = useRef(false);
    useEffect(() => {
        if (isTeleporting) wasTeleportedRef.current = true;
    }, [isTeleporting]);

    useEffect(() => {
        // When the room officially shows up (doors open and user flies in)
        if (showRoom && !isWarmup) {
            if (wasTeleportedRef.current || isTeleporting) {
                // Skip the painting transition entirely if teleporting via map
                uniformsData.uPaintProgress.value = 1.0;
                setIsTransitioning(false);
            } else {
                setIsTransitioning(true);
                // resetPaint() in case we re-enter
                resetPaint();
                // Start the paint animation with a slight delay so it happens *during* fly-in
                animatePaint(0.2, 2.5);
                
                // Re-enable interactions once painting finishes
                setTimeout(() => {
                    setIsTransitioning(false);
                }, 2700); // 0.2 + 2.5
            }
        } else {
            // Immediately reveal for warmup or hide if not showing
            uniformsData.uPaintProgress.value = 1.0;
        }
    }, [showRoom, isWarmup, isTeleporting]);

    const handleCardClick = async (clickedIndex) => {
        if (globalIsAnimating || isTransitioning) return;

        // Unlock inspect achievement
        unlockAchievement('gallery_inspect');

        if (selectedCard === clickedIndex) {
            setGlobalIsAnimating(true);
            await cardRefs.current[clickedIndex].closeCard();
            setSelectedCard(null);
            setGlobalIsAnimating(false);
        } else if (selectedCard !== null) {
            setGlobalIsAnimating(true);
            await cardRefs.current[selectedCard].closeCard();
            setSelectedCard(null);
            await cardRefs.current[clickedIndex].openCard();
            setSelectedCard(clickedIndex);
            setGlobalIsAnimating(false);
        } else {
            setGlobalIsAnimating(true);
            await cardRefs.current[clickedIndex].openCard();
            setSelectedCard(clickedIndex);
            setGlobalIsAnimating(false);
        }
    };

    // Track if we've signaled ready
    const hasSignaledReady = useRef(false);
    const frameCount = useRef(0);
    const FRAMES_TO_WAIT = 5;

    useFrame(() => {
        // Update room origin each frame so the paint shader knows where.
        // This is cheap (one getWorldPosition) and critical for far chunks.
        updateRoomOrigin(groupRef);

        if (hasSignaledReady.current) return;
        frameCount.current++;
        if (frameCount.current >= FRAMES_TO_WAIT) {
            hasSignaledReady.current = true;
            onReady?.();

            // Wait for the DoorSection 1.5s camera fly-in to finish before showing tutorial
            setTimeout(() => {
                if (!isWarmup) showTutorial('gallery_inspect');
            }, 2000);
        }
    });

    // Config
    const BALCONY_WIDTH = 5;
    const BALCONY_DEPTH = 3;
    const RAILING_HEIGHT = 1.25; // Legacy ratio 20/(7 segments * 2.287)

    // --- TEXTURES AND RESPONSIVENESS ---
    // User requested: painted on desktop, regular on touch/phones (even if laptop has touch screen)
    // We use matchMedia('(hover: hover)') to detect devices with a cursor/hover capability
    const [canHover, setCanHover] = useState(() => typeof window !== 'undefined' ? window.matchMedia('(hover: hover)').matches : true);

    // Pobieranie danych z Sanity.io (fallback do starych danych)
    const sanityProjects = useGalleryProjects();
    const activeProjects = sanityProjects || FALLBACK_PROJECTS;

    useEffect(() => {
        const mq = window.matchMedia('(hover: hover)');
        const handleHoverChange = (e) => setCanHover(e.matches);
        mq.addEventListener('change', handleHoverChange);
        return () => mq.removeEventListener('change', handleHoverChange);
    }, []);

    // Load all project front textures in a flat array
    const textureUrls = activeProjects.map(p => p.front);
    const projectTextures = useTexture(textureUrls);

    // Load painted textures only on desktop, fallback to front if mobile/touch
    const paintedUrls = activeProjects.map(p => (canHover && p.painted) ? p.painted : p.front);
    const paintedTextures = useTexture(paintedUrls);

    // Load the universal back texture and the button texture conditionally
    const backTextureRaw = useTexture(canHover ? '/textures/gallery/tylkartki_painted.webp' : '/textures/gallery/tylkartki.webp');
    const overlayTextureRaw = useTexture(canHover ? '/textures/gallery/przyciskdotylukartki_painted.webp' : '/textures/gallery/przyciskdotylukartki.webp');

    // Preload tech stack logos to prevent stuttering on first flip
    // We use the same conditional logic: painted on desktop, regular on touch
    const allLogos = useMemo(() => {
        const names = [
            'csslogo', 'elementorlogo', 'firebaselogo', 'htmllogo',
            'jslogo', 'netlifylogo', 'phplogo', 'reactlogo',
            'tailwindlogo', 'wordpresslogo'
        ];
        return names.map(name => {
            if (!canHover) return `/textures/gallery/${name}.webp`;
            if (name === 'csslogo') return `/textures/gallery/css3logo_painted.webp`;
            return `/textures/gallery/${name}_painted.webp`;
        });
    }, [canHover]);
    
    useTexture(allLogos);

    // Construct the full list of projects (repeated) with textures attached
    const projects = useMemo(() => {
        return Array.from({ length: PROJECT_COUNT }).map((_, i) => {
            const projectIndex = i % activeProjects.length;
            const projectData = activeProjects[projectIndex];

            // Extract front texture
            const frontTex = projectTextures[projectIndex];
            const paintedTex = paintedTextures[projectIndex];

            // Configure textures
            if (frontTex) {
                frontTex.colorSpace = THREE.SRGBColorSpace;
                // frontTex.encoding = THREE.sRGBEncoding;
            }
            if (paintedTex) {
                paintedTex.colorSpace = THREE.SRGBColorSpace;
            }
            if (backTextureRaw) {
                backTextureRaw.colorSpace = THREE.SRGBColorSpace;
            }
            if (overlayTextureRaw) {
                overlayTextureRaw.colorSpace = THREE.SRGBColorSpace;
            }

            // Map tech stack logos to the correct version (painted or regular)
            const techStack = projectData.techStack.map(path => {
                if (!canHover) return path; // Keep regular
                const name = path.split('/').pop().replace('.webp', '');
                if (name === 'csslogo') return '/textures/gallery/css3logo_painted.webp';
                return `/textures/gallery/${name}_painted.webp`;
            });

            return {
                ...projectData,
                index: i,
                frontTexture: frontTex,
                paintedTexture: (paintedTex !== frontTex && canHover) ? paintedTex : null,
                backTexture: backTextureRaw,
                buttonTexture: overlayTextureRaw,
                techStack: techStack
            };
        });
    }, [projectTextures, backTextureRaw, overlayTextureRaw]);

    // Function to scroll to a specific project index
    const scrollToIndex = (index, onComplete) => {
        const totalWidth = PROJECT_COUNT * GAP;
        const targetScrollValue = index * GAP;
        const currentScrollValue = currentScroll.current;

        let diff = targetScrollValue - currentScrollValue;
        const halfWidth = totalWidth / 2;
        while (diff > halfWidth) diff -= totalWidth;
        while (diff < -halfWidth) diff += totalWidth;

        const finalTarget = currentScrollValue + diff;

        gsap.to(targetScroll, {
            current: finalTarget,
            duration: 0.5,
            ease: 'power2.inOut'
        });

        gsap.to(currentScroll, {
            current: finalTarget,
            duration: 0.5,
            ease: 'power2.inOut',
            onComplete: onComplete
        });
    };

    // --- INTERACTION ---
    const lastTouchX = useRef(0);
    useEffect(() => {
        // Observers enable us to normalize wheel, touch, and pointer events
        const scrollObserver = Observer.create({
            target: window,
            type: "wheel,touch,pointer",
            wheelSpeed: -1,
            onWheel: (e) => {
                if (!showRoom || selectedCard !== null || globalIsAnimating || isTransitioning) return;
                const orig = e.event;
                orig.preventDefault();
                targetScroll.current += orig.deltaY * 0.005;
            },
            onPress: (e) => {
                if (!showRoom || selectedCard !== null || globalIsAnimating || isTransitioning) return;
                const orig = e.event;
                if (orig.touches && orig.touches.length === 1) {
                    lastTouchX.current = orig.touches[0].clientX;
                }
            },
            onDrag: (e) => {
                if (!showRoom || selectedCard !== null || globalIsAnimating || isTransitioning) return;
                const orig = e.event;
                if (orig.touches && orig.touches.length === 1) {
                    const deltaX = lastTouchX.current - orig.touches[0].clientX;
                    lastTouchX.current = orig.touches[0].clientX;
                    targetScroll.current += deltaX * 0.008;
                }
            }
        });

        return () => scrollObserver.kill();
    }, [showRoom, selectedCard, globalIsAnimating]);

    useFrame((state, delta) => {
        currentScroll.current = THREE.MathUtils.lerp(currentScroll.current, targetScroll.current, delta * 5);
    });

    // --- GEOMETRY & MATERIALS ---
    const floorTexture = useTexture('/textures/gallery/floor.webp');
    const railingTexture = useTexture('/textures/gallery/railing.webp');
    const housesTexture = useTexture('/textures/gallery/domki.webp');
    const cityTexture = useTexture('/textures/gallery/miastotlo.webp');
    const birdTexture = useTexture('/textures/gallery/bird_gray.webp');
    const clothespinTexture = useTexture('/textures/gallery/klamerka.webp');

    useEffect(() => {
        if (floorTexture) {
            floorTexture.wrapS = THREE.MirroredRepeatWrapping;
            floorTexture.wrapT = THREE.MirroredRepeatWrapping;
            floorTexture.repeat.set(0.5, 0.5 * 1.835); // Adjust repeat to keep scale with legacy 1.835 ratio
            floorTexture.needsUpdate = true;
        }
        if (railingTexture) {
            railingTexture.wrapS = railingTexture.wrapT = THREE.RepeatWrapping;
            railingTexture.repeat.set(7, 1);
            railingTexture.needsUpdate = true;
        }
    }, [floorTexture, railingTexture]);

    const materials = useMemo(() => {
        const floorMat = new THREE.MeshBasicMaterial({
            map: floorTexture,
            color: '#e0e0e0',
            side: THREE.DoubleSide
        });
        floorMat.onBeforeCompile = onBeforeCompile;
        floorMat.transparent = true;
        floorMat.needsUpdate = true;
        
        const ropeMat = new THREE.MeshBasicMaterial({ color: '#666666' });
        ropeMat.onBeforeCompile = onBeforeCompile;
        ropeMat.transparent = true;
        ropeMat.needsUpdate = true;

        const thresholdMat = new THREE.MeshBasicMaterial({
            color: '#e0e0e0',
            map: (() => {
                const t = new THREE.TextureLoader().load('/textures/corridor/texturadoprogow.webp');
                t.colorSpace = THREE.SRGBColorSpace;
                t.wrapS = t.wrapT = THREE.RepeatWrapping;
                t.repeat.set(15 / 2.524, 1);
                return t;
            })(),
            side: THREE.DoubleSide
        });
        thresholdMat.onBeforeCompile = onBeforeCompile;
        thresholdMat.transparent = true;
        thresholdMat.needsUpdate = true;

        return {
            floor: floorMat,
            rope: ropeMat,
            threshold: thresholdMat
        };
    }, [floorTexture, onBeforeCompile]);

    const curve = useMemo(() => {
        return new THREE.CatmullRomCurve3([
            new THREE.Vector3(-16, 3.5, -6),
            new THREE.Vector3(-8, 2.5, -4.5),
            new THREE.Vector3(0, 1.8, -3),
            new THREE.Vector3(8, 2.5, -4.5),
            new THREE.Vector3(16, 3.5, -6),
        ]);
    }, []);

    const ropeGeometry = useMemo(() => {
        return new THREE.TubeGeometry(curve, 64, 0.015, 8, false);
    }, [curve]);

    const floorShape = useMemo(() => {
        const shape = new THREE.Shape();
        shape.moveTo(-1.1, -2.0);
        shape.lineTo(1.1, -2.0);
        shape.lineTo(7.5, 4);
        shape.lineTo(-7.5, 4);
        shape.lineTo(-1.1, -2.0);
        return shape;
    }, []);

    return (
        <group ref={groupRef}>
            {!isWarmup && (
                <PositionalAudio
                    ref={audioRef}
                    url="/sounds/szummiasta.mp3"
                    distanceModel="exponential"
                    refDistance={AUDIO_SETTINGS.distance}
                    rolloffFactor={AUDIO_SETTINGS.rolloff}
                    loop
                    autoplay
                    volume={effectiveVolume}
                />
            )}
            <group position={[0, -0.7, -2]}>
                {/* Floor */}
                <mesh
                    rotation={[-Math.PI / 2, 0, 0]}
                    position={[0, 0, 0]}
                >
                    <shapeGeometry args={[floorShape]} />
                    <primitive object={materials.floor} />
                </mesh>

                {/* Floor Outline */}
                <line rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
                    <bufferGeometry>
                        <float32BufferAttribute
                            attach="attributes-position"
                            count={2}
                            array={new Float32Array([7.5, 4, 0, -7.5, 4, 0])}
                            itemSize={3}
                        />
                    </bufferGeometry>
                    <lineBasicMaterial color="#999999" onBeforeCompile={onBeforeCompile} transparent={true} needsUpdate={true} />
                </line>

                {/* Railing */}
                <mesh position={[0, RAILING_HEIGHT / 2, -3.9]}>
                    <planeGeometry args={[20, RAILING_HEIGHT]} />
                    <meshBasicMaterial color="#e0e0e0"
                        map={railingTexture}
                        transparent={true}
                        side={THREE.DoubleSide}
                        alphaTest={0.1}
                        onBeforeCompile={onBeforeCompile}
                        customProgramCacheKey={() => 'railing-paint'}
                    />
                </mesh>

                {/* === THRESHOLD (At the end of the floor) === */}
                <mesh
                    position={[0, 0.01, -3.9]}
                    rotation={[-Math.PI / 2, 0, 0]}
                >
                    <planeGeometry args={[15, 0.15]} />
                    <primitive object={materials.threshold} />
                </mesh>

                {/* === OPTION A: 3D ARCHITECTURAL SHOWCASE CARDS === */}
                <group position={[0, 0.4, -4]}>
                    {/* Project Cards */}
                    {projects.map((project, i) => (
                        <ProjectCard
                            key={project.id || i}
                            index={i}
                            ref={el => cardRefs.current[i] = el}
                            project={project}
                            total={PROJECT_COUNT}
                            currentScroll={currentScroll}
                            isSelected={selectedCard === i}
                            scrollToIndex={scrollToIndex}
                            onClick={handleCardClick}
                            isMobile={!canHover}
                        />
                    ))}
                </group>

                {/* === SCENERY LAYERS === */}
                {/* Houses - center */}
                <mesh position={[0, -1, -9]} scale={[1, 1, 1]}>
                    <planeGeometry args={[15, 15 / 2.357]} />
                    <meshBasicMaterial color="#e0e0e0"
                        map={housesTexture}
                        transparent={true}
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                        onBeforeCompile={onBeforeCompile}
                    />
                </mesh>
                {/* Houses - left side (mirrored) */}
                <mesh position={[-15, -1, -9]} scale={[-1, 1, 1]}>
                    <planeGeometry args={[15, 15 / 2.357]} />
                    <meshBasicMaterial color="#e0e0e0"
                        map={housesTexture}
                        transparent={true}
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                        onBeforeCompile={onBeforeCompile}
                    />
                </mesh>
                {/* Houses - right side (mirrored) - CROPPED */}
                <RightSideHouses
                    texture={housesTexture}
                    baseWidth={15}
                    baseHeight={15 / 2.357}
                    cropAmount={RIGHT_CROP_AMOUNT}
                />

                {/* City skyline - center */}
                <mesh position={[0, 3.4, -17]} scale={[1, 1, 1]}>
                    <planeGeometry args={[30, 30 / 2.357]} />
                    <meshBasicMaterial color="#e0e0e0"
                        map={cityTexture}
                        transparent={true}
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                        onBeforeCompile={onBeforeCompile}
                    />
                </mesh>
                {/* City skyline - left (mirrored) */}
                <mesh position={[-30, 3.4, -17]} scale={[-1, 1, 1]}>
                    <planeGeometry args={[30, 30 / 2.357]} />
                    <meshBasicMaterial color="#e0e0e0"
                        map={cityTexture}
                        transparent={true}
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                        onBeforeCompile={onBeforeCompile}
                    />
                </mesh>
                {/* City skyline - right (mirrored) */}
                <mesh position={[30, 3.4, -17]} scale={[-1, 1, 1]}>
                    <planeGeometry args={[30, 30 / 2.357]} />
                    <meshBasicMaterial color="#e0e0e0"
                        map={cityTexture}
                        transparent={true}
                        alphaTest={0.1}
                        side={THREE.DoubleSide}
                        onBeforeCompile={onBeforeCompile}
                    />
                </mesh>

                {/* Flying Bird */}
                <FlyingBird texture={birdTexture} />

                {/* Clouds scattered above */}
                <GalleryClouds count={65} seed={123} />

                {/* Skybox/Environment */}
                <mesh position={[0, 5, -20]}>
                    <sphereGeometry args={[40, 32, 32]} />
                    <meshBasicMaterial color="#f0f0f0" side={THREE.BackSide} transparent opacity={0.5} onBeforeCompile={onBeforeCompile} />
                </mesh>
            </group>
        </group>
    );
};

// Flying bird animation component
const FlyingBird = ({ texture }) => {
    const birdRef = useRef();
    const startX = -25;
    const endX = 25;
    const speed = 2.5; // Zmniejszona prędkość lotu

    // Zmienne do fizyki skoków
    const velocityY = useRef(0);
    const gravity = -12.0; // Zmniejszona grawitacja dla większej płynności
    const jumpStrength = 5.5; // Delikatniejszy skok
    const jumpInterval = useRef(0);

    useFrame((state, delta) => {
        if (!birdRef.current) return;

        // Zabezpieczenie przed zbyt dużym powiększeniem delty (przy lagach)
        const safeDelta = Math.min(delta, 0.05);

        // Ruch w poziomie
        birdRef.current.position.x += speed * safeDelta;

        if (birdRef.current.position.x > endX) {
            birdRef.current.position.x = startX;
            birdRef.current.position.y = 4.5;
            velocityY.current = 0;
            jumpInterval.current = 0;
            birdRef.current.rotation.z = 0;
        }

        // Fizyka spadania
        velocityY.current += gravity * safeDelta;
        birdRef.current.position.y += velocityY.current * safeDelta;

        // Skakanie (płynniejsze i przewidywalne)
        jumpInterval.current -= safeDelta;

        // Skok następuje po upływie czasu przewidzianego do następnego kliknięcia
        if (jumpInterval.current <= 0 || birdRef.current.position.y < 3.2) {
            velocityY.current = jumpStrength;
            // Rzadsze, bardziej rytmiczne skoki (np. co pełną sekundę)
            jumpInterval.current = 0.9 + Math.random() * 0.3;
        }

        // Ograniczenie dolne podłogi
        if (birdRef.current.position.y < 3.0) {
            birdRef.current.position.y = 3.0;
            velocityY.current = jumpStrength;
        }

        // Ograniczenie górne sufitu
        if (birdRef.current.position.y > 6.5) {
            birdRef.current.position.y = 6.5;
            velocityY.current = 0;
        }

        // Rotacja ptaka
        // W Flappy Bird ptak delikatnie opada dziobem w dół gdy spada, i kieruje wzrok do góry gdy skacze
        const targetRotationZ = THREE.MathUtils.clamp(velocityY.current * 0.05, -Math.PI / 6, Math.PI / 8);

        // Bardzo płynne obracanie (lerp)
        birdRef.current.rotation.z = THREE.MathUtils.lerp(birdRef.current.rotation.z, targetRotationZ, safeDelta * 8);
    });

    return (
        <mesh ref={birdRef} position={[startX, 4.5, -10]} scale={[BIRD_WIDTH, BIRD_HEIGHT, 1]}>
            <planeGeometry args={[1.5, 1.5]} />
            <meshBasicMaterial color="#e0e0e0"
                map={texture}
                transparent={true}
                alphaTest={0.1}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};


// ============================================
// 🏛️ OPTION A: 3D ARCHITECTURAL SHOWCASE CARD
// Bespoke hand-drawn sketch cards with real project metrics,
// auto-fitting title typography, and direct modal inspection.
// ============================================
const CABIN_SKETCH = '/fonts/CabinSketch-Bold.ttf';
const CABIN_REGULAR = '/fonts/CabinSketch-Regular.ttf';

const ProjectCard = memo(forwardRef(({ index, project, currentScroll, total, isSelected, scrollToIndex, onClick, isMobile }, ref) => {
    const cardGroupRef = useRef();
    const paperAudioRef = useRef();
    const { openOverlay } = useScene();
    const { globalVolume, isMuted } = useAudio();
    const [hovered, setHovered] = useState(false);

    const playPaperSound = () => {
        if (paperAudioRef.current) {
            const vol = isMuted ? 0 : GALLERY_INTERACTION_AUDIO_SETTINGS.volume * globalVolume;
            paperAudioRef.current.setVolume(vol);
            if (paperAudioRef.current.isPlaying) paperAudioRef.current.stop();
            paperAudioRef.current.play();
        }
    };

    useImperativeHandle(ref, () => ({
        openCard: () => {
            playPaperSound();
            openOverlay({
                title: project.title,
                date: project.category || 'FEATURED ARCHITECTURE',
                description: `${project.tagline || project.description} Metric: ${project.metric || 'Engineered for high scale'}. Highlight: ${project.highlight || 'Production-grade architecture'}.`,
                url: project.url || project.githubUrl || 'https://github.com/Om-Prakash-Verma',
                platformConfig: {
                    label: `PROJECT #${String(index + 1).padStart(2, '0')}`
                }
            });
            return Promise.resolve();
        },
        closeCard: () => Promise.resolve()
    }));

    // Dynamic title sizing: prevents ANY title from overflowing or wrapping awkwardly
    const titleLength = project.title ? project.title.length : 10;
    const titleFontSize = titleLength > 16 ? 0.17 : titleLength > 12 ? 0.20 : 0.25;

    // Carousel position along horizontal rail
    useFrame((state) => {
        if (!cardGroupRef.current) return;
        const targetX = (index - currentScroll.current) * GAP;
        cardGroupRef.current.position.x = THREE.MathUtils.lerp(cardGroupRef.current.position.x, targetX, 0.15);

        // Subtle floating breath on active / centered card
        const distFromCenter = Math.abs(cardGroupRef.current.position.x);
        const isNearCenter = distFromCenter < 1.8;
        const breath = Math.sin(state.clock.elapsedTime * 1.5 + index * 0.4) * 0.02;

        cardGroupRef.current.position.y = (isNearCenter ? 0.1 : 0) + breath;
        cardGroupRef.current.position.z = isNearCenter ? -3.4 : -3.8;

        const targetScale = isNearCenter ? 1.05 : 0.95;
        cardGroupRef.current.scale.lerp(_tempScale.set(targetScale, targetScale, 1), 0.1);
    });

    const handleInspect = (e) => {
        e.stopPropagation();
        playPaperSound();
        onClick?.(index);
        openOverlay({
            title: project.title,
            date: project.category || 'FEATURED ARCHITECTURE',
            description: `${project.tagline || project.description} Metric: ${project.metric || 'Engineered for high scale'}. Highlight: ${project.highlight || 'Production-grade architecture'}.`,
            url: project.url || project.githubUrl || 'https://github.com/Om-Prakash-Verma',
            platformConfig: {
                label: `PROJECT #${String(index + 1).padStart(2, '0')}`
            }
        });
    };

    const handleOpenLink = (e) => {
        e.stopPropagation();
        const dest = project.url || project.githubUrl || 'https://github.com/Om-Prakash-Verma';
        window.open(dest, '_blank');
    };

    return (
        <group
            ref={cardGroupRef}
            position={[(index - currentScroll.current) * GAP, 0, -3.6]}
            onClick={handleInspect}
            onPointerOver={(e) => {
                e.stopPropagation();
                setHovered(true);
                document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
                setHovered(false);
                document.body.style.cursor = 'auto';
            }}
        >
            {/* Card Drop Shadow */}
            <mesh position={[0.08, -0.08, -0.01]}>
                <planeGeometry args={[3.2, 4.3]} />
                <meshBasicMaterial color="#d4d4d4" transparent opacity={0.6} side={THREE.DoubleSide} />
            </mesh>

            {/* Main Parchment Plaque */}
            <mesh position={[0, 0, 0]}>
                <planeGeometry args={[3.2, 4.3]} />
                <meshBasicMaterial color="#ffffff" side={THREE.DoubleSide} />
            </mesh>

            {/* Hand-drawn Outline Border */}
            <lineSegments>
                <edgesGeometry args={[new THREE.PlaneGeometry(3.2, 4.3)]} />
                <lineBasicMaterial color={hovered ? '#000000' : '#1a1a1a'} linewidth={hovered ? 2.5 : 1.5} />
            </lineSegments>

            {/* Top Category & Index Pill */}
            <group position={[0, 1.82, 0.02]}>
                <mesh>
                    <planeGeometry args={[2.8, 0.32]} />
                    <meshBasicMaterial color="#f4f4f4" />
                </mesh>
                <lineSegments>
                    <edgesGeometry args={[new THREE.PlaneGeometry(2.8, 0.32)]} />
                    <lineBasicMaterial color="#333333" linewidth={1} />
                </lineSegments>
                <Text
                    font={CABIN_SKETCH}
                    fontSize={0.14}
                    color="#444444"
                    position={[0, 0, 0.01]}
                    anchorX="center"
                    anchorY="middle"
                    letterSpacing={0.05}
                >
                    {`#${String(index + 1).padStart(2, '0')} • ${project.category || 'SYSTEMS ARCHITECTURE'}`}
                </Text>
            </group>

            {/* Project Title (Auto-fitted so it NEVER clips) */}
            <Text
                font={CABIN_SKETCH}
                fontSize={titleFontSize}
                color="#1a1a1a"
                position={[0, 1.38, 0.02]}
                anchorX="center"
                anchorY="middle"
                maxWidth={2.9}
                textAlign="center"
                letterSpacing={0.03}
            >
                {project.title}
            </Text>

            {/* Architectural Blueprint Viewport Frame */}
            <group position={[0, 0.42, 0.02]}>
                {/* Blueprint background grid */}
                <mesh>
                    <planeGeometry args={[2.8, 1.4]} />
                    <meshBasicMaterial color="#fafafa" />
                </mesh>
                <lineSegments>
                    <edgesGeometry args={[new THREE.PlaneGeometry(2.8, 1.4)]} />
                    <lineBasicMaterial color="#1a1a1a" linewidth={1.5} />
                </lineSegments>

                {/* Blueprint Prompt & Metric */}
                <Text
                    font={CABIN_SKETCH}
                    fontSize={0.14}
                    color="#666666"
                    position={[-1.25, 0.48, 0.01]}
                    anchorX="left"
                    anchorY="middle"
                >
                    &gt; ARCHITECTURE SCHEMATIC
                </Text>

                {/* Inscribed Metric Tag */}
                <group position={[0, 0.05, 0.01]}>
                    <mesh>
                        <planeGeometry args={[2.5, 0.45]} />
                        <meshBasicMaterial color="#f0fdf4" />
                    </mesh>
                    <lineSegments>
                        <edgesGeometry args={[new THREE.PlaneGeometry(2.5, 0.45)]} />
                        <lineBasicMaterial color="#16a34a" linewidth={1.2} />
                    </lineSegments>
                    <Text
                        font={CABIN_SKETCH}
                        fontSize={0.15}
                        color="#15803d"
                        position={[0, 0, 0.01]}
                        maxWidth={2.35}
                        textAlign="center"
                        anchorX="center"
                        anchorY="middle"
                    >
                        {project.metric || 'High-Throughput Distributed Pipeline'}
                    </Text>
                </group>

                {/* Subtitle / Highlight */}
                <Text
                    font={CABIN_REGULAR}
                    fontSize={0.12}
                    color="#555555"
                    position={[0, -0.45, 0.01]}
                    maxWidth={2.6}
                    textAlign="center"
                    anchorX="center"
                    anchorY="middle"
                >
                    {project.highlight || 'Zero-latency edge routing & robust verification'}
                </Text>
            </group>

            {/* Project Tagline Description */}
            <Text
                font={CABIN_REGULAR}
                fontSize={0.13}
                color="#333333"
                position={[0, -0.65, 0.02]}
                maxWidth={2.8}
                textAlign="center"
                anchorX="center"
                anchorY="middle"
                lineHeight={1.3}
            >
                {project.tagline || project.description}
            </Text>

            {/* Bottom Action Bar: Open URL & Inspect Case Study */}
            <group position={[0, -1.62, 0.02]}>
                {/* Click to Inspect Pill */}
                <group
                    position={[-0.7, 0, 0]}
                    onClick={handleInspect}
                >
                    <mesh>
                        <planeGeometry args={[1.3, 0.42]} />
                        <meshBasicMaterial color="#1a1a1a" />
                    </mesh>
                    <Text
                        font={CABIN_SKETCH}
                        fontSize={0.14}
                        color="#ffffff"
                        position={[0, 0, 0.01]}
                        anchorX="center"
                        anchorY="middle"
                    >
                        CASE STUDY ℹ
                    </Text>
                </group>

                {/* Direct Link Button */}
                <group
                    position={[0.7, 0, 0]}
                    onClick={handleOpenLink}
                >
                    <mesh>
                        <planeGeometry args={[1.3, 0.42]} />
                        <meshBasicMaterial color="#f4f4f4" />
                    </mesh>
                    <lineSegments>
                        <edgesGeometry args={[new THREE.PlaneGeometry(1.3, 0.42)]} />
                        <lineBasicMaterial color="#1a1a1a" linewidth={1.5} />
                    </lineSegments>
                    <Text
                        font={CABIN_SKETCH}
                        fontSize={0.14}
                        color="#1a1a1a"
                        position={[0, 0, 0.01]}
                        anchorX="center"
                        anchorY="middle"
                    >
                        OPEN LINK ↗
                    </Text>
                </group>
            </group>

            {/* Positional Audio */}
            <PositionalAudio
                ref={paperAudioRef}
                url="/sounds/papersound.mp3"
                distanceModel="exponential"
                rolloffFactor={GALLERY_INTERACTION_AUDIO_SETTINGS.rolloff}
                refDistance={GALLERY_INTERACTION_AUDIO_SETTINGS.distance}
                loop={false}
            />
        </group>
    );
}));
ProjectCard.displayName = 'ArchitecturalProjectCard';


const RightSideHouses = ({ texture, baseWidth, baseHeight, cropAmount }) => {
    // Clone texture to allow independent UV manipulation
    const croppedTexture = useMemo(() => {
        const t = texture.clone();
        // Because scale.x is -1 (mirrored), the "Right" side in world space
        // corresponds to the "Left" side of the texture (U=0).
        // To crop the world-right side, we need to crop the texture-left side.
        // So we increase offset.x.
        t.offset.x = cropAmount;
        t.repeat.x = 1 - cropAmount;
        t.needsUpdate = true;
        return t;
    }, [texture, cropAmount]);

    // Calculate new width and position
    const newWidth = baseWidth * (1 - cropAmount);

    // Original Inner Edge (World Left of this mesh) was at CenterX - Width/2
    // For the Right Side Mesh: 
    // Original Pos = 15. Width = 15.
    // Inner Edge = 15 - 7.5 = 7.5.
    // We want to keep Inner Edge at 7.5.
    // New Center = Inner Edge + NewWidth / 2
    const newX = 7.5 + (newWidth / 2);

    return (
        <mesh position={[newX, -1, -9]} scale={[-1, 1, 1]}>
            <planeGeometry args={[newWidth, baseHeight]} />
            <meshBasicMaterial color="#e0e0e0"
                map={croppedTexture}
                transparent={true}
                alphaTest={0.1}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

// Sub-component for individual tech stack logos
const TechStackLogo = ({ path, position }) => {
    const texture = useTexture(path);

    return (
        <mesh position={position}>
            <planeGeometry args={[0.17, 0.17]} />
            <meshBasicMaterial color="#ffffff"
                map={texture}
                transparent={true}
            />
        </mesh>
    );
};

export default GalleryRoom;
