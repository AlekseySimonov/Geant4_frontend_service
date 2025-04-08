import { Field, ErrorMessage } from 'formik';
import styles from './_formField.module.scss';
import { TextField } from '@mui/material';

interface FormFieldProps {
	name: string;
	type?: string;
	placeholder: string;
	errors: Record<string, string | undefined>;
}

export const FormField: React.FC<FormFieldProps> =
	({ name, type = 'text', placeholder, errors }) => {
		return (
			<div className={`${styles.form_field} ${errors[name] ? styles.error : ''}`}>
				<Field name={name}>
					{({ field }: any) => (
						<TextField
							{...field}
							id={name}
							type={type}
							placeholder={placeholder}
							label={placeholder}
							variant="outlined"
							fullWidth
							error={Boolean(errors[name])}
						/>
					)}
				</Field>

				<ErrorMessage
					name={name}
					component="p"
					className={styles.form_field__errorMessage}
				/>
			</div>
		);
	};