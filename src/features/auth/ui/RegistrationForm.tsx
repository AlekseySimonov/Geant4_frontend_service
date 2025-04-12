import { Form, Formik, FormikHelpers } from "formik"
import styles from "./_authForm.module.scss"
import { Link } from "react-router";
import { FormField } from './../../../shared/ui/components/formField/FormField';
import { useRegistrationMutation } from "@/pages/authPage/api/authApi";
import { FormValues } from "../types";
import { registrationSubmit, registrationValidationSchema } from "../model";

export const RegistrationForm: React.FC = () => {
	const [registration] = useRegistrationMutation()
	const initialValues: FormValues = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		password2: "",
		username: "",
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={registrationValidationSchema}
			onSubmit={registrationSubmit(registration)}
		>
			{({ errors, status, isValid, dirty }) => {

				return (
					<Form className={styles.form}>
						<span>Добро пожаловать!</span>
						<h3>Регистрация</h3>

						<FormField name="first_name" placeholder="Имя" errors={errors} />
						<FormField name="last_name" placeholder="Фамилия" errors={errors} />
						<FormField name="email" placeholder="Электронная почта" errors={errors} />
						<FormField name="username" placeholder="Логин" errors={errors}/>
						<FormField name="password" placeholder="Пароль" errors={errors} type="password" />
						<FormField name="password2" placeholder="Повторите пароль" errors={errors} type="password" />

						{status && <div className={styles.form_errorMessage}>{status}</div>}

						<button
							className={styles.form_submit}
							type="submit"
							data-testid='submit'
							disabled={!(isValid && dirty)}>
							Зарегистрироваться
						</button>

						<Link
							className={styles.form_link}
							to="/auth/login">
							У меня уже есть аккаунт
						</Link>
					</Form>
				);
			}}
		</Formik>
	)
}
