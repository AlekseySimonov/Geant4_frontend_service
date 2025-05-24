import { useGetCategoriesQuery, useGetChaptersQuery, useGetStaffQuery } from "@/pages/documentationPage/api/docApi";
import { useArticlesList, useImportantArticles } from "../model";
import styles from "./_articleList.module.scss"
import { ArticleCard, ArticleFilters, ImportantArticleCard } from "@/entities/doc";
import { IconButton, Pagination, useMediaQuery } from "@mui/material";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { useNavigate } from "react-router";

const ArticlesList: React.FC = () => {
	const {
		articles,
		selectedCategory,
		selectedChapter,
		searchQuery,
		page,
		pageCount,
		handleChapterChange,
		handleCategoryChange,
		handleReset,
		fetchSearchData,
		handleSearchEnter,
		setPage,
	} = useArticlesList();

	const { importantArticles } = useImportantArticles();
	const { data: categories = [] } = useGetCategoriesQuery();
	const { data: chapters = [] } = useGetChaptersQuery();
	const { data: isStaff } = useGetStaffQuery()

	const isWideScreen = useMediaQuery('(min-width:1350px)')
	const navigate = useNavigate()

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
								<AddRoundedIcon style={{ fontSize: 30 }}/>
							</IconButton>
						)}
					</div>
				</div>

				<ArticleFilters
					selectedCategory={selectedCategory}
					selectedChapter={selectedChapter}
					searchQuery={searchQuery}
					categories={categories}
					chapters={chapters}
					onSearch={fetchSearchData}
					onSearchEnter={handleSearchEnter}
					onCategoryChange={handleCategoryChange}
					onChapterChange={handleChapterChange}
					onReset={handleReset}
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
									onClick={() => navigate(`/documentation/articles/${article.id}`)}
								/>
							))}
							{articles.length > 0 && (
								<div className={styles.articles__cards__pagination}>
									<Pagination
										count={pageCount}
										page={page}
										onChange={(_, value) => setPage(value)}
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
		</div>
	);
};

export default ArticlesList