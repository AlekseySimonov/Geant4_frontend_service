import { URLS } from "./urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface AuthRequest {
	first_name?: string;
	last_name?: string;
	email?: string;
	username?: string;
	password?: string;
	password2?: string;
}

export interface AuthResponse {
	token: string;
}

export const authApi = createApi({
	reducerPath: 'authApi',
    baseQuery: fetchBaseQuery({  
		baseUrl: 'https://92.63.76.159:444/api/v1', 
		prepareHeaders(headers) {
			return headers;
		},
        credentials: 'include',
    }),  
	tagTypes: ['Auth'],
	endpoints: (builder) => ({
		login: builder.mutation<AuthResponse, AuthRequest>({
			query: (body) => ({
				url: URLS.LOGIN,
				method: 'POST',
				body,
			}),
		}),
		registration: builder.mutation<AuthResponse, AuthRequest>({
			query: (body) => ({
				url: URLS.REGISTRATION,
				method: 'POST',
				body,
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