import axiosClient from '@/shared/api/axiosClient';

export const getProfileAvatar = async () => {
	try {
		const response = await axiosClient.get('profile/image/', {
			responseType: 'blob',
		});

		if (response.data instanceof Blob) {
			return response.data
		}

		return null
	} catch (error) {
		console.error('Ошибка загрузки аватара:', error);
		return null;
	}
};