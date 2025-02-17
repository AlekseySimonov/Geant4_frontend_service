import { Outlet } from 'react-router'
import * as styles from './_authpage.module.scss'
import backgroundImg from '@/shared/ui/assets/authBackground.jpg'

export const AuthPage: React.FC = () => {
	return (
		<div className= {styles.container}>
			<img className={styles.container__background} src={backgroundImg} alt="" />
			<div className={styles.container__content}>
				<div className={styles.container__content_header}>
					<span>Geant4</span>
					Добро пожаловать
				</div>
			</div>
			<Outlet/>
		</div>
		
	)
}
