import { useNavigate } from "react-router"
import { useGetProfileQuery } from "../api/profileApi"
import styles from "./_profilePage.module.scss"
import { ProfileCard, ResolvesList } from "@/entities"
import { useEffect } from "react"

const ProfilePage: React.FC = () => {
	const { data, isError } = useGetProfileQuery()
	const navigate = useNavigate()
	useEffect(() => {
			if (!data || isError) {
				navigate('/auth/login')
			}
	}, [data, isError, navigate])
	
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