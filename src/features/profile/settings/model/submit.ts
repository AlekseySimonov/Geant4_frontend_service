import { ProfileTypes } from "@/shared/types";
import { FormikHelpers } from "formik";

export const handleSubmit = async (
	values: ProfileTypes,
	{ setErrors, setStatus }: FormikHelpers<ProfileTypes>
) => {
	try {
		await console.log('Success');
	} catch (error: any) {

		if (error.status === 400) {
			const errors: Record<string, string> = {};

			if (error.data?.username) {
				errors.username = "Этот ник уже занят";
			}
			if (error.data?.email) {
				errors.email = "Эта почта уже используется";
			}

			setErrors(errors);

			if (!error.data?.email || !error.data?.username) {
				setStatus("Произошла ошибка. Попробуйте снова.");
			}
		} else {
			setStatus("Произошла ошибка. Попробуйте снова.");
		}
	}
};