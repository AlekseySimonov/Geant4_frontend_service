import { Form, Formik, Field, ErrorMessage } from "formik"
import { useState } from "react";
import * as Yup from 'yup'
import styles from "./_loginForm.module.scss"
import { Link } from "react-router";

export const LoginForm: React.FC = () => {
	console.log('hello', styles)

	const [remember, setRemember] = useState(false)

	const initialValues = {
		email: '',
		password: '',
		remember: false,
	};

	const validationSchema = Yup.object({
		email: Yup.string()
			.email(() => (<div>Неправильно указана Электронная почта.<br /> Пример: geant4@mail.com </div>)  )
			.required('Email обязателен'),
		password: Yup.string()
			.required('Пароль обязателен'),
	})
	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={() => { console.log('Success') }}
		>
			<Form className={styles.form}>

				<div className={styles.form_title}> Вход в аккаунт</div>

				<div className={styles.form_account}>
					<Field className = {styles.input} name="email" placeholder="Почта"/>
					<ErrorMessage name="email" component="div" className={styles.form_errorMessage} />
				</div>

				<div className={styles.form_password}>
					<Field className = {styles.input} name="password" type="password" placeholder="Пароль" />
					<ErrorMessage name="password" component="div" className={styles.form_errorMessage} />
				</div>

				<div className={styles.form_passwordRemember} >
					<input
						type="checkbox"
						checked={remember}
						onChange={() => setRemember(!remember)}
					/>
					Запомнить пароль
				</div>
				
				<button className = {styles.form_submit} type="submit">Войти</button>

				<div className={styles.form_regitration}>
					Еще нет аккаунта?
					<Link to ="/auth/registration"> Зарегистрируйтесь</Link>
				</div>
			</Form>
		</Formik>
	)
}
