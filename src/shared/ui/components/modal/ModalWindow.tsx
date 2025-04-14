import { ReactNode } from 'react';
import { Modal } from '@mui/material';
import { SecondaryButton } from '../buttons';
import styles from "./_modalWindow.module.scss"

interface ModalWindowProps {
	children: ReactNode;
	onClose: () => void;
	open: boolean;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({ onClose, children, open  }) => {

	return (
		<>

			<Modal open={open} onClose={onClose}>
				<div className={styles.modal}>
					{children}
					<SecondaryButton label='Отмена' onClick={onClose} fullWidth/>
				</div>
			</Modal>
		</>
	);
};  