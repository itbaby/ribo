import { mount } from 'svelte'
import { init, register, locale } from 'svelte-i18n';
import './app.css'
import App from './App.svelte'

// 动态加载语言文件（需 tsconfig.json 配置 resolveJsonModule）
register('en', () => import('./locales/en.json'));
register('zh', () => import('./locales/zh.json'));
register('jp', () => import('./locales/jp.json'));

async function initializeApp() {
  // 等待i18n初始化完成
  await init({
    fallbackLocale: 'en',
    initialLocale: 'zh'
  });

  return mount(App, {
    target: document.getElementById('app')!,
  });
}

export default initializeApp();
