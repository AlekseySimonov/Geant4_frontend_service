import { useRef, useState } from "react";
import styles from "./_filter.module.scss"
import { useClickOutside } from "@/shared/hooks";
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import { FilterProps, FilterTypes } from "./model/types";
import CreateOutlinedIcon from '@mui/icons-material/CreateOutlined';

export const Filter: React.FC<FilterProps> = ({
	onOptionSelect,
	label,
	options,
	width,
	selectedOption,
	onAddButtonClick,
	hasError,
}) => {
	const [open, setOpen] = useState(false);
	const filterRef = useRef<HTMLDivElement | null>(null);

	useClickOutside(filterRef, () => setOpen(false))

	const handleOptionClick = (option: FilterTypes) => {
		setOpen(false);
		onOptionSelect?.(option);
	};

	return (
		<div
			className={styles.filter}
			ref={filterRef}
			style={{ minWidth: width || 'max-content' }}
		>
			<div className={`
					${styles.filter__button} 
					${open ? styles.open : ''} 
					${hasError ? styles.error : ''}
				`}
				onClick={() => setOpen(prev => !prev)}
			>
				<div className={styles.filter__button__label}>
					{selectedOption ? selectedOption.title : label}
				</div>
				<KeyboardArrowDownRoundedIcon
					className={open ? styles.iconOpen : ''}
					color="inherit"
					style={{ fontSize: 25 }}
				/>
			</div>
			{open && (
				<div className={styles.filter__popper}>
					{(!options || options.filter(option => option.title?.trim()).length === 0) ? (
						<div className={styles.filter__popper__undefined}>
							Ничего не найдено
						</div>
					) : (
						options
							.filter(option => option.title?.trim())
							.map((option) => (
								<div
									key={option.id}
									className={styles.filter__popper__item}
									onClick={() => handleOptionClick(option)}
								>
									{option.title}
								</div>
							))
					)}
					{onAddButtonClick && (
						<div
							className={styles.filter__popper__item}
							onClick={() => {
								setOpen(false);
								onAddButtonClick();
							}}
						>
							<CreateOutlinedIcon style={{ fontSize: 25 }} />
							<p>Редактировать список</p>
						</div>
					)}
				</div>)}
		</div>
	);
}