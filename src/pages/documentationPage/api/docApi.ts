import { ArticlesTypes } from "@/shared/types";
import { URLS } from "./urls";
import { createApi} from "@reduxjs/toolkit/query/react";
import { globalLoading } from "@/shared/model";
import { apiBaseQuery } from "@/shared/api";

export interface CategoryOrChapter {
	id: number;
	title: string;
}

export const docApi = createApi({
	reducerPath: 'docApi',
	baseQuery: apiBaseQuery(process.env.API_BASE_URL),
	tagTypes: ['Doc'],
	endpoints: (builder) => {
		const mutation = (options: any) =>
			builder.mutation({
				...options,
				onQueryStarted: globalLoading,
			});

		const query = <TData, TArgs>(options: any) =>
			builder.query<TData, TArgs>({
				...options,
				onQueryStarted: globalLoading,
			});

		return {
			getArticles: query<ArticlesTypes[], void>({
				query: () => ({
					url: URLS.ARTICLES,
					method: 'GET',
				}),
			}),
			getCategories: query<CategoryOrChapter[], void>({
				query: () => ({
					url: URLS.CATEGORIES,
					method: 'GET',
				}),
			}),
			getChapters: query<CategoryOrChapter[], void>({
				query: () => ({
					url: URLS.CHAPTERS,
					method: 'GET',
				}),
			}),
		};
	},
});

export const {
	useGetCategoriesQuery,
	useGetChaptersQuery,
	useGetArticlesQuery,
} = docApi;