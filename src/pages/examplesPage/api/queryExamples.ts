import { URLS } from "./urls";
import { examplesApi } from "./examplesApi";
import { RawExampleResponse } from "@/shared/types";

interface QueryParamsTypes{
	query?: string;
	category?: string;
	tag?: string;
	ordering?: string;
	page?: number;
	page_size?: number;
}

export const queryExamples = examplesApi.injectEndpoints({
	endpoints: (builder) => ({
		searchExamples: builder.query<RawExampleResponse, QueryParamsTypes>({
			query: ({ query, category, tag, ordering, page = 1, page_size = 10}) => ({
				url: URLS.EXAMPLES,
				method: 'GET',
				params: {
					...(query && { query: query }),
					...(category && { category: category }),
					...(tag && { tags: tag }),
					...(ordering && { ordering }),
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