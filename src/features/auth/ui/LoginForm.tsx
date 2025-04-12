import { Field, Form, Formik, FormikHelpers } from "formik"
import styles from "./_authForm.module.scss"
import { Link } from "react-router";
import { FormField } from './../../../shared/ui/components/formField/FormField';
import { useLoginMutation } from "@/pages/authPage/api/authApi";
import { FormValues } from "../types";
import { Checkbox } from "@mui/material";
import { loginSubmit, loginValidationSchema } from "../model";

export const LoginForm: React.FC = () => {
	const [login] = useLoginMutation()

	const initialValues: FormValues = {
		username: "",
		password: "",
		remember_me: false,
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={loginValidationSchema}
			onSubmit={loginSubmit(login)}
		>
			{({ errors, status, isValid, dirty }) => {
				return (
					<Form className={styles.form}>
						<span>Добро пожаловать!</span>
						<h3>Вход в аккаунт</h3>

						<FormField name="username" placeholder="Логин" errors={errors} />
						<FormField name="password" placeholder="Пароль" errors={errors} type="password" />

						{status && <div className={styles.form_errorMessage}>{status}</div>}

						<Field name="remember_me" type="checkbox">
							{({ field }: any) => (
								<label className={styles.form_passwordRemember}>
									<Checkbox {...field} checked={field.value}/>
									<p>Запомнить пароль</p>
								</label>
							)}
						</Field>
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

						<Link
							className={styles.form_link}
							to="/auth/resetPassword">
							Забыли пароль?
						</Link>

					</Form>
				);
			}}
		</Formik>
	);
};
