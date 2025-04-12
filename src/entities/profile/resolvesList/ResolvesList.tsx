import { PrimaryButton } from "@/shared/ui/components/buttons"
import styles from "./_resolvesList.module.scss"

const ResolvesList: React.FC = () => {
	return (
		<div className={styles.resolves}>
			<h4>Мои решения</h4>
			<div className={styles.resolves__list}>
				<h3>У вас пока нет решений</h3>
				<PrimaryButton label='Приступить к моделированию' link="/"/>
			</div>
		</div>
	)
}

export default ResolvesList