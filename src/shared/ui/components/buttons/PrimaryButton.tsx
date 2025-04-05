import styles from "./_primaryButton.module.scss";
import { Link } from 'react-router';

interface PrimaryButtonProps {  
	label: string; 
	link: string
}  

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ label, link }) => {  
	return (  
		<Link to={link} className={styles.button}>  
			<p>{label}</p>  
		</Link>  
	);  
};  
