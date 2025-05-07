import { URLS } from "../model/urls";
import { createApi } from "@reduxjs/toolkit/query/react";
import { apiBaseQuery } from "@/shared/api";
import { globalLoading } from "@/shared/model";

export interface AuthRequest {
	first_name?: string;
	last_name?: string;
	email?: string;
	username?: string;
	password?: string;
	password2?: string;
	new_password?: string;
	new_password2?: string;
}

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: apiBaseQuery(process.env.API_BASE_URL),
	tagTypes: ['Auth'],
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
			login: mutation({
				query: (body: AuthRequest) => ({
					url: URLS.LOGIN,
					method: 'POST',
					body,
				}),
			}),

			registration: mutation({
				query: (body: AuthRequest) => ({
					url: URLS.REGISTRATION,
					method: 'POST',
					body,
				}),
			}),

			logout: mutation({
				query: () => ({
					url: URLS.LOGOUT,
					method: 'GET',
				}),
			}),

			checkAuth: query<{ detail: boolean }, void>({
				query: () => ({
					url: URLS.CHECK_AUTH,
					method: 'GET',
				}),
				keepUnusedDataFor: 0,
				refetchOnMountOrArgChange: true,
			}),

			passwordRecovery: mutation({
				query: (body: AuthRequest) => ({
					url: `${URLS.PASSWORD_RECOVERY}`,
					method: 'POST',
					body,
				}),
			}),

			passwordRecoveryConfirm: mutation({
				query: ({ token, body }: { token?: string; body: AuthRequest }) => ({
					url: `${URLS.PASSWORD_RECOVERY}confirm/${token}`,
					method: 'POST',
					body,
				}),
			}),

			emailVerifyConfirm: query({
				query: (token: string) => ({
					url: `${URLS.REGISTRATION}confirm/${token}`,
					method: 'GET',
				}),
			}),
		};
	},
});


export const {
	useLoginMutation,
	useRegistrationMutation,
	useLogoutMutation,
	useCheckAuthQuery,
	useLazyCheckAuthQuery,
	usePasswordRecoveryMutation,
	useEmailVerifyConfirmQuery,
	usePasswordRecoveryConfirmMutation,
} = authApi