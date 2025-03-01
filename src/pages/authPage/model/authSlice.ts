import { URLS } from "./urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AuthRequest {
	first_name: string;
	second_name: string;
	email: string;
	password: string;
	password2: string;
}

export interface AuthResponse {
	token: string;
}

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
	tagTypes: ['Auth'],
	endpoints: (builder) => ({
		login: builder.mutation<AuthResponse, AuthRequest>({
			query: (body) => ({
				url: URLS.LOGIN,
				method: 'POST',
				data: body,
			}),
		}),
		registration: builder.mutation<AuthResponse, AuthRequest>({
			query: (body) => ({
				url: URLS.REGISTRATION,
				method: 'POST',
				data: body,
			}),
		}),
		logout: builder.mutation<void, void>({
			query: () => ({
				url: URLS.LOGOUT,
				method: 'POST',
			}),
		}),
		emailVerify: builder.query<void, void>({
			query: () => ({
				url: URLS.EMAIL_VERIFY,
				method: 'GET',
			}),
		}),
	})
})

export const {
	useLoginMutation,
	useRegistrationMutation,
	useLogoutMutation,
	useEmailVerifyQuery,
} = authApi