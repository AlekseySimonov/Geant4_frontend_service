import styles from "./_exampleCard.module.scss"
import { Tag } from '@/shared/ui/components/tag';

type ResolveCardProps = {
	title: string
	date: string
	tags: string[]
	status: number
	info?: string
}

const statusMap: Record<number, { label: string; tagProps: Partial<React.ComponentProps<typeof Tag>> }> = {
	0: { label: 'В процессе', tagProps: { inProgress: true, info: 'Оповещение о завершении придет на почту' } },
	1: { label: 'Завершено', tagProps: { success: true } },
	2: { label: 'Ошибка', tagProps: { error: true, info: 'Произошла ошибка при моделировании' } },
}

const ResolveCard: React.FC<ResolveCardProps> = ({ title, date, tags, status }) => {
	const { label, tagProps } = statusMap[status] || { label: 'Неизвестно', tagProps: {} }

	return (
		<div className={styles.resolve}>
			<div className={styles.resolve__info}>
				<h4>{title}</h4>
				<h3>{new Date(date).toLocaleDateString()}</h3>
				<div className={styles.resolve__info__tags}>
					{tags.map((tag, index) => (
						<Tag key={index} label={tag} defaultStyle />
					))}
				</div>
			</div>
			<div className={styles.resolve__progress}>
				<Tag label={label} {...tagProps}/>
			</div>
		</div>
	)
}

export default ResolveCard