import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';
import { CATEGORIES } from './lib/site';

const posts = defineCollection({
	loader: glob({ base: './src/content/posts', pattern: '**/*.{md,mdx}' }),
	schema: z.object({
		title: z.string(),
		subtitle: z.string().optional(),
		author: z.string().optional(),
		description: z.string(),
		date: z.coerce.date(),
		lang: z.enum(['zh', 'en']),
		category: z.enum(CATEGORIES),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
		image: z.string().optional(),
		imageAlt: z.string().optional(),
	}),
});

export const collections = { posts };
