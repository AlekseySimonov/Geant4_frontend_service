import { Form, Formik, FormikHelpers } from "formik"
import * as Yup from 'yup'
import styles from "./_authForm.module.scss"
import { Link } from "react-router";
import { FormField } from './../../../shared/ui/components/formField/FormField';
import { useLoginMutation } from "@/pages/authPage/api/authApi";
import { FormValues } from "./types";

export const LoginForm: React.FC = () => {
	const [login] = useLoginMutation()

	const initialValues: FormValues = {
		username: "",
		password: "",
		// remember: false,
	}

	const handleSubmit = async (values: typeof initialValues, { setErrors, setStatus }: FormikHelpers<FormValues>) => {
		try {
			await login(values).unwrap();
		} catch (err) {
			if (err.status === 400) {
				setStatus("Неправильный ник или пароль")
			} else {
				setStatus("Произошла ошибка. Попробуйте снова");
			}
		}
	}

	const validationSchema = Yup.object({
		username: Yup.string()
			.matches(/^[a-zA-Z0-9._-]+$/, "Некорректный ник")
			.required("Ник обязателен"),
		password: Yup.string()
			.min(8, 'Пароль должен быть не менее 8 символов'),
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
						<div className={styles.form_title}>Вход в аккаунт</div>

						<FormField name="username" placeholder="Логин" errors={errors} />
						<FormField name="password" placeholder="Пароль" errors={errors} type="password" hint="Пароль должен быть не менее 8 символов"/>

						{status && <div className={styles.form_errorMessage}>{status}</div>}

						<div className={styles.form_passwordRemember}>
							<input
								type="checkbox"
							// checked={formValues.remember}
							// onChange={() => setFormValues((prev) => ({ ...prev, remember: !prev.remember, }))}
							/>
							Запомнить пароль
						</div>

						<button
							className={styles.form_submit}
							type="submit"
							disabled={!(isValid && dirty)}>
							Войти
						</button>

						<Link
							className={styles.form_link}
							to="/auth/registration">
							У меня ещё нет аккаунта
						</Link>
					</Form>
				);
			}}
		</Formik>
	);
};
