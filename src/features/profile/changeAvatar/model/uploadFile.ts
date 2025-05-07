import { AppDispatch } from "@/app/store";
import { getCroppedImg } from "./canvasUtils";
import { getAvatar, patchAvatar, postAvatar } from "@/features/avatar";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";
import { setAvatarLoading } from "@/features/avatar/avatarSlice";

export const uploadCroppedImage = async (
	imageSrc: string,
	croppedAreaPixels: { width: number; height: number; x: number; y: number },
	hasAvatar: boolean,
	dispatch: AppDispatch
): Promise<void> => {
	try {

		const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

		if (!croppedBlob) {
			throw new Error("Не удалось получить обрезанное изображение");
		}

		const formData = new FormData();
		formData.append("image", croppedBlob, "avatar.png");

		await dispatch(
			hasAvatar ? patchAvatar(formData) : postAvatar(formData)
		)
		dispatch(setAvatarLoading(true))
		await new Promise((resolve) => setTimeout(resolve, 3000));
		await dispatch(getAvatar())
		dispatch(setAvatarLoading(false))
	} catch (error) {
		dispatch(
			showAlert({
				message: 'Не удалось загрузить аватар',
				severity: 'error',
			})
		);
	}
};