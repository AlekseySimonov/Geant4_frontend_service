import { useEffect, useState } from "react";
import { ArticlesTypes } from "@/shared/types";
import { useLazySearchArticlesQuery } from "@/pages/documentationPage/api/queryDoc";

export const useImportantArticles = () => {
	const [searchArticle] = useLazySearchArticlesQuery();

	const [page, setPage] = useState(1);
	const [importantArticles, setImportantArticles] = useState<ArticlesTypes[]>([]);

	useEffect(() => {
		const fetchImportant = async () => {
			const result = await searchArticle({
				chosen: true,
				page,
				page_size: 10,
			});

			if ('data' in result) {
				const filtered = result.data.filter((item: any) => !('pages_count' in item));
				setImportantArticles(filtered);
			}
		};

		fetchImportant();
	}, [page]);

	return {
		importantArticles,
		page,
		setPage,
	};
};