import { logRouteChanges } from './route-listener';
import App from './App.svelte';

const app = new App({
	target: document.body,
	props: {
	}
});

logRouteChanges();

export default app;
