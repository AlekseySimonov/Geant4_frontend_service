import { useCheckAuthQuery } from "@/pages/authPage/api/authApi";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import styles from "./_profilePage.module.scss";
import { Helmet } from "react-helmet-async";

const ProfilePage: React.FC = () => {

	const navigate = useNavigate()
	const { data, isSuccess, isError } = useCheckAuthQuery();

	useEffect(() => {
		if (isError || (isSuccess && data?.detail !== true)) {
			navigate('/auth/login', { replace: true });
		}
	}, [isSuccess, isError, data, navigate]);

	return (
		<>
			<Helmet>
				<title>Профиль</title>
			</Helmet>
			<div className={styles.profile}>
				<Outlet />
			</div>
		</>
	);
};

export default ProfilePage;
