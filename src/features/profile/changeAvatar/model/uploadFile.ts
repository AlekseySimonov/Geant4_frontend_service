import { usePostProfileAvatarMutation } from "@/pages/profilePage/api/profileApi";
import { getCroppedImg } from "./canvasUtils";

type PostAvatarFn = ReturnType<typeof usePostProfileAvatarMutation>[0];

export const uploadCroppedImage = async (
	imageSrc: string,
	croppedAreaPixels: { width: number; height: number; x: number; y: number },
	postAvatar: PostAvatarFn
): Promise<void> => {
	try {
		const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);

		if (!croppedBlob) throw new Error("Не удалось получить обрезанное изображение");

		const formData = new FormData();
		formData.append("image", croppedBlob, "avatar.png");

		await postAvatar(formData).unwrap();
		
		console.log("Avatar uploaded successfully");
	} catch (error) {
		console.error("Failed to upload avatar:", error);
	}
};