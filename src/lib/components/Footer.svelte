<script lang="ts">
	import { profile } from '$lib/data/profile';
</script>

<footer class="border-t border-warmgray/20 px-8 py-14">
	<div
		class="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 text-[11px] tracking-[0.25em] text-charcoal/60 uppercase md:flex-row"
	>
		<p>© {new Date().getFullYear()} {profile.name}</p>
		<p>
			Photographs via
			<a
				href="https://unsplash.com"
				target="_blank"
				rel="noopener noreferrer"
				class="underline-offset-4 hover:underline">Unsplash</a
			>
		</p>
	</div>
</footer>
