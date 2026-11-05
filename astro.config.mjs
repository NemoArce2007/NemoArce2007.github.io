// @ts-check
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { defineConfig } from 'astro/config';

// NemoArce's Blog
export default defineConfig({
	site: 'https://nemoarce2007.github.io',
	output: 'static',
	integrations: [mdx(), sitemap()],
	markdown: {
		shikiConfig: {
			theme: 'rose-pine-dawn',
		},
	},
});
