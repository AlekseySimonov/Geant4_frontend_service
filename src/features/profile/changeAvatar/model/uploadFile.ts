import { AppDispatch } from "@/app/store";
import { getCroppedImg } from "./canvasUtils";
import { getAvatar, patchAvatar, postAvatar } from "@/features/avatar";

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

		await dispatch(getAvatar())
	} catch (error) {
		console.error("Failed to upload avatar:", error);
	}
};