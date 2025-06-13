import { Alert, Zoom } from '@mui/material';
import { useEffect } from 'react';
import { AppDispatch, RootState } from '@/app/store';
import { useDispatch, useSelector } from 'react-redux';
import { hideAlert } from '../model/alertSlice';
import styles from "./alert.module.scss";

export const AlertPopup = () => {
	const { message, visible, severity, id } = useSelector((state: RootState) => state.alert);
	const dispatch: AppDispatch = useDispatch();

	useEffect(() => {
		if (visible) {
			const timer = setTimeout(() => dispatch(hideAlert()), 5000);
			return () => clearTimeout(timer);
		}
	}, [id, dispatch]);

	return (
		<div className={styles.alert}>
			<Zoom  in={visible} timeout={300}>
				<Alert severity={severity}>{message}</Alert>
			</Zoom>
		</div>
	);
};
