import { Menu } from '../menu/Menu';
import { Outlet } from 'react-router';
import { Container } from '@mui/material';
import styles from "./_base.module.scss";
import { useGlobalLoading } from '@/shared/hooks';
import { Loader } from '@/shared';


export const Base = () => {
	const isLoading = useGlobalLoading();

	return (
		<Container maxWidth='xl'>
			<Menu />

			{isLoading ? (<Loader/>) : (
				<Outlet />
			)}
			<div className={styles.background}></div>
		</Container>
	);
};
