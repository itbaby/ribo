import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
// 由于找不到模块，可能需要先安装该模块，这里先假设已安装并使用类型断言绕过类型检查
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