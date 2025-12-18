<script lang="ts">
	// 
</script>

<section class="py-32 px-8">
  <div class="max-w-[900px] mx-auto">
	<p class="text-charcoal/40 mb-16 text-center text-[11px] tracking-[0.3em] uppercase md:mb-20">
		tech stack
	</p>
	
    <div class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
      {#each [
        'JavaScript', 'TypeScript', 'React', 'SvelteKit',
        'Node.js', 'Python', 'PostgreSQL', 'MongoDB',
        'Docker', 'Kubernetes', 'AWS', 'Git',
        'GraphQL', 'REST API', 'Redis', 'WebSocket'
      ] as tech}
        <div class="py-4">
          <p class="text-[10px] tracking-[0.2em] text-charcoal/60">{tech}</p>
        </div>
      {/each}
    </div>
  </div>
</section>
