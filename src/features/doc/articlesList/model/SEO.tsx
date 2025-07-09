import { SEO } from '@/shared';

interface SEOArticleListProps {
	categoryParam?: string | null;
	searchParam?: string | null;
	canonical?: string;
}

export const SEOArticleList: React.FC<SEOArticleListProps> = ({
	categoryParam,
	searchParam,
	canonical = window.location.href,
}) => {
	const title = `Статьи${categoryParam ? ` по категории "${categoryParam}"` : ''}${searchParam ? `: поиск "${searchParam}"` : ''} — Документация`;
	const description = `Список статей${categoryParam ? ` по категории "${categoryParam}"` : ''}${searchParam ? `, найденных по запросу "${searchParam}"` : ''}.`;

	return (
		<SEO title={title} description={description} canonical={canonical} />
	);
};
