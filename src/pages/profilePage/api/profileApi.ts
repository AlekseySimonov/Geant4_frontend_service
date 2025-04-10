import { URLS } from "./urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_BASE_URL,
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include"
	}),
	tagTypes: ['Profile'],
	endpoints: (builder) => ({
		getProfile: builder.query<void, void>({
			query: () => ({
				url: URLS.PROFILE,
				method: 'GET',
			}),
		}),
	})
})

export const {
	useGetProfileQuery,
} = profileApi