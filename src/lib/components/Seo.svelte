<script lang="ts">
	import { profile } from '$lib/data/profile';
	import { i18n } from '$lib/i18n';
	import { locales, localizePath } from '$lib/i18n/locale';

	let {
		title,
		description,
		path = '/',
		image = '/og.jpg'
	}: { title: string; description: string; path?: string; image?: string } = $props();

	// `path` is the English path; each language has its own canonical URL and names the other.
	const url = $derived(profile.siteUrl + localizePath(path, i18n.locale));
	const ogLocale = { en: 'en_US', id: 'id_ID' };
	const imageUrl = $derived(profile.siteUrl + image);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	{#each locales as locale (locale)}
		<link rel="alternate" hreflang={locale} href={profile.siteUrl + localizePath(path, locale)} />
	{/each}
	<link rel="alternate" hreflang="x-default" href={profile.siteUrl + path} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={profile.name} />
	<meta property="og:locale" content={ogLocale[i18n.locale]} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={imageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
