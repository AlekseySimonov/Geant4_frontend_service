import { Menu } from '../menu/Menu';
import { Outlet } from 'react-router';
import { Container } from '@mui/material';
import styles from "./_base.module.scss";


export const Base = () => {
	return (
			<Container maxWidth = 'xl'>
				<Menu />
				<Outlet />
				<div className={styles.background}></div>
			</Container>
	)
}
