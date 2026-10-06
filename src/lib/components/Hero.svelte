<script lang="ts">
	import { photo } from '$lib/data/photos';
	import { profile } from '$lib/data/profile';
</script>

<section class="relative h-svh w-full overflow-hidden">
	<img
		src={photo('hero.webp')}
		alt=""
		width="2000"
		height="1333"
		fetchpriority="high"
		class="h-full w-full object-cover"
	/>
	<div class="absolute inset-0 bg-linear-to-b from-black/45 via-black/25 to-black/55"></div>

	<div
		class="absolute inset-0 flex flex-col items-center justify-center px-8 text-center text-white"
	>
		<p lang="ja" class="mb-8 font-mincho text-[13px] tracking-[0.5em] opacity-80">
			ソフトウェアエンジニア
		</p>
		<h1 class="mb-6 font-serif text-[40px] leading-[1.15] md:text-[68px]">{profile.name}</h1>
		<p class="mb-3 text-[13px] tracking-[0.25em] uppercase md:text-[14px]">{profile.role}</p>
		<p class="mb-12 text-[12px] tracking-[0.18em] opacity-85 md:text-[13px]">{profile.focus}</p>
		<a
			href="#works"
			class="border border-white/40 px-8 py-3 text-[11px] tracking-[0.3em] uppercase backdrop-blur-sm transition-all hover:bg-white/10"
		>
			selected work
		</a>
	</div>
</section>
