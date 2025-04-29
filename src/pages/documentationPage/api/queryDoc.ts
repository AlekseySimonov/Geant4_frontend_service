import { docApi } from "./docApi";
import { ArticlesTypes } from "@/shared/types";
import { URLS } from "./urls";

interface QueryParamsTypes{
	query?: string;
	category?: string;
	chapter?: string;
	page?: number;
	page_size?: number;
	chosen?: boolean;
}

export const queryDoc = docApi.injectEndpoints({
	endpoints: (builder) => ({
		searchArticles: builder.query<ArticlesTypes[], QueryParamsTypes>({
			query: ({ query, category, chapter, page = 1, page_size = 1, chosen }) => ({
				url: URLS.ARTICLES,
				method: 'GET',
				params: {
					...(query && { query: query }),
					...(category && { category: category }),
					...(chapter && { chapter: chapter }),
					page,
					page_size,
					chosen,
				},
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useLazySearchArticlesQuery,
} = queryDoc;