export const languages = {
	ja: '日本語',
	en: 'English',
};

export const defaultLang = 'ja';

export const ui = {
	ja: {
		'site.title': 'ゆかのpicks',
		'site.description': 'ギター・AI・気になったことを流してます。Epiphone Casino使い。',
		'nav.home': 'トップ',
		'nav.blog': '記事',
		'nav.about': 'ゆかについて',
		'home.bio': 'ギター（Epiphone Casino）・AI・ゲーム。気になったことをXとここに流してます。',
		'home.recent': '最近の記事',
		'home.more': '記事をもっと見る →',
		'post.updated': '更新日：',
	},
	en: {
		'site.title': "yuka's picks",
		'site.description': 'Guitar, AI, and things I find interesting. Epiphone Casino player.',
		'nav.home': 'Home',
		'nav.blog': 'Blog',
		'nav.about': 'About',
		'home.bio': 'Guitar (Epiphone Casino) · AI · Gaming. Sharing what I find interesting, here and on X.',
		'home.recent': 'Recent Posts',
		'home.more': 'See all posts →',
		'post.updated': 'Last updated: ',
	},
} as const;

export function useTranslations(lang: keyof typeof ui) {
	return function t(key: keyof (typeof ui)[typeof defaultLang]) {
		return (ui[lang] as Record<string, string>)[key] ?? ui[defaultLang][key];
	};
}

export function getLangFromUrl(url: URL): keyof typeof ui {
	const [, first] = url.pathname.split('/');
	if (first in ui) return first as keyof typeof ui;
	return defaultLang;
}
