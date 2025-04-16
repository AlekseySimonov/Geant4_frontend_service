export const readFile = (file: File): Promise<string> => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.addEventListener("load", () => resolve(reader.result as string), false);
		reader.readAsDataURL(file);
	});
};

export const onFileChange = async (
		e: React.ChangeEvent<HTMLInputElement>,
		setImageSrc: React.Dispatch<React.SetStateAction<string | null>>
	): Promise<void> => {
		if (e.target.files && e.target.files.length > 0) {
			const file = e.target.files[0];
			const imageDataUrl = await readFile(file);
			setImageSrc(imageDataUrl);
		}
	};