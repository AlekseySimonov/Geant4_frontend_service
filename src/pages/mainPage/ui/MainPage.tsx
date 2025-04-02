import { useLazyLogoutQuery, } from "@/pages/authPage/api/authApi"

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
		<>
			<div data-testid="mainPage">MainPage</div>
			<button onClick={handleLogout}>logout</button>
		</>
		
		
	)
}

export default MainPage