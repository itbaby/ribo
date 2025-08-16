
# Ribo Corporate Website

A modern, multilingual corporate website for Dalian Ribo Consulting Services Co., Ltd. Built with Svelte, TypeScript, and Vite.

## Project Overview

This website showcases Ribo's services in executive search, staffing, and IT outsourcing with a focus on technology-driven solutions. The site features smooth animations, multilingual support, and a responsive design.

## Features

- **Multilingual Support**: English, Japanese, and Chinese language options
- **Smooth Scrolling**: Implemented with Locomotive Scroll
- **Modern Animations**: Powered by GSAP and AOS
- **Responsive Design**: Built with Tailwind CSS and Flowbite components
- **Component-Based Architecture**: Leveraging Svelte's efficient reactivity system

## Technology Stack

- **Frontend Framework**: Svelte 5
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **Animations**: GSAP, Locomotive Scroll, AOS
- **Routing**: svelte-routing
- **Internationalization**: svelte-i18n
- **TypeScript**: For type safety and better developer experience

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Svelte](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode).

## Installation

```bash
# Clone the repository
git clone [repository-url]
cd ribo

# Install dependencies
npm install

# Start development server
npm run dev
```

## Development

```bash
# Start development server with hot module replacement
npm run dev

# Type checking
npm run check
```

## Building for Production

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Project Structure

- `src/features/` - Main components for each page/section
- `src/assets/` - Static assets (images, icons)
- `src/locales/` - Internationalization files
- `src/config/` - Configuration files for libraries

## Internationalization

The website supports multiple languages:
- English
- Japanese
- Chinese

Language files are located in `src/locales/` directory.

## Animation Libraries

- **Locomotive Scroll**: For smooth scrolling effects
- **GSAP**: For advanced animations
- **AOS**: For scroll-triggered animations

## License

Proprietary - All rights reserved by Dalian Ribo Consulting Services Co., Ltd.
