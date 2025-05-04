import axiosClient from '@/shared/api/axiosClient';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const mock = new MockAdapter(axiosClient);
const mockAxios = new MockAdapter(axios)

const API_URL = process.env.API_BASE_URL || 'http://localhost:3000';

describe('axiosClient', () => {
	beforeEach(() => {
		delete (window as any).location;
		window.location = {
			...window.location,
			replace: jest.fn(),
		} as any;
	});

	afterEach(() => {
		mock.reset();
		mockAxios.reset();
		jest.clearAllMocks();
	});
	
	it('should redirect to login on refresh token failure', async () => {
		const originalRequest = {
			url: '/some-endpoint',
			method: 'get',
		};

		mock.onPost(`${API_URL}/token/refresh`).reply(500);
		mock.onGet('/some-endpoint').reply(401, { message: 'Unauthorized' });

		try {
			await axiosClient(originalRequest);
		} catch {
			expect(window.location.replace).toHaveBeenCalledWith('/auth/login');
		}
	});

	it('should resolve response if status is 202', async () => {
		mock.onGet('/some-endpoint').reply(202, { message: 'Accepted' });

		const response = await axiosClient.get('/some-endpoint');
		expect(response.data.message).toBe('Accepted');
	});

	it('should reject with error for other HTTP status codes', async () => {
		mock.onGet('/some-endpoint').reply(500, { message: 'Internal Server Error' });

		try {
			await axiosClient.get('/some-endpoint');
		} catch (error) {
			expect(error.response.status).toBe(500);
			expect(error.response.data.message).toBe('Internal Server Error');
		}
	});

	it('should not retry request if token refresh fails', async () => {
		const originalRequest = {
			url: '/some-endpoint',
			method: 'get',
		};

		mock.onPost(`${API_URL}/token/refresh`).reply(500);
		mock.onGet('/some-endpoint').reply(401, { message: 'Unauthorized' });

		try {
			await axiosClient(originalRequest);
		} catch (error) {
			expect(error.response.status).toBe(401);
		}
	});

	it('should handle network errors gracefully', async () => {
		const originalRequest = {
			url: '/some-endpoint',
			method: 'get',
		};

		mock.onGet('/some-endpoint').networkErrorOnce();

		try {
			await axiosClient(originalRequest);
		} catch (error) {
			expect(error.message).toBe('Network Error');
		}
	});

	it('should handle response errors with missing response', async () => {
		const originalRequest = {
			url: '/some-endpoint',
			method: 'get',
		};

		mock.onGet('/some-endpoint').reply(() => {
			throw new Error('Response error');
		});

		try {
			await axiosClient(originalRequest);
		} catch (error) {
			expect(error.message).toBe('Response error');
		}
	});
});
