import { SecondaryButton } from "@/shared/ui/components/buttons";
import styles from "./_articleCard.module.scss"
import { Tag } from '@/shared/ui/components/tag';
import { useNavigate } from "react-router";

interface ArticleCardTypes {
	category?: string;
	chapter?: string;
	description?: string;
	title?: string;
	onClick?: () => void;
}


const ArticleCard: React.FC<ArticleCardTypes> = ({
	title = '',
	description = '',
	category = '',
	chapter = '',
	onClick
}) => {
	const navigate = useNavigate()

	const isNonEmptyString = (value: unknown): value is string =>
		typeof value === 'string' && value.trim().length > 0;

	const handleCategoryClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (category?.trim()) {
			navigate(`/documentation/articles?category=${category}&page=1`)
		}
	}

	const handleChapterClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (chapter?.trim()) {
			navigate(`/documentation/articles?chapter=${encodeURIComponent(chapter.trim())}&page=1`)
		}
	}

	return (
		<div className={styles.card} onClick={onClick}>
			<h2>{title?.trim() ? title : 'Без названия'}</h2>
			<div className={styles.card__tags}>
				{isNonEmptyString(category) && (
					<SecondaryButton label={category.trim()} onClick={handleCategoryClick} />
				)}
				{isNonEmptyString(chapter) && (
					<SecondaryButton label={chapter.trim()} onClick={handleChapterClick} />
				)}
			</div>
			<div className={styles.card__description}>
				<p>{description?.trim() ? description : 'Описание отсутствует'}</p>
			</div>
		</div>
	)
}
export default ArticleCard