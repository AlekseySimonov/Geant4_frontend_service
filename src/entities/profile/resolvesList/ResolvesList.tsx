import { PrimaryButton } from "@/shared/ui/components/buttons"
import styles from "./_resolvesList.module.scss"

const ResolvesList: React.FC = () => {
	return (
		<div className={styles.resolves}>
			<h3>Мои решения</h3>
			<div className={styles.resolves__list}>
				у вас пока нет решений
				<PrimaryButton label='Приступить к моделированию' link="/"/>
			</div>
		</div>
	)
}

export default ResolvesList