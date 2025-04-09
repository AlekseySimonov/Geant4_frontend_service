import { Link, useNavigate, useParams } from "react-router";
import { useEmailVerifyConfirmQuery } from "@/pages/authPage/api/authApi";
import { useEffect } from "react";
import styles from "./_authForm.module.scss"

export const EmailVerifyConfirmPage: React.FC = () => {
	const { token } = useParams<{ token: string }>();
	const { isLoading, isError, isSuccess } = useEmailVerifyConfirmQuery(token!, {
		skip: !token,
	});
	const navigate = useNavigate();

	useEffect(() => {
		if (isSuccess) {
			const timeout = setTimeout(() => {
				navigate("/", { replace: true });
			}, 2000);

			return () => clearTimeout(timeout);
		}
	}, [isSuccess, navigate]);

	if (isLoading) return <p>Подтверждение email...</p>;
	if (isSuccess) return <p>Email успешно подтверждён!</p>;
	if (isError) {
		return (
			<div className={styles.form}>
				<p>Ошибка подтверждения email. Возможно, ссылка недействительна или устарела.</p>
				<Link className={styles.form_link} to="/auth/login">
					Вернуться
				</Link>
			</div>
		);
	}

	return null;
};