<script lang="ts">
    // 
</script>

<section class="px-8 pb-24">
	<div class="mx-auto max-w-[1400px]">
		<p class="text-charcoal/40 mb-16 text-center text-[11px] tracking-[0.3em] uppercase">
			featured projects
		</p>

		<div class="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
			{#each [{ img: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=80', title: 'woodland analytics', subtitle: 'data visualization platform' }, { img: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600&q=80', title: 'mountain stream', subtitle: 'real-time collaboration tool' }, { img: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=600&q=80', title: 'coastal dashboard', subtitle: 'analytics & monitoring' }, { img: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80', title: 'northern lights', subtitle: 'content management system' }] as project}
				<div class="group cursor-pointer">
					<div class="bg-sand/50 mb-3 aspect-square overflow-hidden">
						<img
							src={project.img}
							alt={project.title}
							class="h-full w-full object-cover opacity-85 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
						/>
					</div>
					<p class="text-charcoal/80 mb-1 text-[10px] tracking-[0.15em]">{project.title}</p>
					<p class="text-charcoal/40 text-[8px] tracking-[0.2em]">{project.subtitle}</p>
				</div>
			{/each}
		</div>
	</div>
</section>
