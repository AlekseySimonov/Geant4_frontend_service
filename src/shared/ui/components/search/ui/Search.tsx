import { useRef } from "react";
import styles from "./_search.module.scss"
import searchIcon from "@/shared/ui/assets/icons/search.svg"
import crossIcon from "@/shared/ui/assets/icons/cross.svg"
import { CircularProgress } from "@mui/material";
import { SearchProps } from "../model/types";
import { useSearch } from "../model/useSearch";

export const Search: React.FC<SearchProps> = ({
	onSearch,
	onOptionSelect,
	searchValue,
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

	return (
		<div className={styles.search} onClick={handleSearchClick} ref={searchRef}>
			<div className={`${styles.search__input} ${open ? styles.open : ''}`}>
				<img className={styles.search__input__icon} src={searchIcon} alt="#" />
				<input
					type="text"
					placeholder="Поиск"
					ref={inputRef}
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
					onKeyDown={(e) => {
						if (e.key === "Enter") {
							e.preventDefault();
							if (searchText.trim()) {
								e.preventDefault();
								handleOptionClick({ title: searchText.trim(), id: -1 });
							}
						}
					}}
				/>
				{searchText && (
					<img className={styles.search__input__cross} src={crossIcon} alt="#" onClick={() => setSearchText('')} />
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