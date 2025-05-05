import { useLogoutMutation } from "@/pages/authPage/api/authApi";
import styles from "./_profileSettings.module.scss"
import { PrimaryButton } from "@/shared/ui/components/buttons";

export const Logout: React.FC = () => {
	const [logout, { isError }] = useLogoutMutation();

	const handleSubmit = async () => {
		try {
			await logout({}).unwrap();
			window.location.replace('/auth/login')
		} catch (error) {
			console.error("Ошибка при выходе:", error);
		}
	};

	return (
		<div className={styles.logout}>
			<h3>Выход</h3>
			<p>Вы уверены, что хотите выйти из аккаунта?</p>
			{isError && (
				<div className={styles.logout__errorMessage}>
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