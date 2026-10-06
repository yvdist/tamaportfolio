<script lang="ts">
	import About from '$lib/components/About.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import Experience from '$lib/components/Experience.svelte';
	import ExploreMyWork from '$lib/components/ExploreMyWork.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import SelectedWork from '$lib/components/SelectedWork.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import Skills from '$lib/components/Skills.svelte';
	import { profile } from '$lib/data/profile';

	let { data } = $props();
</script>

<Seo title="{profile.name} · {profile.role}" description={profile.description} />

<Navbar />
<main>
	<Hero />
	<About />
	<Experience />
	<ExploreMyWork />
	<SelectedWork />
	<Skills />
	<Divider />
	<Contact hasCv={data.hasCv} />
</main>
<Footer />
