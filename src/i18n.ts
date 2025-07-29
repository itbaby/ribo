import { init, register, locale } from 'svelte-i18n';

// 动态加载语言文件（需 tsconfig.json 配置 resolveJsonModule）
register('en', () => import('./locales/en.json'));
register('zh', () => import('./locales/zh.json'));
register('jp', () => import('./locales/jp.json'));
// 初始化配置（默认英文）
export const i18nInit = init({
  fallbackLocale: 'en',
  initialLocale: 'zh'
});

// 导出语言切换函数
export const switchLanguage = (lang: 'en' | 'zh' | 'jp') => {
  console.log(lang)
  locale.set(lang);
};
