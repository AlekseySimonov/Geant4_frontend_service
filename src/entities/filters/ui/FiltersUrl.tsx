import { Filter } from "@/shared/ui/components/filter";
import { IconButton, useMediaQuery } from "@mui/material";
import styles from "./_filters.module.scss";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import type { FilterTypes } from "@/shared/ui/components/filter/model/types";
import { Search } from "@/shared/ui/components/search";
import { getOrderingLabel, useEntityFilters } from "../model";

type LazyQueryTrigger<T extends (...args: any) => any> = ReturnType<T>[0];

interface FiltersUrlProps<TEntity extends { id: number; title: string }> {
	categories: FilterTypes[];
	chapters?: FilterTypes[];
	tags?: FilterTypes[];
	showOrdering?: boolean;
	searchQuery: LazyQueryTrigger<(params: { query: string }) => Promise<{ data: TEntity[] }>>;
	mapItem: (item: TEntity) => { id: number; title: string };
}

export function FiltersUrl<TEntity extends { id: number; title: string }>({
	categories,
	chapters,
	tags,
	searchQuery,
	showOrdering = true,
	mapItem,
}: FiltersUrlProps<TEntity>) {
	const isMobile = useMediaQuery('(max-width: 1000px)');

	const {
		selectedCategory,
		selectedChapter,
		selectedTag,
		searchValue,
		ordering,
		handleTagChange,
		handleCategoryChange,
		handleChapterChange,
		handleOrderingChange,
		handleSearch,
		handleSearchSelect,
		handleReset,
		resetTag,
		resetCategory,
		resetChapter,
		resetKey,
	} = useEntityFilters({
		categories,
		tags,
		chapters,
		searchQuery,
		mapItem,
	});

	return (
		<div className={styles.filter}>
			<Search
				searchValue={searchValue}
				onSearch={handleSearch}
				onOptionSelect={handleSearchSelect}
				resetKey={resetKey}
			/>
			<div className={styles.filter__filters}>
				{showOrdering && (
					<Filter
						options={[
							{ title: "По дате обновления ↓", value: "-date_to_update" },
							{ title: "По дате обновления ↑", value: "date_to_update" },
							{ title: "По названию A–Z", value: "title_verbose" },
							{ title: "По названию Z–A", value: "-title_verbose" },
						]}
						label="Сортировка"
						width={isMobile ? '140px' : '250px'}
						onOptionSelect={(opt) => handleOrderingChange(opt.value)}
						selectedOption={{ title: getOrderingLabel(ordering), value: ordering }}
						onButtonReset={() => handleOrderingChange("")}
					/>
				)}

				<Filter
					options={categories}
					label="Категории"
					width={isMobile ? '140px' : '230px'}
					onOptionSelect={handleCategoryChange}
					selectedOption={selectedCategory}
					onButtonReset={resetCategory}
				/>
				{chapters && <Filter
					options={chapters}
					label="Разделы"
					width={isMobile ? '120px' : '200px'}
					onOptionSelect={handleChapterChange}
					selectedOption={selectedChapter}
					onButtonReset={resetChapter}
				/>}
				{tags && <Filter
					options={tags}
					label="Теги"
					width={isMobile ? '120px' : '200px'}
					onOptionSelect={handleTagChange}
					selectedOption={selectedTag}
					onButtonReset={resetTag}
				/>}
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

