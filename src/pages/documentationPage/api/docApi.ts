import { ArticlesTypes } from "@/shared/types";
import { URLS } from "./urls";
import { createApi } from "@reduxjs/toolkit/query/react";
import { globalLoading } from "@/shared/model";
import { apiBaseQuery } from "@/shared/api";
import { ArticleResponse, ExtendedArticlesTypes } from "@/shared/types/articlesTypes";

export interface CategoryOrChapter {
	id?: number;
	title: string;
}

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const docApi = createApi({
	reducerPath: 'docApi',
	baseQuery: apiBaseQuery(process.env.API_BASE_URL),
	tagTypes: ['Doc'],
	endpoints: (builder) => {
		const mutation = <TData = any, TArgs = any>(options: Parameters<typeof builder.mutation<TData, TArgs>>[0]) =>
			builder.mutation<TData, TArgs>({
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
			getArticle: query<ArticleResponse, number>({
				query: (id: number) => ({
					url: `${URLS.ARTICLES}${id}`,
					method: 'GET',
				}),
				providesTags: (id: number) => [{ type: 'Doc' as const, id }],
			}),
			postArticle: mutation<ArticleResponse, ExtendedArticlesTypes>({
				query: (body) => ({
					url: URLS.ARTICLES,
					method: 'POST',
					body,
				}),
				invalidatesTags: ['Doc'],
			}),
			patchArticle: mutation<
				ArticleResponse,
				{ id: number; changes: Partial<ExtendedArticlesTypes> }
			>({
				query: ({ id, changes }) => ({
					url: `${URLS.ARTICLES}${id}`,
					method: 'PATCH',
					body: changes,
				}),
				invalidatesTags: ['Doc'],
			}),
			deleteArticle: mutation({
				query: (id: number) => ({
					url: `${URLS.ARTICLES}${id}`,
					method: 'DELETE',
				}),
				invalidatesTags: (id) => [{ type: 'Doc' as const, id }],
			}),
			uploadFile: mutation({
				query: ({ uploadUrl, file }: { uploadUrl: string; file: File }) => {
					const formData = new FormData();
					formData.append('file', file);
					return {
						url: uploadUrl,
						method: 'POST',
						body: formData,
					};
				},
			}),
			getGraph: query<string, string>({
				query: (url: string) => ({
					url: url,
					method: 'GET',
				}),
				responseHandler: (response: Response) => response.text(),
				providesTags: ['Doc'],
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
			getStaff: query<{ is_staff: boolean }, void>({
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
					url: URLS.CATEGORIES_BULK_DELETE,
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
	useGetArticleQuery,
	useDeleteArticleMutation,
	useGetStaffQuery,
	usePostCategoryMutation,
	usePostChapterMutation,
	usePostCategoriesMutation,
	usePostChaptersMutation,
	useDeleteCategoriesMutation,
	useDeleteChaptersMutation,
	usePostArticleMutation,
	usePatchArticleMutation,
	useUploadFileMutation,
	useGetGraphQuery,
} = docApi;