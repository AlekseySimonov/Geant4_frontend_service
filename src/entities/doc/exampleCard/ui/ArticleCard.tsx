import styles from "./_articleCard.module.scss"
import { Tag } from '@/shared/ui/components/tag';

const ArticleCard: React.FC = () => { 
	return (
		<div className={styles.card}>
			<h2>Hассеяние рентгеновских лучей в среде</h2>
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