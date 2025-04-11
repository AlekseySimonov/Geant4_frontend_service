import { handleSubmit } from '@/features/profile/settings/model/submit';
import { ProfileTypes } from '@/shared/types';
import { FormikHelpers } from 'formik';

describe('handleSubmit', () => {
	const mockValues: ProfileTypes = {
		first_name: 'John',
		last_name: 'Doe',
		email: 'john@example.com',
		username: 'johnny',
	};

	const createMockHelpers = () => {
		return {
			setErrors: jest.fn(),
			setStatus: jest.fn(),
		} as unknown as FormikHelpers<ProfileTypes>;
	};

	it('Successful send data ', async () => {
		const patchProfile = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockResolvedValue({}),
		});
		const helpers = createMockHelpers();

		await handleSubmit(patchProfile)(mockValues, helpers);

		expect(patchProfile).toHaveBeenCalledWith(mockValues);
		expect(helpers.setErrors).not.toHaveBeenCalled();
		expect(helpers.setStatus).not.toHaveBeenCalled();
	});

	it('username is exists', async () => {
		const patchProfile = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockRejectedValue({
				status: 400,
				data: {
					username: ['This username is taken'],
				},
			}),
		});
		const helpers = createMockHelpers();

		await handleSubmit(patchProfile)(mockValues, helpers);

		expect(helpers.setErrors).toHaveBeenCalledWith({
			username: 'Этот логин уже занят',
		});
		expect(helpers.setStatus).not.toHaveBeenCalled();
	});

	it('email and username is exists', async () => {
		const patchProfile = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockRejectedValue({
				status: 400,
				data: {
					email: ['This email is taken'],
					username: ['This username is taken'],
				},
			}),
		});
		const helpers = createMockHelpers();

		await handleSubmit(patchProfile)(mockValues, helpers);

		expect(helpers.setErrors).toHaveBeenCalledWith({
			email: 'Эта почта уже используется',
			username: 'Этот логин уже занят',
		});
		expect(helpers.setStatus).not.toHaveBeenCalled();
	});

	it('set status if response is 400', async () => {
		const patchProfile = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockRejectedValue({
				status: 400,
				data: {},
			}),
		});
		const helpers = createMockHelpers();

		await handleSubmit(patchProfile)(mockValues, helpers);

		expect(helpers.setStatus).toHaveBeenCalledWith('Произошла ошибка. Попробуйте снова.');
	});

	it('unknown response status', async () => {
		const patchProfile = jest.fn().mockReturnValue({
			unwrap: jest.fn().mockRejectedValue({
				status: 500,
			}),
		});
		const helpers = createMockHelpers();

		await handleSubmit(patchProfile)(mockValues, helpers);

		expect(helpers.setStatus).toHaveBeenCalledWith('Произошла ошибка. Попробуйте снова.');
	});
})