import { Formik, Form } from "formik";
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";
import styles from "./_profileSettings.module.scss";
import { ProfileTypes } from "@/shared/types";
import { FormField, Loader } from "@/shared";
import { useGetProfileQuery, usePatchProfileMutation } from "@/pages/profilePage/api/profileApi";
import { useErrorHandler, usePopup } from "@/shared/hooks";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { ModalWindow } from "@/shared/ui/components/modal";
import { ChangePassword } from "./ChangePassword";
import { Logout } from './Logout';
import avatarDefault from "@/shared/ui/assets/icons/avatar_light.svg"
import { useEffect } from "react";
import { ChangeAvatar } from "../../changeAvatar";
import { handleSubmit, settingsValidationSchema } from "../model";
import { getAvatar } from "@/features/avatar";

const ProfileSettings: React.FC = () => {

	const { data, isError } = useGetProfileQuery();
	const { isLoading } = useSelector((state: RootState) => state.globalLoading)
	const [patchProfile] = usePatchProfileMutation();
	useErrorHandler(isError)

	const { url: avatarUrl, isLoading: avatarLoading } = useSelector(
		(state: RootState) => state.avatar
	);

	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(getAvatar());
	}, [dispatch])


	const changePassword = usePopup()
	const logout = usePopup()
	const changeAvatar = usePopup()

	if (isLoading || avatarLoading || !data) {
		return <Loader />;
	}

	const initialValues: ProfileTypes = {
		first_name: data.first_name,
		last_name: data.last_name,
		email: data.email,
		username: data.username,
		is_employee: data.is_employee,
	};

	return (
		<div className={styles.settings}>
			<div className={styles.settings__title}>
				<h2>Редактирование профиля</h2>
				<SecondaryButton label="Выйти из аккаунта" onClick={logout.openPopup} />
			</div>
			<div className={styles.settings__body}>
				<div className={styles.settings__avatar}>
					<h3>Сотрудник</h3>
					<img
						className={`${styles.avatar} ${avatarUrl ? styles.loaded : ''}`}
						src={avatarUrl || avatarDefault}
						alt="Аватар"
					/>
					<SecondaryButton label="Сменить фото" onClick={changeAvatar.openPopup} />
				</div>

				<Formik
					initialValues={initialValues}
					validationSchema={settingsValidationSchema}
					onSubmit={handleSubmit(patchProfile)}
				>
					{({ errors, status, isValid, dirty }) => (
						<Form className={styles.settings__form}>
							<div className={styles.settings__form__row}>
								<FormField name="first_name" placeholder="Имя" errors={errors} />
								<FormField name="last_name" placeholder="Фамилия" errors={errors} />
							</div>
							<div className={styles.settings__form__row}>
								<FormField name="email" placeholder="email" errors={errors} />
								<FormField name="username" placeholder="Логин" errors={errors} />
							</div>

							{status && (
								<div className={styles.settings__form__errorMessage}>{status}</div>
							)}

							<SecondaryButton label="Сменить пароль" fullWidth={true} onClick={changePassword.openPopup} />

							<div className={styles.settings__form__buttons}>
								<PrimaryButton
									label="Сохранить"
									type="submit"
									disabled={!(isValid && dirty)}
								/>

								<SecondaryButton label="Отменить" link="/profile" />
							</div>
						</Form>
					)}
				</Formik>
			</div>
			<ModalWindow open={logout.isVisible} onClose={logout.closePopup}>
				<Logout />
			</ModalWindow>
			<ModalWindow open={changePassword.isVisible} onClose={changePassword.closePopup}>
				<ChangePassword />
			</ModalWindow>
			<ModalWindow open={changeAvatar.isVisible} onClose={changeAvatar.closePopup}>
				<ChangeAvatar />
			</ModalWindow>
		</div>
	);
};

export default ProfileSettings;