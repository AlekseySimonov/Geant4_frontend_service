import { URLS } from "./urls";
import { examplesApi } from "./examplesApi";
import { RawExampleResponse } from "@/shared/types";

interface QueryParamsTypes{
	query?: string;
	category?: string;
	tag?: string;
	page?: number;
	page_size?: number;
}

export const queryExamples = examplesApi.injectEndpoints({
	endpoints: (builder) => ({
		searchExamples: builder.query<RawExampleResponse, QueryParamsTypes>({
			query: ({ query, category, tag, page = 1, page_size = 10}) => ({
				url: URLS.EXAMPLES,
				method: 'GET',
				params: {
					...(query && { query: query }),
					...(category && { category: category }),
					...(tag && { tags: tag }),
					page,
					page_size,
				},
			}),
		}),
	}),
	overrideExisting: false,
});

export const {
	useLazySearchExamplesQuery,
} = queryExamples;