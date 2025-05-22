import { useState } from "react";
import styles from "./_latexTextField.module.scss"
import { FormField } from "@/shared";
import { useField } from "formik";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import { LatexPreview } from "./LatexPreview";

const LatexTextField: React.FC<{ name: string }> = ({ name }) => {
	const [showLatex, setShowLatex] = useState(false);
	const [field] = useField(name);

	const toggleLatex = () => {
		setShowLatex((prev) => !prev);
	};

	return (
		<div className={styles.latex__form}>
			<FormField
				name={name}
				placeholder="Текстовое поле"
				isMultiline
			/>

			<SecondaryButton
				label={showLatex ? "Скрыть текст" : "Показать текст"}
				type="button"
				onClick={toggleLatex}
			/>

			{showLatex && <LatexPreview value={field.value} withBorder />}
		</div>
	);
};

export default LatexTextField