import { AxiosRequestConfig, AxiosError } from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axiosClient from './axiosClient';
import { showAlert } from '../ui/components/alert/model/alertSlice';

interface AxiosBaseQueryParams {
	url: string;
	method: AxiosRequestConfig['method'];
	body?: any;
	params?: Record<string, any>;
	[key: string]: any;
}

export const apiBaseQuery =
	(baseUrl: string): BaseQueryFn<AxiosBaseQueryParams> =>
		async ({ url, method, body: data, params, ...rest }, api) => {
			try {

				const result = await axiosClient({
					url,
					baseURL: baseUrl,
					method,
					data,
					params,
					...rest,
					signal: api.signal,
				});

				if (result.status === 201 || result.status === 202) {
					return {
						data: result.data,
						meta: {
							headers: result.headers,
							status: result.status,
							config: result.config,
							request: result.request,
						},
					};
				}

				return {
					data: result.data,
					meta: {
						headers: result.headers,
						status: result.status,
						config: result.config,
						request: result.request,
					},
				};
			} catch (axiosError) {
				const err = axiosError as AxiosError;

				const status = err.response?.status;

				if (status && status >= 500) {
					api.dispatch(
						showAlert({
							message: 'Произошла ошибка. Пожалуйста, попробуйте позже.',
							severity: 'error',
						})
					);
				}

				return {
					error: {
						status,
						data: err.response?.data || err.message,
					},
				};
			}
		};