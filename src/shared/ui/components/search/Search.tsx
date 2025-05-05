import { useEffect, useRef, useState } from "react";
import styles from "./_search.module.scss"
import searchIcon from "@/shared/ui/assets/icons/search.svg"
import crossIcon from "@/shared/ui/assets/icons/cross.svg"
import { useClickOutside, useDebounce } from "@/shared/hooks";
import { CircularProgress } from "@mui/material";
import { ArticlesTypes } from "@/shared/types";

interface SearchProps {
	onSearch: (query: string) => Promise<{ title: string, id: number }[]>;
	onOptionSelect?: (title: string) => void;
	searchValue?: string;
}

export const Search: React.FC<SearchProps> = ({
	onSearch,
	onOptionSelect,
	searchValue,
}) => {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<readonly ArticlesTypes[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState('');
	const searchRef = useRef<HTMLDivElement | null>(null);
	const inputRef = useRef(null);
	const debouncedSearchText = useDebounce(searchText, 500)

	useClickOutside(searchRef, () => setOpen(false))

	useEffect(() => {
		if (debouncedSearchText.length <= 3) {
			setOpen(false);
			return;
		}

		const fetchData = async () => {
			setLoading(true);
			setOpen(true);
			const results = await onSearch(debouncedSearchText);
			const filtered = results.filter(article =>
				Boolean(article.title) &&
				article.id != null
			);
			setOptions(filtered);
			setLoading(false);
		};

		fetchData();

	}, [debouncedSearchText]);

	const handleSearchClick = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	const handleOptionClick = (option: ArticlesTypes) => {
		setSearchText(option.title);
		setOpen(false);
		onOptionSelect?.(option.title);
	};

	useEffect(() => {
		if (searchValue !== searchText) {
			setSearchText(searchValue);
		}
	}, [searchValue]);

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
								onOptionSelect?.(searchText.trim());
								setOpen(false);
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