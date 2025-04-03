import { Menu } from '../menu/Menu';
import styles from './_base.module.scss'
import { Outlet } from 'react-router';


export const Base = () => {
	return (
		<div className={styles.grid}>
			<Menu/>
			<Outlet/>
		</div>
	)
}
