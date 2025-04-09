import { Form, Formik, FormikHelpers } from "formik"
import * as Yup from 'yup'
import styles from "./_authForm.module.scss"
import { Link, useNavigate, useParams } from "react-router";
import { FormField } from '../../../shared/ui/components/formField/FormField';
import { usePasswordRecoveryConfirmMutation } from "@/pages/authPage/api/authApi";
import { FormValues } from "./types";

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
				setStatus("Произошла ошибка. Попробуйте снова");
			}
		}
	}

	const validationSchema = Yup.object({
		new_password: Yup.string()
			.required('Пароль обязателен')
			.min(8, 'Пароль должен быть не менее 8 символов')
			.matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
			.matches(/\d/, 'Пароль должен содержать хотя бы одну цифру'),
		new_password2: Yup.string()
			.oneOf([Yup.ref('new_password'), null], 'Пароли должны совпадать')
			.required('Подтверждение пароля обязательно'),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, status, isValid, dirty }) => {
				return (
					<Form className={styles.form}>
						<h3>Восстановление пароля</h3>

						<FormField name="new_password" placeholder="Пароль" errors={errors} />
						<FormField name="new_password2" placeholder="Повторите пароль" errors={errors} />

						{status && <div className={styles.form_errorMessage}>{status}</div>}

						<button
							className={styles.form_submit}
							type="submit"
							disabled={!(isValid && dirty)}>
							Сменить пароль
						</button>

						<Link
							className={styles.form_link}
							to="/auth/login">
							Вернуться
						</Link>

					</Form>
				);
			}}
		</Formik>
	);
};