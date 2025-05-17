import { useRef, useState } from "react";
import styles from "./_uploader.module.scss"
import { SecondaryButton } from "@/shared/ui/components/buttons";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
interface ImageUploaderProps {
	fieldName: string;
	setFieldValue: (field: string, value: File[]) => void;
}

interface ImageUploaderProps {
	fieldName: string;
	setFieldValue: (field: string, value: File[]) => void;
}

export const ImageUploader: React.FC<ImageUploaderProps> = ({ fieldName, setFieldValue }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [images, setImages] = useState<File[]>([]);
	const [previews, setPreviews] = useState<string[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || []).filter(file => file.type.startsWith("image/"));

		const newFiles = [...images, ...files].slice(0, 5);
		setImages(newFiles);
		setFieldValue(fieldName, newFiles);

		const newPreviews = newFiles.map(file => URL.createObjectURL(file));
		setPreviews(newPreviews);

		if (currentIndex >= newPreviews.length) {
			setCurrentIndex(0);
		}
	};

	const handleRemove = (index: number) => {
		const globalIndex = currentIndex + index;
		const newFiles = images.filter((_, i) => i !== globalIndex);
		const newPreviews = previews.filter((_, i) => i !== globalIndex);

		setImages(newFiles);
		setPreviews(newPreviews);
		setFieldValue(fieldName, newFiles);

		if (currentIndex > 0 && currentIndex + 3 > newPreviews.length - 1) {
			setCurrentIndex(prev => Math.max(0, prev - 1));
		}
	};

	const handlePrev = () => {
		if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
	};

	const handleNext = () => {
		if (currentIndex + 3 < previews.length) setCurrentIndex(prev => prev + 1);
	};

	const visiblePreviews = previews.slice(currentIndex, currentIndex + 3);

	return (
		<div className={styles.imgUploader}>
			<div className={styles.imgUploader__slider}>
				{previews.length > 0 && (
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
							{visiblePreviews.map((src, i) => (
								<div key={i} className={styles.imgUploader__image}>
									<img src={src} alt={`preview-${currentIndex + i}`} />
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
							disabled={currentIndex + 3 >= previews.length}
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