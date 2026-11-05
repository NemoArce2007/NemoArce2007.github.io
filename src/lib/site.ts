export const SITE = {
	title: 'Jimmy Xu',
	owner: 'Jimmy Xu',
	handle: 'NemoArce2007',
	description: '公开工作台：写长文、记判断、留痕迹。',
	url: 'https://nemoarce2007.github.io',
	github: 'https://github.com/NemoArce2007',
} as const;

export const CATEGORIES = ['技术', '产品与创业', '观念', '随笔'] as const;

export type Category = (typeof CATEGORIES)[number];

export const CATEGORY_BLURBS: Record<Category, string> = {
	技术: '工程笔记',
	产品与创业: '产品和生意上的判断',
	观念: 'Ideology essays',
	随笔: '偶尔记下的东西',
};

export type PostLang = 'zh' | 'en';
