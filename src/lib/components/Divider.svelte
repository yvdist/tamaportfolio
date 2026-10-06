<script lang="ts">
	import { photo } from '$lib/data/photos';
</script>

<section class="px-8 py-20" aria-hidden="true">
	<div class="mx-auto max-w-[1400px]">
		<div class="aspect-21/9 overflow-hidden bg-sand/50">
			<img
				src={photo('divider.webp')}
				alt=""
				width="1680"
				height="720"
				loading="lazy"
				class="h-full w-full object-cover opacity-80 saturate-[0.85]"
			/>
		</div>
	</div>
</section>
