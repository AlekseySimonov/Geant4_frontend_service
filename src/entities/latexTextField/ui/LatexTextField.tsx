
import { useState } from "react";
import styles from "./_latexTextField.module.scss"
import { MathJaxContext, MathJax } from 'better-react-mathjax';
import { FormField } from "@/shared";
import { Formik } from "formik";
import { SecondaryButton } from "@/shared/ui/components/buttons";

const LatexTextField: React.FC = () => {
	const [showLatex, setShowLatex] = useState(false);

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
		<Formik
			initialValues={{ latex: "" }}
			onSubmit={() => { }}
		>
			{({ values, errors, touched }) => (
				<div className = {styles.latex__form}>
					<FormField
						name="latex"
						placeholder="Текстовое поле"
						isMultiline
						errors={errors}
						touched={touched}
					/>

					<SecondaryButton
						label={showLatex ? "Скрыть текст" : "Показать текст"}
						type="button"
						onClick={toggleLatex}
					/>

					{showLatex && values.latex && (
						<MathJaxContext version={3} config={config}>
							<div style={{ padding: '1rem', border: '1px solid #ccc', borderRadius: '8px', marginTop: '1rem' }}>
								<MathJax dynamic>{values.latex}</MathJax>
							</div>
						</MathJaxContext>
					)}
				</div>
			)}
		</Formik>
	);
};

export default LatexTextField