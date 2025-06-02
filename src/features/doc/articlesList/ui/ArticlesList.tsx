import React, { useEffect, useState, useCallback } from "react";
import { useGetCategoriesQuery, useGetChaptersQuery, useGetStaffQuery } from "@/pages/documentationPage/api/docApi";
import { useImportantArticles } from "../model";
import styles from "./_articleList.module.scss";
import { ArticleCard, ArticleFiltersUrl, ImportantArticleCard } from "@/entities/doc";
import { IconButton, Pagination, useMediaQuery } from "@mui/material";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate, useSearchParams } from "react-router";
import { useLazySearchArticlesQuery } from "@/pages/documentationPage/api/queryDoc";

const ArticlesList: React.FC = () => {
	const { importantArticles } = useImportantArticles();
	const { data: categories = [] } = useGetCategoriesQuery();
	const { data: chapters = [] } = useGetChaptersQuery();
	const { data: isStaff } = useGetStaffQuery();

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();
	const isWideScreen = useMediaQuery('(min-width:1350px)');

	const [searchArticle] = useLazySearchArticlesQuery();

	const [articles, setArticles] = useState([]);
	const [pageCount, setPageCount] = useState(1);

	const categoryParam = searchParams.get("category");
	const chapterParam = searchParams.get("chapter");
	const searchParam = searchParams.get("query");
	const pageParam = parseInt(searchParams.get("page") || "1", 10);

	const fetchArticles = useCallback(async () => {
		const result = await searchArticle({
			category: categoryParam || '',
			chapter: chapterParam || '',
			query: searchParam || '',
			page: pageParam || 1,
		});

		if ('data' in result) {
			const articlesData = result.data.filter((item: any) => !('pages_count' in item));
			const pageInfo = result.data.find((item: any) => 'pages_count' in item);

			setArticles(articlesData);
			setPageCount(pageInfo?.pages_count || 1);
		}
	}, [searchArticle, categoryParam, chapterParam, searchParam, pageParam]);

	useEffect(() => {
		fetchArticles();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [fetchArticles]);

	return (
		<div className={styles.content}>
			<div className={styles.content__cards}>
				{isWideScreen && (
					<div className={styles.importantCards}>
						{importantArticles.map(article => (
							<ImportantArticleCard
								key={article.id}
								title={article.title}
								description={article.description}
								onClick={() => navigate(`/documentation/articles/view/${article.id}`, {
									state: { from: location.pathname + location.search }
								})}
							/>
						))}
					</div>
				)}
			</div>

			<div className={styles.articles}>
				<div className={styles.articles__title}>
					<h2>Пользовательское руководство</h2>
					<div>
						{!isWideScreen && (
							<SecondaryButton label="Важные статьи" link="/documentation/articles/important" />
						)}

						{isStaff?.is_staff && (
							<IconButton
								className={styles.articles__title__addArticle}
								onClick={() => navigate('/documentation/articles/editor')}
							>
								<AddRoundedIcon style={{ fontSize: 30 }} />
							</IconButton>
						)}
					</div>
				</div>

				<ArticleFiltersUrl
					categories={categories}
					chapters={chapters}
				/>

				<div className={styles.articles__cards}>
					{articles.length > 0 ? (
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
							<div className={styles.articles__cards__pagination}>
								<Pagination
									count={pageCount}
									page={pageParam}
									onChange={(_, value) => {
										const newParams = new URLSearchParams(searchParams);
										newParams.set('page', value.toString());
										navigate({ search: newParams.toString() }, { replace: true });
									}}
									color="primary"
									variant="outlined"
									shape="rounded"
									size="small"
									sx={{
										'& .MuiPaginationItem-root': {
											color: 'var(--mui-palette-primary-main)',
											border: 'none',
										},
									}}
								/>
							</div>
						</>
					) : (
						<h2>Ничего не найдено</h2>
					)}
				</div>
			</div>
		</div>
	);
};

export default ArticlesList;
