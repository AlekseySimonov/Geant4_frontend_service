import styles from "./_importrantArticleCard.module.scss"
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

interface ArticleCardTypes {
	description?: string;
	title?: string;
	onClick?: () => void;
}

const ImportantArticleCard: React.FC<ArticleCardTypes> = ({
	title,
	description,
	onClick,
}) => {
	return (
		<div className={styles.card} onClick={onClick}>
			<div className={styles.card__title}>
				<h2>{title?.trim() ? title : 'Без названия'}</h2>
				<ArrowForwardIosRoundedIcon style={{ fontSize: 20 }}/>
			</div>
			<div className={styles.card__description}>
				<p>{description?.trim() ? description : 'Описание отсутствует'}</p>
			</div>
		</div>
	)
}
export default ImportantArticleCard