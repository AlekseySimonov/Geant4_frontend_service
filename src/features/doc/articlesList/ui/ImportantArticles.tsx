import styles from "./_articleList.module.scss"
import { ArticleCard } from "@/entities/doc";
import { CircularProgress, Pagination } from "@mui/material";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import { useImportantArticles } from "../model";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";

const ImportantArticles: React.FC = () => {
	const { importantArticles: articles} = useImportantArticles();
	const { isLoading: globalLoading } = useSelector((state: RootState) => state.globalLoading);
	const navigate = useNavigate();

	return (
		<div className={styles.articles}>
			<div className={styles.articles__title}>
				<h2>Важные статьи</h2>
				<SecondaryButton label="Руководство" link = "/documentation/articles"/>
			</div>

			<div className={styles.articles__cards}>
				{globalLoading ? (
					<div className={styles.loadingContainer}><CircularProgress /></div>
				) : articles.length > 0 ? (
					<>
						{articles.map(article => (
							<ArticleCard
								key={article.id}
								title={article.title}
								description={article.description}
								category={article?.category || ''}
								chapter={article?.chapter || ''}
								onClick={() => navigate(`/documentation/articles/view/${article.id}`, {
									state: { from: location.pathname + location.search }
								})}
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