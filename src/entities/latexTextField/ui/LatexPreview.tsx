import styles from "./_latexTextField.module.scss";
import 'katex/dist/katex.min.css';
import { InlineMath, BlockMath } from 'react-katex';
import Markdown from "markdown-to-jsx";

interface LatexPreviewProps {
	value: string;
	withBorder?: boolean;
}

const ScrollableBlockMath = ({ math }: { math: string }) => (
	<div style={{ overflowX: 'auto', maxWidth: '100%' }}>
		<BlockMath math={math} />
	</div>
);

export const LatexPreview: React.FC<LatexPreviewProps> = ({ value, withBorder }) => {
	if (!value) return null;
	const parsedContent = value
		.replace(/\$\$\n?([^$]+?)\n?\$\$/g, (_, expr) => `<BlockMath math="${expr}" />`)
		.replace(/\$(.+?)\$/g, (_, expr) => `<InlineMath math="${expr}" />`);

	return (
		<div className={`${styles.latex__text} ${withBorder ? styles.withBorder : ""}`}>
			<Markdown
				options={{
					overrides: {
						InlineMath: {
							component: InlineMath,
						},
						BlockMath: {
							component: ScrollableBlockMath,
						},
					},
				}}
			>
				{parsedContent}
			</Markdown>
		</div>
	);
};

