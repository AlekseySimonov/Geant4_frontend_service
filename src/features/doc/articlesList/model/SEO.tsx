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
	const description = `Список статей${categoryParam ? ` по категории "${categoryParam}"` : ''}${searchParam ? `, найденных по запросу "${searchParam}"` : ''}.`;

	return (
		<SEO description={description} canonical={canonical} />
	);
};
