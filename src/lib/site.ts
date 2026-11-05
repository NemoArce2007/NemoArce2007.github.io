export const SITE = {
	title: "NemoArce's Blog",
	owner: 'Jimmy Xu',
	handle: 'NemoArce2007',
	description: "NemoArce's Blog",
	url: 'https://nemoarce2007.github.io',
	github: 'https://github.com/NemoArce2007',
} as const;

export const CATEGORIES = ['Tech', 'Product', 'Ideas', 'Miscellany'] as const;

export type Category = (typeof CATEGORIES)[number];

export type PostLang = 'zh' | 'en';
