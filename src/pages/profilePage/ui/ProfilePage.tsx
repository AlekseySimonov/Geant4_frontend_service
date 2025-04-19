import { useNavigate } from "react-router"
import { useGetProfileQuery } from "../api/profileApi"
import styles from "./_profilePage.module.scss"
import { ProfileCard, ResolvesList } from "@/entities"
import { useEffect } from "react"
import avatarDefault from "@/shared/ui/assets/icons/avatar_light.svg"
import { Loader } from "@/shared"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/app/store"
import { getAvatar } from "@/features/avatar"

const ProfilePage: React.FC = () => {
	const { data: profileData, isError: isProfileError, isLoading } = useGetProfileQuery();

	const { url: avatarUrl, isLoading: avatarLoading } = useSelector(
		(state: RootState) => state.avatar
	);

	const dispatch = useDispatch<AppDispatch>()

	useEffect(() => {
		dispatch(getAvatar());
	}, [dispatch]);


	const navigate = useNavigate()
	useEffect(() => {
		if (!isLoading && (!profileData || isProfileError)) {
			navigate('/auth/login')
		}
	}, [profileData, isProfileError, isLoading, navigate])

	if (isLoading || avatarLoading) {
		return <Loader />
	}

	return (
		<div className={styles.profile}>
			<ProfileCard
				data={profileData!}
				onSettingsClick={() => navigate('/profile/settings')}
				avatar={avatarUrl || avatarDefault}
			/>
			<ResolvesList />
		</div>
	)
}

export default ProfilePage