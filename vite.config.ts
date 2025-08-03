import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [
        tailwindcss(), 
        svelte({
            compilerOptions: {
                // Optimize for production
                dev: false,
                css: 'injected'
            }
        }),
        visualizer({
            open: false,
            filename: 'dist/stats.html',
            gzipSize: true,
            brotliSize: true
        })
    ],
    build: {
        chunkSizeWarningLimit: 500,
        cssCodeSplit: true,
        minify: 'terser',
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
                pure_funcs: ['console.log', 'console.warn', 'console.error']
            },
            mangle: {
                toplevel: true
            }
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    // Split vendor libraries into separate chunks
                    'vendor-svelte': ['svelte', 'svelte-i18n'],
                    'vendor-ui': ['flowbite', 'flowbite-svelte'],
                    'vendor-animation': ['aos', 'gsap', 'animate.css'],
                    'vendor-carousel': ['@splidejs/splide', 'embla-carousel', 'swiper']
                },
                assetFileNames: 'assets/[name]-[hash][extname]',
                chunkFileNames: 'assets/[name]-[hash].js',
                entryFileNames: 'assets/[name]-[hash].js'
            }
        },
        target: ['es2020', 'edge88', 'firefox78', 'chrome87', 'safari14'],
        sourcemap: false,
        assetsInlineLimit: 4096, // Inline assets smaller than 4kb
        copyPublicDir: true
    },
    optimizeDeps: {
        include: ['aos', 'gsap'],
        exclude: []
    },
    publicDir: 'public'
});
