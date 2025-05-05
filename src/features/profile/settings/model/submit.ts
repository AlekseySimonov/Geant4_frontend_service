import { AppDispatch } from "@/app/store";
import { profileApi } from "@/pages/profilePage/api";
import { ProfileTypes } from "@/shared/types";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";
import { FormikHelpers } from "formik";

interface PatchProfileTypes {
	email?: string;
	first_name: string;
	last_name: string;
	new_username?: string;
}

type PatchProfileFn = ReturnType<typeof profileApi.endpoints.patchProfile.initiate>;
type PostUpdateUsernameFn = ReturnType<typeof profileApi.endpoints.updateUsername.initiate>;

export const handleSubmit =
	(
		patchProfile: (values: Omit<PatchProfileTypes, "new_username">) => ReturnType<PatchProfileFn>,
		postUsername: (values: { new_username: string }) => ReturnType<PostUpdateUsernameFn>,
		prevEmail: string,
		prevUsername: string,
		dispatch: AppDispatch,
	) =>
		async (
			values: PatchProfileTypes,
			{ setErrors, setStatus }: FormikHelpers<ProfileTypes>
		) => {
			try {
				const { new_username, email, ...rest } = values;

				const profileData: Omit<PatchProfileTypes, "new_username"> = {
					...rest,
					...(email !== prevEmail ? { email } : {})
				};
				await patchProfile(profileData).unwrap();
				
				if (values.new_username !== prevUsername) {
					await postUsername({ new_username }).unwrap();
				}
				if (values.email !== prevEmail) {
					dispatch(
						showAlert({
							message: 'Мы отправили письмо на новый адрес. Подтвердите его, чтобы завершить обновление почты.',
							severity: 'info',
						})
					);
				}
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