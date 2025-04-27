import { useRef, useState } from "react";
import styles from "./_filter.module.scss"
import { useClickOutside } from "@/shared/hooks";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';

interface FilterTypes{
	id: number;
	title: string;
}

interface FilterProps {
	options: FilterTypes[];
	onOptionSelect?: (title: string) => void;
	label: string;
	selectedOption?: string | null;
	width?: string
}

export const Filter: React.FC<FilterProps> = ({
	onOptionSelect,
	label,
	options,
	width,
	selectedOption
}) => {
	const [open, setOpen] = useState(false);
	const filterRef = useRef<HTMLDivElement | null>(null);

	useClickOutside(filterRef, () => setOpen(false))

	const handleOptionClick = (option: FilterTypes) => {
		setOpen(false);
		onOptionSelect?.(option.title);
	};

	return (
		<div
			className={styles.filter}
			ref={filterRef}
			style={{ width: width || 'max-content' }}
		>
			<div className={`${styles.filter__button} ${open ? styles.open : ''}`} onClick={() => setOpen(prev => !prev)}>
				{selectedOption ? selectedOption : label}
				<KeyboardArrowDownRoundedIcon
					className={open ? styles.iconOpen : ''}
					color="inherit"
					style={{ fontSize: 25 }}
				/>
			</div>
			{open && (
				<div className={styles.filter__popper}>
					{options.map((option) => (
						<div
							key={option.id}
							className={styles.filter__popper__item}
							onClick={() => handleOptionClick(option)}
						>
							{option.title}
						</div>
					))}
				</div>)}
		</div>
	);
}