import { Helmet } from 'react-helmet-async';

interface SEOExamplesListProps {
	categoryParam?: string | null;
	tagParam?: string | null;
	searchParam?: string | null;
	pageParam?: number;
	canonical?: string;
}

export const SEOExamplesList: React.FC<SEOExamplesListProps> = ({
	categoryParam,
	tagParam,
	searchParam,
	pageParam = 1,
	canonical = window.location.href,
}) => {
	const parts: string[] = ['Моделирование'];

	if (categoryParam) parts.push(`Категория: ${categoryParam}`);
	if (tagParam) parts.push(`Теги: ${tagParam}`);
	if (searchParam) parts.push(`Поиск: "${searchParam}"`);
	if (pageParam > 1) parts.push(`Страница ${pageParam}`);

	const description = `Список примеров${categoryParam ? ` по категории "${categoryParam}"` : ''}${tagParam ? ` с тегами "${tagParam}"` : ''}${searchParam ? `, найденных по запросу "${searchParam}"` : ''}.`;

	return (
		<Helmet>
			<meta name="description" content={description} />
			<link rel="canonical" href={canonical} />
		</Helmet>
	);
};
