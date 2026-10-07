<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { i18n } from '$lib/i18n';

	const profile = $derived(i18n.content.profile);
</script>

<section id="about" class="px-8 py-32 md:py-40">
	<div use:reveal class="mx-auto max-w-[720px] text-center">
		<h2 class="mb-12 font-sans text-[11px] tracking-[0.3em] text-charcoal/75 uppercase">
			{i18n.t.about.heading}
		</h2>
		<div class="space-y-8">
			{#each profile.about as paragraph, i (i)}
				<p
					class={i === 0
						? 'font-serif text-[20px] leading-[1.8] text-charcoal/90 md:text-[22px]'
						: 'text-[15px] leading-[2.1] text-charcoal/75'}
				>
					{paragraph}
				</p>
			{/each}
		</div>
		<p class="mt-12 text-[11px] tracking-[0.3em] text-charcoal/75 uppercase">
			{profile.location}
		</p>
	</div>
</section>
