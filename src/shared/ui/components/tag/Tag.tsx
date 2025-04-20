import styles from "./_tag.module.scss";

interface TagProps {
	label?: string;
	children?: React.ReactNode;
	success?: boolean;
	error?: boolean;
	inProgress?: boolean;
	defaultStyle?: boolean;
	info?: string;
}

export const Tag: React.FC<TagProps> = ({
	label,
	children,
	success,
	error,
	inProgress,
	defaultStyle,
	info
}) => {
	let tagClass = styles.tag;

	if (success) tagClass += ` ${styles.success}`;
	else if (error) tagClass += ` ${styles.error}`;
	else if (inProgress) tagClass += ` ${styles.inProgress}`;
	else if (defaultStyle) tagClass += ` ${styles.default}`;

	return (
		<div className={tagClass}>
			{children ?? label}
			<p>{info}</p>
		</div>
	);
};