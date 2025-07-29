import { mount } from 'svelte';
import './app.css';
import { initAOS } from './aos-config';
import App from './App.svelte';
import { init, register, locale } from 'svelte-i18n';

register('en', () => import('./locales/en.json'));
register('zh', () => import('./locales/zh.json'));
register('jp', () => import('./locales/jp.json'));

await Promise.all([ init({ fallbackLocale: 'en', initialLocale: 'zh' }), initAOS() ]);
const app = mount(App, { target: document.getElementById('app')!, });
export default app;
