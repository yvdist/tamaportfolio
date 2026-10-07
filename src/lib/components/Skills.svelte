<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { skills } from '$lib/data/skills';
	import { i18n } from '$lib/i18n';
</script>

<section class="px-8 py-32">
	<div class="mx-auto max-w-[960px]">
		<h2 class="mb-20 text-center font-sans text-[11px] tracking-[0.3em] text-charcoal/75 uppercase">
			{i18n.t.skills.heading}
		</h2>

		<dl class="divide-y divide-warmgray/20">
			{#each skills as group (group.label)}
				<div use:reveal class="grid gap-3 py-7 md:grid-cols-[200px_1fr] md:gap-12">
					<dt class="text-[11px] tracking-[0.3em] text-charcoal/75 uppercase md:pt-1">
						{group.label}
					</dt>
					<dd class="text-[15px] leading-[1.9] text-charcoal/80">{group.items.join(' · ')}</dd>
				</div>
			{/each}
		</dl>
	</div>
</section>
