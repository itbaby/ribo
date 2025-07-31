// Remove RouteProps import as it's not available in svelte-routing
import App from './App.svelte';

const routes: { path: string; component: any }[] = [
  {
    path: '/',
    component: App
  }
];

export default routes;