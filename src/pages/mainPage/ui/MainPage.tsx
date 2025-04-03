import { useLazyLogoutQuery, } from "@/pages/authPage/api/authApi"
import {Menu} from "@/widgets"
import styles from "./_mainPage.module.scss"

const MainPage = () => {
	const [triggerLogout] = useLazyLogoutQuery()
	
	const handleLogout = async () => {
		try {
			await triggerLogout().unwrap()
		} catch (error){
			console.log("Logout failed:", error)
		}
	}
	return (
		<div className={styles.main}>
			<div data-testid="mainPage">MainPage</div>
			<button onClick={handleLogout}>logout</button>
		</div>
		
		
	)
}

export default MainPage