import { setLoading } from "@/shared/model";
import { URLS } from "../model/urls";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setAuthStatus } from "../model";

export interface AuthRequest {
	first_name?: string;
	last_name?: string;
	email?: string;
	username?: string;
	password?: string;
	password2?: string;
}

interface AuthState {
	isAuthenticated: boolean;
}

const initialState: AuthState = {
	isAuthenticated: false,
};

export const authApi = createApi({
	reducerPath: 'authApi',
	baseQuery: fetchBaseQuery({
		baseUrl: 'https://92.63.76.159:444/api/v1',
		headers: {
			"Content-Type": "application/json",
		},
		credentials: "include"
	}),
	tagTypes: ['Auth'],
	endpoints: (builder) => ({
		login: builder.mutation<void, AuthRequest>({
			query: (body) => ({
				url: URLS.LOGIN,
				method: 'POST',
				body,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				dispatch(setLoading(true));
				try {
					await queryFulfilled;
					dispatch(setAuthStatus(true))
				} catch (error) {
					console.log(error)
				} finally {
					dispatch(setLoading(false));
				}
			},
		}),
		registration: builder.mutation<void, AuthRequest>({
			query: (body) => ({
				url: URLS.REGISTRATION,
				method: 'POST',
				body,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {

				dispatch(setLoading(true));
				try {
					await queryFulfilled
				} catch (error) {
					console.log(error)
				} finally {
					dispatch(setLoading(false));
				}
			},
		}),
		logout: builder.query<void, void>({
			query: () => ({
				url: URLS.LOGOUT,
				method: 'GET',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(setAuthStatus(false))
				} catch (error) {
					console.log(error)
				}
			},
		}),
		emailVerify: builder.query<void, void>({
			query: () => ({
				url: URLS.EMAIL_VERIFY,
				method: 'GET',
			}),
		}),
		checkAuth: builder.query<void, void>({
			query: () => ({
				url: URLS.CHECK_AUTH,
				method: 'GET',
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {
				try {
					await queryFulfilled;
					dispatch(setAuthStatus(true))
				} catch (error) {
					dispatch(setAuthStatus(false))
				}
			},
		}),
		passwordRecovery: builder.mutation<void, AuthRequest>({
			query: (body) => ({
				url: URLS.REGISTRATION,
				method: 'POST',
				body,
			}),
			async onQueryStarted(arg, { dispatch, queryFulfilled }) {

				dispatch(setLoading(true));
				try {
					await queryFulfilled
				} catch (error) {
					console.log(error)
				} finally {
					dispatch(setLoading(false));
				}
			},
		}),
	})
})

export const {
	useLoginMutation,
	useRegistrationMutation,
	useLogoutQuery,
	useEmailVerifyQuery,
	useCheckAuthQuery,
	useLazyCheckAuthQuery,
	useLazyLogoutQuery,
} = authApi