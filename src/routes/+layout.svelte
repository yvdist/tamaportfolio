<script lang="ts">
	import '@fontsource/eb-garamond/400.css';
	import '@fontsource/eb-garamond/400-italic.css';
	import '@fontsource/eb-garamond/500.css';
	import './layout.css';
	import { onNavigate } from '$app/navigation';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();

	// Crossfade between pages where the browser supports view transitions; timing and the
	// reduced-motion opt-out are in layout.css. In-page anchor jumps are left alone.
	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		if (navigation.from?.url.pathname === navigation.to?.url.pathname) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
{@render children()}
