<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import Hero from '$lib/components/Hero.svelte';
	import About from '$lib/components/About.svelte';
	import ExploreMyWork from '$lib/components/ExploreMyWork.svelte';
	import Projects from '$lib/components/Projects.svelte';
	import Work from '$lib/components/Work.svelte';
	import Divider from '$lib/components/Divider.svelte';
	import Contact from '$lib/components/Contact.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import Skills from '$lib/components/Skills.svelte';
</script>

<svelte:head>
	<title>yudistira eka pratama - web portfolio</title>
</svelte:head>

<!-- Navigation - Overlay on Hero -->
<Navbar />

<!-- Hero Section - Full Viewport -->
<Hero />

<!-- About Section -->
<About />

<!-- Features Grid Section -->
<Projects />

<!-- Skills Section -->
<Skills />

<!-- Full Width Image CTA Section -->
<ExploreMyWork />

<!-- Works Section with Stacked Images -->
<Work />

<!-- Another Full Width Divider -->
<Divider />

<!-- Contact Form Section -->
<Contact />

<!-- Footer -->
<Footer />
