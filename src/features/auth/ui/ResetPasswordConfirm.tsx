import { Form, Formik, FormikHelpers } from "formik"
import styles from "./_authForm.module.scss"
import { useNavigate, useParams } from "react-router";
import { FormField } from '../../../shared/ui/components/formField/FormField';
import { usePasswordRecoveryConfirmMutation } from "@/pages/authPage/api/authApi";
import { FormValues } from "../types/types";
import { passwordConfirmValidationSchema } from "../model";
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";

export const ResetPasswordConfirm: React.FC = () => {
	const [recoveryConfirm] = usePasswordRecoveryConfirmMutation()

	const initialValues: FormValues = {
		new_password: '',
		new_password2: '',
	}

	const { token } = useParams<{ token: string }>();
	const navigate = useNavigate();

	const handleSubmit = async (values: typeof initialValues, { setStatus }: FormikHelpers<FormValues>) => {
		if (!token) {
			setStatus("Произошла ошибка. Попробуйте снова");
			return;
		}

		try {
			await recoveryConfirm({ token, body: values }).unwrap();
			alert("Пароль успешно изменен.");
			navigate('/auth/login', { replace: true }); 
		} catch (err) {
			if (err.status === 400) {
				setStatus("Неправильно указан пароль");
			} else {
				setStatus("Произошла ошибка, ссылка недействительна или устарела ");
			}
		}
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={passwordConfirmValidationSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, status, isValid, dirty }) => {
				return (
					<Form className={styles.form}>
						<h3>Восстановление пароля</h3>

						<FormField name="new_password" placeholder="Пароль" errors={errors} type="password"/>
						<FormField name="new_password2" placeholder="Повторите пароль" errors={errors} type = "password"/>

						{status && <div className={styles.form_errorMessage}>{status}</div>}

						<PrimaryButton
							label="Сменить пароль"
							type="submit"
							disabled={!(isValid && dirty)}
							fullWidth
						/>

						<SecondaryButton label = 'Вернуться' size = 's' link="/auth/login" fullWidth/>

					</Form>
				);
			}}
		</Formik>
	);
};