import React, { useEffect, useState, useCallback } from "react";
import { useGetCategoriesQuery, useGetChaptersQuery } from "@/pages/documentationPage/api/docApi";
import styles from "./_examplesList.module.scss";
import { FiltersUrl } from "@/entities"
import { ArticleCard } from "@/entities/doc";
import { CircularProgress, Pagination } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { queryExamples } from "@/pages/examplesPage";
import { Example, RawExampleResponse } from "@/shared/types";

const ExamplesList: React.FC = () => {
	const { data: categories = [] } = useGetCategoriesQuery();
	const { data: chapters = [] } = useGetChaptersQuery();

	const [searchParams] = useSearchParams();
	const navigate = useNavigate();

	const [searchExamples, { isFetching }] = queryExamples.useLazySearchExamplesQuery();
	const { isLoading: globalLoading } = useSelector((state: RootState) => state.globalLoading);

	const [examples, setExamples] = useState([]);
	const [pageCount, setPageCount] = useState(1);

	const categoryParam = searchParams.get("category");
	const chapterParam = searchParams.get("chapter");
	const searchParam = searchParams.get("query");
	const pageParam = parseInt(searchParams.get("page") || "1", 10);

	const fetchArticles = useCallback(async () => {
		const result = await searchExamples({
			category: categoryParam || '',
			chapter: chapterParam || '',
			query: searchParam || '',
			page: pageParam || 1,
		});

		if ('data' in result && Array.isArray(result.data)) {
			const rawData = result.data as RawExampleResponse;

			const pageCountEntry = rawData.find(
				(item): item is { pages_count: number } => 'pages_count' in item
			);

			const examplesData = rawData.filter(
				(item): item is Example => 'id' in item
			);

			setExamples(examplesData);
			setPageCount(pageCountEntry?.pages_count || 1);
		}
	}, [searchExamples, categoryParam, chapterParam, searchParam, pageParam]);


	useEffect(() => {
		fetchArticles();
		window.scrollTo({ top: 0, behavior: "smooth" });
	}, [fetchArticles]);

	return (

		<div className={styles.examples}>
			<div className={styles.examples__title}>
				<h2>Моделирование</h2>
				<div>
				</div>
			</div>

			<FiltersUrl
				categories={categories}
				chapters={chapters}
				searchQuery={searchExamples}
				mapItem={(example) => ({ id: example.id, title: example.title })}
			/>

			<div className={styles.examples__cards}>
				{(isFetching && !globalLoading) ? (
					<div className={styles.loadingContainer}><CircularProgress /></div>
				) : examples.length > 0 ? (
					<>
						{examples.map(example => (
							<ArticleCard
								key={example.id}
								title={example.title}
								description={example.description}
								category={example?.category || ''}
								chapter={example?.chapter || ''}
								onClick={() => navigate(`/modeling/examples/${example.id}`, {
									state: { from: location.pathname + location.search }
								})}
							/>
						))}
						<div className={styles.examples__cards__pagination}>
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
	);
};

export default ExamplesList;
