/**
 * ============================================================================
 * OM PRAKASH VERMA — MASTER PORTFOLIO DATA
 * 100% Offline-First, Local & Hardcoded Data
 * ============================================================================
 */

export const GLOBAL_INFO = {
    name: "Om Prakash Verma",
    profession: "Software Developer | Full-Stack Engineer | Frontend Developer",
    siteTitle: "Om Prakash Verma | Software Developer & Systems Engineer",
    siteDescription: "Interactive 3D spatial portfolio of Om Prakash Verma — Software Developer, Full-Stack Engineer, and Builder.",
    slogan: "An engineer by curiosity, a developer by passion, and a builder by nature.",
    aboutMe: "I am a Computer Science Engineering student and software developer from India who enjoys turning ideas into functional, meaningful digital experiences. I believe in learning by building. Rather than simply using tools and frameworks, I enjoy understanding the engineering principles behind them.",
    corePhilosophy: "I don't see development as simply writing code. I see it as a process of understanding problems, designing solutions, making thoughtful engineering decisions, and continuously refining the result.",
    pillars: [
        { title: "Curiosity", desc: "Always exploring and questioning how things work beneath the surface." },
        { title: "Engineering", desc: "Understanding runtime mechanics, compilers, and system internals." },
        { title: "Experimentation", desc: "Learning rapidly by prototyping, stress-testing, and building." },
        { title: "Simplicity", desc: "Solving complex problems with elegant, clean, and robust architecture." },
        { title: "Creativity", desc: "Combining rigorous engineering with thoughtful, tactile design." },
        { title: "Continuous Growth", desc: "Sharpening technical depth through every project and constraint." }
    ],
    beyondCoding: "Creative technology, visual experiences, UI/UX design, 3D environments, interactive storytelling, fitness, photography, and entrepreneurship.",
    location: "India",
    education: "B.Tech in Computer Science & Engineering (2022 - 2026)",
    institution: "ABES Engineering College",
    affiliation: "Dr. A.P.J. Abdul Kalam Technical University (AKTU), India",
    email: "omprakash.verma.dev@gmail.com",
    githubUrl: "https://github.com/Om-Prakash-Verma",
    linkedinUrl: "https://www.linkedin.com/in/om-prakash-verma-9a6741270/",
    skills: {
        languages: ["TypeScript", "JavaScript (ESNext)", "Python", "Kotlin", "HTML5", "CSS3", "C/C++", "SQL"],
        frontend: ["React 19", "Next.js 15", "Astro", "Angular", "Vite", "Tailwind CSS (v4)", "Three.js / WebGL", "GSAP", "Framer Motion"],
        mobile: ["Android (Kotlin Native, Jetpack Compose, Room SQLite, WorkManager)"],
        backend: ["Node.js", "Express", "Cloudflare Workers & Pages Functions", "Hono v4", "RESTful APIs", "Server Actions"],
        databases: ["Cloudflare D1 (Serverless SQLite)", "Firebase Firestore", "IndexedDB (Dexie.js)", "PostgreSQL", "Room DB"],
        ai: ["Google Gemini API (Gemini 3 Pro, 2.5 Flash)", "Vector Embeddings (Gemini Embedding 2)", "In-Memory Cosine Engines"],
        tooling: ["Git", "Webpack", "Puppeteer", "Docker", "Web Audio API", "Web Crypto API", "Chrome Extensions API (MV3)"]
    }
};

export const GALLERY_PROJECTS = [
    {
        id: 'git-forensics',
        title: 'GIT FORENSICS',
        category: 'AI & Systems Architecture',
        tagline: 'Enterprise-Grade AI Time-Travel Debugger & Architectural Audit Console',
        metric: '32k Thinking Budget // D3.js Force Graphs',
        front: '/textures/gallery/monetuneprzod.webp',
        painted: '/textures/gallery/monetuneprzod_painted.webp',
        url: 'https://git-forensics.vercel.app',
        githubUrl: 'https://github.com/Om-Prakash-Verma/GIT-FORENSICS',
        description: 'Visualizes git repository histories as interactive timelines, quantifies code volatility, and maps structural dependency blast radiuses using a dual-pass AI reasoning pipeline with 32k thinking budget.',
        techStack: [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/jslogo.webp',
            '/textures/gallery/tailwindlogo.webp'
        ],
        highlight: 'O(log2 N) Binary Git Bisect + 32k AI Thinking Engine'
    },
    {
        id: 'aetherschedule',
        title: 'AETHERSCHEDULE',
        category: 'AI Operations & Algorithms',
        tagline: 'AI Academic Operations Platform & Digital Twin Constraint Simulator',
        metric: 'NP-Complete Hybrid Solver // Zero Conflict Matrix',
        front: '/textures/gallery/timberkittyprzod.webp',
        painted: '/textures/gallery/timberkittyprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma',
        githubUrl: 'https://github.com/Om-Prakash-Verma',
        description: 'Solves the NP-complete University Course Timetabling Problem (UCTP) using hybrid LLM cognitive heuristics combined with deterministic TypeScript conflict-repair matrices.',
        techStack: [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/jslogo.webp',
            '/textures/gallery/firebaselogo.webp'
        ],
        highlight: 'Guaranteed 0-Conflict Allocation via Hybrid Reasoning'
    },
    {
        id: 'pixsort',
        title: 'PIXSORT',
        category: 'AI Intelligence & Vector Search',
        tagline: 'Personal Photo Intelligence with Multimodal Vector Search & Pooled Cloud Storage',
        metric: '~3ms In-Memory Cosine Ranker // $0 Cloud Query Cost',
        front: '/textures/gallery/youngmultiprzod.webp',
        painted: '/textures/gallery/youngmultiprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma/PixSort',
        githubUrl: 'https://github.com/Om-Prakash-Verma/PixSort',
        description: 'Institutional Capstone Project enabling natural language conversational photo retrieval using 3072-D Gemini embeddings and decentralized multi-account Google Drive storage pooling.',
        techStack: [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/jslogo.webp',
            '/textures/gallery/htmllogo.webp'
        ],
        highlight: '~3ms In-Memory Cosine Ranker in RAM ($0 Cloud Cost)'
    },
    {
        id: 'railsure',
        title: 'RAILSURE 🚆',
        category: 'Edge Infrastructure & Reverse Engineering',
        tagline: 'Real-Time Indian Railways Chart Vacancy & Visual Seat Map Explorer',
        metric: '~15ms Edge Cache // 6,563 Pre-Indexed Trains',
        front: '/textures/gallery/bioprzod.webp',
        painted: '/textures/gallery/bioprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma',
        githubUrl: 'https://github.com/Om-Prakash-Verma',
        description: 'High-speed train chart vacancy engine built with Astro SSR on Cloudflare Pages, reverse-engineered IRCTC endpoints, and an edge proxy kept alive via Cloudflare Cron Triggers.',
        techStack: [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/netlifylogo.webp',
            '/textures/gallery/jslogo.webp'
        ],
        highlight: '15ms Edge Cache across 6,563 Pre-Indexed Trains'
    },
    {
        id: 'ghostpocket',
        title: 'GHOSTPOCKET 👻',
        category: 'Mobile & Edge Sync',
        tagline: 'Minimal Spooky Student Expense Tracker & Bilateral Debt Ledger',
        metric: 'Atomic 2-Way Sync // Integer Paise Precision',
        front: '/textures/gallery/monetuneprzod.webp',
        painted: '/textures/gallery/monetuneprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma',
        githubUrl: 'https://github.com/Om-Prakash-Verma',
        description: 'Native Android application built with Jetpack Compose, Room SQLite (64-bit integer paise precision), and a Cloudflare D1 serverless edge backend with reactive mascot moods.',
        techStack: [
            '/textures/gallery/jslogo.webp',
            '/textures/gallery/htmllogo.webp'
        ],
        highlight: 'Atomic Single-Roundtrip Dirty-Record Sync'
    },
    {
        id: 'k9-snipers',
        title: 'K9 SNIPERS 🐕',
        category: 'Edge Security & E-Commerce',
        tagline: 'Offline-First E-Commerce & Pet Shipping Logistics Platform',
        metric: 'RS256 Web Crypto // SWR Local Cache with LRU Eviction',
        front: '/textures/gallery/timberkittyprzod.webp',
        painted: '/textures/gallery/timberkittyprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma',
        githubUrl: 'https://github.com/Om-Prakash-Verma',
        description: 'High-performance e-commerce platform with an offline-first SWR IndexedDB synchronization engine, RS256 Web Crypto JWT auth, and anti-tampering server price re-auditing.',
        techStack: [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/jslogo.webp',
            '/textures/gallery/tailwindlogo.webp'
        ],
        highlight: 'RS256 Web Crypto on Edge Workers + Zero Price Tampering'
    },
    {
        id: 'abes-portal',
        title: 'ABES STUDENT PORTAL 🎓',
        category: 'PWA & Creative UI',
        tagline: 'Tactile Claymorphic PWA with 3D Login Companion & Edge Proxy',
        metric: '<90 KB Gzipped Bundle // Sub-second Edge Load',
        front: '/textures/gallery/youngmultiprzod.webp',
        painted: '/textures/gallery/youngmultiprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma',
        githubUrl: 'https://github.com/Om-Prakash-Verma',
        description: 'Tactile claymorphic student management portal with 3D interactive companion, sub-second edge routing, and offline service worker caching.',
        techStack: [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/tailwindlogo.webp'
        ],
        highlight: '<90 KB Gzipped Bundle with 3D Canvas'
    },
    {
        id: 'seoforge',
        title: 'SEOFORGE 🔍',
        category: 'Edge Crawlers & Automation',
        tagline: 'Technical SEO Audit Suite & Programmatic SEO Platform',
        metric: '100/100 Lighthouse // 2,200+ Programmatic Routes',
        front: '/textures/gallery/bioprzod.webp',
        painted: '/textures/gallery/bioprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma',
        githubUrl: 'https://github.com/Om-Prakash-Verma',
        description: 'Automated technical SEO crawler and audit platform with headless browser rendering, PDF report generation, and programmatic route synthesis.',
        techStack: [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/jslogo.webp'
        ],
        highlight: '100/100 Lighthouse on 2,200+ Synthetic Routes'
    },
    {
        id: 'ordercraft',
        title: 'ORDERCRAFT 🏭',
        category: 'Industrial Manufacturing & Local Systems',
        tagline: 'Industrial Manufacturing Order Management System (OMS)',
        metric: 'Zero-Backend IndexedDB // Multi-Tier BOM Explosion',
        front: '/textures/gallery/monetuneprzod.webp',
        painted: '/textures/gallery/monetuneprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma',
        githubUrl: 'https://github.com/Om-Prakash-Verma',
        description: 'Air-gapped industrial manufacturing order management system with client-side Bill of Materials (BOM) explosion and relational IndexedDB storage.',
        techStack: [
            '/textures/gallery/jslogo.webp',
            '/textures/gallery/tailwindlogo.webp'
        ],
        highlight: 'Recursive Multi-Tier BOM Hierarchy in Browser RAM'
    },
    {
        id: 'snapgallery',
        title: 'SNAPGALLERY 🖼️',
        category: 'Browser Extensions',
        tagline: 'High-Performance Chrome Extension Media Scraper & Downloader',
        metric: 'Manifest V3 // Debounced DOM Mutation Observer',
        front: '/textures/gallery/timberkittyprzod.webp',
        painted: '/textures/gallery/timberkittyprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma',
        githubUrl: 'https://github.com/Om-Prakash-Verma',
        description: 'Manifest V3 Chrome extension for high-performance batch media extraction, shadow DOM deep traversal, and asynchronous streaming downloads.',
        techStack: [
            '/textures/gallery/jslogo.webp',
            '/textures/gallery/htmllogo.webp'
        ],
        highlight: 'MV3 Compliant with Deep Shadow-DOM Traversal'
    },
    {
        id: 'crockeryhub',
        title: 'CROCKERYHUB 🍽️',
        category: 'Full-Stack Enterprise CMS',
        tagline: 'Enterprise Catalog & Real-Time Content Management System',
        metric: 'Next.js 15 Server Actions // Runtime Zod Schema Extension',
        front: '/textures/gallery/youngmultiprzod.webp',
        painted: '/textures/gallery/youngmultiprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma',
        githubUrl: 'https://github.com/Om-Prakash-Verma',
        description: 'High-throughput wholesale enterprise catalog with real-time inventory synchronization, dynamic Zod validation, and Next.js 15 Server Actions.',
        techStack: [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/firebaselogo.webp'
        ],
        highlight: 'Next.js 15 Streaming Server Actions & Zod Contracts'
    },
    {
        id: 'abtalks',
        title: 'ABTALKS 60-DAY 💻',
        category: 'Community & Synthesizer',
        tagline: 'Daily Proof-of-Work Engineering Streak Platform',
        metric: '14,200+ Students // Web Audio API Pink Noise Synthesizer',
        front: '/textures/gallery/bioprzod.webp',
        painted: '/textures/gallery/bioprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma',
        githubUrl: 'https://github.com/Om-Prakash-Verma',
        description: 'Engineering streak tracking platform for 14,200+ students, featuring interactive progress heatmaps and procedural Web Audio API binaural beats.',
        techStack: [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/tailwindlogo.webp'
        ],
        highlight: 'Real-time Web Audio API Binaural Engine'
    }
];

export const AWARDS_DATA = {
    featured: {
        id: 'award-featured',
        layout: 'certificate_grid',
        title: 'Featured Works & Open Source',
        items: [
            { label: 'Git Forensics — AI Forensic Debugger', date: '2026', image: '/textures/about/FEATURED.webp', url: 'https://github.com/Om-Prakash-Verma/GIT-FORENSICS' },
            { label: 'PixSort — Institutional Capstone of Excellence', date: '2025', image: '/textures/about/FEATURED.webp', url: 'https://github.com/Om-Prakash-Verma/PixSort' },
            { label: 'RailSure — 15ms IRCTC Edge Caching Engine', date: '2025', image: '/textures/about/FEATURED.webp', url: 'https://github.com/Om-Prakash-Verma' },
            { label: 'AetherSchedule — NP-Complete Solver', date: '2025', image: '/textures/about/FEATURED.webp', url: 'https://github.com/Om-Prakash-Verma' },
        ],
        platformConfig: {
            color: '#1a1a1a',
            accentColor: '#333',
            icon: '⭐',
            label: 'FEATURED'
        }
    },
    sotd: {
        id: 'award-sotd',
        layout: 'certificate_grid',
        title: 'Engineering Honors & Accolades',
        items: [
            { label: 'Git Forensics — AI Architecture & 32k Thinking', date: 'February 2026', image: '/textures/about/SOTDAYYOUNGMULTIGSAP.webp', url: 'https://github.com/Om-Prakash-Verma/GIT-FORENSICS' },
            { label: 'AetherSchedule — Algorithmic Constraint Repair', date: 'January 2026', image: '/textures/about/SOTDAYYOUNGMULTICSSWINNER.webp', url: 'https://github.com/Om-Prakash-Verma' },
            { label: 'PixSort — 3072-D Vector Search in RAM', date: 'December 2025', image: '/textures/about/SOTDAYYOUNGMULTIORPETRON.webp', url: 'https://github.com/Om-Prakash-Verma/PixSort' },
            { label: 'GhostPocket — Atomic D1 Distributed Ledger', date: 'October 2025', image: '/textures/about/SOTDAYYOUNGMULTIDESIGNNOMINESS.webp', url: 'https://github.com/Om-Prakash-Verma' }
        ],
        platformConfig: {
            color: '#1a1a1a',
            accentColor: '#333',
            icon: '🏆',
            label: 'ARCHITECTURE'
        }
    },
    sotm: {
        id: 'award-sotm',
        layout: 'certificate_grid',
        title: 'Systems & Edge Innovations',
        items: [
            { label: 'K9 Snipers — RS256 Web Crypto on Edge Workers', date: 'November 2025', image: '/textures/about/SOTMCODROPS.webp', url: 'https://github.com/Om-Prakash-Verma' },
            { label: 'ABES Portal — <90KB Gzipped Claymorphic PWA', date: 'September 2025', image: '/textures/about/SOTMCODROPS.webp', url: 'https://github.com/Om-Prakash-Verma' },
            { label: 'SEOFoRGE — 2,200+ Route Synthetic Engine', date: 'August 2025', image: '/textures/about/SOTMCODROPS.webp', url: 'https://github.com/Om-Prakash-Verma' }
        ],
        platformConfig: {
            color: '#1a1a1a',
            accentColor: '#333',
            icon: '📅',
            label: 'INNOVATION'
        }
    },
    other: {
        id: 'award-other',
        layout: 'certificate_grid',
        title: 'Education & Credentials',
        items: [
            { label: 'B.Tech CSE — ABES Engineering College (AKTU)', date: '2022 - 2026', image: '/textures/about/SOTYCODROPS.webp', url: 'https://github.com/Om-Prakash-Verma' },
            { label: 'Core Engineering: Compilers, Distributed Systems & Algorithmic Design', date: '2022 - 2026', image: '/textures/about/SOTYCODROPS.webp', url: 'https://github.com/Om-Prakash-Verma' },
            { label: 'Cloudflare Edge Infrastructure & Serverless Architectures', date: '2024 - 2026', image: '/textures/about/SOTYCODROPS.webp', url: 'https://github.com/Om-Prakash-Verma' }
        ],
        platformConfig: {
            color: '#1a1a1a',
            accentColor: '#333',
            icon: '👑',
            label: 'CREDENTIALS'
        }
    }
};

export const JOURNEY_MILESTONES = [
    {
        year: "2022 - 2026",
        label: "B.Tech CSE",
        title: "Computer Science Engineering",
        institution: "ABES Engineering College (AKTU)",
        detail: "Deep dive into Data Structures, Algorithms, Operating Systems, Compilers, and Distributed Systems. Built 15+ production-grade systems."
    },
    {
        year: "2023 - 2024",
        label: "FULL STACK",
        title: "Full-Stack & Systems Deep Dive",
        institution: "Independent & Open-Source",
        detail: "Engineered real-time reactive applications, mastered TypeScript, React 19, Vite, Node, and cloud serverless edge architecture."
    },
    {
        year: "2024 - 2025",
        label: "AI & EDGE",
        title: "Algorithmic & AI Systems Engineering",
        institution: "Production Deployments",
        detail: "Built Git Forensics (32k thinking), AetherSchedule (NP-complete hybrid timetabler), and RailSure (15ms IRCTC edge cache)."
    },
    {
        year: "2025 - NOW",
        label: "BUILDER",
        title: "Creative Tech & High-Scale Systems",
        institution: "Future Horizons",
        detail: "Building tactile, game-like 3D web experiences, robust edge platforms, and algorithmic solutions to real-world problems."
    }
];

export const FAQ_LIST = [
    {
        question: "Who is Om Prakash Verma?",
        answer: "Om Prakash Verma is a Software Developer and Systems Engineer from India specializing in full-stack architecture, 3D web experiences, and algorithmic AI reasoning systems."
    },
    {
        question: "What are Om Prakash's primary technologies?",
        answer: "TypeScript, React 19, Three.js / WebGL, GSAP, Next.js 15, Node.js, Cloudflare Workers/D1, Kotlin, Room SQLite, and Google Gemini API reasoning loops."
    },
    {
        question: "What is Om Prakash Verma's development philosophy?",
        answer: "An engineer by curiosity, a developer by passion, and a builder by nature. I believe in learning by building and understanding how systems operate beneath the interface."
    },
    {
        question: "How can I contact or hire Om Prakash Verma?",
        answer: "You can reach out directly via email at omprakash.verma.dev@gmail.com, on LinkedIn at https://www.linkedin.com/in/om-prakash-verma-9a6741270/, or review open-source code on GitHub at https://github.com/Om-Prakash-Verma."
    }
];
