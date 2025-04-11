import { Formik, Form } from "formik";
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";
import { validationSchema } from "../model/validation";
import { handleSubmit } from "../model/submit";
import styles from "./_profileSettings.module.scss";
import { ProfileTypes } from "@/shared/types";
import { FormField } from "@/shared";
import { useGetProfileQuery } from "@/pages/profilePage/api/profileApi";

const ProfileSettings: React.FC = () => {

	const { data } = useGetProfileQuery()

	const initialValues: ProfileTypes = {
		first_name: data.first_name,
		last_name: data.last_name,
		email: data.email,
		username: data.username,
	};

	return (
		<div className={styles.settings}>
			<div className={styles.settings__title}>
				<h2>Редактирование профиля</h2>
				<SecondaryButton label="Удалить аккаунт" />
			</div>
			<div className={styles.settings__body}>
				<div className={styles.settings__avatar}>
					<h3>Сотрудник</h3>
					<img
						src="#"
						alt="Аватар"
					/>
					<SecondaryButton label="Сменить фото" />
				</div>

				<Formik
					initialValues={initialValues}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
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

							<SecondaryButton label="Сменить пароль" fullWidth={true} />

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
		</div>
	);
};

export default ProfileSettings;