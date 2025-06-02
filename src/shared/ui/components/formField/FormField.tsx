import { Field, FormikTouched } from 'formik';
import styles from './_formField.module.scss';
import { IconButton, InputAdornment, TextField } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useState } from 'react';

interface FormFieldProps {
	name: string;
	type?: string;
	placeholder: string;
	isMultiline?: boolean;
	onChange?: () => void;
}

export const FormField: React.FC<FormFieldProps> =
	({ name, type = 'text', placeholder, isMultiline = false, onChange }) => {

		const [showPassword, setShowPassword] = useState(false);
		const handleClickShowPassword = () => setShowPassword((show) => !show);

		return (
			<div className={styles.form_field}>
				<Field name={name}>
					{({ field, meta }: any) => (
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
							error={Boolean(meta.touched && meta.error)}
							helperText={meta.touched && meta.error}
							onChange={(e) => {
								field.onChange(e);
								if (onChange) onChange();
							}}
							onKeyDown={(e) => {
								if (isMultiline && e.key === 'Tab') {
									e.preventDefault();
									const el = e.target as HTMLTextAreaElement;
									const { selectionStart, selectionEnd, value } = el;

									const newValue =
										value.substring(0, selectionStart) + '\t' + value.substring(selectionEnd);

									const event = {
										...e,
										target: {
											...e.target,
											name,
											value: newValue,
										},
									};
									field.onChange(event);

									requestAnimationFrame(() => {
										el.selectionStart = el.selectionEnd = selectionStart + 1;
									});
								}
							}}
							InputProps={
								type === 'password'
									? {
										endAdornment: (
											<InputAdornment position="end">
												<IconButton
													aria-label={showPassword ? 'Скрыть пароль' : 'Показать пароль'}
													onClick={handleClickShowPassword}
													edge="end"
												>
													{showPassword ? (
														<VisibilityOff sx={{ fontSize: 20 }} />
													) : (
														<Visibility sx={{ fontSize: 20 }} />
													)}
												</IconButton>
											</InputAdornment>
										),
										sx: { paddingRight: '22px' },
									}
									: undefined
							}
						/>
					)}
				</Field>
			</div>
		);
	};