import { Filter } from "@/shared/ui/components/filter";
import { Search } from "@/shared/ui/components/search";
import { IconButton, useMediaQuery } from "@mui/material";
import styles from "./_articleFilters.module.scss"
import { SecondaryButton } from "@/shared/ui/components/buttons";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { ArticleFiltersProps } from "../model/types";

export const ArticleFilters: React.FC<ArticleFiltersProps> = ({
	selectedCategory,
	selectedChapter,
	searchQuery,
	categories,
	chapters,
	onSearch,
	onSearchEnter,
	onCategoryChange,
	onChapterChange,
	onReset
}) => {
	const isMobile = useMediaQuery('(max-width: 700px)');

	return (
		<div className={styles.filter}>
			<Search
				onSearch={onSearch}
				onOptionSelect={onSearchEnter}
				searchValue={searchQuery}
			/>
			<div className={styles.filter__filters}>
				<Filter
					options={categories}
					label="Категории"
					width={isMobile ? '140px' : '230px'}
					onOptionSelect={onCategoryChange}
					selectedOption={selectedCategory}
				/>
				<Filter
					options={chapters}
					label="Разделы"
					width={isMobile ? '120px' : '200px'}
					onOptionSelect={onChapterChange}
					selectedOption={selectedChapter}
				/>
				{isMobile ? (
					<SecondaryButton label="Сбросить" onClick={onReset} />
				) : (
					<IconButton onClick={onReset}>
						<ClearRoundedIcon style={{ fontSize: 30 }} className={styles.articles__filter__reset} />
					</IconButton>
				)}
			</div>
		</div>
	);
};