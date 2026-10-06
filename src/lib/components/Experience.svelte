<script lang="ts">
	import { reveal } from '$lib/actions/reveal';
	import { experience } from '$lib/data/experience';
</script>

<section id="experience" class="px-8 py-32 md:py-40">
	<div class="mx-auto max-w-[960px]">
		<h2 class="mb-20 text-center font-sans text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">
			experience
		</h2>

		<ol class="divide-y divide-warmgray/20">
			{#each experience as job (job.company + job.role)}
				<li use:reveal class="grid gap-4 py-12 md:grid-cols-[200px_1fr] md:gap-12">
					<p class="pt-2 text-[11px] tracking-[0.2em] text-charcoal/60 uppercase">
						{job.period}
					</p>
					<div>
						<h3 class="font-serif text-[24px] leading-[1.3] text-charcoal/90">{job.role}</h3>
						<p class="mt-1 text-[12px] tracking-[0.15em] text-charcoal/60">
							{job.company} · {job.location}
						</p>
						<ul class="mt-6 space-y-3 text-[15px] leading-[1.9] text-charcoal/75">
							{#each job.points as point (point)}
								<li>{point}</li>
							{/each}
						</ul>
						<p class="mt-6 text-[11px] tracking-[0.15em] text-charcoal/60">
							{job.stack.join(' · ')}
						</p>
					</div>
				</li>
			{/each}
		</ol>
	</div>
</section>
