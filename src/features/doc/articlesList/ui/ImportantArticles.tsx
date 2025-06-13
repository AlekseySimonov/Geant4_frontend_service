import styles from "./_articleList.module.scss"
import { ArticleCard } from "@/entities/doc";
import { CircularProgress, Pagination } from "@mui/material";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import { useNavigate } from "react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { useGetFavoritesQuery } from "@/pages/documentationPage/api/docApi";

const ImportantArticles: React.FC = () => {
	const { data: articles} = useGetFavoritesQuery();
	const { isLoading: globalLoading } = useSelector((state: RootState) => state.globalLoading);
	const navigate = useNavigate();

	return (
		<div className={styles.articles}>
			<div className={styles.articles__title}>
				<h2>Избранные статьи</h2>
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
					</>
				) : (
					<h2>Ничего не найдено</h2>
				)}
			</div>
		</div>
	);
};

export default ImportantArticles