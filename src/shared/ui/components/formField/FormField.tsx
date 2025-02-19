import { Field, ErrorMessage } from 'formik';
import styles from './_formField.module.scss';

interface FormFieldProps {
	name: string;
	type?: string;
	placeholder: string;
	title: string;
	errors: Record<string, string | undefined>;
}

export const FormField: React.FC<FormFieldProps> =
	({ name, type = 'text', placeholder, title, errors }) => {
		return (
			<div className={`${styles.form_field} ${errors[name] ? styles.error : ''}`}>
				<div className={styles.form_field__title}>{title}</div>
				<Field
					className={`${styles.input} ${errors[name] ? styles.error : ''}`}
					name={name}
					type={type}
					placeholder={placeholder}
				/>
				<ErrorMessage
					name={name}
					component="div"
					className={styles.form_field__errorMessage}
				/>
			</div>
		);
	};