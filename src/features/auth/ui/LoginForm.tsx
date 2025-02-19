import { Form, Formik, Field, ErrorMessage, useFormikContext } from "formik"
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import styles from "./_loginForm.module.scss"
import { Link } from "react-router";
import { FormField } from './../../../shared/ui/components/formField/FormField';

export const LoginForm: React.FC = () => {
	const initialValues = {
		email: "",
		password: "",
		remember: false,
	};

	const [formValues, setFormValues] = useState(initialValues);

	const handleSubmit = () => {
		console.log(formValues)
	}

	const validationSchema = Yup.object({
		email: Yup.string()
			.email("Неправильно указана Электронная почта. Пример: geant4@mail.com")
			.required("Email обязателен"),
		password: Yup.string().required("Пароль обязателен"),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, values }) => {
				useEffect(() => {setFormValues(values);}, [values]);

				return (
					<Form className={styles.form}>
						<div className={styles.form_title}>Вход в аккаунт</div>

						<FormField name="email" placeholder="" title="Логин" errors={errors} />
						<FormField name="password" placeholder="" title="Пароль" errors={errors} type="password" />

						<div className={styles.form_passwordRemember}>
							<input
								type="checkbox"
								checked={formValues.remember}
								onChange={() => setFormValues((prev) => ({ ...prev, remember: !prev.remember, }))}
							/>
							Запомнить пароль
						</div>

						<button className={styles.form_submit} type="submit">Войти</button>

						<div className={styles.form_regitration}>
							Еще нет аккаунта?
							<Link to="/auth/registration"> Зарегистрируйтесь</Link>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};
