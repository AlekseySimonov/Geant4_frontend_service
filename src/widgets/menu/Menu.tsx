import { Link } from "react-router"
import styles from "./_menu.module.scss"
import { useMediaQuery, useTheme } from "@mui/material"


export const Menu = () => {

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"))
	return (
		<div className={styles.menu}>
			<div className={styles.menu__logo}>
				Geant4ru
			</div>
			<div className={styles.menu__navigation}>
				{!isMobile ? (
					<>
						<Link to="/">Документация</Link>
						<Link to="/">Форум</Link>
						<Link to="/">Моделирование</Link>
						<Link to="/">Профиль</Link>
						<Link to="/">Хранилище</Link>
					</>
				) : (
						<>
							hello
					</>
				)}
			</div>
		</div>
	)
} 
