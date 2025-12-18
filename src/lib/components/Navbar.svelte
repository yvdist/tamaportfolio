<script lang="ts">
	import { onMount } from "svelte";

	let menuOpen: boolean = false;
	let scrolled: boolean = false;

	onMount(() => {
		const handleScroll = () => {
			scrolled = window.scrollY > 100;
		};
		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	});
</script>

<nav
	class="fixed top-0 z-50 w-full transition-all duration-500 {scrolled
		? 'bg-cream/95 backdrop-blur-sm'
		: 'bg-transparent'}"
>
	<div class="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-8 md:px-16">
		<a
			href="/"
			class="text-[10px] tracking-[0.3em] {scrolled
				? 'text-charcoal'
				: 'text-white'} transition-opacity hover:opacity-70"
		>
			yudistira eka pratama
		</a>

		<div class="hidden items-center gap-12 md:flex">
			<div class="flex gap-10 text-[9px] tracking-[0.3em] uppercase">
				<a
					href="#about"
					class="{scrolled
						? 'text-charcoal/60'
						: 'text-white/80'} transition-opacity hover:opacity-100">about</a
				>
				<a
					href="#works"
					class="{scrolled
						? 'text-charcoal/60'
						: 'text-white/80'} transition-opacity hover:opacity-100">works</a
				>
				<a
					href="#contact"
					class="{scrolled
						? 'text-charcoal/60'
						: 'text-white/80'} transition-opacity hover:opacity-100">contact</a
				>
			</div>
			<a
				href="#contact"
				class="border px-6 py-2 {scrolled
					? 'border-charcoal/20 text-charcoal/60'
					: 'border-white/30 text-white'} text-[9px] tracking-[0.25em] uppercase transition-all hover:bg-white/10"
			>
				get in touch
			</a>
		</div>

		<button
			on:click={() => (menuOpen = !menuOpen)}
			class="text-[9px] tracking-[0.3em] uppercase md:hidden {scrolled
				? 'text-charcoal'
				: 'text-white'}"
		>
			{menuOpen ? 'close' : 'menu'}
		</button>
	</div>

	{#if menuOpen}
		<div class="bg-cream border-warmgray/10 border-t px-8 py-10 md:hidden">
			<div class="flex flex-col gap-6 text-center text-[10px] tracking-[0.3em] uppercase">
				<a
					href="#about"
					on:click={() => (menuOpen = false)}
					class="text-charcoal/60 hover:text-charcoal">about</a
				>
				<a
					href="#works"
					on:click={() => (menuOpen = false)}
					class="text-charcoal/60 hover:text-charcoal">works</a
				>
				<a
					href="#contact"
					on:click={() => (menuOpen = false)}
					class="text-charcoal/60 hover:text-charcoal">contact</a
				>
			</div>
		</div>
	{/if}
</nav>
