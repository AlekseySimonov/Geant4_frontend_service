import { Menu } from '../menu/Menu';
import { Outlet } from 'react-router';
import { Container } from '@mui/material';


export const Base = () => {
	return (
			<Container maxWidth = 'xl'>
				<Menu />
				<Outlet />
			</Container>
	)
}
