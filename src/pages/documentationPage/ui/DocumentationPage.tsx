import styles from "./_docPage.module.scss"
import ArticleCard from '@/entities/doc/exampleCard/ui/ArticleCard';

const DocumentationPage: React.FC = () => {
	return (
		<div className={styles.doc}>
			<div className={styles.doc__title}>
				<h2>Пользовательское руководство</h2>
			</div>
			<ArticleCard />
			<ArticleCard/>
		</div>
	)
}

export default DocumentationPage