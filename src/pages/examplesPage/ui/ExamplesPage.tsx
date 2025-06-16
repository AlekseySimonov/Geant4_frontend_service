import styles from "./_examplesPage.module.scss"
import { Outlet } from "react-router";

const ExamplesPage: React.FC = () => {

	return (
		<div className={styles.examples}>
			<Outlet />
		</div>
	)
}

export default ExamplesPage