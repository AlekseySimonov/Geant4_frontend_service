import { Field, ErrorMessage, FormikTouched } from 'formik';
import styles from './_formField.module.scss';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff, WidthFull } from '@mui/icons-material';
import { useState } from 'react';

interface FormFieldProps {
	name: string;
	type?: string;
	placeholder: string;
	errors?: Record<string, string | undefined>;
	isMultiline?: boolean;
	touched?: FormikTouched<any>;
	onChange?: () => void;
}

export const FormField: React.FC<FormFieldProps> =
	({ name, type = 'text', placeholder, errors = {}, isMultiline = false, touched = {}, onChange }) => {
		
		const [showPassword, setShowPassword] = useState(false);
		const handleClickShowPassword = () => setShowPassword((show) => !show);

		return (
			<div className={`${styles.form_field} ${errors[name] && touched[name] ? styles.error : ''}`}>
				<Field name={name}>
					{({ field }: any) => (
						<TextField
							{...field}
							id={name}
							type={type === 'password' && !showPassword ? 'password' : 'text'}
							placeholder={placeholder}
							label={placeholder}
							variant="outlined"
							fullWidth
							multiline={isMultiline}
							minRows={isMultiline ? 3 : undefined}
							error={!!(errors[name] && touched[name])}
							onChange={(e) => {
								field.onChange(e);
								if (onChange) onChange();
							}}
							InputProps={ type === 'password' ? {
								endAdornment: (
									<InputAdornment position="end">
										<IconButton
											aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
											onClick={handleClickShowPassword}
											edge="end"
										>
											{showPassword ? <VisibilityOff sx={{ fontSize: 20 }}/> : <Visibility sx={{ fontSize: 20 }}/>}
										</IconButton>
									</InputAdornment>
								),
								sx: { paddingRight: '22px' }
						} : undefined}
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