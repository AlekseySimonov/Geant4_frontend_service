import { docApi } from "./docApi";
import { ArticlesTypes } from "@/shared/types";
import { URLS } from "./urls";

export const queryDoc = docApi.injectEndpoints({
	endpoints: (builder) => ({
		searchArticles: builder.query<ArticlesTypes[], { query?: string; category?: string; chapter?: string }>({
			query: ({ query, category, chapter }) => ({
				url: URLS.ARTICLES,
				method: 'GET',
				params: {
					...(query && { query: query }),
					...(category && { category: category }),
					...(chapter && { chapter: chapter }),
				},
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useLazySearchArticlesQuery,
} = queryDoc;