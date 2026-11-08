# Changelog

All notable changes to the **Om Prakash Verma Portfolio** project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [0.3.0] - 2026-11-08
### Added
- **Interactive 3D Mascot ("Spark"):**
  - Autonomous 3D clay-styled floating robot with procedural matte body, glowing LED expressive eyes, and thruster pulse.
  - Interactive storytelling tour that starts automatically on load, guiding visitors through Om's philosophy, technical focus, and projects.
  - Dynamic waypoint navigation: the mascot glides across designated positions in the hero space as the narrative unfolds.
  - Interactive speech bubble with auto-advancing progress, manual navigation ("Next", "Replay", "Dismiss"), and click reaction physics.
  - Direct interaction: clicking the mascot triggers an excited spin / barrel-roll and reactive dialogue.

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
