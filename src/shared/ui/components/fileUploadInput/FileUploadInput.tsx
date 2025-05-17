import { SecondaryButton } from '@/shared/ui/components/buttons';
import { useRef, useState } from 'react';
import styles from "./_fileUploadInput.module.scss"

interface FileUploadInputProps {
	accept?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}
export const FileUploadInput: React.FC<FileUploadInputProps> = ({ accept, onChange }) => {
	const fileInputRef = useRef<HTMLInputElement>(null);
	const [fileName, setFileName] = useState<string | null>(null);

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files?.[0]) {
			setFileName(e.target.files[0].name);
		}
		onChange?.(e);
	};

	const handleButtonClick = () => {
		fileInputRef.current?.click();
	};

	return (
		<div className={styles.fileInput}>
			{fileName && <div>{fileName || 'Файл отсутствует'}</div>}
			<div>
				<input
					ref={fileInputRef}
					type="file"
					accept={accept}
					onChange={handleFileChange}
				/>
				<SecondaryButton label={fileName ? 'Изменить файл' : 'Добавить файл'} onClick={handleButtonClick} />
			</div>

		</div>
	);
};