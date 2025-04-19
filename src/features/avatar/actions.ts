import axiosClient from '@/shared/api/axiosClient';
import { createAsyncThunk } from '@reduxjs/toolkit';

export const getAvatar = createAsyncThunk('avatar/get', async () => {
	const response = await axiosClient.get('profile/image/', { responseType: 'blob' });

	if (response.status !== 200) {
		throw new Error('Не удалось загрузить аватар');
	}

	return response.data;
});

export const postAvatar = createAsyncThunk(
	'avatar/post',
	async (avatar: FormData, { rejectWithValue }) => {

		try {
			await axiosClient.post('profile/image/', avatar, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});


		} catch (error) {
			return rejectWithValue(error.message || 'Неизвестная ошибка');
		}
	}
);

export const patchAvatar = createAsyncThunk(
	'avatar/patch',
	async (avatar: FormData, { rejectWithValue }) => {

		try {
			await axiosClient.patch('profile/image/', avatar, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

		} catch (error) {
			return rejectWithValue(error.message || 'Неизвестная ошибка');
		}
	}
);

export const deleteAvatar = createAsyncThunk(
	'avatar/delete',
	async (_, { rejectWithValue }) => {
		try {
			const response = await axiosClient.delete('profile/image/');

			if (response.status !== 200 && response.status !== 202) {
				return rejectWithValue('Не удалось удалить аватар');
			}

			return null;
		} catch (error) {
			return rejectWithValue(error.message || 'Неизвестная ошибка');
		}
	}
);