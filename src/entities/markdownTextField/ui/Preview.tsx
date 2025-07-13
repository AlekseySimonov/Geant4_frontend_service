import styles from "./_markdownTextField.module.scss";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { getCodeString } from "rehype-rewrite";
import katex from "katex";
import "katex/dist/katex.css";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import { useColorScheme, useMediaQuery } from "@mui/material";

interface PreviewProps {
	value: string;
	withBorder?: boolean;
}

export const Preview: React.FC<PreviewProps> = ({ value, withBorder }) => {
	if (!value) return null;

	const { mode, systemMode } = useColorScheme();
	const effectiveMode = mode === 'system' ? systemMode : mode;
	const isMobile = useMediaQuery("(max-width:600px)");

	const renderLaTeX = (text: string): string => {
		text = text.replace(/\$\$([^$]+)\$\$/g, (_, formula) => {
			try {
				return katex.renderToString(formula.trim(), {
					displayMode: true,
					throwOnError: false,
				});
			} catch {
				return `<code>$$${formula}$$</code>`;
			}
		});

		text = text.replace(/(?<!\$)\$([^\$]+?)\$(?!\$)/g, (_, formula) => {
			try {
				return katex.renderToString(formula.trim(), {
					displayMode: false,
					throwOnError: false,
				});
			} catch {
				return `<code>$${formula}$</code>`;
			}
		});

		return text;
	};

	return (
		<div
			data-color-mode={effectiveMode}
			className={`${styles.latex__text} ${withBorder ? styles.withBorder : ""}`}
			style={{ fontSize: isMobile ? "1rem" : "1.1rem" }}
		>
			<MarkdownPreview
				source={renderLaTeX(value)}
				className={styles.preview}
				components={{
					code: ({ children = [], className, ...props }) => {
						const code = props.node && props.node.children
							? getCodeString(props.node.children)
							: children;

						if (
							typeof code === "string" &&
							typeof className === "string" &&
							/^language-katex/.test(className.toLowerCase())
						) {
							const html = katex.renderToString(code, {
								throwOnError: false,
							});
							return <code style={{ fontSize: "150%" }} dangerouslySetInnerHTML={{ __html: html }} />;
						}

						return <code className={String(className)}>{children}</code>;
					},
				}}
			/>
		</div>
	);
};

