import { useState } from "react";
import styles from "./_markdownTextField.module.scss"
import { FormField } from "@/shared";
import { useField } from "formik";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import { Preview } from "./Preview";

const MarkdownTextField: React.FC<{ name: string }> = ({ name }) => {
	const [showPreview, setShowPreview] = useState(false);
	const [field] = useField(name);

	const togglePreview = () => {
		setShowPreview((prev) => !prev);
	};

	return (
		<div className={styles.latex__form}>
			<FormField
				name={name}
				placeholder="Текстовое поле"
				isMultiline
			/>

			<SecondaryButton
				label={showPreview ? "Скрыть текст" : "Показать текст"}
				type="button"
				onClick={togglePreview}
			/>

			{showPreview && (
				<div data-color-mode="light">
					<Preview value={field.value} withBorder/>
				</div>
			)}
		</div>
	);
};

export default MarkdownTextField;