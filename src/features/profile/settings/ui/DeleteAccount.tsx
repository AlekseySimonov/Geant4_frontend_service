import styles from "./_profileSettings.module.scss"
import { PrimaryButton} from "@/shared/ui/components/buttons";

export const DeleteAccount: React.FC = () => {

	const handleSubmit = async () => {
		console.log('Delete account')
	}

	return (
		<div className={styles.deleteAccount}>
			<h3>Удаление аккаунта</h3>
			<p>Вы уверены, что хотите удалить аккаунт?</p>
			{/* {status && <div className={styles.form_errorMessage}>{status}</div>} */}
			<PrimaryButton
				label="Подтверждаю"
				fullWidth
				onClick={handleSubmit}
			/>
		</div>
	);
};