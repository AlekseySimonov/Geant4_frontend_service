import { useMediaQuery } from "@mui/material";
import { Filter, useFilter } from "@/shared/ui/components/filter";
import styles from "./_articleEditor.module.scss";
import { FilterTypes } from '@/shared/ui/components/filter/types/types';

interface ArticleFiltersProps {
	categories?: FilterTypes[];
	chapters?: FilterTypes[];
	selectedCategory: string;
	selectedChapter: string;
	onCategoryChange: (value: string) => void;
	onChapterChange: (value: string) => void;
	onAddCategoryClick: () => void;
	onAddChapterClick: () => void;
}

export const ArticleFilters: React.FC<ArticleFiltersProps> = ({
	categories = [],
	chapters = [],
	selectedCategory,
	selectedChapter,
	onCategoryChange,
	onChapterChange,
	onAddCategoryClick,
	onAddChapterClick
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
				addButtonText="Добавить категорию"
				onAddButtonClick={onAddCategoryClick}
			/>
			<Filter
				options={chapters}
				label="Разделы"
				width={isMobile ? '120px' : '200px'}
				onOptionSelect={onChapterChange}
				selectedOption={selectedChapter}
				addButtonText="Добавить раздел"
				onAddButtonClick={onAddChapterClick}
			/>
		</div>
	);
};