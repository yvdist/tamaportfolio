<script lang="ts">
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { resolve } from '$app/paths';
	import { reveal } from '$lib/actions/reveal';
	import { alsoBuilt, projects } from '$lib/data/projects';
</script>

<section id="works" class="px-6 py-32 md:px-8 md:py-40">
	<div class="mx-auto max-w-[1200px]">
		<h2 class="mb-20 text-center font-sans text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">
			selected work
		</h2>

		<div class="grid gap-x-12 gap-y-20 md:grid-cols-2">
			{#each projects as project, i (project.slug)}
				<a
					use:reveal={(i % 2) * 150}
					href={resolve('/work/[slug]', { slug: project.slug })}
					class="group block"
				>
					<div class="mb-6 aspect-4/3 overflow-hidden rounded-sm bg-sand/50">
						<img
							src={project.cover}
							alt=""
							width="1200"
							height="900"
							loading="lazy"
							class="h-full w-full object-cover opacity-90 saturate-[0.85] transition-all duration-700 group-hover:scale-[1.03] group-hover:opacity-100"
						/>
					</div>
					<p class="mb-3 text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">
						{project.kind === 'personal' ? 'personal project' : 'professional work'} · {project.period}
					</p>
					<h3 class="mb-3 font-serif text-[26px] leading-[1.3] text-charcoal/90">
						{project.title}
					</h3>
					<p class="text-[15px] leading-[1.9] text-charcoal/70">{project.summary}</p>
					<p
						class="mt-5 text-[11px] tracking-[0.3em] text-charcoal/60 uppercase transition-colors group-hover:text-charcoal"
					>
						read case study
					</p>
				</a>
			{/each}
		</div>

		<div use:reveal class="mt-28 border-t border-warmgray/20 pt-12 text-center">
			<p class="mb-8 text-[11px] tracking-[0.3em] text-charcoal/60 uppercase">also built</p>
			<ul class="space-y-4">
				{#each alsoBuilt as item (item.url)}
					<li class="text-[15px]">
						<ExternalLink
							href={item.url}
							class="font-serif text-[18px] text-charcoal/90 underline-offset-4 hover:underline"
						>
							{item.title}
						</ExternalLink>
						<span class="text-charcoal/60"> · {item.note}</span>
					</li>
				{/each}
			</ul>
		</div>
	</div>
</section>
