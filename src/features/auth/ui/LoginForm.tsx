import { Form, Formik, Field, ErrorMessage, useFormikContext } from "formik"
import { useEffect, useState } from "react";
import * as Yup from 'yup'
import styles from "./_loginForm.module.scss"
import { Link } from "react-router";
import { FormField } from './../../../shared/ui/components/formField/FormField';
import { useLoginMutation } from "@/pages/authPage/model/authSlice";

export const LoginForm: React.FC = () => {
	const [login] = useLoginMutation()

	const initialValues = {
		username: "",
		password: "",
		// remember: false,
	}

	const [formValues, setFormValues] = useState(initialValues)
	const [formError, setFormError] = useState<string | null>(null)

	const handleSubmit = async () => {
		try {  
            await login(formValues).unwrap();  
        } catch (err) {  
			if (err.status === 400) {  
				setFormError(err.data.message || "Неправильный ник или пароль");	  
			} else {  
				setFormError("Произошла ошибка. Попробуйте снова");
			}  
        }
	}

	const validationSchema = Yup.object({
		username: Yup.string()
			.matches(/^[a-zA-Z0-9._-]+$/, "Некорректный ник")
			.required("Ник обязателен"),
		password: Yup.string().required("Пароль обязателен"),
	});

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={validationSchema}
			onSubmit={handleSubmit}
		>
			{({ errors, values }) => {
				useEffect(() => {setFormValues(values)}, [values]);

				return (
					<Form className={styles.form}>
						<div className={styles.form_title}>Вход в аккаунт</div>

						<FormField name="username" placeholder="" title="Ник" errors={errors} />
						<FormField name="password" placeholder="" title="Пароль" errors={errors} type="password" />

						{formError && <div className={styles.form_errorMessage}>{formError}</div>} 

						<div className={styles.form_passwordRemember}>
							<input
								type="checkbox"
								// checked={formValues.remember}
								// onChange={() => setFormValues((prev) => ({ ...prev, remember: !prev.remember, }))}
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
