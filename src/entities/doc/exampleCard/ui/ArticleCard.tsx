import styles from "./_articleCard.module.scss"
import { Tag } from '@/shared/ui/components/tag';

interface ArticleCardTypes{
	title?: string;
}

const ArticleCard: React.FC<ArticleCardTypes> = ({title}) => { 
	return (
		<div className={styles.card}>
			<h2>{title || 'Без названия'}</h2>
			<div className={styles.card__tags}>
				<Tag label="Рентгеновское измучение" defaultStyle />
				<Tag label="Взаимодействие с веществом" defaultStyle />
			</div>
			
			<div className={styles.card__description}>
				<p>Изучение абсорбции, рассеяния и прохождения рентгеновских лучей через различные материалы</p>
			</div>
		</div>
	)
}
export default ArticleCard