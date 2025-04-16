import { useNavigate } from "react-router"
import { useGetProfileAvatarQuery, useGetProfileQuery } from "../api/profileApi"
import styles from "./_profilePage.module.scss"
import { ProfileCard, ResolvesList } from "@/entities"
import { useEffect, useMemo } from "react"

const ProfilePage: React.FC = () => {
	const { data, isError, isLoading } = useGetProfileQuery()
	const { data: avatarData, isFetching: isAvatarLoading } = useGetProfileAvatarQuery()

	const navigate = useNavigate()
	useEffect(() => {
		if (!isLoading && (!data || isError)) {
			navigate('/auth/login')
		}
	}, [data, isError, isLoading, navigate])

	return (
		<div className={styles.profile}>
			{data &&
				<ProfileCard
					data={data}
					onSettingsClick={() => navigate('/profile/settings')}
					avatar={isAvatarLoading ? undefined : avatarData}
				/>
			}
			<ResolvesList />
		</div>
	)
}

export default ProfilePage