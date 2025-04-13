import { AxiosRequestConfig, AxiosError} from 'axios';
import { BaseQueryFn } from '@reduxjs/toolkit/query';
import axiosClient from './axiosClient';

interface AxiosBaseQueryParams {
	url: string;
	method: AxiosRequestConfig['method'];
	body?: any;
	params?: Record<string, any>;
	[key: string]: any;
}

export const apiBaseQuery =
	(baseUrl : string): BaseQueryFn<AxiosBaseQueryParams> =>
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

				return {
					error: {
						status: err.response?.status,
						data: err.response?.data || err.message,
					},
				};
			}
		};