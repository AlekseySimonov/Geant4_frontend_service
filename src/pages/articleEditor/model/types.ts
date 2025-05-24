import { FilterTypes } from "@/shared/ui/components/filter/model/types";

export interface ArticleFiltersProps {
	categories?: FilterTypes[];
	chapters?: FilterTypes[];
	selectedCategory: FilterTypes | null;
	selectedChapter: FilterTypes | null;
	onCategoryChange: (value: FilterTypes) => void;
	onChapterChange: (value: FilterTypes) => void; 
	onEditCategoryClick: () => void;
	onEditChapterClick: () => void;
	categoryError?: boolean;
	chapterError?: boolean;
}