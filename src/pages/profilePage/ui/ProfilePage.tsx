import { PrimaryButton } from "@/shared/ui/components/buttons"
import { useGetProfileQuery } from "../api/profileApi"
import styles from "./_profilePage.module.scss"
import settingsIcon from "@/shared/ui/assets/icons/settings.svg"

const ProfilePage: React.FC = () => {
	const { data } = useGetProfileQuery()
	console.log(data)
	return (
		<div className={styles.profile}>
			<div className={styles.profile_info}>
				<div className={styles.profile_info__personal}>
					<div className={styles.avatar}></div>
					<div className={styles.data}>
						<h3>Иван Иванов</h3>
						<p>username</p>
						<p>email</p>
					</div>
				</div>
				<div className={styles.profile_info__settings}>
					<img src={settingsIcon} alt="#" />
				</div>
			</div>

			<div className={styles.profile_resolves}>
				<h3>Мои решения</h3>
				<div className={styles.profile_resolves__list}>
					у вас пока нет решений
					<PrimaryButton label='Приступить к моделированию' link="/"/>
				</div>
			</div>
		</div>
	)
}

export default ProfilePage