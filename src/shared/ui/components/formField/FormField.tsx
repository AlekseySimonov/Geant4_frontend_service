import { Field, ErrorMessage } from 'formik';
import styles from './_formField.module.scss';

interface FormFieldProps {
	name: string;
	type?: string;
	placeholder: string;
	title?: string;
	errors: Record<string, string | undefined>;
	hint?: string;
}

export const FormField: React.FC<FormFieldProps> =
	({ name, type = 'text', placeholder, title, errors, hint }) => {
		return (
			<div className={`${styles.form_field} ${errors[name] ? styles.error : ''}`}>
				<div className={styles.form_field__title}>{title}</div>
				<Field
					className={`${styles.input} ${errors[name] ? styles.error : ''}`}
					name={name}
					type={type}
					placeholder={placeholder}
					data-testid={name}
				/>
				{!Boolean(errors[name]) && hint && <div className={styles.form_field__hint}>{hint}</div>}
				<ErrorMessage
					name={name}
					component="p"
					className={styles.form_field__errorMessage}
				/>
			</div>
		);
	};