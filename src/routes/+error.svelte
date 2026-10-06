<script lang="ts">
	import { resolve } from '$app/paths';
	import { page } from '$app/state';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import { profile } from '$lib/data/profile';

	const notFound = $derived(page.status === 404);
</script>

<svelte:head>
	<title>{notFound ? 'Page not found' : 'Something went wrong'} · {profile.name}</title>
	<meta name="robots" content="noindex" />
</svelte:head>

<Navbar solid />

<main class="flex min-h-svh flex-col items-center justify-center px-8 py-40 text-center">
	<p class="mb-10 text-[11px] tracking-[0.3em] text-charcoal/75 uppercase">{page.status}</p>
	<h1 class="mb-6 font-serif text-[36px] leading-[1.25] text-charcoal/90 md:text-[52px]">
		{notFound ? 'Nothing here' : 'Something went wrong'}
	</h1>
	<p class="mb-14 max-w-[420px] text-[15px] leading-[2] text-charcoal/75">
		{notFound
			? 'The page you were looking for has moved or never existed.'
			: 'The page could not be shown. Please try again in a moment.'}
	</p>
	<a
		href="{resolve('/')}#works"
		class="border border-charcoal/30 px-10 py-4 text-[11px] tracking-[0.3em] text-charcoal/80 uppercase transition-colors hover:bg-charcoal hover:text-cream"
	>
		back to selected work
	</a>
</main>

<Footer />
