import { AppDispatch } from "@/app/store";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";

export const readFile = (file: File): Promise<string> => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => resolve(reader.result as string), false);
		reader.readAsDataURL(file);
	});
};

export const onFileChange = async (
	e: React.ChangeEvent<HTMLInputElement>,
	setImageSrc: React.Dispatch<React.SetStateAction<string | null>>,
	dispatch: AppDispatch
): Promise<void> => {
	if (e.target.files && e.target.files.length > 0) {
		const file = e.target.files[0];
		const maxSize = 1.5 * 1024 * 1024;

		if (file.size > maxSize) {
			dispatch(showAlert({
				message: 'Изображение превышает максимальный размер 1,5 МБ.',
				severity: 'error'
			}));
			return;
		}

		const imageDataUrl = await readFile(file);
		setImageSrc(imageDataUrl);
	}
};