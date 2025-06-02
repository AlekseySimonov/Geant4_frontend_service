import styles from "./_markdownTextField.module.scss";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { getCodeString } from "rehype-rewrite";
import katex from 'katex';
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import "katex/dist/katex.css";
import { useMediaQuery } from "@mui/material";

interface PreviewProps {
	value: string;
	withBorder?: boolean;
}

export const Preview: React.FC<PreviewProps> = ({ value, withBorder }) => {
	if (!value) return null;
	const isMobile = useMediaQuery("(max-width:600px)");

	return (
		<div data-color-mode="light" className={`${styles.latex__text} ${withBorder ? styles.withBorder : ""}`}>
			<MarkdownPreview
				source={value || ""}
				className={styles.preview}
				components={{
					code: ({ children = [], className, ...props }) => {
						if (typeof children === 'string' && /^\$\$(.*)\$\$/.test(children)) {
							const html = katex.renderToString(children.replace(/^\$\$(.*)\$\$/, '$1'), {
								throwOnError: false,
							});
							return <div style={{ textAlign: 'center' }}>
								<code
									dangerouslySetInnerHTML={{ __html: html }}
									style={{
										background: 'transparent',
										fontSize: isMobile ? '1rem' : '1.3rem',
										overflowWrap: 'anywhere',
									}}
								/>
							</div>
						}
						const code = props.node && props.node.children ? getCodeString(props.node.children) : children;
						if (
							typeof code === 'string' &&
							typeof className === 'string' &&
							/^language-katex/.test(className.toLocaleLowerCase())
						) {
							const html = katex.renderToString(code, {
								throwOnError: false,
							});
							return <code style={{ fontSize: '150%' }} dangerouslySetInnerHTML={{ __html: html }} />;
						}
						return <code className={String(className)}>{children}</code>;
					},
				}}
			/>
		</div>
	);
};

