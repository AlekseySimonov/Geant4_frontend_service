import styles from "./_card.module.scss";
import { SecondaryButton } from '@/shared/ui/components/buttons';

interface CardProps {
	title: string,
	text: string; 
	link: string,
	btnLabel: string,
	image?: string;
}

export const Card: React.FC<CardProps> = ({ title, text, link, btnLabel,image }) => {  
	return (
		<div className={styles.card}>
			{image && <img src={image} alt='#' className={styles.cardImage} />}
			<h2>{title}</h2>
			<p>{text}</p>
			<SecondaryButton label={btnLabel} link={link} />
		</div>
		
	);  
};  
