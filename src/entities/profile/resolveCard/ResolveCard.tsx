import { SecondaryButton } from "@/shared/ui/components/buttons";
import styles from "./_exampleCard.module.scss"
import { Tag } from '@/shared/ui/components/tag';
import { useNavigate } from "react-router";
import { Command } from "@/shared/types";

type ResolveCardProps = {
	title: string
	date: string
	tags?: string[]
	status: number
	category?: string
	info?: string
	params?: Record<string, string>
	onClick?: () => void;
}

const statusMap: Record<number, { label: string; tagProps: Partial<React.ComponentProps<typeof Tag>> }> = {
	0: { label: 'В процессе', tagProps: { inProgress: true, info: 'Оповещение о завершении придет на почту' } },
	1: { label: 'Завершено', tagProps: { success: true } },
	2: { label: 'Ошибка', tagProps: { error: true, info: 'Произошла ошибка при моделировании' } },
}

const ResolveCard: React.FC<ResolveCardProps> = ({
	title,
	date,
	category = "",
	tags = [],
	status,
	params,
	onClick,
}) => {
	const { label, tagProps } = statusMap[status] || { label: 'Неизвестно', tagProps: {} }
	const navigate = useNavigate()

	const isNonEmptyString = (value: unknown): value is string =>
		typeof value === 'string' && value.trim().length > 0;

	const handleCategoryClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (category?.trim()) {
			navigate(`/profile?category=${category}&page=1`)
		}
	}

	const handleTagClick = (e: React.MouseEvent, tag: string) => {
		e.stopPropagation();
		if (tag.trim()) {
			navigate(`/profile?tags=${encodeURIComponent(tag.trim())}&page=1`);
		}
	};

	return (
		<div className={styles.resolve} onClick={onClick}>
			<div className={styles.resolve__info}>
				<h4>{title}</h4>
				<h3>{new Date(date).toLocaleDateString()}</h3>
				<div className={styles.resolve__info__tags}>
					{isNonEmptyString(category) && (
						<SecondaryButton label={category.trim()} onClick={handleCategoryClick} />
					)}
					{Array.isArray(tags) &&
						tags.map((tag, index) =>
							isNonEmptyString(tag) ? (
								<SecondaryButton
									key={index}
									label={tag.trim()}
									onClick={(e) => handleTagClick(e, tag)}
								/>
							) : null
						)}
				</div>
				<div className={styles.resolve__info__commands}>
					{params && Object.keys(params).length > 0 ? (
						<div className={styles.resolve__info__commandRow}>
							<strong>Команды:</strong>
							{Object.entries(params).map(([key, value], index, array) => (
								<span key={key} className={styles.resolve__info__commandItem}>
									{key.split('---').join(' ')}: {value}
									{index < array.length - 1 ? '; ' : ''}
								</span>
							))}
						</div>
					) : (
						<p className={styles.resolve__info__noCommands}>Нет команд</p>
					)}

				</div>

			</div>
			<div className={styles.resolve__progress}>
				<Tag label={label} {...tagProps} />
			</div>
		</div>
	)
}

export default ResolveCard