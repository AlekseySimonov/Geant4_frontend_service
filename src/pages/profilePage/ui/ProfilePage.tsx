import { useCheckAuthQuery } from "@/pages/authPage/api/authApi";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router";
import styles from "./_profilePage.module.scss";

const ProfilePage: React.FC = () => {

	const navigate = useNavigate()
	const { data, isSuccess, isError } = useCheckAuthQuery();

	useEffect(() => {
		if (isError || (isSuccess && data?.detail !== true)) {
			navigate('/auth/login', { replace: true });
		}
	}, [isSuccess, isError, data, navigate]);

	return (
		<div className={styles.profile}>
			<Outlet />
		</div>
	);
};

export default ProfilePage;
