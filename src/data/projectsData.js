export const projectsData = [
  {
    id: 'git-forensics',
    title: 'Git Forensics',
    category: 'ai',
    isFeatured: true,
    tagline: 'Enterprise-Grade AI Time-Travel Debugger & Architectural Audit Console',
    summary: 'Visualizes git repository histories as interactive timelines, quantifies code volatility, and maps structural dependency blast radiuses using a multi-pass AI reasoning pipeline.',
    engineeringMetric: '32k Thinking Budget // D3.js Force Graphs',
    techStack: ['React 19', 'TypeScript', 'D3.js', 'Node.js', 'Vercel Serverless', 'Gemini 3 Pro', 'Tailwind CSS'],
    architecture: `[Browser Client / D3.js Workspace]
       │
       ▼
[Vercel Serverless Function: /api/analyze]
       │
       ├── Pass 1 (Extractive Scan) ──► [Gemini 3 Flash: Logic Delta Map]
       │
       └── Pass 2 (Deep Reasoning)  ──► [Gemini 3 Pro: 32k Thinking Budget]
                                              │
                                              ▼
                                 [Structured Forensic Audit Report]`,
    highlights: [
      'Engineered a dual-pass AI pipeline pairing fast extractive passes (Gemini 3 Flash) with deep reasoning models (Gemini 3 Pro, 32k budget) for predictive bug simulations.',
      'Designed an interactive D3.js force-directed dependency blast-radius graph that parses ESM/CommonJS imports directly from raw Git diffs to detect architectural coupling.',
      'Built a Visual Git Bisect engine utilizing recursive midpoint binary search logic to mathematically isolate culprit commits in logarithmic time (O(log2 N)).',
      'Developed rolling code volatility heatmaps computing file entropy, churn, and risk spikes across multi-year repository timelines.'
    ],
    githubUrl: 'https://github.com/Om-Prakash-Verma/GIT-FORENSICS',
    liveUrl: 'https://git-forensics.vercel.app'
  },
  {
    id: 'aetherschedule',
    title: 'AetherSchedule',
    category: 'ai',
    isFeatured: true,
    tagline: 'AI Academic Operations Platform & Digital Twin Constraint Simulator',
    summary: 'Solves the NP-complete University Course Timetabling Problem (UCTP) using hybrid LLM cognitive heuristics combined with deterministic TypeScript conflict-repair matrices.',
    engineeringMetric: 'NP-Complete Hybrid Solver // Zero Conflict Matrix',
    techStack: ['React 18', 'TypeScript', 'Firebase Firestore', 'Gemini API', 'Recharts', 'Tailwind CSS', 'Vite'],
    architecture: `[Institution Constraints & Prefs] ──► [Gemini 3.0 Pro Reasoning] ──► [Candidate Schedule]
                                                                        │
[Deterministic Repair Matrix: validateAndRepairSchedule()] ◄────────────┘
        │
        ▼ (Guaranteed 0-conflict allocation)
[Firebase Firestore Reactive Store] ──► [Optimistic UI + Telemetry Dashboard]`,
    highlights: [
      'Architected a hybrid solver resolving NP-complete Course Timetabling constraints by coupling generative reasoning with a deterministic conflict-repair layer in TypeScript.',
      'Constructed an institution Digital Twin simulation layer mapping room capacities, faculty preferences, student cohorts, and department rules.',
      'Implemented an optimistic, reactive state synchronization pipeline with Firebase Firestore to ensure zero-latency client interactions.',
      'Engineered campus congestion heatmaps and room utilization analytics with Recharts for operational diagnostics.'
    ],
    githubUrl: 'https://github.com/Om-Prakash-Verma',
    liveUrl: '#'
  },
  {
    id: 'pixsort',
    title: 'PixSort',
    category: 'ai',
    isFeatured: true,
    tagline: 'Personal Photo Intelligence with Multimodal Vector Search & Pooled Cloud Storage',
    summary: 'Institutional Capstone Project enabling natural language conversational photo retrieval using 3072-D Gemini embeddings and decentralized Google Drive storage pooling.',
    engineeringMetric: '~3ms In-Memory Cosine Ranker // $0 Cloud Query Cost',
    techStack: ['React 19', 'TypeScript', 'Google Gemini 2.5 Flash', 'Gemini Embedding 2', 'Google Drive REST API', 'Cloud Firestore'],
    architecture: `[Raw Photo Ingestion] ──► [Gemini 2.5 Flash (Vision OCR)] ──► [3072-D Normalized Vector]
                                                                      │
[Conversational Query] ──► [Local RAM In-Memory Cosine Engine (~3ms)] ◄┘
                                       │
                                       ▼
                       [Direct REST v3 Binary Stream from Pooled Drives]`,
    highlights: [
      'Built a sub-3ms in-memory cosine similarity ranker in RAM, allowing real-time conversational photo search at $0 cloud query cost with 95.4% semantic accuracy.',
      'Engineered decentralized storage pooling aggregating multiple Google Drive accounts (15GB + 15GB = 30GB+) with automated quota failover and direct binary streaming.',
      'Integrated Gemini 2.5 Flash for multimodal visual scene decomposition, extracting light conditions, emotions, activities, and optical text (OCR).',
      'Implemented dual-mode authentication with strict x-user-id multi-tenant isolation and Cloud Firestore security rules.'
    ],
    githubUrl: 'https://github.com/Om-Prakash-Verma/PixSort',
    liveUrl: '#'
  },
  {
    id: 'railsure',
    title: 'RailSure 🚆',
    category: 'edge',
    isFeatured: true,
    tagline: 'Real-Time Indian Railways Chart Vacancy & Visual Seat Map Explorer',
    summary: 'High-speed train chart vacancy engine built with Astro SSR on Cloudflare Pages, reverse-engineered IRCTC endpoints, and an edge proxy kept alive via Cloudflare Cron Triggers.',
    engineeringMetric: '~15ms Edge Cache // 6,563 Pre-Indexed Trains',
    techStack: ['Astro', 'React', 'Tailwind CSS', 'Cloudflare Pages', 'Node/Express Proxy', 'Cloudflare Cron'],
    architecture: `[User Search] ──► [Astro on Cloudflare Pages (Edge SSR)]
                            │
       ├── Cache Hit (15ms): Instant Vacancy Response
       │
       └── Cache Miss ──► [Render Singapore Proxy] ──► [IRCTC Online Chart APIs]
                                     ▲
                           [Cloudflare Cron (14-min keep-alive)]`,
    highlights: [
      'Reverse-engineered IRCTC online chart APIs to construct interactive coach maps (A1, B1, S2...) showing berth allocations and journey segment vacancies.',
      'Pre-indexed a local client-side database of 6,563 Indian Railways trains enabling zero-latency autocomplete.',
      'Architected Cloudflare Cron Triggers running 14-minute keep-alive pings to prevent free-tier proxy instance cold-starts.',
      'Integrated class-wise breakdown counters across 1A, 2A, 3A, 3E, SL, CC, and 2S with deep links to official booking.'
    ],
    githubUrl: 'https://github.com/Om-Prakash-Verma',
    liveUrl: '#'
  },
  {
    id: 'ghostpocket',
    title: 'GhostPocket 👻💰',
    category: 'creative',
    isFeatured: true,
    tagline: 'Minimal Spooky Student Expense Tracker & Bilateral Debt Ledger',
    summary: 'Native Android application built with Jetpack Compose, Room SQLite, and a cost-optimized Cloudflare D1 serverless edge backend with reactive mascot moods.',
    engineeringMetric: 'Atomic 2-Way Sync // Integer Paise Precision',
    techStack: ['Kotlin Native', 'Jetpack Compose', 'Room DB', 'Cloudflare Workers', 'Cloudflare D1', 'Hono v4'],
    architecture: `[Jetpack Compose UI (Bento Grid)] ──► [Room SQLite (Paise Math)]
                                                │
[WorkManager Background Sync] ◄────────────────┘
        │
        ▼ (Single-Roundtrip Atomic Sync: POST /api/sync)
[Cloudflare Workers + Hono] ──► [Cloudflare D1 (Serverless SQLite)]`,
    highlights: [
      'Designed a single-roundtrip two-way sync protocol cutting Cloudflare Worker edge invocations by 50% via atomic dirty-record batches.',
      'Eliminated currency floating-point errors by enforcing exact 64-bit integer paise (Long) calculations across the entire stack.',
      'Built an automated 1080x1350 WhatsApp debt reminder card generator directly via Android Native Canvas with zero cloud image-rendering cost.',
      'Created dynamic reactive ghost mascot moods (Rich, Happy, Thinking, Spooked) responding to real-time budget velocity.'
    ],
    githubUrl: 'https://github.com/Om-Prakash-Verma',
    liveUrl: '#'
  },
  {
    id: 'k9-snipers',
    title: 'K9 SNIPERS 🐕',
    category: 'edge',
    isFeatured: true,
    tagline: 'Offline-First E-Commerce & Pet Shipping Logistics Platform',
    summary: 'High-performance e-commerce platform with an offline-first SWR IndexedDB synchronization engine and Node-free Cloudflare Pages Functions edge backend.',
    engineeringMetric: 'RS256 Web Crypto // SWR Local Cache with LRU Eviction',
    techStack: ['React 19', 'TypeScript', 'Dexie.js (IndexedDB)', 'Cloudflare Pages Functions', 'Firestore REST', 'Razorpay', 'Tailwind v4'],
    architecture: `[Client Dexie.js (IndexedDB)] ──► SWR Delta Sync ◄── [Firestore Metadata Version]
        │
        ▼ (Checkout)
[Cloudflare Pages Functions (V8 Worker Sandbox)]
        ├── Web Crypto RS256 JWT Generation (Google Service Account)
        ├── Server-Side Price & Coupon Re-Audit (Anti-Tampering)
        └── HMAC-SHA256 Razorpay Signature Verification`,
    highlights: [
      'Engineered a client-side SWR synchronization engine using Dexie.js with LRU cache eviction, reducing catalog network calls by 70%.',
      'Implemented raw Web Crypto APIs (crypto.subtle) on Cloudflare edge workers for RS256 JWT token generation and HMAC-SHA256 payment verification without Node dependencies.',
      'Prevented price-tampering via strict server-side cart re-auditing: prices are fetched directly from Firestore service accounts before issuing payment orders.',
      'Closed client-side order writing in Firestore rules (allow create: if false), enforcing all order insertion strictly via cryptographically verified edge handlers.'
    ],
    githubUrl: 'https://github.com/Om-Prakash-Verma',
    liveUrl: '#'
  },
  {
    id: 'abes-student-portal',
    title: 'ABES Modern Student Portal 🎓',
    category: 'creative',
    isFeatured: false,
    tagline: 'Tactile Claymorphic PWA with 3D Login Companion & Edge Proxy',
    summary: 'Mobile-first PWA for college students with interactive 3D perspective login character (privacy hands over eyes on password focus), bunk calculator, and edge security proxy.',
    engineeringMetric: '<90 KB Gzipped Bundle // Sub-second Edge Load',
    techStack: ['React 19', 'Vite 8', 'Tailwind CSS', 'Cloudflare Pages Functions', 'PWA / Service Worker'],
    architecture: `[PWA Client Shell (<90KB)] ──► [30-Min Local Cache]
              │
              ▼
[Cloudflare Pages Functions (/api/* Proxy)] ──► [Internal College ERP (Read-Only)]`,
    highlights: [
      'Created an interactive 3D perspective login character with real-time cursor tracking, smiling on student ID entry and covering eyes during password input.',
      'Engineered safe edge proxies abstracting internal ERP viewstate tokens and reducing upstream queries by 80%+ via smart client caching.',
      'Designed dual perspective attendance calculators (subject-wise with safe-bunk sliders and date-wise lecture timelines).',
      'Engineered OLED True-Black and tactile Claymorphic UI themes optimized for mobile battery life and night study.'
    ],
    githubUrl: 'https://github.com/Om-Prakash-Verma',
    liveUrl: '#'
  },
  {
    id: 'seoforge',
    title: 'SEOForge 🔍',
    category: 'edge',
    isFeatured: false,
    tagline: 'Technical SEO Audit Suite & Programmatic SEO Platform',
    summary: 'Single Page Application and serverless crawler running on Cloudflare Pages Functions with SSRF protection, automated headless Puppeteer prerendering, and 2,200+ pSEO routes.',
    engineeringMetric: '100/100 Lighthouse // 2,200+ Programmatic Routes',
    techStack: ['React 19', 'TypeScript', 'Cloudflare Pages Functions', 'Puppeteer', 'Tailwind CSS', 'jsPDF'],
    architecture: `[Client Request] ──► [Cloudflare Pages Functions] ──► [SSRF Guard & 2MB Cap Fetch] ──► [Target Domain]
                                                          │
[CI/CD Build] ──► [generate-sitemap.mjs (2.2k URLs)] ──► [Puppeteer Prerenderer (100/100 LCP)]`,
    highlights: [
      'Engineered an edge crawling engine featuring SSRF protections (blocking private IP ranges) and strict 2MB memory buffers to safely analyze third-party websites.',
      'Built a CI/CD headless Puppeteer prerendering pipeline that statically compiles React routes, securing a 100/100 Google Lighthouse PageSpeed index.',
      'Architected a programmatic SEO routing matrix dynamically generating 2,200+ intent-driven audit landing pages with semantic cross-linking.',
      'Implemented in-browser client PDF report generation with custom table structures using jsPDF.'
    ],
    githubUrl: 'https://github.com/Om-Prakash-Verma',
    liveUrl: '#'
  },
  {
    id: 'ordercraft',
    title: 'OrderCraft 🏭',
    category: 'edge',
    isFeatured: false,
    tagline: 'Industrial Manufacturing Order Management System (OMS)',
    summary: 'Client-side industrial web application engineered with Angular and IndexedDB (Dexie.js) to manage closed-loop manufacturing fulfillment workflows without an external database.',
    engineeringMetric: 'Zero-Backend IndexedDB // Multi-Tier BOM Explosion',
    techStack: ['Angular', 'TypeScript', 'Dexie.js (IndexedDB)', 'Tailwind CSS'],
    architecture: `[Customer Order] ──► [BOM Recipe Explosion] ──► [Shortage Evaluation]
                                                              │
[Finished Goods Restock] ◄── [Production Shop Orders] ◄───────┘`,
    highlights: [
      'Engineered automated Bill of Materials (BOM) explosion calculating real-time inventory deficits across multi-tier assembly recipes.',
      'Built atomic IndexedDB transaction pipelines (via Dexie.js) maintaining local warehouse stock reconciliation and audit trails across browser refreshes.',
      'Designed an interactive 8-phase manufacturing lifecycle walkthrough simulator for rapid presentation and system demonstration.'
    ],
    githubUrl: 'https://github.com/Om-Prakash-Verma',
    liveUrl: '#'
  },
  {
    id: 'snapgallery',
    title: 'SnapGallery 🖼️',
    category: 'creative',
    isFeatured: false,
    tagline: 'High-Performance Chrome Extension Media Scraper & Downloader',
    summary: 'Google Chrome Extension (Manifest V3) that detects, filters, and batch-downloads media from dynamic SPA web pages using debounced MutationObservers and stylesheet parsers.',
    engineeringMetric: 'Manifest V3 // Debounced DOM Mutation Observer',
    techStack: ['TypeScript', 'Webpack 5', 'Chrome Extensions API (MV3)', 'CSS Rules Parser'],
    architecture: `[Active Web Page] ──► [Debounced MutationObserver] ──► [Deep CSS Rule Parser]
                                                                  │
[SidePanel UI Filter Engine] ◄── [Offscreen Asynchronous Header Metadata Probes] ◄─┘`,
    highlights: [
      'Built a debounced MutationObserver parser scanning dynamic SPAs, infinite scroll feeds, and stylesheet background-image declarations without main-thread UI lag.',
      'Developed offscreen asynchronous probing to extract image dimensions, video resolutions (4K/1080p), and audio durations prior to download.',
      'Engineered bidirectional messaging across Chrome background service workers, injected content scripts, and side panel interfaces.'
    ],
    githubUrl: 'https://github.com/Om-Prakash-Verma',
    liveUrl: '#'
  },
  {
    id: 'crockeryhub',
    title: 'CrockeryHub 🍽️',
    category: 'edge',
    isFeatured: false,
    tagline: 'Enterprise Catalog & Real-Time Content Management System',
    summary: 'Next.js 15 App Router platform with runtime Zod schema extensions in Server Actions, dynamic CSS variable theming from Firestore, and 1-click WhatsApp order routing.',
    engineeringMetric: 'Next.js 15 Server Actions // Runtime Zod Schema Extension',
    techStack: ['Next.js 15', 'React 18', 'TypeScript', 'Firebase Firestore', 'Tailwind CSS', 'Zod'],
    architecture: `[Admin Theme Config (Firestore)] ──► [Client Provider Dynamic CSS Injector]
                                                              │
[Dynamic Form Submissions] ──► [Server Actions + Runtime Zod Extension] ──► [Firestore Collection]`,
    highlights: [
      'Engineered a dynamic CSS theming engine that streams HSL parameters from Firestore to inject CSS custom properties at runtime, giving admins instant live design control.',
      'Implemented Server Actions that retrieve custom fields from the database and dynamically extend base Zod validation schemas on the server at runtime.',
      'Formulated declarative security rules and structured FirestorePermissionError simulators matching Firebase server-side evaluation contexts.'
    ],
    githubUrl: 'https://github.com/Om-Prakash-Verma',
    liveUrl: '#'
  },
  {
    id: 'abtalks-challenge',
    title: 'ABTalks 60-Day Challenge 💻',
    category: 'creative',
    isFeatured: false,
    tagline: 'Daily Proof-of-Work Engineering Streak Platform',
    summary: 'Mobile-first challenge platform serving 14,200+ Indian engineering students with dual commit/post verification, streak recovery shields, and a Web Audio API synthesizer.',
    engineeringMetric: '14,200+ Students // Web Audio API Pink Noise Synthesizer',
    techStack: ['React 18', 'TypeScript', 'Tailwind CSS', 'Web Audio API', 'Vite'],
    architecture: `[Daily Feature Deliverable] ──► [Dual Verification: GitHub + LinkedIn] ──► [Permanent Progress Ledger]
                                                                                │
[Web Audio API Focus Rain Synthesizer] ◄────────────────────────────────────────┘`,
    highlights: [
      'Engineered a "Streak vs. Lifetime Progress" state model that protects candidate morale by preserving completed deliverables even after an accidental streak reset.',
      'Synthesized ambient pink noise rain soundscapes directly in the browser via Web Audio API oscillators for late-night focus sessions.',
      'Built automated AI LinkedIn post draft generators and candidate proof portfolios compiling verified GitHub commits for hiring partners.'
    ],
    githubUrl: 'https://github.com/Om-Prakash-Verma',
    liveUrl: '#'
  }
];
