import styles from "./_docPage.module.scss"
import ArticleCard from '@/entities/doc/exampleCard/ui/ArticleCard';
import { Search } from '@/shared/ui/components/search';
import { useLazySearchArticlesQuery } from "../api/queryDoc";

const DocumentationPage: React.FC = () => {
	const [searchArticle] = useLazySearchArticlesQuery()

	const handleSearch = async (searchText: string) => {
		const result = await searchArticle(searchText);
		if ('data' in result) {
			return result.data.map(article => ({
				title: article.title,
			}));
		}
		return [];
	};

	return (
		<div className={styles.doc}>
			<div className={styles.doc__title}>
				<h2>Пользовательское руководство</h2>
			</div>
			<Search onSearch={(query) => handleSearch(query)} />
			<ArticleCard />
			<ArticleCard />
		</div>
	)
}

export default DocumentationPage