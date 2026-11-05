import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { getPublishedPosts, postPath } from '../lib/posts';
import { SITE } from '../lib/site';

export async function GET(context: APIContext) {
	const posts = await getPublishedPosts();

	return rss({
		title: SITE.title,
		description: SITE.description,
		site: context.site ?? SITE.url,
		items: posts.map((post) => ({
			title: post.data.title,
			description: post.data.description,
			pubDate: post.data.date,
			link: postPath(post),
		})),
		customData: '<language>zh-CN</language>',
	});
}
