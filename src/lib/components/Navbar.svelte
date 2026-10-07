<script lang="ts">
	import { resolve } from '$app/paths';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { profile } from '$lib/data/profile';

	let { solid = false }: { solid?: boolean } = $props();

	let menuOpen = $state(false);
	let scrollY = $state(0);

	const filled = $derived(solid || scrollY > 100);

	const links = [
		{ hash: '#about', label: 'about' },
		{ hash: '#experience', label: 'experience' },
		{ hash: '#works', label: 'works' },
		{ hash: '#contact', label: 'contact' }
	];
</script>

<svelte:window bind:scrollY />

<nav
	class="fixed top-0 z-50 w-full transition-all duration-500 {filled
		? 'bg-cream/95 backdrop-blur-sm'
		: 'bg-transparent'}"
>
	<div class="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-7 md:px-16">
		<a
			href={resolve('/')}
			class="text-[12px] tracking-[0.3em] transition-opacity hover:opacity-70 {filled
				? 'text-charcoal'
				: 'text-white'}"
		>
			{profile.name.toLowerCase()}
		</a>

		<div class="flex items-center gap-8 md:gap-10">
			<div class="hidden gap-10 text-[11px] tracking-[0.3em] uppercase md:flex">
				{#each links as link (link.hash)}
					<a
						href="{resolve('/')}{link.hash}"
						class="transition-opacity hover:opacity-100 {filled
							? 'text-charcoal/75'
							: 'text-white/85'}"
					>
						{link.label}
					</a>
				{/each}
			</div>

			<ThemeToggle class={filled ? 'text-charcoal' : 'text-white'} />

			<button
				type="button"
				aria-expanded={menuOpen}
				aria-controls="mobile-menu"
				onclick={() => (menuOpen = !menuOpen)}
				class="text-[11px] tracking-[0.3em] uppercase md:hidden {filled
					? 'text-charcoal'
					: 'text-white'}"
			>
				{menuOpen ? 'close' : 'menu'}
			</button>
		</div>
	</div>

	{#if menuOpen}
		<div id="mobile-menu" class="border-t border-warmgray/10 bg-cream px-8 py-10 md:hidden">
			<div class="flex flex-col gap-6 text-center text-[12px] tracking-[0.3em] uppercase">
				{#each links as link (link.hash)}
					<a
						href="{resolve('/')}{link.hash}"
						onclick={() => (menuOpen = false)}
						class="text-charcoal/75 hover:text-charcoal"
					>
						{link.label}
					</a>
				{/each}
			</div>
		</div>
	{/if}
</nav>
