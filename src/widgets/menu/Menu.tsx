import { Link } from "react-router"
import styles from "./_menu.module.scss"


export const Menu = () => {
	return (
		<div className={styles.menu}>
			<div className={styles.menu__logo}>
				Geant4ru
			</div>
			<div className={styles.menu__navigation}>
				<Link to="/"> Докуметация</Link>
				<Link to="/"> Форум</Link>
				<Link to="/"> Моделирование</Link>
				<Link to="/"> Профиль</Link>
				<Link to="/"> Хранилище</Link>
			</div>
		</div>
	)
} 
