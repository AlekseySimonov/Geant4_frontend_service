import { Outlet, useNavigate } from 'react-router'
import styles from './_authpage.module.scss'
import { Loader } from '@/shared'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { useCheckAuthQuery } from '../api/authApi'
import { useEffect } from 'react'

const AuthPage: React.FC = () => {

	const navigate = useNavigate()
	const { isSuccess } = useCheckAuthQuery();

	useEffect(() => {
		if (isSuccess) {
			navigate('/main', { replace: true });
		}
	}, [isSuccess, navigate]);

	const { isLoading} = useSelector((state: RootState) => state.globalLoading)

	return (
			<div className={styles.container}>
			<div className={styles.container__content}>
				<div className={styles.container__content_header}>
					Geant4ru
				</div>
				<Outlet />
				{isLoading && <Loader /> }
			</div>
		</div>
		
	)
}

export default AuthPage
