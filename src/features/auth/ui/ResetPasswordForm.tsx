import { Form, Formik, FormikHelpers } from "formik"
import styles from "./_authForm.module.scss"
import { FormField } from '../../../shared/ui/components/formField/FormField';
import { usePasswordRecoveryMutation } from "@/pages/authPage/api/authApi";
import { FormValues } from "../types/types";
import { resetPasswordSubmit, resetPasswordValidationSchema } from "../model";
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";

export const ResetPasswordForm: React.FC = () => {
	const [recovery] = usePasswordRecoveryMutation()

	const initialValues: FormValues = {
		email: ''
	}

	return (
		<Formik
			initialValues={initialValues}
			validationSchema={resetPasswordValidationSchema}
			onSubmit={resetPasswordSubmit(recovery)}
		>
			{({ errors, status, isValid, dirty }) => {
				return (
					<Form className={styles.form}>
						<h3>Восстановление пароля</h3>

						<FormField name="email" placeholder="email" errors={errors} />

						{status && <div className={styles.form_errorMessage}>{status}</div>}

						<PrimaryButton
							label="Восстановить пароль"
							type="submit"
							disabled={!(isValid && dirty)}
							fullWidth
							size="s"
						/>

						<SecondaryButton
							label="Вернуться"
							link="/auth/login"
							fullWidth
							size="s"
						/>

					</Form>
				);
			}}
		</Formik>
	);
};
