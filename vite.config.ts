import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
import { visualizer } from 'rollup-plugin-visualizer';

export default defineConfig({
    plugins: [tailwindcss(), svelte(), visualizer({
        open: true,
        filename: 'dist/stats.html'
    })],
    build: {
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true
    },
    optimizeDeps: {
        include: ['aos'],
        exclude: []
    }
});
