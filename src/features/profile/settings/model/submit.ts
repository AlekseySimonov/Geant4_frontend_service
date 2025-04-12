import { profileApi } from "@/pages/profilePage/api";
import { ProfileTypes } from "@/shared/types";
import { FormikHelpers } from "formik";

type PatchProfileFn = ReturnType<typeof profileApi.endpoints.patchProfile.initiate>;

export const handleSubmit =
	(patchProfile:  (values: ProfileTypes) => ReturnType<PatchProfileFn>) =>
	async (
		values: ProfileTypes,
		{ setErrors, setStatus }: FormikHelpers<ProfileTypes>
	) => {
	try {
		await patchProfile(values).unwrap();
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