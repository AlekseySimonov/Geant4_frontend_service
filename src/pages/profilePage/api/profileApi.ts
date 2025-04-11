import { ProfileTypes } from "@/shared/types";
import { URLS } from "./urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: fetchBaseQuery({
		baseUrl: process.env.API_BASE_URL,
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include",
	}),
	tagTypes: ['Profile'],
	endpoints: (builder) => ({
		getProfile: builder.query<ProfileTypes, void>({
			query: () => ({
				url: URLS.PROFILE,
				method: 'GET',
			}),
			providesTags: ['Profile'],
		}),
		patchProfile: builder.mutation<ProfileTypes, ProfileTypes>({
			query: (body) => ({
				url: URLS.PROFILE,
				method: 'PATCH',
				body,
			}),
			invalidatesTags: ['Profile'],
		}),
	}),
});

export const {
	useGetProfileQuery,
	usePatchProfileMutation,
} = profileApi