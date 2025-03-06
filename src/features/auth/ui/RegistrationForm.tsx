import { Form, Formik, Field, ErrorMessage, useFormikContext } from "formik"
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import styles from "./_loginForm.module.scss"
import { Link } from "react-router";
import { FormField } from './../../../shared/ui/components/formField/FormField';
import { useRegistrationMutation } from "@/pages/authPage/model/authSlice";

export const RegistrationForm: React.FC = () => {
	const [registration, { isLoading, isError, error }] = useRegistrationMutation()
	const initialValues = {
		first_name: "",
		last_name: "",
		email: "",
		password: "",
		password2: "",
		username: "",
		// remember: false,
	};

	const [formValues, setFormValues] = useState(initialValues);
	const handleSubmit = async () => {
		console.log("Submitting:", JSON.stringify(formValues, null, 2));
		try {  
            await registration(formValues).unwrap();  
        } catch (err) {  
            console.error('Registration failed:', err);  
        }  
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
        password: Yup.string()
            .required('Пароль обязателен')
            .min(6, 'Пароль должен содержать минимум 6 символов'),
        password2: Yup.string()
            .oneOf([Yup.ref('password'), null], 'Пароли должны совпадать')
            .required('Подтверждение пароля обязательно'),
        // checkbox: Yup.boolean()
        //     .oneOf([true], 'Вы должны согласиться с условиями использования')
        //     .required('Вы должны согласиться с условиями использования'),
    })

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
						<div className={styles.form_title}>Регистрация</div>

						<FormField name="first_name" placeholder="" title="Имя" errors={errors} />
						<FormField name="last_name" placeholder="" title="Фамилия" errors={errors} />
						<FormField name="email" placeholder="" title="Электронная почта" errors={errors} />
						<FormField name="username" placeholder="" title="Ник" errors={errors} />
						<FormField name="password" placeholder="" title="Пароль" errors={errors} type="password" />
						<FormField name="password2" placeholder="" title="Повторите пароль" errors={errors} type="password" />

						<button className={styles.form_submit} type="submit">Зарегистрироваться</button>

						<div className={styles.form_regitration}>
							Уже зарегистрированы?
							<Link to="/auth/login"> Войти в аккаунт</Link>
						</div>
					</Form>
				);
			}}
		</Formik>
	);
};
