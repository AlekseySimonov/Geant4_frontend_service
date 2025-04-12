import { FormikHelpers } from "formik";
import { FormValues } from "../types";

type RegistrationFn = ReturnType<typeof import("@/pages/authPage/api/authApi").useRegistrationMutation>[0];

export const registrationSubmit =
	(registration: RegistrationFn) =>
		async (
			values: FormValues,
			{ setErrors, setStatus }: FormikHelpers<FormValues>
		) => {
			try {
				await registration(values).unwrap();
			} catch (error: any) {
				if (error.status === 400) {
					const errors: Record<string, string> = {};

					if (error.data?.username) {
						errors.username = "Этот логин уже занят";
					}

					if (error.data?.email) {
						errors.email = "Эта почта уже используется";
					}

					setErrors(errors);

					if (!error.data?.email && !error.data?.username) {
						setStatus("Произошла ошибка. Попробуйте снова.");
					}
				} else {
					setStatus("Произошла ошибка. Попробуйте снова.");
				}
			}
		};