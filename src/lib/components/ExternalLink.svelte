<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		href,
		class: className = '',
		children
	}: { href: string; class?: string; children: Snippet } = $props();
</script>

<!-- eslint-disable-next-line svelte/no-navigation-without-resolve -- external URLs only -->
<a {href} target="_blank" rel="noopener noreferrer" class={className}>{@render children()}</a>
