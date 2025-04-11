import { useNavigate } from "react-router"
import { useGetProfileQuery } from "../api/profileApi"
import styles from "./_profilePage.module.scss"
import { ProfileCard, ResolvesList } from "@/entities"

const ProfilePage: React.FC = () => {
	const { data } = useGetProfileQuery()
	const navigate = useNavigate()
	return (
		<div className={styles.profile}>
			{data &&
				<ProfileCard
				data={data}
				onSettingsClick={() => navigate('/profile/settings')}
				/>
			}
			<ResolvesList/>
		</div>
	)
}

export default ProfilePage