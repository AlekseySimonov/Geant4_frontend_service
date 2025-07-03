import { useEffect, useRef } from "react";
import styles from "./_search.module.scss"
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { CircularProgress } from "@mui/material";
import { SearchProps } from "../model/types";
import { useSearch } from "../model/useSearch";
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';

export const Search: React.FC<SearchProps> = ({
	onSearch,
	onOptionSelect,
	searchValue,
	resetKey
}) => {
	const inputRef = useRef(null);
	const {
		searchRef,
		open,
		searchText,
		setSearchText,
		handleSearchClick,
		handleOptionClick,
		loading,
		options,
	} = useSearch({ onSearch, onOptionSelect, searchValue });

	useEffect(() => {
		setSearchText(searchValue);
	}, [resetKey, searchValue]);

	return (
		<div className={styles.search} onClick={handleSearchClick} ref={searchRef}>
			<div className={`${styles.search__input} ${open ? styles.open : ''}`}>
				<SearchOutlinedIcon style={{ fontSize: 30 }} color="inherit"/>
				<input
					type="text"
					placeholder="Поиск"
					ref={inputRef}
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							handleOptionClick({ title: searchText.trim(), id: -1 });
						}
					}}
				/>
				{searchText && (
					<ClearRoundedIcon
						style={{ fontSize: 20, cursor: 'pointer' }}
						onClick={() => {
							setSearchText('');
							handleOptionClick({ title: '', id: -1 });
						}}
					/>
				)}
				{loading && (
					<div className={styles.search__input__loader}>
						<CircularProgress color="inherit" size={20} />
					</div>
				)}
			</div>
			{open && (<div className={styles.search__popper}>
				{loading && <div className={styles.search__popper__info}>Загрузка...</div>}
				{!loading && options.length === 0 && (
					<div className={styles.search__popper__info}>Ничего не найдено</div>
				)}
				{!loading &&
					options.map((option, index) => (
						<div
							key={index}
							className={styles.search__popper__item}
							onClick={() => handleOptionClick(option)}
						>
							{option.title}
						</div>
					))}
			</div>)}
		</div>
	);
}