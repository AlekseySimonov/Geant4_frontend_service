import { Form, Formik, FormikHelpers } from "formik"
import * as Yup from 'yup'
import styles from "./_authForm.module.scss"
import { Link } from "react-router";
import { FormField } from '../../../shared/ui/components/formField/FormField';
import { usePasswordRecoveryMutation } from "@/pages/authPage/api/authApi";
import { FormValues } from "./types";

export const ResetPasswordForm: React.FC = () => {
	const [recovery] = usePasswordRecoveryMutation()

	const initialValues: FormValues = {
		email: ''
	}

	const handleSubmit = async (values: typeof initialValues, { setStatus }: FormikHelpers<FormValues>) => {
		try {
			await recovery(values).unwrap();
		} catch (err) {
			if (err.status === 400) {
				setStatus("Неправильно указана Электронная почта")
			} else {
				setStatus("Произошла ошибка. Попробуйте снова");
			}
		}
	}

	const validationSchema = Yup.object({
		email: Yup.string()
			.email('Неправильно указана Электронная почта. Пример: geant4@mail.com')
			.required('Email обязателен'),
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

						<FormField name="email" placeholder="email" errors={errors} />

						{status && <div className={styles.form_errorMessage}>{status}</div>}

						<button
							className={styles.form_submit}
							type="submit"
							disabled={!(isValid && dirty)}>
							Войти
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
