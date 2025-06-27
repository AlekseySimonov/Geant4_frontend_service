import { useCheckAuthQuery } from "@/pages/authPage/api/authApi";
import styles from "./_examplesPage.module.scss"
import { Outlet, useNavigate } from "react-router";
import { useEffect } from "react";

const ExamplesPage: React.FC = () => {

	const navigate = useNavigate()
	const { data, isSuccess, isError } = useCheckAuthQuery();

	useEffect(() => {
		if ((isSuccess && data?.detail === true && isError)) {
			navigate('/auth/login', { replace: true });
		}
	}, [isSuccess, data, navigate]);

	return (
		<div className={styles.examples}>
			<Outlet />
		</div>
	)
}

export default ExamplesPage