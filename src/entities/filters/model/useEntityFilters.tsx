import { useSearchParams } from "react-router";
import { useState } from "react";
import type { FilterTypes } from "@/shared/ui/components/filter/model/types";

type LazyQueryTrigger<T extends (...args: any) => any> = ReturnType<T>[0];

interface UseEntityFiltersProps<
	T extends (...args: any) => any,
	ResultItem = any,
	TransformedItem = { id: number; title: string }
> {
	tags?: FilterTypes[];
	categories: FilterTypes[];
	chapters?: FilterTypes[];
	searchQuery: LazyQueryTrigger<T>;
	mapItem: (item: ResultItem) => TransformedItem;
}

export const useEntityFilters = <
	T extends (...args: any) => any,
	ResultItem = any,
	TransformedItem = { id: number; title: string }
>({
	tags,
	categories,
	chapters,
	searchQuery,
	mapItem,
}: UseEntityFiltersProps<T, ResultItem, TransformedItem>) => {
	const [searchParams, setSearchParams] = useSearchParams();
	const [resetKey, setResetKey] = useState(0);

	const categoryParam = searchParams.get("category");
	const chapterParam = searchParams.get("chapter");
	const tagParam = searchParams.get("tags");
	const searchParam = searchParams.get("query") || "";

	const selectedTag = tags?.find((c) => c.title === tagParam) || null;
	const selectedCategory = categories?.find((c) => c.title === categoryParam) || null;
	const selectedChapter = chapters?.find((c) => c.title === chapterParam) || null;

	const updateParams = (params: Partial<Record<string, string | null>>) => {
		const newParams = new URLSearchParams(searchParams);
		Object.entries(params).forEach(([key, value]) => {
			if (!value?.trim()) {
				newParams.delete(key);
			} else {
				newParams.set(key, value);
			}
		});
		newParams.set("page", "1");
		setSearchParams(newParams, { replace: true });
	};

	const handleTagChange = (tag: FilterTypes) => {
		updateParams({ tag: tag.title });
	};

	const handleCategoryChange = (category: FilterTypes) => {
		updateParams({ category: category.title });
	};

	const handleChapterChange = (chapter: FilterTypes) => {
		updateParams({ chapter: chapter.title });
	};

	const handleSearch = async (searchText: string): Promise<TransformedItem[]> => {
		if (!searchText.trim()) return [];

		const result = await searchQuery({ query: searchText.trim() });

		if ("data" in result && Array.isArray(result.data)) {
			return result.data.map(mapItem);
		}

		return [];
	};

	const handleSearchSelect = (title: string) => {
		updateParams({ query: title });
	};

	const handleReset = () => {
		setResetKey((prev) => prev + 1);
		setSearchParams({}, { replace: true });
	};

	const resetTag = () => updateParams({ tags: null });
	const resetCategory = () => updateParams({ category: null });
	const resetChapter = () => updateParams({ chapter: null });

	return {
		selectedCategory,
		selectedChapter,
		selectedTag,
		searchValue: searchParam,

		handleCategoryChange,
		handleChapterChange,
		handleTagChange,
		handleSearch,
		handleSearchSelect,

		handleReset,
		resetCategory,
		resetChapter,
		resetTag,
		resetKey,
	};
};



