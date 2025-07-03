import { MyExamplesTypes, ProfileTypes } from "@/shared/types";
import { URLS } from "./urls";
import { createApi} from "@reduxjs/toolkit/query/react";
import { globalLoading } from "@/shared/model";
import { apiBaseQuery } from "@/shared/api";

export const profileApi = createApi({
	reducerPath: 'profileApi',
	baseQuery: apiBaseQuery(process.env.API_BASE_URL),
	tagTypes: ['Profile', 'Examples'],
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

			changePassword: mutation({
				query: (body: ProfileTypes) => ({
					url: URLS.CHANGE_PASSWORD,
					method: 'POST',
					body,
				}),
				invalidatesTags: ['Profile'],
			}),
			updateUsername: mutation({
				query: (body: ProfileTypes) => ({
					url: URLS.UPDATE_USERNAME,
					method: 'POST',
					body,
				}),
				invalidatesTags: ['Profile'],
			}),
			getExamples: query<MyExamplesTypes[], void>({
				query: () => ({
					url: URLS.EXAMPLES,
					method: 'GET',
				}),
				providesTags: ['Examples'],
			}),
			getExample: query<MyExamplesTypes, number>({
				query: (id:number) => ({
					url: `${URLS.EXAMPLES}${id}`,
					method: 'GET',
				}),
				providesTags: ['Examples'],
			}),
			updateEmail: query({
				query: (token: string) => ({
					url: `${URLS.PROFILE}update_email/${token}`,
					method: 'GET',
				}),
				providesTags: ['Profile'],
			}),
		};
	},
});

export const {
	useGetProfileQuery,
	usePatchProfileMutation,
	useChangePasswordMutation,
	useUpdateUsernameMutation,
	useGetExamplesQuery,
	useUpdateEmailQuery,
	useGetExampleQuery,
} = profileApi;