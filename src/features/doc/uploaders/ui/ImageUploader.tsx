import { useEffect, useRef, useState } from "react";
import styles from "./_uploader.module.scss";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useDispatch } from "react-redux";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";
import { ServerFile } from "@/shared/types/articlesTypes";

interface ImageUploaderProps {
	fieldName: string;
	setFieldValue: (field: string, value: ServerFile[]) => void;
	initialValues?: ServerFile[];
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ fieldName, setFieldValue, initialValues }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [images, setImages] = useState<ServerFile[]>(initialValues || []);
	const [currentIndex, setCurrentIndex] = useState(0);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!initialValues?.length) return;
		setImages(initialValues);
		setFieldValue(fieldName, initialValues);
	}, [initialValues]);

	const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const MAX_FILE_SIZE = 1.5 * 1024 * 1024;
		const newInputFiles = Array.from(e.target.files || []).filter(
			(file) => file.type.startsWith("image/") && file.size <= MAX_FILE_SIZE
		);

		if (newInputFiles.length < (e.target.files?.length || 0)) {
			dispatch(showAlert({
				message: "Файл(ы) превышают максимальный размер 1,5 МБ и не были добавлены",
				severity: "error",
			}));
		}

		const newServerFiles: ServerFile[] = newInputFiles.map((file) => ({
			format: "webp",
			url: URL.createObjectURL(file),
			file,
		}));

		const combined: ServerFile[] = [...images, ...newServerFiles].slice(0, 5);
		setImages(combined);
		setFieldValue(fieldName, combined);

		if (currentIndex >= combined.length) {
			setCurrentIndex(0);
		}
	};

	const handleRemove = (index: number) => {
		const globalIndex = currentIndex + index;
		const newFiles = images.filter((_, i) => i !== globalIndex);
		setImages(newFiles);
		setFieldValue(fieldName, newFiles);

		if (currentIndex > 0 && currentIndex + 3 > newFiles.length - 1) {
			setCurrentIndex((prev) => Math.max(0, prev - 1));
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
	};

	const handleNext = () => {
		if (currentIndex + 3 < images.length) setCurrentIndex(prev => prev + 1);
	};

	const visiblePreviews = images.slice(currentIndex, currentIndex + 3);

	return (
		<div className={styles.imgUploader}>
			<div className={styles.imgUploader__slider}>
				{images.length > 0 && (
					<div className={styles.imgUploader__slider__container}>
						<button
							type="button"
							className={styles.imgUploader__arrow}
							onClick={handlePrev}
							disabled={currentIndex === 0}
						>
							<ArrowBackIosRoundedIcon />
						</button>

						<div className={styles.imgUploader__slider__track}>
							{visiblePreviews.map((file, i) => (
								<div key={i} className={styles.imgUploader__image}>
									<img src={file.url} alt={`preview-${currentIndex + i}`} />
									<button
										type="button"
										className={styles.imgUploader__remove}
										onClick={() => handleRemove(i)}
									>
										×
									</button>
								</div>
							))}
						</div>

						<button
							type="button"
							className={styles.imgUploader__arrow}
							onClick={handleNext}
							disabled={currentIndex + 3 >= images.length}
						>
							<ArrowBackIosRoundedIcon style={{ transform: "rotate(180deg)" }} />
						</button>
					</div>
				)}
			</div>

			<div className={styles.imgUploader__input}>
				<input
					ref={fileInputRef}
					type="file"
					accept="image/*"
					multiple
					onChange={handleFilesChange}
					disabled={images.length >= 5}
				/>
				<SecondaryButton label={"Добавить изображение"} onClick={() => fileInputRef.current?.click()} />
			</div>
		</div>
	);
};