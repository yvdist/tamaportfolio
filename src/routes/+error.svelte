<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { profile } from '$lib/data/profile';
	import { i18n } from '$lib/i18n';

	const notFound = $derived(page.status === 404);
	const t = $derived(i18n.t.error);
</script>

<svelte:head>
	<title>{notFound ? t.notFoundTitle : t.failedTitle} · {profile.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<Navbar solid />

<main class="flex min-h-svh flex-col items-center justify-center px-8 py-40 text-center">
	<p class="mb-10 text-[11px] tracking-[0.3em] text-charcoal/75 uppercase">{page.status}</p>
	<h1 class="mb-6 font-serif text-[36px] leading-[1.25] text-charcoal/90 md:text-[52px]">
		{notFound ? t.notFoundHeading : t.failedTitle}
	</h1>
	<p class="mb-14 max-w-[420px] text-[15px] leading-[2] text-charcoal/75">
		{notFound ? t.notFoundBody : t.failedBody}
	</p>
	<a
		href="{resolve('/[[lang=lang]]', { lang: i18n.lang })}#works"
		class="border border-charcoal/30 px-10 py-4 text-[11px] tracking-[0.3em] text-charcoal/80 uppercase transition-colors hover:bg-charcoal hover:text-cream"
	>
		{t.back}
	</a>
</main>

<Footer />
