import { useState } from "react";
import styles from "./_changeAvatar.module.scss"
import { PrimaryButton } from "@/shared/ui/components/buttons";
import { onFileChange } from "../model";
import Cropper from "react-easy-crop";
import { uploadCroppedImage } from "../model/uploadFile";
import { usePostProfileAvatarMutation } from "@/pages/profilePage/api/profileApi";

export const ChangeAvatar: React.FC = () => {

	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState<number>(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<{ width: number, height: number, x: number, y: number } | null>(null);

	const [postAvatar] = usePostProfileAvatarMutation()

	const onCropComplete = ( croppedAreaPixels: { width: number; height: number; x: number; y: number }) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	return (
		<div className={styles.changeAvatar}>
			<h3>Смена аватара</h3>

			{imageSrc ? (
				<>
					<h3>Кадрируйте изображение</h3>
					<div className={styles.container}>
						<Cropper
							image={imageSrc}
							crop={crop}
							zoom={zoom}
							aspect={1}
							cropShape='rect'
							showGrid={false}
							onCropChange={setCrop}
							onCropComplete={onCropComplete}
							onZoomChange={setZoom}
							restrictPosition={false}
							classes={{
								cropAreaClassName: styles.cropArea,
							}}
						/>
					</div>
				</>

			) : (
				<input
					type="file"
					onChange={(e) => onFileChange(e, setImageSrc)}
					accept="image/*"
				/>
			)}

			<PrimaryButton
				label="Сменить аватар"
				fullWidth
				onClick={() => { uploadCroppedImage(imageSrc, croppedAreaPixels, postAvatar) }} />
		</div>
	);
};