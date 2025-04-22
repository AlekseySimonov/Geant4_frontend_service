import { Link, useMatch } from "react-router"
import styles from "./_menu.module.scss"
import { Drawer, List, ListItem, ListItemText, useMediaQuery, useTheme } from "@mui/material"
import { useState } from "react";
import arrow from "@/shared/ui/assets/icons/arrow.svg"
import burger from "@/shared/ui/assets/icons/burger.svg"


export const Menu: React.FC = () => {

	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"))
	const [toggleDrawer, setToggleDrawer] = useState(false)

	const menuItems = [
		{ label: "Документация", to: "/documentation" },
		{ label: "Форум", to: "/forum" },
		{ label: "Моделирование", to: "/modeling" },
		{ label: "Профиль", to: "/profile" },
		{ label: "Хранилище", to: "/storage" },
	];

	return (
		<div className={styles.menu}>
			<div className={styles.menu__background}></div>
			<div className={styles.menu__logo}>
				<Link  to={'/main'}>
					Geant4ru
				</Link>
			</div>
			<div className={styles.menu__navigation}>
				{!isMobile ? (
					<>
						{menuItems.map((item) => {
						const match = useMatch({  
							path: item.to,  
							end: item.to === "/" 
						});
							
						return (
							<Link
								key={item.label}
								to={item.to}
								className={match ? styles.activeLink : ""}
							>
								{item.label}
							</Link>
						)})}
					</>
				) : (
					<>
							<img src={burger} onClick={() => setToggleDrawer(true)} className={styles.menu__navigation__img} />
							<Drawer
							classes={{paperAnchorRight: styles.menu__navigation__drawer}}
							anchor="right"
							open={toggleDrawer}
							onClose={() => setToggleDrawer(false)}
						>
								<List>
									<img src={arrow} onClick={() => setToggleDrawer(false)} />
									{menuItems.map((item) => {
										const match = useMatch({  
											path: item.to,  
											end: item.to === "/"  
										});  
										return(
										<ListItem
											classes={{ gutters: styles.listItem }}
											key={item.label}
											component={Link}
											to={item.to}
											onClick={() => setToggleDrawer(false)}
											className={match ? styles.activeListItem : ""}  
										>
											<ListItemText classes={{ primary: styles.listItem__text }} primary={item.label} />
										</ListItem>
									)})}
							</List>
						</Drawer>
					</>
				)}
			</div>
		</div>
	)
} 
