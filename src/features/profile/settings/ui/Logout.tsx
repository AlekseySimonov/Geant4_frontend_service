import { useLogoutMutation } from "@/pages/authPage/api/authApi";
import styles from "./_profileSettings.module.scss"
import { PrimaryButton } from "@/shared/ui/components/buttons";
import { useNavigate } from "react-router";

export const Logout: React.FC = () => {
	const navigate = useNavigate()
	const [logout, { isError }] = useLogoutMutation();

	const handleSubmit = async () => {
		try {
			await logout({}).unwrap();
		} catch (error) {
			console.error("Ошибка при выходе:", error);
			navigate('/auth')
		}
	};

	return (
		<div className={styles.logout}>
			<h3>Выход</h3>
			<p>Вы уверены, что хотите выйти из аккаунта?</p>
			{isError && (
				<div className={styles.logout_errorMessage}>
				Не удалось выйти. Попробуйте ещё раз.
				</div>
			)}
			<PrimaryButton
				label="Подтверждаю"
				fullWidth
				onClick={handleSubmit}
			/>
		</div>
	);
};