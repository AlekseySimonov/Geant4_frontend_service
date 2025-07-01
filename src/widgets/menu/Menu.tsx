import { Link, useNavigate } from "react-router";
import styles from "./_menu.module.scss";
import { Drawer, IconButton, List, ListItem, useColorScheme, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import arrow from "@/shared/ui/assets/icons/arrow.svg";
import { useCheckAuthQuery } from "@/pages/authPage/api/authApi";
import { SecondaryButton } from "@/shared/ui/components/buttons";
import { MenuItem } from "./MenuItem";
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';

export const ThemeToggleButton: React.FC = () => {
	const { mode, setMode } = useColorScheme();
	if (mode === undefined) return null;

	return (
		<IconButton
			onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}
		>
			{mode === 'light' ? <Brightness4Icon /> : <Brightness7Icon />}
		</IconButton>
	);
};

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
						<ThemeToggleButton />
					</>
				) : (
					<>
						<MenuRoundedIcon
							onClick={() => setToggleDrawer(true)}
							color="inherit"
							style={{ fontSize: 40 }}
						/>
						<Drawer
							classes={{ paperAnchorRight: styles.menu__navigation__drawer }}
							anchor="right"
							open={toggleDrawer}
							onClose={() => setToggleDrawer(false)}
						>
							<List>
								<ListItem classes={{ gutters: styles.listItem }}>
									<ArrowForwardIosRoundedIcon
										color="inherit"
										style={{ fontSize: 20 }}
										onClick={() => setToggleDrawer(false)}
									/>
								</ListItem>
								{menuItems.map(({ label, to }) => (
									<MenuItem
										key={label}
										label={label}
										to={to}
										onClick={() => setToggleDrawer(false)}
										isListItem
									/>
								))}
								<ListItem classes={{ gutters: styles.listItem }}><ThemeToggleButton /></ListItem>
							</List>
						</Drawer>
					</>
				)}
			</div>)}
		</div>
	);
};

