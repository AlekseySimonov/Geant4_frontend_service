import { SecondaryButton } from "@/shared/ui/components/buttons";
import styles from "./_exampleCard.module.scss"
import { useNavigate } from "react-router";

interface ExampleCardTypes {
	category?: string;
	tag?: string;
	description?: string;
	title?: string;
	onClick?: () => void;
}


const ExampleCard: React.FC<ExampleCardTypes> = ({
	title = '',
	description = '',
	category = '',
	tag = '',
	onClick
}) => {
	const navigate = useNavigate()

	const isNonEmptyString = (value: unknown): value is string =>
		typeof value === 'string' && value.trim().length > 0;

	const handleCategoryClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (category?.trim()) {
			navigate(`/modeling/examples?category=${category}&page=1`)
		}
	}

	const handleTagClick = (e: React.MouseEvent) => {
		e.stopPropagation();
		if (tag?.trim()) {
			navigate(`/modeling/examples?tags=${encodeURIComponent(tag.trim())}&page=1`)
		}
	}

	return (
		<div className={styles.card} onClick={onClick}>
			<h2>{title?.trim() ? title : 'Без названия'}</h2>
			<div className={styles.card__tags}>
				{isNonEmptyString(category) && (
					<SecondaryButton label={category.trim()} onClick={handleCategoryClick} />
				)}
				{isNonEmptyString(tag) && (
					<SecondaryButton label={tag.trim()} onClick={handleTagClick} />
				)}
			</div>
			<div className={styles.card__description}>
				<p>{description?.trim() ? description : 'Описание отсутствует'}</p>
			</div>
		</div>
	)
}
export default ExampleCard