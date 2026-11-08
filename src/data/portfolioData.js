export const portfolioData = {
  profile: {
    name: "Om Prakash Verma",
    title: "Software Developer & Full-Stack Engineer",
    tagline: "An engineer by curiosity, a developer by passion, and a builder by nature.",
    education: "B.Tech in Computer Science & Engineering",
    institution: "ABES Engineering College (AKTU), India",
    location: "India",
    email: "omprakash.verma.dev@gmail.com",
    github: "https://github.com/Om-Prakash-Verma",
    linkedin: "https://www.linkedin.com/in/om-prakash-verma-9a6741270/",
    philosophy: "I don't just use tools and frameworks—I build things to understand how they work beneath the interface. Curiosity drives my engineering.",
  },

  // Projects shown in "THE GALLERY" (Balcony with clothesline)
  galleryProjects: [
    {
      id: "git-forensics",
      title: "GIT FORENSICS",
      tagline: "AI Time-Travel Debugger & Dependency Blast Radius Graph",
      description: "Visualizes git histories as interactive timelines, quantifies code volatility, and maps structural dependency blast radiuses using a dual-pass AI reasoning pipeline with 32k thinking budget.",
      techStack: [
        { name: "React 19", color: "#61dafb" },
        { name: "TypeScript", color: "#3178c6" },
        { name: "D3.js", color: "#f9a03f" },
        { name: "Gemini Pro", color: "#8e75ff" },
        { name: "Tailwind", color: "#38bdf8" }
      ],
      githubUrl: "https://github.com/Om-Prakash-Verma/GIT-FORENSICS",
      liveUrl: "https://git-forensics.vercel.app",
      highlight: "O(log2 N) Binary Git Bisect + 32k AI Thinking Engine"
    },
    {
      id: "aetherschedule",
      title: "AETHERSCHEDULE",
      tagline: "NP-Complete University Course Timetable Constraint Solver",
      description: "Solves the NP-complete Course Timetabling Problem (UCTP) using hybrid LLM cognitive heuristics combined with deterministic TypeScript conflict-repair matrices.",
      techStack: [
        { name: "React 18", color: "#61dafb" },
        { name: "TypeScript", color: "#3178c6" },
        { name: "Firestore", color: "#ffca28" },
        { name: "Gemini API", color: "#8e75ff" },
        { name: "Recharts", color: "#22c55e" }
      ],
      githubUrl: "https://github.com/Om-Prakash-Verma",
      liveUrl: "#",
      highlight: "Guaranteed 0-Conflict Allocation via Hybrid Reasoning"
    },
    {
      id: "pixsort",
      title: "PIXSORT",
      tagline: "3072-D Multimodal Vector Photo Intelligence & Pooled Storage",
      description: "Institutional Capstone Project enabling conversational photo search using 3072-D Gemini embeddings and decentralized multi-account Google Drive storage pooling.",
      techStack: [
        { name: "React 19", color: "#61dafb" },
        { name: "TypeScript", color: "#3178c6" },
        { name: "Vector Search", color: "#ec4899" },
        { name: "Google Drive API", color: "#34a853" },
        { name: "Firestore", color: "#ffca28" }
      ],
      githubUrl: "https://github.com/Om-Prakash-Verma/PixSort",
      liveUrl: "#",
      highlight: "~3ms In-Memory Cosine Ranker in RAM ($0 Cloud Cost)"
    },
    {
      id: "railsure",
      title: "RAILSURE 🚆",
      tagline: "Indian Railways Real-Time Chart Vacancy & Visual Coach Seat Map",
      description: "High-speed train vacancy engine built with Astro SSR on Cloudflare Pages, reverse-engineered IRCTC endpoints, and an edge proxy kept alive via Cloudflare Cron.",
      techStack: [
        { name: "Astro", color: "#ff5d01" },
        { name: "React", color: "#61dafb" },
        { name: "Cloudflare Pages", color: "#f38020" },
        { name: "Node.js", color: "#68a063" },
        { name: "Cron Triggers", color: "#a855f7" }
      ],
      githubUrl: "https://github.com/Om-Prakash-Verma",
      liveUrl: "#",
      highlight: "15ms Edge Cache across 6,563 Pre-Indexed Trains"
    },
    {
      id: "ghostpocket",
      title: "GHOSTPOCKET 👻",
      tagline: "Native Android Expense Tracker & Bilateral Debt Ledger",
      description: "Native Android app built with Jetpack Compose, Room SQLite (64-bit integer paise precision), and a Cloudflare D1 serverless edge backend with reactive mascot moods.",
      techStack: [
        { name: "Kotlin", color: "#7f52ff" },
        { name: "Jetpack Compose", color: "#4285f4" },
        { name: "Room SQLite", color: "#009688" },
        { name: "Cloudflare D1", color: "#f38020" },
        { name: "Hono v4", color: "#e11d48" }
      ],
      githubUrl: "https://github.com/Om-Prakash-Verma",
      liveUrl: "#",
      highlight: "Atomic Single-Roundtrip Dirty-Record Sync"
    },
    {
      id: "k9-snipers",
      title: "K9 SNIPERS 🐕",
      tagline: "Offline-First Logistics & SWR IndexedDB E-Commerce Engine",
      description: "High-performance logistics e-commerce platform with client-side SWR IndexedDB cache, Web Crypto RS256 JWT auth, and anti-tampering server price re-auditing.",
      techStack: [
        { name: "React 19", color: "#61dafb" },
        { name: "TypeScript", color: "#3178c6" },
        { name: "IndexedDB", color: "#0284c7" },
        { name: "Web Crypto", color: "#eab308" },
        { name: "Razorpay", color: "#0c2340" }
      ],
      githubUrl: "https://github.com/Om-Prakash-Verma",
      liveUrl: "#",
      highlight: "RS256 Web Crypto on Edge Workers + Zero Price Tampering"
    }
  ],

  // Experiments & Systems shown in "THE STUDIO" (Floating retro screens)
  studioScreens: [
    {
      id: "screen-1",
      title: "Compilers & Systems",
      subtitle: "Beneath the Runtime",
      date: "2024 - 2026",
      desc: "Exploring bytecode, memory allocations, lexical analysis, AST transformation, and writing minimal interpreted engines to understand computing architectures from the ground up.",
      badge: "SYSTEMS",
      link: "https://github.com/Om-Prakash-Verma"
    },
    {
      id: "screen-2",
      title: "AI Reasoning & Vectors",
      subtitle: "32k Thinking & Embeddings",
      date: "2025 - 2026",
      desc: "Implementing multi-stage AI reasoning loops, multimodal scene understanding with Gemini, and high-dimensional semantic search engines with microsecond local retrieval.",
      badge: "AI LAB",
      link: "https://github.com/Om-Prakash-Verma"
    },
    {
      id: "screen-3",
      title: "Cloudflare Edge & Serverless",
      subtitle: "V8 Isolated Execution",
      date: "2024 - 2026",
      desc: "Deploying high-speed edge compute with Cloudflare Workers, Pages Functions, Hono v4, and D1 serverless databases achieving single-digit millisecond latency worldwide.",
      badge: "EDGE INFRA",
      link: "https://github.com/Om-Prakash-Verma"
    },
    {
      id: "screen-4",
      title: "WebGL & 3D Storytelling",
      subtitle: "Procedural Shaders & Canvas",
      date: "2025 - 2026",
      desc: "Crafting lightweight, immersive 3D web experiences using Three.js, GLSL fragment shaders, procedural sketch geometries, and spatial narrative mechanics.",
      badge: "CREATIVE TECH",
      link: "https://github.com/Om-Prakash-Verma"
    }
  ],

  // Career & Education Milestones for "JOURNEY" (Paper Airplane Flight)
  journeyMilestones: [
    {
      year: "2022 - 2026",
      label: "B.Tech CSE",
      title: "Computer Science Engineering",
      institution: "ABES Engineering College",
      detail: "Focused on Data Structures, Algorithms, Operating Systems, Compilers, and Distributed Systems. Built 15+ end-to-end full stack projects."
    },
    {
      year: "2023 - 2024",
      label: "FULL STACK",
      title: "Full-Stack & Systems Deep Dive",
      institution: "Open-Source & Independent",
      detail: "Engineered real-time reactive applications, mastered TypeScript, React, Vite, Node, and cloud serverless edge architecture."
    },
    {
      year: "2024 - 2025",
      label: "AI & EDGE",
      title: "Algorithmic & AI Engineering",
      institution: "Production Deployments",
      detail: "Built Git Forensics (32k thinking), AetherSchedule (NP-complete hybrid timetabler), and RailSure (15ms IRCTC edge cache)."
    },
    {
      year: "2025 - NOW",
      label: "BUILDER",
      title: "Creative Tech & High-Scale Systems",
      institution: "Future Horizons",
      detail: "Building tactile, game-like web experiences, 3D interactive interfaces, and robust systems architecture."
    }
  ],

  // Floating signs in the ocean for "CONTACT" (The Pier)
  contactSigns: [
    {
      id: "github",
      label: "GITHUB",
      desc: "View open-source repositories & commit history",
      href: "https://github.com/Om-Prakash-Verma",
      isAction: false
    },
    {
      id: "linkedin",
      label: "LINKEDIN",
      desc: "Connect professionally on LinkedIn",
      href: "https://www.linkedin.com/in/om-prakash-verma-9a6741270/",
      isAction: false
    },
    {
      id: "message",
      label: "MESSAGE",
      desc: "Send an email dispatch directly to Om",
      href: "mailto:omprakash.verma.dev@gmail.com",
      isAction: true
    },
    {
      id: "email",
      label: "DIRECT MAIL",
      desc: "omprakash.verma.dev@gmail.com",
      href: "mailto:omprakash.verma.dev@gmail.com",
      isAction: false
    }
  ]
};
