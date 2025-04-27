import { useGetCategoriesQuery, useGetChaptersQuery } from "@/pages/documentationPage/api/docApi";
import { useArticlesList } from "../model";
import styles from "./_articleList.module.scss"
import { ArticleCard } from "@/entities/doc";
import { Filter } from "@/shared/ui/components/filter";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import { Search } from "@/shared/ui/components/search";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';

const ArticlesList: React.FC = () => {
	const {
		articles,
		selectedCategory,
		selectedChapter,
		searchQuery,
		handleChapterChange,
		handleCategoryChange,
		handleReset,
		fetchSearchData,
		handleSearchEnter,
	} = useArticlesList();

	const { data: categories } = useGetCategoriesQuery()
	const { data: chapters } = useGetChaptersQuery()

	return (
		<div className={styles.articles}>
			<div className={styles.articles__title}>
				<h2>Пользовательское руководство</h2>
			</div>

			<div className={styles.articles__filter}>
				<Search
					onSearch={fetchSearchData}
					onOptionSelect={handleSearchEnter}
					searchValue={searchQuery}
				/>
				<Filter
					options={categories}
					label="Категории"
					width="230px"
					onOptionSelect={(title) => handleCategoryChange(title)}
					selectedOption={selectedCategory}
				/>
				<Filter
					options={chapters}
					label="Разделы"
					width="180px"
					onOptionSelect={(title) => handleChapterChange(title)}
					selectedOption={selectedChapter}
				/>
				<ClearRoundedIcon
					onClick={handleReset}
					style={{ fontSize: 30 }}
					className={styles.articles__filter__reset}
				/>
			</div>

			<div className={styles.articles__cards}>
				{articles.length > 0 ? (
					articles.map(article => (
						<ArticleCard key={article.id} title={article.title} />
					))
				) : (
					<h2>Ничего не найдено</h2>
				)}
			</div>
		</div>
	);
};

export default ArticlesList