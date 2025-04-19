import { Form, Formik, FormikHelpers } from "formik"
import styles from "./_changePassword.module.scss"
import { PrimaryButton } from "@/shared/ui/components/buttons";
import { FormValues } from "@/features/auth/types";
import { changePasswordValidationSchema } from "../model/validation";
import { FormField } from "@/shared";
import { useChangePasswordMutation } from "@/pages/profilePage/api/profileApi";

export const ChangePassword: React.FC<{ onClose: () => void }> = ({ onClose }) => {

	const initialValues: FormValues = {
		old_password: '',
		new_password: '',
	}

	const [changePassword] = useChangePasswordMutation()

	const handleSubmit = async (
		values: typeof initialValues,
		{ setStatus, resetForm }: FormikHelpers<FormValues>
	) => {
		try {
			await changePassword(values).unwrap();
			resetForm();
			alert("Пароль успешно изменен")
			onClose()
		} catch (error: any) {
			if (error?.data?.non_field_errors?.length) {
				setStatus("Неправильно введен старый пароль")
			} else {
				setStatus("Не удалось сменить пароль. Попробуйте позже.")
			}
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={changePasswordValidationSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, status, isValid, dirty }) => {
				return (
					<Form className={styles.form}>
						<h3>Смена пароля</h3>

						<FormField name="old_password" placeholder="Ваш текущий пароль" errors={errors} type="password" />
						<FormField name="new_password" placeholder="Новый пароль" errors={errors} type="password" />

						{status && <div className={styles.form_errorMessage}>{status}</div>}

						<PrimaryButton
							label="Сменить пароль"
							type="submit"
							disabled={!(isValid && dirty)}
							fullWidth
						/>

					</Form>
				);
			}}
		</Formik>
	);
};