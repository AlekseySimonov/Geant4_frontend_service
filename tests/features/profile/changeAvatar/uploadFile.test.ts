import { getAvatar, patchAvatar, postAvatar } from '@/features/avatar';
import { showAlert } from '@/shared/ui/components/alert/model/alertSlice';
import { setAvatarLoading } from '@/features/avatar/avatarSlice';
import { getCroppedImg } from '@/features/profile/changeAvatar/model/canvasUtils';
import { uploadCroppedImage } from '@/features/profile/changeAvatar/model/uploadFile';
import { createMockDispatch } from '../../../helpers/createMockDispatch';
import { AppDispatch } from '@/app/store';

jest.mock('@/features/profile/changeAvatar/model/canvasUtils', () => ({
	getCroppedImg: jest.fn(),
}));

jest.mock('@/features/avatar', () => ({
	getAvatar: jest.fn(),
	patchAvatar: jest.fn(),
	postAvatar: jest.fn(),
}));

jest.mock('@/shared/ui/components/alert/model/alertSlice', () => ({
	showAlert: jest.fn(),
}));

jest.mock('@/features/avatar/avatarSlice', () => ({
	setAvatarLoading: jest.fn(),
}));

describe('uploadCroppedImage', () => {
	const imageSrc = 'image-src';
	const croppedAreaPixels = { width: 100, height: 100, x: 0, y: 0 };

	beforeEach(() => {
		jest.clearAllMocks();
	});
	it('should upload image successfully with existing avatar', async () => {
		const dispatch = createMockDispatch();
		(getCroppedImg as jest.Mock).mockResolvedValue(new Blob());

		await uploadCroppedImage(imageSrc, croppedAreaPixels, true, dispatch);

		expect(dispatch).toHaveBeenCalledWith(setAvatarLoading(true));
		expect(dispatch).toHaveBeenCalledWith(setAvatarLoading(false));
		expect(showAlert).not.toHaveBeenCalled();
	});

	it('should upload image successfully without existing avatar', async () => {
		const dispatch = createMockDispatch();
		(getCroppedImg as jest.Mock).mockResolvedValue(new Blob());

		await uploadCroppedImage(imageSrc, croppedAreaPixels, false, dispatch);

		expect(dispatch).toHaveBeenCalledWith(setAvatarLoading(true));
		expect(dispatch).toHaveBeenCalledWith(setAvatarLoading(false));
		expect(showAlert).not.toHaveBeenCalled();
	});

	it('should throw error if cropped blob is missing', async () => {
		const dispatch = createMockDispatch();
		(getCroppedImg as jest.Mock).mockResolvedValue(null);

		await uploadCroppedImage(imageSrc, croppedAreaPixels, true, dispatch);

		expect(dispatch).toHaveBeenCalledWith(showAlert({
			message: 'Не удалось загрузить аватар',
			severity: 'error'
		}));
	});

	it('should handle error for failed image upload', async () => {
		const imageSrc = 'image-src';
		const croppedAreaPixels = { width: 100, height: 100, x: 0, y: 0 };
		const hasAvatar = true;
		const dispatch = createMockDispatch();

		(getCroppedImg as jest.Mock).mockRejectedValue(new Error('Failed to get cropped image'));

		await uploadCroppedImage(imageSrc, croppedAreaPixels, hasAvatar, dispatch);

		expect(dispatch).toHaveBeenCalledTimes(1);
		expect(dispatch).toHaveBeenNthCalledWith(1, showAlert(expect.any(Object)));
	});
});