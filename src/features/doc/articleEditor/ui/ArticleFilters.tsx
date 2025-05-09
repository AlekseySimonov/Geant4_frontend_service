import { useMediaQuery } from "@mui/material";
import { Filter } from "@/shared/ui/components/filter";
import styles from "./_articleEditor.module.scss";
import { FilterTypes } from '@/shared/ui/components/filter/types/types';

interface ArticleFiltersProps {
	categories?: FilterTypes[];
	chapters?: FilterTypes[];
	selectedCategory: FilterTypes | null;
	selectedChapter: FilterTypes | null;
	onCategoryChange: (value: FilterTypes) => void;
	onChapterChange: (value: FilterTypes) => void; 
	onEditCategoryClick: () => void;
	onEditChapterClick: () => void;
}

export const ArticleFilters: React.FC<ArticleFiltersProps> = ({
	categories = [],
	chapters = [],
	selectedCategory,
	selectedChapter,
	onCategoryChange,
	onChapterChange,
	onEditCategoryClick,
	onEditChapterClick
}) => {
	const isMobile = useMediaQuery('(max-width: 700px)');

	return (
		<div className={styles.editor__filters}>
			<Filter
				options={categories}
				label="Категории"
				width={isMobile ? '140px' : '230px'}
				onOptionSelect={onCategoryChange}
				selectedOption={selectedCategory}
				onAddButtonClick={onEditCategoryClick}
			/>
			<Filter
				options={chapters}
				label="Разделы"
				width={isMobile ? '120px' : '200px'}
				onOptionSelect={onChapterChange}
				selectedOption={selectedChapter}
				onAddButtonClick={onEditChapterClick}
			/>
		</div>
	);
};