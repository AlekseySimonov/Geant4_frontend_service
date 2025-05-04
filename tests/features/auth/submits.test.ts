import { useLoginMutation, usePasswordRecoveryMutation, useRegistrationMutation } from '@/pages/authPage/api/authApi';
import { FormikHelpers } from 'formik';
import { loginSubmit, registrationSubmit } from '@/features/auth/model';
import { FormValues } from '@/features/auth/types';
import { act, renderHook, waitFor } from '@testing-library/react';
import { createFormikHelpersMock } from '../../helpers/formikHelpersMock';

jest.mock('@/pages/authPage/api/authApi');

const helpers = createFormikHelpersMock()

const mockUseLoginMutation = useLoginMutation as jest.Mock;
const mockUsePasswordRecoveryMutation = usePasswordRecoveryMutation as jest.Mock;
const mockUseRegistrationMutation = useRegistrationMutation as jest.Mock;

beforeEach(() => {
	delete (window as any).location;
	window.location = {
		...window.location,
		replace: jest.fn(),
	} as any;
});

afterEach(() => {
	jest.clearAllMocks();
});

describe('loginSubmit', () => {
	it('should call login mutation and redirect to main page on success', async () => {
		const loginMutation = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockResolvedValue({}),
		});
		mockUseLoginMutation.mockReturnValue([loginMutation]);

		const { result } = renderHook(() => loginSubmit(loginMutation));

		const values: FormValues = { username: 'test', password: 'test' };

		await act(async () => {
			await result.current(values, helpers);
		});

		expect(loginMutation).toHaveBeenCalledTimes(1);
		expect(loginMutation).toHaveBeenCalledWith(values);
		expect(window.location.replace).toHaveBeenCalledTimes(1);
		expect(window.location.replace).toHaveBeenCalledWith('/main');
	});

	it('should call setStatus with error message on login mutation failure', async () => {
		const loginMutation = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockRejectedValue({ status: 400 }),
		});
		mockUseLoginMutation.mockReturnValue([loginMutation]);

		const { result } = renderHook(() => loginSubmit(loginMutation));

		const values: FormValues = { username: 'test', password: 'test' };

		await act(async () => {
			await result.current(values, helpers);
		});

		expect(helpers.setStatus).toHaveBeenCalledTimes(1);
		expect(helpers.setStatus).toHaveBeenCalledWith('Неправильный ник или пароль');
	});
});

describe('registrationSubmit', () => {
	it('should call registration mutation and redirect to login page on success', async () => {
		const registrationMutation = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockResolvedValue({}),
		});
		mockUseRegistrationMutation.mockReturnValue([registrationMutation]);

		const { result } = renderHook(() => registrationSubmit(registrationMutation));

		const values: FormValues = { username: 'test', email: 'test', password: 'test' };

		await act(async () => {
			await result.current(values, helpers);
		});

		expect(registrationMutation).toHaveBeenCalledTimes(1);
		expect(registrationMutation).toHaveBeenCalledWith(values);
		expect(window.location.replace).toHaveBeenCalledTimes(1);
		expect(window.location.replace).toHaveBeenCalledWith('/auth/login');
	});

	it('should call setErrors with error messages on username conflict', async () => {
		const registrationMutation = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockRejectedValue({
				status: 400,
				data: { username: 'test' },
			}),
		});
		mockUseRegistrationMutation.mockReturnValue([registrationMutation]);

		const { result } = renderHook(() => registrationSubmit(registrationMutation));

		const values: FormValues = { username: 'test', email: 'test', password: 'test' };

		await act(async () => {
			await result.current(values, helpers);
		});

		expect(helpers.setErrors).toHaveBeenCalledTimes(1);
		expect(helpers.setErrors).toHaveBeenCalledWith({
			username: 'Этот логин уже занят',
		});
		expect(helpers.setStatus).not.toHaveBeenCalled();
	});

	it('should call setErrors with error messages on email conflict', async () => {
		const registrationMutation = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockRejectedValue({
				status: 400,
				data: { email: 'test' },
			}),
		});
		mockUseRegistrationMutation.mockReturnValue([registrationMutation]);

		const { result } = renderHook(() => registrationSubmit(registrationMutation));

		const values: FormValues = { username: 'test', email: 'test', password: 'test' };

		await act(async () => {
			await result.current(values, helpers);
		});

		expect(helpers.setErrors).toHaveBeenCalledTimes(1);
		expect(helpers.setErrors).toHaveBeenCalledWith({
			email: 'Эта почта уже используется',
		});
		expect(helpers.setStatus).not.toHaveBeenCalled();
	});

	it('should call setStatus with generic error if no error data present', async () => {
		const registrationMutation = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockRejectedValue({ status: 400 }),
		});
		mockUseRegistrationMutation.mockReturnValue([registrationMutation]);

		const { result } = renderHook(() => registrationSubmit(registrationMutation));

		const values: FormValues = { username: 'test', email: 'test', password: 'test' };

		await act(async () => {
			await result.current(values, helpers);
		});

		expect(helpers.setStatus).toHaveBeenCalledTimes(1);
		expect(helpers.setStatus).toHaveBeenCalledWith('Произошла ошибка. Попробуйте снова.');
		expect(helpers.setErrors).not.toHaveBeenCalled();
	});

	it('should call setStatus with generic error on server error', async () => {
		const registrationMutation = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockRejectedValue({ status: 500 }),
		});
		mockUseRegistrationMutation.mockReturnValue([registrationMutation]);

		const { result } = renderHook(() => registrationSubmit(registrationMutation));

		const values: FormValues = { username: 'test', email: 'test', password: 'test' };

		await act(async () => {
			await result.current(values, helpers);
		});

		expect(helpers.setStatus).toHaveBeenCalledTimes(1);
		expect(helpers.setStatus).toHaveBeenCalledWith('Произошла ошибка. Попробуйте снова.');
		expect(helpers.setErrors).not.toHaveBeenCalled();
	});
});
