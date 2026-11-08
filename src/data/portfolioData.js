/**
 * Portfolio Data — 100% Local & Hardcoded
 * 
 * Edit your projects, biography, skills, and links directly here.
 * No external database or CMS required.
 */

export const GLOBAL_INFO = {
    name: "Om Prakash Verma",
    siteTitle: "Om Prakash Verma | Creative Developer & Systems Engineer",
    siteDescription: "Interactive 3D spatial portfolio of Om Prakash Verma — Software Developer, Systems Architect, and Builder.",
    aboutMe: "Software Developer & Full-Stack Engineer curious about how systems work beneath the runtime. I build compilers, AI reasoning pipelines, distributed edge architectures, and tactile 3D web experiences.",
    location: "India",
    education: "B.Tech in Computer Science & Engineering (ABES Engineering College)",
    email: "omprakash.verma.dev@gmail.com",
    githubUrl: "https://github.com/Om-Prakash-Verma",
    linkedinUrl: "https://www.linkedin.com/in/om-prakash-verma-9a6741270/",
};

export const GALLERY_PROJECTS = [
    {
        id: 'git-forensics',
        title: 'GIT FORENSICS',
        tagline: 'AI Time-Travel Debugger & Dependency Blast Radius Graph',
        front: '/textures/gallery/monetuneprzod.webp',
        painted: '/textures/gallery/monetuneprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma/GIT-FORENSICS',
        description: 'Visualizes git histories as interactive timelines, quantifies code volatility, and maps structural dependency blast radiuses using a dual-pass AI reasoning pipeline with 32k thinking budget.',
        techStack: [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/jslogo.webp',
            '/textures/gallery/tailwindlogo.webp'
        ]
    },
    {
        id: 'aetherschedule',
        title: 'AETHERSCHEDULE',
        tagline: 'NP-Complete University Course Timetable Constraint Solver',
        front: '/textures/gallery/timberkittyprzod.webp',
        painted: '/textures/gallery/timberkittyprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma',
        description: 'Solves the NP-complete Course Timetabling Problem (UCTP) using hybrid LLM cognitive heuristics combined with deterministic TypeScript conflict-repair matrices.',
        techStack: [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/jslogo.webp',
            '/textures/gallery/firebaselogo.webp'
        ]
    },
    {
        id: 'pixsort',
        title: 'PIXSORT',
        tagline: '3072-D Multimodal Vector Photo Intelligence & Pooled Storage',
        front: '/textures/gallery/youngmultiprzod.webp',
        painted: '/textures/gallery/youngmultiprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma/PixSort',
        description: 'Institutional Capstone Project enabling conversational photo search using 3072-D Gemini embeddings and decentralized multi-account Google Drive storage pooling with ~3ms in-memory cosine ranking.',
        techStack: [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/jslogo.webp',
            '/textures/gallery/htmllogo.webp'
        ]
    },
    {
        id: 'railsure',
        title: 'RAILSURE 🚆',
        tagline: 'Real-Time Chart Vacancy & Visual Coach Seat Map',
        front: '/textures/gallery/bioprzod.webp',
        painted: '/textures/gallery/bioprzod_painted.webp',
        url: 'https://github.com/Om-Prakash-Verma',
        description: 'High-speed train vacancy engine built with Astro SSR on Cloudflare Pages, reverse-engineered IRCTC endpoints, and an edge proxy achieving 15ms cache response times.',
        techStack: [
            '/textures/gallery/reactlogo.webp',
            '/textures/gallery/netlifylogo.webp',
            '/textures/gallery/jslogo.webp'
        ]
    }
];

export const AWARDS_DATA = {
    featured: {
        id: 'award-featured',
        layout: 'certificate_grid',
        title: 'Featured Works & Honors',
        items: [
            { label: 'Featured - GitHub Open Source', date: 'May 2025', image: '/textures/about/FEATURED.webp', url: 'https://github.com/Om-Prakash-Verma' },
            { label: 'Capstone Project of Excellence', date: 'June 2025', image: '/textures/about/FEATURED.webp', url: 'https://github.com/Om-Prakash-Verma' },
            { label: 'Hackathon Finalist & Top Builder', date: 'July 2025', image: '/textures/about/FEATURED.webp', url: 'https://github.com/Om-Prakash-Verma' },
        ],
        platformConfig: {
            color: '#1a1a1a',
            accentColor: '#333',
            icon: '⭐',
            label: 'HONORS'
        }
    },
    sotd: {
        id: 'award-sotd',
        layout: 'certificate_grid',
        title: 'Architecture & System Honors',
        items: [
            { label: 'Git Forensics - AI Architecture Award', date: 'February 13, 2026', image: '/textures/about/SOTDAYYOUNGMULTIGSAP.webp', url: 'https://github.com/Om-Prakash-Verma/GIT-FORENSICS' },
            { label: 'AetherSchedule - Algorithmic Excellence', date: 'January 24, 2026', image: '/textures/about/SOTDAYYOUNGMULTICSSWINNER.webp', url: 'https://github.com/Om-Prakash-Verma' },
            { label: 'PixSort - Multimodal Systems Design', date: 'January 29, 2026', image: '/textures/about/SOTDAYYOUNGMULTIORPETRON.webp', url: 'https://github.com/Om-Prakash-Verma/PixSort' },
            { label: 'RailSure - High Scale Edge Caching', date: 'February 17, 2026', image: '/textures/about/SOTDAYYOUNGMULTIDESIGNNOMINESS.webp', url: 'https://github.com/Om-Prakash-Verma' }
        ],
        platformConfig: {
            color: '#1a1a1a',
            accentColor: '#333',
            icon: '🏆',
            label: 'ACHIEVEMENT'
        }
    },
    sotm: {
        id: 'award-sotm',
        layout: 'certificate_grid',
        title: 'Technical Innovations',
        items: [
            { label: 'GhostPocket - Serverless D1 Distributed Sync', date: 'October 2025', image: '/textures/about/SOTMCODROPS.webp', url: 'https://github.com/Om-Prakash-Verma' },
            { label: 'K9 Snipers - SWR Edge Engine & RS256 Auth', date: 'November 2025', image: '/textures/about/SOTMCODROPS.webp', url: 'https://github.com/Om-Prakash-Verma' }
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
        title: 'Certificates & Credentials',
        items: [
            { label: 'B.Tech CSE — ABES Engineering College', date: '2022 - 2026', image: '/textures/about/SOTYCODROPS.webp', url: 'https://github.com/Om-Prakash-Verma' },
            { label: 'Advanced Full Stack & Systems Architecture', date: '2024', image: '/textures/about/SOTYCODROPS.webp', url: 'https://github.com/Om-Prakash-Verma' },
            { label: 'Distributed Systems & Cloudflare Edge Computing', date: '2025', image: '/textures/about/SOTYCODROPS.webp', url: 'https://github.com/Om-Prakash-Verma' }
        ],
        platformConfig: {
            color: '#1a1a1a',
            accentColor: '#333',
            icon: '👑',
            label: 'CREDENTIALS'
        }
    }
};

export const FAQ_LIST = [
    {
        question: "Who is Om Prakash Verma?",
        answer: "Om Prakash Verma is a Software Developer and Systems Engineer specialized in full-stack architecture, 3D web experiences, and algorithmic AI engineering."
    },
    {
        question: "What are Om Prakash's primary technologies?",
        answer: "React, Three.js / WebGL, TypeScript, Node.js, Cloudflare Workers/D1, GSAP, and AI Reasoning pipelines (Gemini API)."
    },
    {
        question: "How can I contact Om Prakash Verma?",
        answer: "You can reach out directly via email at omprakash.verma.dev@gmail.com or on LinkedIn at https://www.linkedin.com/in/om-prakash-verma-9a6741270/."
    }
];
