import styles from "./_articleList.module.scss"
import { ArticleCard } from "@/entities/doc";
import { Pagination } from "@mui/material";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import { useImportantArticles } from "../model";

const ImportantArticles: React.FC = () => {
	const {
		importantArticles,
	} = useImportantArticles();

	const articles = importantArticles

	return (
		<div className={styles.articles}>
			<div className={styles.articles__title}>
				<h2>Важные статьи</h2>
				<SecondaryButton label="Руководство" link = "/documentation/articles"/>
			</div>

			<div className={styles.articles__cards}>
				{articles.length > 0 ? (
					<>
						{articles.map(article => (
							<ArticleCard
								key={article.id}
								title={article.title}
								description={article.description}
								category={article.category}
								chapter={article.chapter}
							/>
						))}
						{articles.length > 9 && (
							<div className={styles.articles__cards__pagination}>
								<Pagination
									count={10}
									color="primary"
									variant="outlined"
									shape="rounded"
									size="small"
									sx={{
										'& .MuiPaginationItem-root': {
											color: 'var(--mui-palette-primary-main)',
											border: 'none'
										},
									}}
								/>
							</div>
						)}
					</>
				) : (
					<h2>Ничего не найдено</h2>
				)}
			</div>
		</div>
	);
};

export default ImportantArticles