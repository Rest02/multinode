# Design System: Productivity OS Command Center
**Project ID:** 17104364569287451796

## 1. Visual Theme & Atmosphere
The aesthetic is a convergence of a modern "macOS native application" and a minimalist "developer terminal." It feels deeply focused, utilitarian, and premium. The interface uses a strictly dark atmosphere characterized by vast, empty deep-charcoal canvas spaces, bringing intense focus to the central floating command palette. It feels "Airy" yet "Dense" where interactions occur, avoiding any visual clutter.

## 2. Color Palette & Roles
* **Deep Charcoal Void** (`#0f0f0f`): Used as the primary canvas/background. Creates a sense of infinite, distraction-free space.
* **Elevated Surface Gray** (`#1c1c1e`): Used for floating panels like the command palette and the bottom dock.
* **Menu Bar Black** (`#1a1a1a`): Used for the top macOS-style navigation bar.
* **Terminal Amber/Gold** (`#f0b429`): The primary accent color, used for the command input (`$/notes`) and key active states (like the "ZEN MODE" pill and the main '+' dock button). Creates a retro-futuristic terminal vibe.
* **Crisp Off-White** (`#e8e8e8`): Used for primary text, ensuring high legibility against the dark surfaces.
* **Muted Ash Gray** (`#888890`): Used for secondary text, sublabels, and inactive icons.
* **Subtle Frost Border** (`rgba(255, 255, 255, 0.10)`): Used for section dividers and precise, barely-there borders around panels.
* **Status Emerald** (`#34c759`): Used sparingly for "connected" status indicators and wellness-related icons.

## 3. Typography Rules
* **Primary UI Font (Inter):** Used for all structural elements — menu bars, suggestion titles, button labels. It is clean and highly legible. Weights vary from Medium (500) for standard text to Bold (700) for the application title.
* **Command/Terminal Font (Monospace / JetBrains Mono):** Used exclusively for the user input area (`$/notes`), keyboard shortcut indicators (`⌘ RUN`), and specific technical metadata. Gives the interface its "command center" feel.

## 4. Component Stylings
* **Command Palette (Modal):** Generously rounded corners (radius ~14px), background is Elevated Surface Gray. It features a layout split between the active input row and the suggestions list.
* **Suggestion Rows:** Rectangle with no initial background, turning to a slightly lighter hover state (`#2e2e30`). Contains square, subtly rounded icons (radius ~6px) with distinct background colors based on their function (e.g., amber for notes, green for health).
* **Bottom Dock:** Pill-shaped (fully rounded/circular ends). Highly elevated. Contains square icon buttons that subtly scale up and change background on hover. The central button is distinct, using the Terminal Amber/Gold background with black text.
* **Top Menu Bar:** Flat, edge-to-edge rectangle with no radius. Contains densely packed, small-font menu items ("File", "Edit", "View").

## 5. Layout Principles
* **Absolute Centering:** The main interaction point (the command palette) is dead-center on the screen, surrounded by massive amounts of intentional whitespace/void.
* **Modular Float:** UI elements (palette, dock) float independently over the canvas rather than being docked to the edges (except the top menu bar).
* **Heavy Elevation:** Floating panels use intense, deep drop-shadows (`0 24px 80px rgba(0,0,0,0.7)`) accompanied by a subtle 1px lighter inner border to create a profound sense of physical depth and separation from the background.
* **Dense Information Architecture:** Inside the panels (like the suggestion list), spacing is tight and highly structured, mimicking a powerful IDE or terminal tool.
