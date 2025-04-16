import { Link, useNavigate, useParams } from "react-router";
import { useEmailVerifyConfirmQuery } from "@/pages/authPage/api/authApi";
import { useEffect } from "react";
import styles from "./_authForm.module.scss"
import { SecondaryButton } from "@/shared/ui/components/buttons";

export const EmailVerifyConfirmPage: React.FC = () => {
	const { token } = useParams<{ token: string }>();
	const { isError, isSuccess } = useEmailVerifyConfirmQuery(token!, {
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

	if (isSuccess) return <p>Email успешно подтверждён!</p>;
	if (isError) {
		return (
			<div className={styles.form}>
				<p className={styles.text}>Ошибка подтверждения email. Возможно, ссылка недействительна или устарела.</p>
				<SecondaryButton label = 'Вернуться' size = 's' link="/auth/login" fullWidth/>
			</div>
		);
	}

	return null;
};