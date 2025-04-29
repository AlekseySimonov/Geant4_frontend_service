import { useEffect, useState } from "react";
import { ArticlesTypes } from "@/shared/types";
import { useLazySearchArticlesQuery } from "@/pages/documentationPage/api/queryDoc";

export const useArticlesList = () => {
	const [searchArticle] = useLazySearchArticlesQuery();

	const [page, setPage] = useState(1);

	const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
	const [selectedChapter, setSelectedChapter] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [articles, setArticles] = useState<ArticlesTypes[]>([]);

	useEffect(() => {
		const fetchData = async () => {
			const result = await searchArticle({
				query: searchQuery,
				category: selectedCategory,
				chapter: selectedChapter,
				page: page,
			});
			if ('data' in result) {
				setArticles(result.data);
			}
		};
		fetchData();
	}, [selectedCategory, selectedChapter]);

	const fetchSearchData = async (searchText: string) => {
		setSearchQuery(searchText);
	
		if (!searchText) {
			return [];
		}
		const result = await searchArticle({ query: searchText });

		if ('data' in result) {
			const articles = result.data.map(article => ({
				id: article.id,
				title: article.title,
			}));
			return articles;
		}

		return [];
	};

	const handleSearchEnter = async () => {
		const result = await searchArticle({ query: searchQuery, category: selectedCategory, chapter: selectedChapter });
		if ('data' in result) {
			setArticles(result.data);
			setPage(1)
		}
	};

	const handleCategoryChange = (categoryTitle: string) => {
		setSelectedCategory(categoryTitle);
		setPage(1)
	};

	const handleChapterChange = (chapterTitle: string) => {
		setSelectedChapter(chapterTitle);
		setPage(1)
	};

	const handleReset = () => {
		setSelectedCategory(null);
		setSelectedChapter(null);
		setSearchQuery('');
		setPage(1)
	};

	return {
		articles,
		selectedCategory,
		selectedChapter,
		searchQuery,
		fetchSearchData,
		handleSearchEnter,
		handleCategoryChange,
		handleChapterChange,
		handleReset,
	};
};