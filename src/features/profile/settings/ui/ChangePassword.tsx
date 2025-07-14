import { Form, Formik, FormikHelpers } from "formik"
import styles from "./_changePassword.module.scss"
import { PrimaryButton } from "@/shared/ui/components/buttons";
import { FormValues } from "@/features/auth/types";
import { changePasswordValidationSchema } from "../model/validation";
import { FormField } from "@/shared";
import { useChangePasswordMutation } from "@/pages/profilePage/api/profileApi";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";
import { useDispatch } from "react-redux";

export const ChangePassword: React.FC<{ onClose: () => void }> = ({ onClose }) => {

	const initialValues: FormValues = {
		old_password: '',
		new_password: '',
	}

	const [changePassword] = useChangePasswordMutation()
	const dispatch = useDispatch()

	const handleSubmit = async (
		values: typeof initialValues,
		{ setStatus, resetForm }: FormikHelpers<FormValues>
	) => {
		try {
			await changePassword(values).unwrap();
			resetForm();
			dispatch(
				showAlert({
					message: 'Пароль успешно изменен',
					severity: 'info',
				})
			);
			onClose()
		} catch (error: any) {
			if (error?.data?.non_field_errors?.length) {
				setStatus("Неправильно введен старый пароль")
			} else {
				setStatus("Не удалось сменить пароль. Попробуйте позже")
			}
		}
	};

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={changePasswordValidationSchema}
			onSubmit={handleSubmit}
		>
			{({ status, isValid, dirty, setStatus }) => {
				return (
					<Form className={styles.form}>
						<h3>Смена пароля</h3>

						<FormField name="old_password" placeholder="Ваш текущий пароль" type="password" onChange={() => setStatus(undefined)}/>
						<FormField name="new_password" placeholder="Новый пароль" type="password" onChange={() => setStatus(undefined)}/>

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