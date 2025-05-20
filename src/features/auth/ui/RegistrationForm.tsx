import { Form, Formik, FormikHelpers } from "formik"
import styles from "./_authForm.module.scss"
import { FormField } from './../../../shared/ui/components/formField/FormField';
import { useRegistrationMutation } from "@/pages/authPage/api/authApi";
import { FormValues } from "../types";
import { registrationSubmit, registrationValidationSchema } from "../model";
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/app/store";

export const RegistrationForm: React.FC = () => {
	const [registration] = useRegistrationMutation()
	const dispatch: AppDispatch = useDispatch();
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
			onSubmit={(values, formikHelpers) =>
				registrationSubmit(registration)(values, formikHelpers, dispatch)
			}
			validateOnChange={true}
			validateOnBlur={true}
		>
			{({ errors, status, isValid, dirty, touched, setStatus }) => {

				return (
					<Form className={styles.form}>
						<div className={styles.form__welcome}>Добро пожаловать!</div>
						<h3>Регистрация</h3>

						<FormField name="first_name" placeholder="Имя" onChange={() => setStatus(undefined)}/>
						<FormField name="last_name" placeholder="Фамилия" onChange={() => setStatus(undefined)}/>
						<FormField name="email" placeholder="Электронная почта" onChange={() => setStatus(undefined)}/>
						<FormField name="username" placeholder="Логин" onChange={() => setStatus(undefined)}/>
						<FormField name="password" placeholder="Пароль" type="password" onChange={() => setStatus(undefined)}/>
						<FormField name="password2" placeholder="Повторите пароль" type="password" onChange={() => setStatus(undefined)}/>

						{status && <div className={styles.form_errorMessage}>{status}</div>}

						<PrimaryButton
							label="Зарегистрироваться"
							type="submit"
							disabled={!(isValid && dirty)}
							fullWidth
						/>

						<SecondaryButton label="У меня уже есть аккаунт" link="/auth/login" fullWidth/>
					</Form>
				);
			}}
		</Formik>
	)
}
