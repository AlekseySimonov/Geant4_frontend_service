import { Formik, Form } from "formik";
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";
import styles from "./_profileSettings.module.scss";
import { ProfileTypes } from "@/shared/types";
import { FormField, Loader } from "@/shared";
import { useGetProfileQuery, usePatchProfileMutation, useUpdateUsernameMutation } from "@/pages/profilePage/api/profileApi";
import { useErrorHandler, usePopup } from "@/shared/hooks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { ModalWindow } from "@/shared/ui/components/modal";
import { ChangePassword } from "./ChangePassword";
import avatarDefault from "@/shared/ui/assets/icons/avatar_light.svg"
import { useEffect } from "react";
import { ChangeAvatar } from "../../changeAvatar";
import { handleSubmit, settingsValidationSchema } from "../model";
import { getAvatar } from "@/features/avatar";
import { useNavigate } from "react-router";

const ProfileSettings: React.FC = () => {

	const { data, isError } = useGetProfileQuery();
	const { isLoading: globalLoading } = useSelector((state: RootState) => state.globalLoading)
	const [patchProfile] = usePatchProfileMutation();
	const [updateUsername] = useUpdateUsernameMutation();
	useErrorHandler(isError)

	const { url: avatarUrl, isLoading: avatarLoading } = useSelector(
		(state: RootState) => state.avatar
	);

	const dispatch = useDispatch<AppDispatch>()
	const navigate = useNavigate()

	useEffect(() => {
		dispatch(getAvatar());
	}, [dispatch])


	const changePassword = usePopup()
	const changeAvatar = usePopup()

	const initialValues: ProfileTypes | null = data
		? {
			first_name: data.first_name,
			last_name: data.last_name,
			email: data.email,
			new_username: data.username,
		}
		: null;

	return (
		<>
			{data && (
				<div className={styles.settings}>
					<Formik
						initialValues={initialValues}
						validationSchema={settingsValidationSchema}
						onSubmit={(values, formikHelpers) =>
							handleSubmit(patchProfile, updateUsername, data.email, data.username, dispatch, navigate)(
								values,
								formikHelpers
							)
						}
					>
						{({ errors, status, isValid, dirty }) => (
							<>
								<div className={styles.settings__title}>
									<h2>Редактирование профиля</h2>
								</div>
								{data?.is_stuff && (<h3 className={styles.settings__employee}>Сотрудник</h3>)}
								<div className={styles.settings__body}>
									<div className={styles.settings__avatar}>
										<img
											className={`${styles.avatar} ${avatarUrl ? styles.loaded : ''}`}
											src={avatarUrl || avatarDefault}
											alt="Аватар"
										/>
										<SecondaryButton label="Сменить аватар" onClick={changeAvatar.openPopup} fullWidth/>
									</div>

									<Form className={styles.settings__form}>
										<div className={styles.settings__form__row}>
											<FormField name="first_name" placeholder="Имя" errors={errors} />
											<FormField name="last_name" placeholder="Фамилия" errors={errors} />
										</div>
										<div className={styles.settings__form__row}>
											<FormField name="email" placeholder="email" errors={errors} />
											<FormField name="new_username" placeholder="Логин" errors={errors} />
										</div>

										{status && (
											<div className={styles.settings__form__errorMessage}>{status}</div>
										)}

										<SecondaryButton label="Сменить пароль" fullWidth={true} onClick={changePassword.openPopup} />
										<div className={styles.settings__form__buttons}>
											<PrimaryButton
												label="Сохранить"
												type="submit"
												fullWidth
												disabled={!(isValid && dirty)}
											/>

											<SecondaryButton fullWidth label="Отменить" link="/profile" />
										</div>
									</Form>
								</div>
							</>
						)}
					</Formik>

					<ModalWindow open={changePassword.isVisible} onClose={changePassword.closePopup}>
						<ChangePassword onClose={changePassword.closePopup} />
						{globalLoading && <Loader />}
					</ModalWindow>

					<ModalWindow open={changeAvatar.isVisible} onClose={changeAvatar.closePopup}>
						<ChangeAvatar onClose={changeAvatar.closePopup} />
						{avatarLoading && <Loader />}
					</ModalWindow>
				</div>
			)}
		</>
	);
};

export default ProfileSettings;