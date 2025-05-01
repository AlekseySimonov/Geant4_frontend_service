import styles from "./_resolvesList.module.scss"
import { ResolveCard } from "@/entities"
import { useGetExamplesQuery } from "@/pages/profilePage/api/profileApi"
import { PrimaryButton } from "@/shared/ui/components/buttons"

const ResolvesList: React.FC = () => {
	const { data: examples, isLoading  } = useGetExamplesQuery()

	if (isLoading) {
		return null
	}

	return (
		<div className={styles.resolves}>
			<h4>Мои решения</h4>

			{!examples || examples.length === 0 ? (
				<div className={styles.resolves__nullList}>
					<h3>У вас пока нет решений</h3>
					<PrimaryButton label="Приступить к моделированию" link="/" />
				</div>
			) : (
				<div className={styles.resolves__list}>
					{examples.map((example, index) => (
						<ResolveCard
							key={index}
							title={example.title_verbose}
							date={example.creation_date}
							status={example.status}
							tags={example.tags}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default ResolvesList