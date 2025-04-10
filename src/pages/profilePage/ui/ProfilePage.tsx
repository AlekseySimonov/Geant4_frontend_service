import { useGetProfileQuery } from "../api/profileApi"
import styles from "./_profilePage.module.scss"
import { ProfileCard, ResolvesList } from "@/entities"

const ProfilePage: React.FC = () => {
	const { data } = useGetProfileQuery()
	return (
		<div className={styles.profile}>
			{data &&
				<ProfileCard
				data={data}
				onSettingsClick={() => console.log('Open settings')}
				/>
			}
			<ResolvesList/>
		</div>
	)
}

export default ProfilePage