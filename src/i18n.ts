import { locale } from 'svelte-i18n';

// 导出语言切换函数
export const switchLanguage = (lang: 'en' | 'zh' | 'jp') => {
  console.log(lang)
  locale.set(lang);
};
