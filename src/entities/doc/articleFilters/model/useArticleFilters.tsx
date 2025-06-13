import { useSearchParams } from "react-router";
import type { FilterTypes } from "@/shared/ui/components/filter/model/types";
import { useLazySearchArticlesQuery } from "@/pages/documentationPage/api/queryDoc";
import { useState } from "react";

export const useArticleFilters = (categories: FilterTypes[], chapters: FilterTypes[]) => {
	const [searchArticle] = useLazySearchArticlesQuery();
	const [searchParams, setSearchParams] = useSearchParams();

	const [resetKey, setResetKey] = useState(0)

	const categoryParam = searchParams.get("category");
	const chapterParam = searchParams.get("chapter");
	const searchParam = searchParams.get("query") || "";

	const selectedCategory = categories.find(c => c.title === categoryParam) || null;
	const selectedChapter = chapters.find(c => c.title === chapterParam) || null;

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

	const handleCategoryChange = (category: FilterTypes) => {
		updateParams({ category: category.title });
	};

	const handleChapterChange = (chapter: FilterTypes) => {
		updateParams({ chapter: chapter.title });
	};

	const handleSearch = async (searchText: string) => {
		if (!searchText.trim()) return [];

		const result = await searchArticle({ query: searchText.trim() });

		if ("data" in result) {
			return result.data.map(article => ({
				id: article.id,
				title: article.title,
			}));
		}

		return [];
	};

	const handleSearchSelect = (title: string) => {
		updateParams({ query: title });
	};

	const handleReset = () => {
		setResetKey(prev => prev + 1)
		setSearchParams({}, { replace: true });
	};

	const resetCategory = () => updateParams({ category: null });
	const resetChapter = () => updateParams({ chapter: null });


	return {
		selectedCategory,
		selectedChapter,
		searchValue: searchParam,
		handleCategoryChange,
		handleChapterChange,
		handleSearch,
		handleSearchSelect,
		handleReset,
		resetCategory,
		resetChapter,
		resetKey
	};
};


