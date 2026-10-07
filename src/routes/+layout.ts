import { dev } from '$app/environment';
import { injectAnalytics } from '@vercel/analytics/sveltekit';

export const prerender = true;

// Production only: the package's development mode loads a debug script from a third-party host.
if (!dev) injectAnalytics({ mode: 'production' });
