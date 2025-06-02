import React from "react";
import { Link, useMatch } from "react-router";
import styles from "./_menu.module.scss";
import { ListItem, ListItemText } from "@mui/material";

type MenuItemProps = {
	label: string;
	to: string;
	onClick?: () => void;
	isListItem?: boolean;
};

export const MenuItem: React.FC<MenuItemProps> = ({ label, to, onClick, isListItem = false }) => {
	const match = useMatch({ path: to, end: to === "/" });

	if (isListItem) {
		return (
			<ListItem
				component={Link}
				to={to}
				onClick={onClick}
				className={match ? styles.activeListItem : ""}
				classes={{ gutters: styles.listItem }}
			>
				<ListItemText classes={{ primary: styles.listItem__text }} primary={label} />
			</ListItem>
		);
	}

	return (
		<Link to={to} className={match ? styles.activeLink : ""} onClick={onClick}>
			{label}
		</Link>
	);
};
