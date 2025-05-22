import { MathJaxContext, MathJax } from "better-react-mathjax";
import styles from "./_latexTextField.module.scss";

const config = {
	tex: {
		inlineMath: [['$', '$'], ['\\(', '\\)']],
		displayMath: [['$$', '$$'], ['\\[', '\\]']],
	},
};

interface LatexPreviewProps {
	value: string;
	withBorder?: boolean;
}

export const LatexPreview: React.FC<LatexPreviewProps> = ({ value, withBorder }) => {
	if (!value) return null;

	return (
		<MathJaxContext version={3} config={config}>
			<div className={`${styles.latex__text} ${withBorder ? styles.withBorder : ""}`}>
				<MathJax dynamic>{value}</MathJax>
			</div>
		</MathJaxContext>
	);
};