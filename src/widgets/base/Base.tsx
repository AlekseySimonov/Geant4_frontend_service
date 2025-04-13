import { Menu } from '../menu/Menu';
import { Outlet } from 'react-router';
import { Container } from '@mui/material';
import styles from "./_base.module.scss";
import { Loader } from '@/shared';
import { useSelector } from 'react-redux';
import { RootState } from '@/app/store';


export const Base = () => {
	const { isLoading } = useSelector((state: RootState) => state.globalLoading)

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
