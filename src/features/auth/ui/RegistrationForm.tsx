import { Form, Formik, FormikHelpers } from "formik"
import * as Yup from 'yup'
import styles from "./_authForm.module.scss"
import { Link } from "react-router";
import { FormField } from './../../../shared/ui/components/formField/FormField';
import { useRegistrationMutation } from "@/pages/authPage/api/authApi";
import { FormValues } from "./types";

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

	const handleSubmit = async (values: typeof initialValues, { setErrors, setStatus }: FormikHelpers<FormValues>) => {
		try {
			await registration(values).unwrap();
		} catch (error) {
			console.log('error', error)
			if (error.status === 400) {
				const errors: Record<string, string> = {};
				if (error.data.username) {
					errors.username = "Этот ник уже занят";
				}
				if (error.data.email) {
					errors.email = "Эта почта уже используется";
				}
				setErrors(errors);
				if (!error.data.email || !error.data.username) {
					setStatus("Произошла ошибка. Попробуйте снова.")
				}
			} else {
				setStatus("Произошла ошибка. Попробуйте снова.")
			}
		};
	}

	const validationSchema = Yup.object({
		first_name: Yup.string()
			.required('Имя обязательно')
			.matches(/^[A-Za-zА-Яа-яЁё]+$/, 'Имя может содержать только буквы'),
		last_name: Yup.string()
			.required('Фамилия обязательна')
			.matches(/^[A-Za-zА-Яа-яЁё]+$/, 'Фамилия может содержать только буквы'),
		email: Yup.string()
			.email('Неправильно указана Электронная почта. Пример: geant4@mail.com')
			.required('Email обязателен'),
		username: Yup.string()
			.required('Логин обязателен')
			.matches(/^[a-zA-Z0-9]+$/, 'Логин должен содержать только латинские буквы и цифры'),
		password: Yup.string()
			.required('Пароль обязателен')
			.min(8, 'Пароль должен быть не менее 8 символов')
			.matches(/[A-Z]/, 'Пароль должен содержать хотя бы одну заглавную букву')
			.matches(/\d/, 'Пароль должен содержать хотя бы одну цифру'),
		password2: Yup.string()
			.oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
			.required('Подтверждение пароля обязательно'),
	})

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, status, isValid, dirty }) => {

				return (
					<Form className={styles.form}>
						<div className={styles.form_title}>Регистрация</div>

						<FormField name="first_name" placeholder="Имя" errors={errors} />
						<FormField name="last_name" placeholder="Фамилия" errors={errors} />
						<FormField name="email" placeholder="Электронная почта" errors={errors} />
						<FormField name="username" placeholder="Логин" errors={errors} hint="Логин должен состоять из латинских букв, например “geant123”"/>
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
