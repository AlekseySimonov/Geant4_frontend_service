import { FormikHelpers } from "formik";
import { FormValues } from "../types";

type LoginFn = ReturnType<typeof import("@/pages/authPage/api/authApi").useLoginMutation>[0];

export const loginSubmit =
	(login: LoginFn) =>
		async (
			values: FormValues,
			{ setStatus }: FormikHelpers<FormValues>
		) => {
			try {
				await login(values).unwrap();
			} catch (error: any) {
				if (error?.status === 400) {
					setStatus("Неправильный ник или пароль");
				} else {
					setStatus("Произошла ошибка. Попробуйте снова.");
				}
			}
		};