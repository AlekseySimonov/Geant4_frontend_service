import styles from "./_secondaryButton.module.scss";
import { Link } from 'react-router';

interface SecondaryButtonProps {  
	label: string; 
	link: string
}  

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({ label, link }) => {  
	return (  
		<Link to={link} className={styles.button}>  
			<p>{label}</p>  
		</Link>  
	);  
};  