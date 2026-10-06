<script lang="ts">
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { Github, Linkedin } from 'lucide-svelte';
	import { reveal } from '$lib/actions/reveal';
	import { profile } from '$lib/data/profile';

	let { hasCv }: { hasCv: boolean } = $props();
</script>

<section id="contact" class="px-8 py-32 md:py-44">
	<div use:reveal class="mx-auto max-w-[800px] text-center">
		<h2 class="mb-10 font-sans text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">contact</h2>
		<p class="mb-6 font-serif text-[28px] leading-[1.4] text-charcoal/90 md:text-[36px]">
			Let's build something together
		</p>
		<p class="mb-14 text-[15px] leading-[2] text-charcoal/70">
			Open to senior full-stack roles, on-site in Jakarta or remote.
		</p>

		<a
			href="mailto:{profile.email}"
			class="font-serif text-[20px] break-all text-charcoal/90 underline-offset-8 hover:underline md:text-[26px]"
		>
			{profile.email}
		</a>

		<div
			class="mt-14 flex flex-col items-center justify-center gap-6 text-[12px] tracking-[0.2em] md:flex-row md:gap-12"
		>
			<ExternalLink
				href={profile.linkedin.url}
				class="flex items-center gap-3 text-charcoal/70 transition-colors hover:text-charcoal"
			>
				<Linkedin size={16} aria-hidden="true" />
				<span>linkedin.com/in/{profile.linkedin.handle}</span>
			</ExternalLink>
			<ExternalLink
				href={profile.github.url}
				class="flex items-center gap-3 text-charcoal/70 transition-colors hover:text-charcoal"
			>
				<Github size={16} aria-hidden="true" />
				<span>github.com/{profile.github.handle}</span>
			</ExternalLink>
		</div>

		{#if hasCv}
			<ExternalLink
				href={profile.cvPath}
				class="mt-16 inline-block border border-charcoal/30 px-10 py-4 text-[11px] tracking-[0.3em] text-charcoal/80 uppercase transition-colors hover:bg-charcoal hover:text-cream"
			>
				download cv
			</ExternalLink>
		{/if}
	</div>
</section>
