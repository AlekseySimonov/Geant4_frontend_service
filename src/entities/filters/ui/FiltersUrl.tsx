import React from "react";
import { Filter } from "@/shared/ui/components/filter";
import { IconButton, useMediaQuery } from "@mui/material";
import styles from "./_filters.module.scss";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import type { FilterTypes } from "@/shared/ui/components/filter/model/types";
import { Search } from "@/shared/ui/components/search";
import { useEntityFilters } from "../model";

type LazyQueryTrigger<T extends (...args: any) => any> = ReturnType<T>[0];

interface FiltersUrlProps<TEntity extends { id: number; title: string }> {
	categories: FilterTypes[];
	chapters: FilterTypes[];
	searchQuery: LazyQueryTrigger<(params: { query: string }) => Promise<{ data: TEntity[] }>>;
	mapItem: (item: TEntity) => { id: number; title: string };
}

export function FiltersUrl<TEntity extends { id: number; title: string }>({
	categories,
	chapters,
	searchQuery,
	mapItem,
}: FiltersUrlProps<TEntity>) {
	const isMobile = useMediaQuery('(max-width: 700px)');

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
	} = useEntityFilters({
		categories,
		chapters,
		searchQuery,
		mapItem,
	});

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
}

