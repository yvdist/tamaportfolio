<script lang="ts">
	import { profile } from '$lib/data/profile';

	let {
		title,
		description,
		path = '/',
		image = '/og.jpg'
	}: { title: string; description: string; path?: string; image?: string } = $props();

	const url = $derived(profile.siteUrl + path);
	const imageUrl = $derived(profile.siteUrl + image);
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
	<link rel="canonical" href={url} />
	<meta property="og:type" content="website" />
	<meta property="og:site_name" content={profile.name} />
	<meta property="og:title" content={title} />
	<meta property="og:description" content={description} />
	<meta property="og:url" content={url} />
	<meta property="og:image" content={imageUrl} />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={imageUrl} />
</svelte:head>
