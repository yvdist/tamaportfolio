<script lang="ts">
	import { Mail, Linkedin, Github } from 'lucide-svelte';

	// Form handling
	let formData: {
		firstName: string;
		lastName: string;
		email: string;
		subject: string;
		message: string;
	} = {
		firstName: '',
		lastName: '',
		email: '',
		subject: '',
		message: ''
	};

	function handleSubmit(e: Event) {
		e.preventDefault();
		alert('Thank you for reaching out. I will get back to you soon.');
		formData = { firstName: '', lastName: '', email: '', subject: '', message: '' };
	}
</script>

<section id="contact" class="px-8 py-32 md:py-40">
	<div class="mx-auto max-w-[800px]">
		<div class="mb-20 text-center">
			<p class="mb-8 text-[11px] tracking-[0.3em] text-charcoal/40 uppercase">contact</p>
			<h2 class="mb-8 font-serif text-[28px] leading-[1.4] text-charcoal/90 md:text-[36px]">
				Let's create something together
			</h2>
			<p class="text-[12px] leading-[2.4] text-charcoal/60">
				Available for freelance projects, collaborations, or just a conversation.<br />
				I typically respond within 24 hours.
			</p>
		</div>

		<form on:submit={handleSubmit} class="space-y-8">
			<div class="grid gap-6 md:grid-cols-2">
				<div class="space-y-2">
					<label for="firstName" class="block text-[10px] tracking-[0.2em] text-charcoal/60">
						First Name <span class="text-charcoal/40">(required)</span>
					</label>
					<input
						type="text"
						id="firstName"
						bind:value={formData.firstName}
						required
						class="w-full border-b border-warmgray/20 bg-transparent px-0 py-3 text-[13px] transition-colors focus:border-charcoal/40 focus:outline-none"
					/>
				</div>

				<div class="space-y-2">
					<label for="lastName" class="block text-[10px] tracking-[0.2em] text-charcoal/60">
						Last Name
					</label>
					<input
						type="text"
						id="lastName"
						bind:value={formData.lastName}
						class="w-full border-b border-warmgray/20 bg-transparent px-0 py-3 text-[13px] transition-colors focus:border-charcoal/40 focus:outline-none"
					/>
				</div>
			</div>

			<div class="space-y-2">
				<label for="email" class="block text-[10px] tracking-[0.2em] text-charcoal/60">
					Email <span class="text-charcoal/40">(required)</span>
				</label>
				<input
					type="email"
					id="email"
					bind:value={formData.email}
					required
					class="w-full border-b border-warmgray/20 bg-transparent px-0 py-3 text-[13px] transition-colors focus:border-charcoal/40 focus:outline-none"
				/>
			</div>

			<div class="space-y-2">
				<label for="subject" class="block text-[10px] tracking-[0.2em] text-charcoal/60">
					Subject <span class="text-charcoal/40">(required)</span>
				</label>
				<input
					type="text"
					id="subject"
					bind:value={formData.subject}
					required
					class="w-full border-b border-warmgray/20 bg-transparent px-0 py-3 text-[13px] transition-colors focus:border-charcoal/40 focus:outline-none"
				/>
			</div>

			<div class="space-y-2">
				<label for="message" class="block text-[10px] tracking-[0.2em] text-charcoal/60">
					Message <span class="text-charcoal/40">(required)</span>
				</label>
				<textarea
					id="message"
					bind:value={formData.message}
					required
					rows="6"
					class="w-full resize-none border-b border-warmgray/20 bg-transparent px-0 py-3 text-[13px] transition-colors focus:border-charcoal/40 focus:outline-none"
				></textarea>
			</div>

			<div class="pt-6">
				<button
					type="submit"
					class="cursor-pointer bg-charcoal/90 px-12 py-4 text-[9px] tracking-[0.3em] text-cream uppercase transition-colors hover:bg-charcoal"
				>
					Submit
				</button>
			</div>
		</form>

		<!-- Social Links -->
		<div class="mt-20 border-t border-warmgray/10 pt-12">
			<div
				class="flex flex-col items-center justify-center gap-8 text-[11px] tracking-[0.2em] md:flex-row"
			>
				<a
					href="mailto:yudistira@example.com"
					class="group flex items-center gap-3 text-charcoal/60 transition-colors hover:text-charcoal"
				>
					<Mail size={16} class="opacity-60 group-hover:opacity-100" />
					<span>yudistira@example.com</span>
				</a>
				<a
					href="https://github.com/yudistira"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center gap-3 text-charcoal/60 transition-colors hover:text-charcoal"
				>
					<Github size={16} class="opacity-60 group-hover:opacity-100" />
					<span>github.com/yudistira</span>
				</a>
				<a
					href="https://linkedin.com/in/yudistira"
					target="_blank"
					rel="noopener noreferrer"
					class="group flex items-center gap-3 text-charcoal/60 transition-colors hover:text-charcoal"
				>
					<Linkedin size={16} class="opacity-60 group-hover:opacity-100" />
					<span>linkedin.com/in/yudistira</span>
				</a>
			</div>
		</div>
	</div>
</section>
