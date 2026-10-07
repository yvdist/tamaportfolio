<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import ThemeToggle from '$lib/components/ThemeToggle.svelte';
	import { profile } from '$lib/data/profile';
	import { i18n } from '$lib/i18n';
	import { langParam } from '$lib/i18n/locale';

	let { solid = false }: { solid?: boolean } = $props();

	let menuOpen = $state(false);
	let scrollY = $state(0);

	const filled = $derived(solid || scrollY > 100);

	const t = $derived(i18n.t.nav);

	const links = $derived([
		{ hash: '#about', label: t.about },
		{ hash: '#experience', label: t.experience },
		{ hash: '#works', label: t.works },
		{ hash: '#contact', label: t.contact }
	]);

	// The language switch names the other language in that language.
	const other = $derived(
		i18n.locale === 'en'
			? ({ locale: 'id', name: 'Bahasa Indonesia' } as const)
			: ({ locale: 'en', name: 'English' } as const)
	);
	const switchClass = $derived(
		`text-[11px] tracking-[0.3em] uppercase transition-opacity hover:opacity-70 ${filled ? 'text-charcoal' : 'text-white'}`
	);
</script>

<svelte:window bind:scrollY />

<nav
	class="fixed top-0 z-50 w-full transition-all duration-500 {filled
		? 'bg-cream/95 backdrop-blur-sm'
		: 'bg-transparent'}"
>
	<div class="mx-auto flex max-w-[1600px] items-center justify-between px-8 py-7 md:px-16">
		<a
			href={resolve('/[[lang=lang]]', { lang: i18n.lang })}
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
						href="{resolve('/[[lang=lang]]', { lang: i18n.lang })}{link.hash}"
						class="transition-opacity hover:opacity-100 {filled
							? 'text-charcoal/75'
							: 'text-white/85'}"
					>
						{link.label}
					</a>
				{/each}
			</div>

			{#if page.params.slug}
				<a
					href={resolve('/[[lang=lang]]/work/[slug]', {
						lang: langParam(other.locale),
						slug: page.params.slug
					})}
					hreflang={other.locale}
					lang={other.locale}
					aria-label={other.name}
					data-sveltekit-noscroll
					class={switchClass}
				>
					{other.locale}
				</a>
			{:else}
				<a
					href={resolve('/[[lang=lang]]', { lang: langParam(other.locale) })}
					hreflang={other.locale}
					lang={other.locale}
					aria-label={other.name}
					data-sveltekit-noscroll
					class={switchClass}
				>
					{other.locale}
				</a>
			{/if}

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
				{menuOpen ? t.close : t.menu}
			</button>
		</div>
	</div>

	{#if menuOpen}
		<div id="mobile-menu" class="border-t border-warmgray/10 bg-cream px-8 py-10 md:hidden">
			<div class="flex flex-col gap-6 text-center text-[12px] tracking-[0.3em] uppercase">
				{#each links as link (link.hash)}
					<a
						href="{resolve('/[[lang=lang]]', { lang: i18n.lang })}{link.hash}"
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
