import { useState } from "react";
import styles from "./_latexTextField.module.scss"
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { FormField } from "@/shared";
import { useField } from "formik";
import { SecondaryButton } from "@/shared/ui/components/buttons";

const LatexTextField: React.FC<{ name: string }> = ({ name }) => {
	const [showLatex, setShowLatex] = useState(false);
	const [field] = useField(name);

	const toggleLatex = () => {
		setShowLatex((prev) => !prev);
	};

	const config = {
		tex: {
			inlineMath: [['$', '$'], ['\\(', '\\)']],
			displayMath: [['$$', '$$'], ['\\[', '\\]']],
		},
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

			{showLatex && field.value && (
				<MathJaxContext version={3} config={config}>
					<div className={styles.latex__text}>
						<MathJax dynamic>{field.value}</MathJax>
					</div>
				</MathJaxContext>
			)}
		</div>
	);
};

export default LatexTextField