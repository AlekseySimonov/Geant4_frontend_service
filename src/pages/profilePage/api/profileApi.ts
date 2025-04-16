import { AvatarTypes, ProfileTypes } from "@/shared/types";
import { URLS } from "./urls";
import { createApi } from "@reduxjs/toolkit/query/react";
import { globalLoading } from "@/shared/model";
import { apiBaseQuery } from "@/shared/api";

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: apiBaseQuery(process.env.API_BASE_URL),
	tagTypes: ['Profile'],
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
			getProfile: query<ProfileTypes, void>({
				query: () => ({
					url: URLS.PROFILE,
					method: 'GET',
				}),
				providesTags: ['Profile'],
			}),

			patchProfile: mutation({
				query: (body: ProfileTypes) => ({
					url: URLS.PROFILE,
					method: 'PATCH',
					body,
				}),
				invalidatesTags: ['Profile'],
			}),

			getProfileAvatar: query<string, void>({
				query: () => ({
					url: URLS.PROFILE_IMAGE,
					method: 'GET',
					responseType: 'blob',
				}),
				providesTags: ['Profile'],
				keepUnusedDataFor: 300,
				transformResponse: async (response: Blob) => {
					return URL.createObjectURL(response);
				},
			}),

			postProfileAvatar: mutation({
				query: (body: AvatarTypes) => ({
					url: URLS.PROFILE_IMAGE,
					method: 'POST',
					body,
				}),
				invalidatesTags: ['Profile'],
			}),

			patchProfileAvatar: mutation({
				query: (body: AvatarTypes) => ({
					url: URLS.PROFILE_IMAGE,
					method: 'PATCH',
					body,
				}),
				invalidatesTags: ['Profile'],
			}),

		};
	},
});

export const {
	useGetProfileQuery,
	usePatchProfileMutation,
	useGetProfileAvatarQuery,
	usePostProfileAvatarMutation,
	usePatchProfileAvatarMutation,
} = profileApi;