import { URLS } from "./urls";
import { createApi } from "@reduxjs/toolkit/query/react";
import { globalLoading } from "@/shared/model";
import { apiBaseQuery } from "@/shared/api";
import { Example, ExampleBaseTypes } from "@/shared/types";

export interface CategoryOrChapter {
	id?: number;
	title: string;
}

const API_URL = process.env.API_BASE_URL

export const examplesApi = createApi({
	reducerPath: 'examplesApi',
	baseQuery: apiBaseQuery(process.env.API_BASE_URL),
	tagTypes: ['Examples'],
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
			getExamples: query<Example[], { page?: number; limit?: number }>({
				query: ({ page = 1, limit = 10 }) => ({
					url: `${URLS.EXAMPLES}?page=${page}&limit=${limit}`,
					method: 'GET',
				}),
			}),
			getExample: query<Example, number>({
				query: (id: number) => ({
					url: `${URLS.EXAMPLES}${id}`,
					method: 'GET',
				}),
				providesTags: (id: number) => [{ type: 'Examples' as const, id }],
			}),
			getGraphs: mutation<Blob, number>({
				queryFn: async (id, api, extraOptions, baseQuery) => {
					const res = await fetch(`${API_URL}/${URLS.EXAMPLES}${id}/example_geant/`, {
						method: 'POST',
						credentials: 'include',
						headers: {
							'Content-Type': 'application/zip',
						},
						body: "",
					});
					if (!res.ok) {
						return { error: { status: res.status, data: await res.text() } };
					}
					const blob = await res.blob();
					return { data: blob };
				},
			}),
			getTags: query<CategoryOrChapter[], void>({
				query: () => ({
					url: URLS.TAGS,
					method: 'GET',
				}),
			}),

		};
	},
});

export const {
	useGetExamplesQuery,
	useLazyGetExamplesQuery,
	useGetExampleQuery,
	useGetGraphsMutation,
	useGetTagsQuery,
} = examplesApi;