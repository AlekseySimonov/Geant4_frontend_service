import { Outlet, useNavigate } from 'react-router'
import styles from './_authpage.module.scss'
import { AlertPopup, Loader } from '@/shared'
import { useSelector } from 'react-redux'
import { RootState } from '@/app/store'
import { useCheckAuthQuery } from '../api/authApi'
import { useEffect } from 'react'
import authBackground from '@/shared/ui/assets/authBackground.jpg'
import authBackgroundDark from '@/shared/ui/assets/authBackgroundDark.jpg'
import { useColorScheme, useMediaQuery } from '@mui/material'

const AuthPage: React.FC = () => {

	const navigate = useNavigate()
	const { data, isSuccess } = useCheckAuthQuery();

	const { mode, systemMode } = useColorScheme();
	const effectiveMode = mode === 'system' ? systemMode : mode;
	const backgroundImage = effectiveMode === 'dark' ? authBackgroundDark : authBackground;

	useEffect(() => {
		if ((isSuccess && data?.detail === true)) {
			navigate('/main', { replace: true });
		}
	}, [isSuccess, data, navigate]);

	const { isLoading } = useSelector((state: RootState) => state.globalLoading)
	const isMobile = useMediaQuery ('(max-width: 600px)') 

	return (
		<div
			className={styles.container}
			style={!isMobile ? { backgroundImage: `url(${backgroundImage})` } : undefined}
		>
			<AlertPopup/>
			<div className={styles.container__content}>
				<div className={styles.container__content_header}>
					Geant4ru
				</div>
				<Outlet />
				{isLoading && <Loader />}
			</div>
		</div>

	)
}

export default AuthPage
