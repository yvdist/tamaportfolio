<script lang="ts">
	import { Moon, Sun } from 'lucide-svelte';
	import { i18n } from '$lib/i18n';

	let { class: className = '' }: { class?: string } = $props();

	// The current theme lives on <html data-theme>, set by the inline script in app.html.
	// Both icons are rendered and CSS picks one, so the prerendered markup never mismatches.
	function toggle() {
		const root = document.documentElement;
		const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
		// Crossfade the whole page, photographs included, where view transitions exist.
		if (document.startViewTransition) {
			document.startViewTransition(() => {
				root.dataset.theme = theme;
			});
		} else {
			root.dataset.theme = theme;
		}
		try {
			localStorage.setItem('theme', theme);
		} catch {
			// storage unavailable: the choice lasts for this page only
		}
	}
</script>

<button
	type="button"
	aria-label={i18n.t.nav.theme}
	onclick={toggle}
	class="transition-opacity hover:opacity-70 {className}"
>
	<Moon size={16} aria-hidden="true" class="dark:hidden" />
	<Sun size={16} aria-hidden="true" class="hidden dark:block" />
</button>
