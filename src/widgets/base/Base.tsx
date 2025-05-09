import { Menu } from '../menu/Menu';
import { Outlet } from 'react-router';
import { Container } from '@mui/material';
import styles from "./_base.module.scss";
import { RootState } from '@/app/store';
import { useSelector } from 'react-redux';
import { Loader } from '@/shared';
import { AlertPopup } from '@/shared/ui/components/alert/ui/AlertPopup';


export const Base = () => {
	const { isLoading: avatarLoading } = useSelector((state: RootState) => state.avatar);
	const { isLoading: globalLoading } = useSelector((state: RootState) => state.globalLoading);

	return (
		<Container maxWidth='xl' sx={{ paddingBottom: '50px'}}>
			<Menu />
			<Outlet />
			<AlertPopup/>
			{(globalLoading || avatarLoading) && <Loader />}
			<div className={styles.background}></div>
			
		</Container>
	);
};
