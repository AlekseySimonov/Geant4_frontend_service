import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { useGetProfileQuery, usePatchProfileMutation } from "@/pages/profilePage/api/profileApi";
import { ProfileSettings } from '@/features';
import { MemoryRouter } from 'react-router';
import { ProfileTypes } from '@/shared/types';

jest.mock('@/pages/profilePage/api/profileApi', () => ({
	useGetProfileQuery: jest.fn(),
	usePatchProfileMutation: jest.fn(),
}));

const mockProfile = {
	first_name: 'John',
	last_name: 'Doe',
	email: 'john.doe@example.com',
	username: 'johndoe',
};

describe('ProfileSettings', () => {
	it('renders form with initial values', async () => {

		(useGetProfileQuery as jest.Mock).mockReturnValue({
			data: mockProfile,
			isLoading: false,
			isError: false,
		});

		const mockPatchProfile = jest.fn().mockResolvedValue({});
		(usePatchProfileMutation as jest.Mock).mockReturnValue([mockPatchProfile, { isLoading: false }]);

		(useGetProfileQuery as jest.Mock).mockReturnValue({
			data: mockProfile,
			isLoading: false,
			isError: false,
		});

		render(
			<MemoryRouter>
				<ProfileSettings />
			</MemoryRouter>
		);

		expect(screen.getByPlaceholderText(/Имя/i)).toHaveValue(mockProfile.first_name);
		expect(screen.getByPlaceholderText(/Фамилия/i)).toHaveValue(mockProfile.last_name);
		expect(screen.getByPlaceholderText(/email/i)).toHaveValue(mockProfile.email);
		expect(screen.getByPlaceholderText(/Логин/i)).toHaveValue(mockProfile.username);
	});

	it('renders form with missing first_name', async () => {

		const profileWithoutFirstName: ProfileTypes = { ...mockProfile, first_name: undefined };

		(useGetProfileQuery as jest.Mock).mockReturnValue({
			data: profileWithoutFirstName,
			isLoading: false,
			isError: false,
		});

		const mockPatchProfile = jest.fn().mockResolvedValue({});
		(usePatchProfileMutation as jest.Mock).mockReturnValue([mockPatchProfile, { isLoading: false }]);

		render(
			<MemoryRouter>
				<ProfileSettings />
			</MemoryRouter>
		);

		expect(screen.getByPlaceholderText(/Имя/i)).toHaveValue('');
		expect(screen.getByPlaceholderText(/Фамилия/i)).toHaveValue(mockProfile.last_name);
		expect(screen.getByPlaceholderText(/email/i)).toHaveValue(mockProfile.email);
		expect(screen.getByPlaceholderText(/Логин/i)).toHaveValue(mockProfile.username);
	});

	it('renders loading state while fetching profile data', () => {
		(useGetProfileQuery as jest.Mock).mockReturnValue({
			data: null,
			isFetching: true,
			isError: false,
		});

		const mockPatchProfile = jest.fn();
		(usePatchProfileMutation as jest.Mock).mockReturnValue([mockPatchProfile, { isLoading: false }]);

		render(
			<MemoryRouter>
				<ProfileSettings />
			</MemoryRouter>
		);

		expect(screen.getByTestId('loader')).toBeInTheDocument();
	});

	it('handles profile save successfully', async () => {
		(useGetProfileQuery as jest.Mock).mockReturnValue({
			data: mockProfile,
			isLoading: false,
			isError: false,
		});
	
		const mockPatchProfile = jest.fn().mockResolvedValue({});
		(usePatchProfileMutation as jest.Mock).mockReturnValue([mockPatchProfile, { isLoading: false }]);
	
		render(
			<MemoryRouter>
				<ProfileSettings />
			</MemoryRouter>
		);
	
		await waitFor(() => screen.getByPlaceholderText(/Имя/i));
	
		const firstNameInput = screen.getByPlaceholderText(/Имя/i);
		fireEvent.change(firstNameInput, { target: { value: 'Jane' } });
	
		const saveButton = screen.getByRole('button', { name: /Сохранить/i });
		expect(saveButton).toBeEnabled();
	
		fireEvent.click(saveButton);
	
		await waitFor(() =>
			expect(mockPatchProfile).toHaveBeenCalledWith({
				first_name: 'Jane',
				last_name: mockProfile.last_name,
				email: mockProfile.email,
				username: mockProfile.username,
			})
		);
	});

	it('does not save profile when form is invalid', async () => {
		(useGetProfileQuery as jest.Mock).mockReturnValue({
			data: mockProfile,
			isLoading: false,
			isError: false,
		});
	
		const mockPatchProfile = jest.fn().mockResolvedValue({});
		(usePatchProfileMutation as jest.Mock).mockReturnValue([mockPatchProfile, { isLoading: false }]);
	
		render(
			<MemoryRouter>
				<ProfileSettings />
			</MemoryRouter>
		);
	
		const saveButton = screen.getByRole('button', { name: /Сохранить/i });
	
		expect(saveButton).toBeDisabled();
	
		await waitFor(() => expect(mockPatchProfile).not.toHaveBeenCalled());
	});
});