<script lang="ts">
	import ExternalLink from '$lib/components/ExternalLink.svelte';
	import { photoCredit } from '$lib/data/photos';
	import { profile } from '$lib/data/profile';
	import { i18n } from '$lib/i18n';
</script>

<footer class="border-t border-warmgray/20 px-8 py-14">
	<div
		class="mx-auto flex max-w-[1400px] flex-col items-center justify-between gap-4 text-[11px] tracking-[0.25em] text-charcoal/75 uppercase md:flex-row"
	>
		<p>© {new Date().getFullYear()} {profile.name}</p>
		{#if photoCredit}
			<p>
				{i18n.t.footer.photos}
				<ExternalLink href={photoCredit.url} class="underline-offset-4 hover:underline">
					{photoCredit.label}
				</ExternalLink>
			</p>
		{/if}
	</div>
</footer>
