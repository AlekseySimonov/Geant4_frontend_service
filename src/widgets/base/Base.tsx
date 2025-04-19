import { Menu } from '../menu/Menu';
import { Outlet } from 'react-router';
import { Container } from '@mui/material';
import styles from "./_base.module.scss";
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { Loader } from '@/shared';


export const Base = () => {
	const { isLoading: avatarLoading } = useSelector((state: RootState) => state.avatar);
	const { isLoading: globalLoading } = useSelector((state: RootState) => state.globalLoading);

	return (
		<Container maxWidth='xl' sx={{overflowY: 'auto'}}>
			<Menu />
				<Outlet />
				{(globalLoading || avatarLoading)&& <Loader /> }
			<div className={styles.background}></div>
		</Container>
	);
};
