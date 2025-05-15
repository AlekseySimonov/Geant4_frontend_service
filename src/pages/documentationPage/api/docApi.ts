import { ArticlesTypes } from "@/shared/types";
import { URLS } from "./urls";
import { createApi} from "@reduxjs/toolkit/query/react";
import { globalLoading } from "@/shared/model";
import { apiBaseQuery } from "@/shared/api";

export interface CategoryOrChapter {
	id?: number;
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
			getArticles: query<ArticlesTypes[], { page?: number; limit?: number }>({
				query: ({ page = 1, limit = 10 }) => ({
					url: `${URLS.ARTICLES}?page=${page}&limit=${limit}`,
					method: 'GET',
				}),
			}),
			getCategories: query<CategoryOrChapter[], void>({
				query: () => ({
					url: URLS.CATEGORIES,
					method: 'GET',
				}),
				providesTags: ['Doc'],
			}),
			getChapters: query<CategoryOrChapter[], void>({
				query: () => ({
					url: URLS.CHAPTERS,
					method: 'GET',
				}),
				providesTags: ['Doc'],
			}),
			getStaff: query<{is_staff: boolean}, void>({
				query: () => ({
					url: URLS.IS_STAFF,
					method: 'GET',
				}),
			}),
			postChapter: mutation({
				query: (body: CategoryOrChapter) => ({
					url: URLS.CHAPTERS,
					method: 'POST',
					body,
				}),
				invalidatesTags: ['Doc'],
			}),
			postCategory: mutation({
				query: (body: CategoryOrChapter) => ({
					url: URLS.CATEGORIES,
					method: 'POST',
					body,
				}),
				invalidatesTags: ['Doc'],
			}),
			postCategories: mutation({
				query: (body: CategoryOrChapter[]) => ({
					url: URLS.CATEGORIES_BULK_CREATE,
					method: 'POST',
					body,
				}),
				invalidatesTags: ['Doc'],
			}),
			deleteCategories: mutation({
				query: (ids: number[]) => ({
					url: URLS.CHAPTERS_BULK_DELETE,
					method: 'DELETE',
					body: ids,
				}),
				invalidatesTags: ['Doc'],
			}),
			postChapters: mutation({
				query: (body: CategoryOrChapter[]) => ({
					url: URLS.CHAPTERS_BULK_CREATE,
					method: 'POST',
					body,
				}),
				invalidatesTags: ['Doc'],
			}),
			deleteChapters: mutation({
				query: (ids: number[]) => ({
					url: URLS.CHAPTERS_BULK_DELETE,
					method: 'DELETE',
					body: ids,
				}),
				invalidatesTags: ['Doc'],
			}),
		};
	},
});

export const {
	useGetCategoriesQuery,
	useGetChaptersQuery,
	useGetArticlesQuery,
	useGetStaffQuery,
	usePostCategoryMutation,
	usePostChapterMutation,
	usePostCategoriesMutation,
	usePostChaptersMutation,
	useDeleteCategoriesMutation,
	useDeleteChaptersMutation,
} = docApi;