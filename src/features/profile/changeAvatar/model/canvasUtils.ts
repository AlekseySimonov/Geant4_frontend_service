import { Area } from "react-easy-crop";

export const createImage = (url: string): Promise<HTMLImageElement> => {
	return new Promise((resolve, reject) => {
		if (!url) {
			return reject(new Error("Image URL is required"));
		}

		const image = new Image();

		image.onload = () => resolve(image);
		image.onerror = () => reject(new Error("Failed to load image"));
		
		image.crossOrigin = "anonymous";
		image.src = url;
	});
};

export const getCroppedImg = async (
	imageSrc: string,
	pixelCrop: Area,
): Promise<Blob> => {
	const image = await createImage(imageSrc)
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')

	if (!ctx) {
		return null
	}

	canvas.width = pixelCrop.width
	canvas.height = pixelCrop.height

	ctx.drawImage(
		image,
		pixelCrop.x,
		pixelCrop.y,
		pixelCrop.width,
		pixelCrop.height,
		0,
		0,
		pixelCrop.width,
		pixelCrop.height
	)

	return new Promise((resolve, reject) => {
		canvas.toBlob((file) => {
			if (file) {
				resolve(file)
			} else {
				reject(new Error('Failed to create blob from canvas'))
			}
		}, 'image/png')
	})
}