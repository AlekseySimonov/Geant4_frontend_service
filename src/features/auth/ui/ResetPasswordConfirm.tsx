import { Form, Formik, FormikHelpers } from "formik"
import styles from "./_authForm.module.scss"
import { useNavigate, useParams } from "react-router";
import { FormField } from '../../../shared/ui/components/formField/FormField';
import { usePasswordRecoveryConfirmMutation } from "@/pages/authPage/api/authApi";
import { FormValues } from "../types/types";
import { passwordConfirmValidationSchema } from "../model";
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";

export const ResetPasswordConfirm: React.FC = () => {
	const [recoveryConfirm] = usePasswordRecoveryConfirmMutation()

	const initialValues: FormValues = {
		new_password: '',
		new_password2: '',
	}

	const { token } = useParams<{ token: string }>();
	const navigate = useNavigate();
	const dispatch: AppDispatch = useDispatch();

	const handleSubmit = async (values: typeof initialValues, { setStatus }: FormikHelpers<FormValues>) => {
		if (!token) {
			setStatus("Произошла ошибка. Попробуйте снова");
			return;
		}

		try {
			await recoveryConfirm({ token, body: values }).unwrap();
			dispatch(
				showAlert({
					message: 'Пароль успешно изменен',
					severity: 'info',
				})
			);
			setTimeout(() => {
				navigate('/auth/login', { replace: true }); 
			}, 3500);
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
			{({ errors, status, isValid, dirty, touched, setStatus }) => {
				return (
					<Form className={styles.form}>
						<h3>Восстановление пароля</h3>

						<FormField name="new_password" placeholder="Пароль" errors={errors} type="password"  touched={touched} onChange={() => setStatus(undefined)}/>
						<FormField name="new_password2" placeholder="Повторите пароль" errors={errors} type = "password"  touched={touched} onChange={() => setStatus(undefined)}/>

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