import { docApi } from "./docApi";
import { ArticlesTypes } from "@/shared/types";
import { URLS } from "./urls";

export const queryDoc = docApi.injectEndpoints({
	endpoints: (builder) => ({
		searchArticles: builder.query<ArticlesTypes[], string>({
			query: (searchText) => ({
				url: URLS.ARTICLES,
				method: 'GET',
				params: {
					query: searchText,
				},
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useLazySearchArticlesQuery,
} = queryDoc;