import styles from "./_docPage.module.scss"
import ArticleCard from '@/entities/doc/exampleCard/ui/ArticleCard';
import { Search } from '@/shared/ui/components/search';

const DocumentationPage: React.FC = () => {
	return (
		<div className={styles.doc}>
			<div className={styles.doc__title}>
				<h2>Пользовательское руководство</h2>
			</div>
			<Search/>
			<ArticleCard />
			<ArticleCard/>
		</div>
	)
}

export default DocumentationPage