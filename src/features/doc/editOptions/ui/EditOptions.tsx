import styles from "./_editOptions.module.scss";
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";
import { FormField } from "@/shared";
import { FieldArray, Form, Formik } from "formik";
import { validationSchema } from "../model/validationSchema";
import { useEditOptionsSubmit } from "../model/editOptionsSubmit";
import { useState } from "react";
import { AddingOptionProps, FormValues, Option } from "../model/types";
import { IconButton } from "@mui/material";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { typePlaceholders, typeTitles } from "../lib/labels";
import { isOptionsChanged } from '../model/isOptionsChanged';
export const EditOptions: React.FC<AddingOptionProps> = ({ type, existingOptions, onClose }) => {
	const { editOptionsSubmit } = useEditOptionsSubmit();
	const [deletedIds, setDeletedIds] = useState<number[]>([]);

	const initialValues: FormValues = { title: '', options: existingOptions, };

	const handleDelete = (index: number, arrayHelpers: any, option: Option) => {
		arrayHelpers.remove(index);
		if (option.id !== undefined) {
			setDeletedIds((prev) => [...prev, option.id!]);
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			enableReinitialize={true}
			onSubmit={(values, { setStatus }) => {
				editOptionsSubmit({
					type,
					options: values.options,
					deletedIds,
					onSuccess: onClose,
					onError: (message) => setStatus(message),
				});
			}}
		>
			{({ values, errors, touched, status, setFieldValue }) => (
				<Form className={styles.form}>
					<h3>{typeTitles[type] || 'Редактирование списка опций'}</h3>

					<FieldArray name="options">
						{(arrayHelpers) => (
							<>
								{existingOptions &&
									(<div className={styles.options__list}>
										{values.options.map((option, index) => (
											<div key={index} className={styles.options__list__item}>
												<span>{option.title}</span>
												<IconButton onClick={() => handleDelete(index, arrayHelpers, option)}>
													<ClearRoundedIcon fontSize="small" />
												</IconButton>
											</div>
										))}
									</div>)
								}

								<div className={styles.form__addItem}>
									<FormField
										name="title"
										placeholder={typePlaceholders[type] || 'Название новой опции'}
									/>

									<SecondaryButton
										label="Добавить"
										type="button"
										disabled={values.title.trim().length < 2}
										onClick={() => {
											const trimmed = values.title.trim();
											if (trimmed.length >= 2) {
												arrayHelpers.push({ title: trimmed });
												setFieldValue('title', '');
											}
										}}
									/>
								</div>
							</>
						)}
					</FieldArray>

					{status && <div className={styles.form_errorMessage}>{status}</div>}

					<PrimaryButton
						label="Сохранить"
						type="submit"
						disabled={!isOptionsChanged(values.options, existingOptions, deletedIds)}
						fullWidth
					/>
				</Form>
			)}
		</Formik>
	);
};