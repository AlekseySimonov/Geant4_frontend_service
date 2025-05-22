import styles from "./_articleCard.module.scss"
import { Tag } from '@/shared/ui/components/tag';

interface ArticleCardTypes {
	category?: string;
	chapter?: string;
	description?: string;
	title?: string;
	onClick?: () => void;
}

const ArticleCard: React.FC<ArticleCardTypes> = ({
	title,
	description,
	category,
	chapter,
	onClick
}) => {
	return (
		<div className={styles.card} onClick={onClick}>
			<h2>{title?.trim() ? title : 'Без названия'}</h2>
			<div className={styles.card__tags}>
				{category?.trim() && <Tag label={category} defaultStyle />}
				{chapter?.trim() && <Tag label={chapter} defaultStyle />}
			</div>
			<div className={styles.card__description}>
				<p>{description?.trim() ? description : 'Описание отсутствует'}</p>
			</div>
		</div>
	)
}
export default ArticleCard