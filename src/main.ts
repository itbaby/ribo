import { i18nInit } from "./i18n";
import { mount } from 'svelte'
import './app.css'
import App from './App.svelte'

const target = document.getElementById('app');
if (!target) throw new Error('Missing app element');

await i18nInit;
const app = mount(App, { target });
export default app
