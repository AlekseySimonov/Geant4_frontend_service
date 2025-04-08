import { Outlet } from 'react-router'
import styles from './_authpage.module.scss'
import { Loader } from '@/shared'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'

const AuthPage: React.FC = () => {

	const { isLoading} = useSelector((state: RootState) => state.mutationStatus)

	return (
			<div className={styles.container}>
			<div className={styles.container__content}>
				<div className={styles.container__content_header}>
					<span>Geant4ru</span>
					Добро пожаловать
				</div>
				<Outlet />
				{isLoading && <Loader /> }
			</div>
		</div>
		
	)
}

export default AuthPage
