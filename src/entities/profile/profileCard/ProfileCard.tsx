import { ProfileTypes } from "@/shared/types";
import styles from "./_profileCard.module.scss"
import settingsIcon from "@/shared/ui/assets/icons/settings.svg"

interface ProfileCardProps {  
    data: ProfileTypes; 
    onSettingsClick?: () => void;
} 

const ProfileCard: React.FC<ProfileCardProps> = ({ data, onSettingsClick }) => {

    return (  
        <div className={styles.card}>  
            <div className={styles.card__personal}>  
                <div className={styles.avatar}></div>  
                <div className={styles.data}>  
                    <h4>{data.first_name} {data.last_name}</h4>  
                    <h3>{data.username}</h3>  
                    <h3>{data.email}</h3>  
                </div>  
            </div>  
            <div className={styles.card__settings} onClick={onSettingsClick}>  
                <img src={settingsIcon} alt="Settings" />  
            </div>  
        </div>
    );  
};  

export default ProfileCard;