# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

A static "coming soon" page for Jenish Merin, served by GitHub Pages from the root of the `main` branch at https://jenishmerin.github.io. There is no build step, package manager, linter, or test suite: the files in the repo are exactly what gets served. `.nojekyll` disables Jekyll processing, so keep it in place.

## Running locally

Serve the repo root with any static server and open it in a browser, e.g.:

```
python -m http.server 8000
```

Opening `index.html` directly via `file://` mostly works, but a server matches production more closely (font preloading and relative paths).

## Structure

- `index.html` — the whole page: a floating "Coming soon" pill (`.speech` inside `.floater`, wrapped in `[data-parallax]`) above the name/subtitle block (`.identity`). `.atmosphere` holds decorative background layers (orbs, vignette, cursor spotlight, SVG grain).
- `css/site.css` — all styling and animation. Color tokens live on `:root` (`--bg`, `--ink`, `--cyan`, `--violet`, ...); motion is pure CSS `@keyframes`. Responsive tweaks are under `max-width: 640px` and `max-height: 740px`, and a `prefers-reduced-motion` block disables the animations.
- `js/site.js` — the only script: pointer-driven parallax on `[data-parallax]` (eased via `requestAnimationFrame`) and updates `--spot-x` / `--spot-y` CSS variables that position the spotlight. It exits early on reduced motion or coarse (touch) pointers.
- `fonts/` — self-hosted woff2 subsets (Cormorant Garamond italic, Outfit 300/400) with their OFL licenses; no external font or CDN requests. The Cormorant file is preloaded in `<head>`.

## Conventions

- Keep the site dependency-free and self-contained (no CDNs, frameworks, or bundlers).
- Respect `prefers-reduced-motion` for any new animation, in both CSS and JS.
- Deploying is just merging/pushing to `main`.
