import { useState } from "react";
import styles from "./_changeAvatar.module.scss"
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";
import { onFileChange } from "../model";
import Cropper, { Area, Point } from "react-easy-crop";
import { uploadCroppedImage } from "../model/uploadFile";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { deleteAvatar } from "@/features/avatar";

export const ChangeAvatar: React.FC = () => {
	const dispatch = useDispatch<AppDispatch>()
	const { url: currentAvatar } = useSelector(
		(state: RootState) => state.avatar
	);

	const [imageSrc, setImageSrc] = useState<string | null>(null);
	const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
	const [zoom, setZoom] = useState(1);
	const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

	const onCropComplete = (_: Area, croppedAreaPixels: Area) => {
		setCroppedAreaPixels(croppedAreaPixels);
	};

	const handleAvatarChange = async () => {
		if (!imageSrc || !croppedAreaPixels) return;
	
		try {
			await uploadCroppedImage(imageSrc, croppedAreaPixels, Boolean(currentAvatar), dispatch);
		} catch (e) {
			console.error("Ошибка при обновлении аватара", e);
		}
	};

	const handleAvatarDelete = () => {
		dispatch(deleteAvatar());
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
							onCropChange={setCrop}
							onCropComplete={onCropComplete}
							onZoomChange={setZoom}
							cropSize={{ height: 200, width: 200 }}
							showGrid={false}
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
				disabled={!imageSrc}
				onClick={handleAvatarChange}
			/>

			<SecondaryButton
				label="Удалить аватар"
				fullWidth
				disabled={!currentAvatar}
				onClick={handleAvatarDelete}
			/>
		</div>
	);
};