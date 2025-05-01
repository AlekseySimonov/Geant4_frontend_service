import styles from "./_docPage.module.scss"
import { Outlet } from "react-router";

const DocumentationPage: React.FC = () => {

	return (
		<div className={styles.doc}>
			<Outlet />
		</div>
	)
}

export default DocumentationPage