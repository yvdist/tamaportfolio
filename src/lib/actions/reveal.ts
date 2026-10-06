export function reveal(node: HTMLElement, delay = 0) {
	if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

	node.classList.add('reveal');
	node.style.transitionDelay = `${delay}ms`;

	const observer = new IntersectionObserver(
		([entry]) => {
			if (!entry.isIntersecting) return;
			node.classList.add('is-visible');
			observer.disconnect();
		},
		{ threshold: 0.15 }
	);
	observer.observe(node);

	return { destroy: () => observer.disconnect() };
}
