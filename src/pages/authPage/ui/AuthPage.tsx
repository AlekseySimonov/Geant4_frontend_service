import * as styles from './_authpage.module.scss'
import backgroundImg from '@/shared/ui/assets/authBackground.jpg'

export const AuthPage = () => {
	return (
		<div className= {styles.container}>
			<img className={styles.container__background }  src={backgroundImg} alt="" />
		</div>
	)
}
