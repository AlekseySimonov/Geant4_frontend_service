import styles from "./_resolvesList.module.scss"
import { ResolveCard } from "@/entities"
import { useGetExamplesQuery } from "@/pages/profilePage/api/profileApi"
import { PrimaryButton } from "@/shared/ui/components/buttons"
import { useNavigate } from "react-router"

const ResolvesList: React.FC = () => {
	const navigate = useNavigate()
	const { data: examples, isLoading  } = useGetExamplesQuery()

	if (!examples) {
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
							key={`${example.example_id}-${index}`}
							title={example.title_verbose ?? "Без названия"}
							date={example.creation_date}
							status={example.status}
							tags={example.tags}
							onClick={() => navigate(`/profile/my_example/${example.example_id}`)}
						/>
					))}
				</div>
			)}
		</div>
	)
}

export default ResolvesList