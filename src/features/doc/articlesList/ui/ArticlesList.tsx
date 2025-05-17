import { useGetCategoriesQuery, useGetChaptersQuery, useGetStaffQuery } from "@/pages/documentationPage/api/docApi";
import { useArticlesList, useImportantArticles } from "../model";
import styles from "./_articleList.module.scss"
import { ArticleCard, ImportantArticleCard } from "@/entities/doc";
import { Filter } from "@/shared/ui/components/filter";
import { Search } from "@/shared/ui/components/search";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
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
	const isMobile = useMediaQuery('(max-width: 700px)');
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
							<IconButton className={styles.articles__title__addArticle}>
								<AddRoundedIcon
									style={{ fontSize: 30 }}
									onClick={() => navigate('/documentation/articles/editor')}
								/>
							</IconButton>
						)}
					</div>
				</div>

				<div className={styles.articles__filter}>
					<Search
						onSearch={fetchSearchData}
						onOptionSelect={handleSearchEnter}
						searchValue={searchQuery}
					/>
					<div className={styles.articles__filter__filters}>
						<Filter
							options={categories}
							label="Категории"
							width={isMobile ? '140px' : '230px'}
							onOptionSelect={handleCategoryChange}
							selectedOption={selectedCategory}
						/>

						<Filter
							options={chapters}
							label="Разделы"
							width={isMobile ? '120px' : '200px'}
							onOptionSelect={handleChapterChange}
							selectedOption={selectedChapter}
						/>
						{isMobile ? (
							<SecondaryButton
								label="Сбросить"
								onClick={handleReset}
							/>
						) : (
							<IconButton>
								<ClearRoundedIcon
									onClick={handleReset}
									style={{ fontSize: 30 }}
									className={styles.articles__filter__reset}
								/>
							</IconButton>
						)}
					</div>
				</div>

				<div className={styles.articles__cards}>
					{articles.length > 0 ? (
						<>
							{articles.map(article => (
								<ArticleCard
									key={article.id}
									title={article.title}
									description={article.description}
									category={categories.find(c => c.id === article.category)?.title || ''}
									chapter={chapters.find(c => c.id === article.category)?.title || ''}
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