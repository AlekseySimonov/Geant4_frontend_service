import { ProfileTypes } from "@/shared/types";
import styles from "./_profileCard.module.scss"
import settingsIcon from "@/shared/ui/assets/icons/settings.svg"
import { IconButton } from "@mui/material";
import { usePopup } from "@/shared/hooks";
import { ModalWindow } from "@/shared/ui/components/modal";
import { Loader } from "@/shared";
import { Logout } from "@/features/profile/settings/ui/Logout";
import { useSelector } from "react-redux";
import { RootState } from "@/app/store";
import { SecondaryButton } from "@/shared/ui/components/buttons";

interface ProfileCardProps {
    data: ProfileTypes;
    onSettingsClick?: () => void;
    avatar: string | null;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ data, onSettingsClick, avatar }) => {
    const logout = usePopup()
    const { isLoading } = useSelector((state: RootState) => state.globalLoading)
    return (
        <>
            <div className={styles.card}>
                <div className={styles.card__personal}>
                    <img className={`${styles.avatar} ${avatar ? styles.loaded : ''}`} src={avatar} alt='avatar' />
                    <div className={styles.data}>
                        <h4>{data.first_name} {data.last_name}</h4>
                        <h3>{data.username}</h3>
                        <h3>{data.email}</h3>
                    </div>
                </div>
                <div className={styles.card__settings}>
                    <div>
                        {data?.is_staff && (<h3>Сотрудник</h3>)}
                        <IconButton color="primary">
                            <img src={settingsIcon} alt="Settings" onClick={onSettingsClick}/>
                        </IconButton>
                    </div>
                    <SecondaryButton size= 's' label="Выйти" onClick={logout.openPopup} />
                </div>
            </div>
            <ModalWindow open={logout.isVisible} onClose={logout.closePopup}>
                <Logout />
                {isLoading && <Loader />}
            </ModalWindow>
        </>
    );
};

export default ProfileCard;