
import { URLS } from "./urls";
import { profileApi } from "./profileApi";
import { RawMyExamplesResponse } from "@/shared/types";

interface QueryParamsTypes{
	query?: string;
	category?: string;
	tag?: string;
	page?: number;
	ordering?: string;
	page_size?: number;
}

export const queryProfile = profileApi.injectEndpoints({
	endpoints: (builder) => ({
		searchMyExamples: builder.query<RawMyExamplesResponse, QueryParamsTypes>({
			query: ({ query, category, ordering, tag, page = 1, page_size = 10}) => ({
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
	useLazySearchMyExamplesQuery,
} = queryProfile;