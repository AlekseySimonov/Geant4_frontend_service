import { URLS } from "./urls";
import { createApi } from "@reduxjs/toolkit/query/react";
import { globalLoading } from "@/shared/model";
import { apiBaseQuery } from "@/shared/api";
import { ExamplesList } from "@/shared/types";

export interface CategoryOrChapter {
	id?: number;
	title: string;
}

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
			getExamples: query<ExamplesList, { page?: number; limit?: number }>({
				query: ({ page = 1, limit = 10 }) => ({
					url: `${URLS.EXAMPLES}?page=${page}&limit=${limit}`,
					method: 'GET',
				}),
			}),
		};
	},
});

export const {
	useGetExamplesQuery,
	useLazyGetExamplesQuery,
} = examplesApi;