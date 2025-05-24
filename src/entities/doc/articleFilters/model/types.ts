import { FilterTypes } from "@/shared/ui/components/filter";

export interface ArticleFiltersProps {
	selectedCategory: FilterTypes | null;
	selectedChapter: FilterTypes | null;
	searchQuery: string;
	categories: FilterTypes[];
	chapters: FilterTypes[];
	onSearch: (text: string) => Promise<{ title: string, id: number }[]>;
	onSearchEnter: (text: string) => void;
	onCategoryChange: (category: FilterTypes) => void;
	onChapterChange: (chapter: FilterTypes) => void;
	onReset: () => void;
}