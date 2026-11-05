export interface Heading {
	depth: number;
	slug: string;
	text: string;
}

export interface TocItem {
	depth: 2 | 3;
	slug: string;
	text: string;
	children: TocItem[];
}

function isTocDepth(depth: number): depth is 2 | 3 {
	return depth === 2 || depth === 3;
}

export function buildToc(headings: Heading[]): TocItem[] {
	const items: TocItem[] = [];

	for (const heading of headings) {
		if (!isTocDepth(heading.depth) || !heading.slug) continue;

		const item: TocItem = {
			depth: heading.depth,
			slug: heading.slug,
			text: heading.text,
			children: [],
		};

		const parent = items.at(-1);
		if (item.depth === 3 && parent?.depth === 2) {
			parent.children.push(item);
			continue;
		}

		items.push(item);
	}

	return items;
}
