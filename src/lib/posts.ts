import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'posts'>;

export function formatDate(date: Date): string {
	const year = date.getUTCFullYear();
	const month = String(date.getUTCMonth() + 1).padStart(2, '0');
	const day = String(date.getUTCDate()).padStart(2, '0');
	return `${year}.${month}.${day}`;
}

export function postPath(post: Post): string {
	return `/posts/${post.id}`;
}

export function tagSlug(tag: string): string {
	return tag
		.trim()
		.toLowerCase()
		.normalize('NFKD')
		.replace(/[\u0300-\u036f]/g, '')
		.replace(/[^\p{Letter}\p{Number}]+/gu, '-')
		.replace(/^-+|-+$/g, '');
}

export function tagPath(tag: string): string {
	return `/tags/${tagSlug(tag)}/`;
}

export interface TagArchive {
	slug: string;
	tag: string;
	posts: Post[];
}

export function collectTagArchives(posts: Post[]): TagArchive[] {
	const bySlug = new Map<string, TagArchive>();

	for (const post of posts) {
		for (const tag of post.data.tags) {
			const slug = tagSlug(tag);
			if (!slug) continue;

			const existing = bySlug.get(slug);
			if (existing) {
				existing.posts.push(post);
				continue;
			}

			bySlug.set(slug, { slug, tag, posts: [post] });
		}
	}

	return [...bySlug.values()].sort((a, b) => a.tag.localeCompare(b.tag, 'en'));
}

export async function getPosts(): Promise<Post[]> {
	const posts = await getCollection('posts', ({ data }) => {
		return import.meta.env.DEV || !data.draft;
	});

	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export async function getPublishedPosts(): Promise<Post[]> {
	const posts = await getCollection('posts', ({ data }) => !data.draft);
	return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}
