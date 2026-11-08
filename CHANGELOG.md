# Changelog

All notable changes to the **Om Prakash Verma Portfolio** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.4.0] - 2026-11-08
### Added
- **The Workshop (Featured Projects Section):**
  - Integrated 12 real engineering projects curated from Om's repositories across AI, Edge & Full-Stack, and Creative/Mobile domains.
  - Interactive tactile filter tabs: `Flagship Core`, `All Systems`, `AI & Algorithms`, `Edge & Full-Stack`, `Creative & Mobile`.
  - Tactile project cards highlighting engineering metrics (e.g., *32k Thinking Budget*, *NP-Complete Backtracking Matrix*, *3072-D Vector Geometry*, *15ms Edge Cache*).
  - Built compliant native `<dialog>` "Inspect Architecture" modal with data pipeline diagrams, technical decisions, and full tech stacks complying with modern web modal dialog guidelines.

## [0.3.0] - 2026-11-08
### Added
- **Unconstrained Free-Floating 3D Mascot ("Spark"):**
  - Released Spark from any bounding card box: Spark now flies freely across the entire hero viewport in 3D space with a full-bleed transparent WebGL canvas.
  - Rewrote the narrative tour into a warm, natural human-to-human introduction: Spark introduces Om like a close friend and advocate describing his curiosity, builder mindset, engineering base, and personal depth one by one.
  - Dynamic 3D-to-2D screen projection: the speech bubble dynamically tracks Spark's real-time head coordinates wherever it flies.
  - Added multi-tab tactile architecture console on the right column (`Telemetry`, `Philosophy`, `Core`) providing rich engineering telemetry while Spark navigates freely.
  - Interactive click / raycaster support directly on the 3D bot triggers barrel-roll spins and reactive toasts.

---

## [0.2.0] - 2026-11-08
### Changed
- **Responsive Layout & CSS Overhaul:**
  - Lowered side-by-side grid breakpoint from `lg:` (1024px) to `md:` (768px) to eliminate empty right-side gaps on laptops and high-DPI scaled screens.
  - Enhanced mobile and tablet ergonomics with minimum 44px touch targets.
  - Added pointer event handling (`pointerdown`, `pointermove`, `pointerup`) with `touch-action: pan-y` on 3D canvas so mobile users can interact without interrupting page scroll.
  - Improved color gradient contrast for "Verma" to remain crisp against the dark obsidian background.
  - Added mobile menu backdrop scrim with fluid animations and ARIA attributes.

---

## [0.1.0] - 2026-11-08
### Added
- **Project Foundation & Hero Section:**
  - Initialized project with Vite, React, and Tailwind CSS.
  - Established dark obsidian visual theme (`#08090d`) and custom claymorphic tactile styling utilities (`clay-card`, `clay-button`, `clay-button-primary`).
  - Implemented interactive WebGL geometric core in Three.js with ambient lighting and mouse tilt tracking.
  - Added responsive floating navigation bar with status pill and quick action links.
  - Configured dark-mode meta tags and semantic typography.
