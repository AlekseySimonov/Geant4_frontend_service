import { ReactNode } from 'react';
import { Modal } from '@mui/material';
import { SecondaryButton } from '../buttons';
import styles from "./_modalWindow.module.scss"

interface ModalWindowProps {
	children: ReactNode;
	onClose: () => void;
	open: boolean;
	width?: string;
}

export const ModalWindow: React.FC<ModalWindowProps> = ({ onClose, children, open, width }) => {

	return (
		<>
			<Modal open={open} onClose={onClose}>
				<div
					className={styles.modal}
					style={{ width: width ?? '560px' }}
				>
					{children}
					<SecondaryButton label='Отмена' onClick={onClose} fullWidth />
				</div>
			</Modal>
		</>
	);
};  