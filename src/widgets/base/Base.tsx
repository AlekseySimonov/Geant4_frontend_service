import { Menu } from '../menu/Menu';
import styles from './_base.module.scss'
import { Outlet } from 'react-router';
import { Container, CssBaseline } from '@mui/material';


export const Base = () => {
	return (
			<Container maxWidth = 'xl'>
				<Menu />
				<Outlet />
			</Container>
	)
}
