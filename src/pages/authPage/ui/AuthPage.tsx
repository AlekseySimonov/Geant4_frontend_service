import { Outlet } from 'react-router'
import styles from './_authpage.module.scss'
import backgroundImg from '@/shared/ui/assets/authBackground.jpg'
import { Loader } from '@/shared'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { Container } from '@mui/material'

const AuthPage: React.FC = () => {

	const { isLoading} = useSelector((state: RootState) => state.mutationStatus)

	return (
		<div className={styles.container}>
			<div className={styles.container__content}>
				<div className={styles.container__content_header}>
					<span>Geant4</span>
					Добро пожаловать
				</div>
				<Outlet />
				{isLoading && <Loader /> }
			</div>
		</div>
		
	)
}

export default AuthPage
