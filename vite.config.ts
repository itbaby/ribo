import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    esbuild: {
        target: 'es2022'
    },
    plugins: [tailwindcss(), svelte(), visualizer({
        open: true,
        filename: 'dist/stats.html'
    })],
    build: {
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true,
        target: 'es2022'
    },
    optimizeDeps: {
        include: ['aos'],
        exclude: []
    }
});
