import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const API_URL = process.env.API_BASE_URL

const axiosClient = axios.create({
	baseURL: API_URL,
	withCredentials: true,
});

axiosClient.interceptors.response.use(
	response => response,
	async (error: AxiosError) => {
		const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

		const isExpired = error.response?.status === 401;
		const isAccepted = (error.response?.status === 201 || error.response?.status === 202);

		if (isExpired && originalRequest && !originalRequest._retry) {
			originalRequest._retry = true;

			try {
				await axios.post(`${API_URL}/token/refresh`, {}, { withCredentials: true });
				return axiosClient(originalRequest);
			} catch (refreshError) {
				window.location.replace('/auth/login');
				return Promise.reject(error);
			}
		}

		if (isAccepted) {
			return Promise.resolve(error.response);
		}

		return Promise.reject(error);
	}
);

export default axiosClient;