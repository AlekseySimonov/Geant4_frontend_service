import React from "react";
import { Filter } from "@/shared/ui/components/filter";
import { IconButton, useMediaQuery } from "@mui/material";
import styles from "./_articleFilters.module.scss";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import type { FilterTypes } from "@/shared/ui/components/filter/model/types";
import { useArticleFilters } from "../model";
import { Search } from "@/shared/ui/components/search";

interface ArticleFiltersUrlProps {
	categories: FilterTypes[];
	chapters: FilterTypes[];
}

export const ArticleFiltersUrl: React.FC<ArticleFiltersUrlProps> = ({
	categories,
	chapters,
}) => {
	const isMobile = useMediaQuery('(max-width: 700px)')
	const {
		selectedCategory,
		selectedChapter,
		searchValue,
		handleCategoryChange,
		handleChapterChange,
		handleSearch,
		handleSearchSelect,
		handleReset,
		resetCategory,
		resetChapter,
		resetKey,
	} = useArticleFilters(categories, chapters);

	return (
		<div className={styles.filter}>
			<div className={styles.filter__filters}>
				<Search
					searchValue={searchValue}
					onSearch={handleSearch}
					onOptionSelect={handleSearchSelect}
					resetKey={resetKey}
				/>
				<Filter
					options={categories}
					label="Категории"
					width={isMobile ? '140px' : '230px'}
					onOptionSelect={handleCategoryChange}
					selectedOption={selectedCategory}
					onButtonReset={resetCategory}
				/>
				<Filter
					options={chapters}
					label="Разделы"
					width={isMobile ? '120px' : '200px'}
					onOptionSelect={handleChapterChange}
					selectedOption={selectedChapter}
					onButtonReset={resetChapter}
				/>

				{isMobile ? (
					<SecondaryButton label="Сбросить" onClick={handleReset} />
				) : (
					<IconButton onClick={handleReset} aria-label="Сбросить фильтры">
						<ClearRoundedIcon style={{ fontSize: 25 }} className={styles.articles__filter__reset} />
					</IconButton>
				)}
			</div>
		</div>
	);
};

