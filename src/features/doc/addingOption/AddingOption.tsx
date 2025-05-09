import { usePostCategoryMutation, usePostChapterMutation } from "@/pages/documentationPage/api/docApi";
import styles from "./_addingOption.module.scss";
import { PrimaryButton } from "@/shared/ui/components/buttons";
import { FormField } from "@/shared";
import { Form, Formik } from "formik";
import * as Yup from "yup";

type OptionType = 'category' | 'chapter';

interface AddingOptionProps {
	type: OptionType;
	label: string;
	onClose: () => void
}

interface FormValues {
	title: string;
}

export const AddingOption: React.FC<AddingOptionProps> = ({ type, label, onClose }) => {
	const [postCategory] = usePostCategoryMutation();
	const [postChapter] = usePostChapterMutation();

	const initialValues: FormValues = { title: '' };

	const validationSchema = Yup.object({
		title: Yup.string()
			.required('Введите название')
			.min(2, 'Слишком короткое название'),
	});

	const handleSubmit = async (
		values: FormValues,
		{ setStatus, resetForm }: any) => {
		try {
			if (type === 'category') {
				await postCategory({ title: values.title }).unwrap();
			} else {
				await postChapter({ title: values.title }).unwrap();
			}
			resetForm();
			onClose()
		} catch (error) {
			setStatus("Не удалось сменить пароль. Попробуйте позже.")
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, touched, isValid, status, dirty }) => (
				<Form className={styles.form}>
					<h3>Добавление {label}</h3>

					<FormField
						name="title"
						placeholder={`Введите название ${label.toLowerCase()}`}
						errors={errors}
						touched={touched}
					/>

					{status && <div className={styles.form_errorMessage}>{status}</div>}

					<PrimaryButton
						label="Добавить"
						type="submit"
						disabled={!(isValid && dirty)}
						fullWidth
					/>
				</Form>
			)}
		</Formik>
	);
};