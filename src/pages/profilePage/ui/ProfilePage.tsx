import { useGetProfileQuery } from "../api/profileApi"
import styles from "./_profilePage.module.scss"

const ProfilePage: React.FC = () => { 
	const { data } = useGetProfileQuery()
	console.log(data)
	return (
		<div>Profile</div>
	)
}

export default ProfilePage