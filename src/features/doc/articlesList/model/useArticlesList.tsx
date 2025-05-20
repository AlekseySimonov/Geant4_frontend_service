import { useEffect, useState } from "react";
import { ArticlesTypes } from "@/shared/types";
import { useLazySearchArticlesQuery } from "@/pages/documentationPage/api/queryDoc";
import { FilterTypes } from "@/shared/ui/components/filter/model/types";

export const useArticlesList = () => {
	const [searchArticle] = useLazySearchArticlesQuery();

	const [page, setPage] = useState(1);
	const [pageCount, setPageCount] = useState(1);

	const [selectedCategory, setSelectedCategory] = useState<FilterTypes | null>(null);
	const [selectedChapter, setSelectedChapter] = useState<FilterTypes | null>(null);
	const [searchQuery, setSearchQuery] = useState<string>('');
	const [articles, setArticles] = useState<ArticlesTypes[]>([]);
	
	const fetchData = async (customPage = page,  customQuery = searchQuery) => {
		const result = await searchArticle({
			query: customQuery,
			category: selectedCategory?.title || '',
			chapter: selectedChapter?.title || '',
			page: customPage,
		});
		if ('data' in result) {
			const articles = result.data.filter((item: any) => !('pages_count' in item));
			const pageInfo = result.data.find((item: any) => 'pages_count' in item);
	
			setArticles(articles);
			if (pageInfo) {
				setPageCount(pageInfo.pages_count);
			}
		}
	};

	useEffect(() => {
		fetchData();
		window.scrollTo({
			top: 0,
			behavior: 'smooth',
		});
	}, [selectedCategory, selectedChapter, page]);

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

	const handleSearchEnter = async (selectedTitle: string) => {
		const result = await searchArticle({
			query: selectedTitle,
			category: selectedCategory?.title || '',
			chapter: selectedChapter?.title || '',
		});
		if ('data' in result) {
			const articles = result.data.filter((item: any) => !('pages_count' in item));
			setArticles(articles);
			setPage(1);
		}
	};

	const handleCategoryChange = (category: FilterTypes) => {
		setSelectedCategory(category);
		setPage(1);
	};
	
	const handleChapterChange = (chapter: FilterTypes) => {
		setSelectedChapter(chapter);
		setPage(1);
	};
	

	const handleReset = () => {
		setSelectedCategory(null);
		setSelectedChapter(null);
		setSearchQuery('');
		setPage(1)
		fetchData(1, '');
	};

	return {
		articles,
		selectedCategory,
		selectedChapter,
		searchQuery,
		page,
		pageCount,
		fetchSearchData,
		handleSearchEnter,
		handleCategoryChange,
		handleChapterChange,
		handleReset,
		setPage,
	};
};