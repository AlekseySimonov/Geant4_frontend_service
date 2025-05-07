import { FormikHelpers } from "formik";
import { FormValues } from "../types";
import { useLoginMutation, usePasswordRecoveryMutation, useRegistrationMutation } from "@/pages/authPage/api/authApi";
import { AppDispatch } from "@/app/store";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";

type RegistrationFn = ReturnType<typeof useRegistrationMutation>[0];

export const registrationSubmit =
	(registration: RegistrationFn) =>
		async (
			values: FormValues,
			{ setErrors, setStatus }: FormikHelpers<FormValues>,
			dispatch: AppDispatch,
		) => {
			try {
				await registration(values).unwrap();
				dispatch(
					showAlert({
						message: 'Вы успешно зарегистрировались. Проверьте почту для подтверждения пароля',
						severity: 'info',
					})
				);
				setTimeout(() => {
					window.location.replace('/auth/login');
				}, 3500);
			} catch (error: any) {
				if (error.status === 400) {
					const errors: Record<string, string> = {};

					if (error.data?.username) {
						errors.username = "Этот логин уже занят";
					}

					if (error.data?.email) {
						errors.email = "Эта почта уже используется";
					}

					if (Object.keys(errors).length > 0) {
						setErrors(errors);
					}

					if (!error.data?.email && !error.data?.username) {
						setStatus("Произошла ошибка. Попробуйте снова.");
					}
				} else {
					setStatus("Произошла ошибка. Попробуйте снова.");
				}
			}
		};

type LoginFn = ReturnType<typeof useLoginMutation>[0];

export const loginSubmit: (
	login: LoginFn
) => (
	values: FormValues,
	{ setStatus }: FormikHelpers<FormValues>
) => Promise<void> = (login: LoginFn) => async (values: FormValues, { setStatus }: FormikHelpers<FormValues>) => {
	try {
		await login(values).unwrap();
		window.location.replace('/main')
	} catch (error: any) {
		if (error?.status === 400) {
			setStatus("Неправильный ник или пароль");
		} else {
			setStatus("Произошла ошибка. Попробуйте снова.");
		}
	}
};

type RecoveryFn = ReturnType<typeof usePasswordRecoveryMutation>[0];

export const resetPasswordSubmit =
	(recovery: RecoveryFn) =>
		async (
			values: FormValues,
			{ setStatus }: FormikHelpers<FormValues>,
			dispatch: AppDispatch,
		) => {
			try {
				await recovery(values).unwrap();
				dispatch(
					showAlert({
						message: 'Проверьте почту для сброса пароля',
						severity: 'info',
					})
				);
				setTimeout(() => {
					window.location.replace('/auth/login');
				}, 3500);
			} catch (err) {
				if (err.status === 400) {
					setStatus("Неправильно указана Электронная почта");
				} else {
					setStatus("Произошла ошибка. Попробуйте снова");
				}
			}
		};
