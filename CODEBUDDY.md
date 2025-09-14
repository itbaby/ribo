# CODEBUDDY.md - Ribo Corporate Website

## Essential Commands

```bash
# Development
npm run dev          # Start development server with HMR
npm run build        # Production build
npm run preview      # Preview production build
npm run check        # Type checking (Svelte + TypeScript)

# Linting (via ESLint configuration)
npx eslint src/      # Run ESLint on source files
```

## Architecture Overview

This is a **Svelte 5 single-page application** with hash-based routing and multilingual support for a corporate consulting website.

### Core Architecture Patterns

- **Hash-based routing**: Custom routing system using `window.location.hash` (not `svelte-routing`)
- **Component-based pages**: Each route renders a different page component from `src/features/`
- **Centralized route configuration**: Routes defined in `App.svelte` with components and styling configs
- **Feature-driven structure**: Components organized by business features, not technical layers

### Key Directories

- `src/features/` - Page components (CHero, CAboutUs, etc.) and business logic
- `src/locales/` - i18n JSON files (en.json, jp.json, zh.json)
- `src/config/` - Library configurations (AOS, Locomotive Scroll, i18n)
- `src/assets/` - Static assets

### Animation Architecture

Three-layer animation system:
- **Locomotive Scroll**: Smooth scrolling foundation
- **GSAP**: Complex animations and transitions  
- **AOS**: Scroll-triggered reveal animations

Configuration managed in `src/config/aos-config.ts` and `locomotive-scroll-manager.ts`.

### Internationalization

Uses `svelte-i18n` with JSON locale files. Language switching handled at component level.

### Code Style (from .eslintrc.js)

- 2-space indentation
- Single quotes
- No semicolons
- PascalCase components (CHero.svelte)
- All accessibility rules disabled for this project

### Build Configuration

- **Vite** with Svelte plugin and Tailwind integration
- **Target**: ES2022
- **Bundle analyzer**: Rollup visualizer outputs to `dist/stats.html`
- **CSS**: Split chunking enabled

### Development Notes

- Uses Svelte 5 runes (`$state`, `$derived`)
- No test framework configured
- TypeScript strict mode enabled
- Flowbite UI components integrated with Tailwind