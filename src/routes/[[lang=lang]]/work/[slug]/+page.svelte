<script lang="ts">
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { resolve } from '$app/paths';
	import Footer from '$lib/components/Footer.svelte';
	import Navbar from '$lib/components/Navbar.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { profile } from '$lib/data/profile';
	import { i18n } from '$lib/i18n';

	let { data } = $props();

	const project = $derived(data.project);
	const next = $derived(data.next);
	const t = $derived(i18n.t.work);
</script>

<Seo
	title="{project.title} · {profile.name}"
	description={project.summary}
	path="/work/{project.slug}"
	image="/og/{project.slug}.png"
/>

<Navbar solid />

<main class="px-8 pt-40 pb-32 md:pt-48">
	<article class="mx-auto max-w-[760px]">
		<p class="mb-8 text-[11px] tracking-[0.3em] text-charcoal/75 uppercase">
			<a
				href="{resolve('/[[lang=lang]]', { lang: i18n.lang })}#works"
				class="underline-offset-4 hover:text-charcoal hover:underline">{t.breadcrumb}</a
			>
			· {project.kind === 'personal' ? t.personal : t.professional}
		</p>

		<h1 class="mb-8 font-serif text-[40px] leading-[1.2] text-charcoal/90 md:text-[56px]">
			{project.title}
		</h1>
		<p class="font-serif text-[20px] leading-[1.7] text-charcoal/80 md:text-[22px]">
			{project.summary}
		</p>

		<dl
			class="mt-14 grid gap-8 border-y border-warmgray/20 py-10 text-[15px] text-charcoal/80 md:grid-cols-3"
		>
			<div>
				<dt class="mb-2 text-[11px] tracking-[0.3em] text-charcoal/75 uppercase">{t.period}</dt>
				<dd>{project.period}</dd>
			</div>
			<div>
				<dt class="mb-2 text-[11px] tracking-[0.3em] text-charcoal/75 uppercase">{t.role}</dt>
				<dd>{project.role}</dd>
			</div>
			<div>
				<dt class="mb-2 text-[11px] tracking-[0.3em] text-charcoal/75 uppercase">{t.stack}</dt>
				<dd>{project.stack.join(' · ')}</dd>
			</div>
		</dl>

		{#if project.shots}
			<div class="mt-14 space-y-8">
				{#each project.shots as shot (shot.src)}
					<img
						src={shot.src}
						alt={shot.alt}
						width="1440"
						height="900"
						loading="lazy"
						class="w-full rounded-sm border border-warmgray/30"
					/>
				{/each}
			</div>
		{/if}

		<section class="mt-16">
			<h2 class="mb-6 font-sans text-[11px] tracking-[0.3em] text-charcoal/75 uppercase">
				{t.problem}
			</h2>
			<p class="text-[16px] leading-[2] text-charcoal/80">{project.problem}</p>
		</section>

		<section class="mt-16">
			<h2 class="mb-6 font-sans text-[11px] tracking-[0.3em] text-charcoal/75 uppercase">
				{t.approach}
			</h2>
			<ul class="space-y-5 text-[16px] leading-[2] text-charcoal/80">
				{#each project.approach as step (step)}
					<li>{step}</li>
				{/each}
			</ul>
		</section>

		<section class="mt-16">
			<h2 class="mb-6 font-sans text-[11px] tracking-[0.3em] text-charcoal/75 uppercase">
				{t.outcome}
			</h2>
			<ul class="space-y-4 font-serif text-[20px] leading-[1.6] text-charcoal/90">
				{#each project.outcome as result (result)}
					<li>{result}</li>
				{/each}
			</ul>
		</section>

		{#if project.links}
			<div class="mt-16 flex flex-wrap gap-4 text-[11px] tracking-[0.3em] uppercase">
				{#if project.links.demo}
					<ExternalLink
						href={project.links.demo}
						class="bg-charcoal/90 px-8 py-4 text-cream transition-colors hover:bg-charcoal"
					>
						{t.demo}
					</ExternalLink>
				{/if}
				<ExternalLink
					href={project.links.repo}
					class="border border-charcoal/30 px-8 py-4 text-charcoal/80 transition-colors hover:bg-charcoal hover:text-cream"
				>
					{t.source}
				</ExternalLink>
			</div>
		{:else}
			<p class="mt-16 text-[13px] leading-[1.9] text-charcoal/75">
				{t.withheld}
			</p>
		{/if}
	</article>

	<nav class="mx-auto mt-28 max-w-[760px] border-t border-warmgray/20 pt-12 text-center">
		<p class="mb-4 text-[11px] tracking-[0.3em] text-charcoal/75 uppercase">{t.next}</p>
		<a
			href={resolve('/[[lang=lang]]/work/[slug]', { lang: i18n.lang, slug: next.slug })}
			class="font-serif text-[28px] text-charcoal/90 underline-offset-8 hover:underline"
		>
			{next.title}
		</a>
	</nav>
</main>

<Footer />
