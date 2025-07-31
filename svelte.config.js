import { vitePreprocess } from '@sveltejs/vite-plugin-svelte'

export default {
  // Consult https://svelte.dev/docs#compile-time-svelte-preprocess
  // for more information about preprocessors
  preprocess: vitePreprocess(),
  onwarn: (warning, handler) => {
    // Suppress specific a11y warnings
    if (warning.code === 'a11y-invalid-attribute') {
      return;
    }
    handler(warning);
  }
}
