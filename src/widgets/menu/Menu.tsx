import { Link, useNavigate } from "react-router";
import styles from "./_menu.module.scss";
import { Drawer, List, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import arrow from "@/shared/ui/assets/icons/arrow.svg";
import burger from "@/shared/ui/assets/icons/burger.svg";
import { useCheckAuthQuery } from "@/pages/authPage/api/authApi";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import { MenuItem } from "./MenuItem";

export const Menu: React.FC = () => {
	const theme = useTheme();
	const navigate = useNavigate();
	const { data: isAuth, isSuccess, isFetching } = useCheckAuthQuery();
	const isMobile = useMediaQuery(theme.breakpoints.down("md"));
	const [toggleDrawer, setToggleDrawer] = useState(false);

	const menuItems = [
		{ label: "Документация", to: "/documentation" },
		{ label: "Моделирование", to: "/modeling" },
		{ label: "Профиль", to: "/profile" },
	];

	return (
		<div className={styles.menu}>
			<div className={styles.menu__background}></div>
			<div className={styles.menu__logo}>
				<Link to={"/main"}>Geant4ru</Link>
			</div>
			{!isFetching && (<div className={styles.menu__navigation}>
				{(!isSuccess || isAuth?.detail !== true) ? (
					<SecondaryButton label="Войти" onClick={() => navigate("/auth/login")} />
				) : !isMobile ? (
					<>
						{menuItems.map(({ label, to }) => (
							<MenuItem key={label} label={label} to={to} />
						))}
					</>
				) : (
					<>
						<img
							src={burger}
							onClick={() => setToggleDrawer(true)}
							className={styles.menu__navigation__img}
						/>
						<Drawer
							classes={{ paperAnchorRight: styles.menu__navigation__drawer }}
							anchor="right"
							open={toggleDrawer}
							onClose={() => setToggleDrawer(false)}
						>
							<List>
								<img src={arrow} onClick={() => setToggleDrawer(false)} />
								{menuItems.map(({ label, to }) => (
									<MenuItem
										key={label}
										label={label}
										to={to}
										onClick={() => setToggleDrawer(false)}
										isListItem
									/>
								))}
							</List>
						</Drawer>
					</>
				)}
			</div>)}
		</div>
	);
};

