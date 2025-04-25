import { useEffect, useRef, useState } from "react";
import styles from "./_search.module.scss"
import searchIcon from "@/shared/ui/assets/icons/search.svg"
import crossIcon from "@/shared/ui/assets/icons/cross.svg"

interface Items {
	id?: number;
	category?: string;
	chapter?: string;
	description?: string;
	title: string;
	chosen?: true;
}

function sleep(duration: number): Promise<void> {
	return new Promise<void>((resolve) => {
		setTimeout(() => {
			resolve();
		}, duration);
	});
}

export const Search: React.FC = () => {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<readonly Items[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState('');

	useEffect(() => {
		if (searchText.length > 1) {
			setOpen(true);
		} else {
			setOpen(false);
		}
	}, [searchText])

	const handleOpen = () => {
		setOpen(true);
		(async () => {
			setLoading(true);
			await sleep(1e3); 
			setLoading(false);

			setOptions([...items]);
		})();
	};

	const handleItemClick = (item: Items) => {
		setSearchText(item.title);
	};

	const inputRef = useRef(null);

	const handleSearchClick = () => {
		if (inputRef.current) {
		inputRef.current.focus();
		}
	};

	return (
		<div className={styles.search} onClick={handleSearchClick}>
			<div className={`${styles.search__input} ${open ? styles.open : ''}`}>
				<img className={ styles.search__input__icon} src={searchIcon} alt="#" />
				<input
					type="text"
					placeholder="Поиск"
					ref={inputRef}
					value={searchText}
					onChange={(e)=> setSearchText(e.target.value)}
				/>
				{searchText && (
					<img className={styles.search__input__cross} src={crossIcon} alt="#" onClick={() => setSearchText('')} />
				)}
			</div>
			{open && (<div className={styles.search__popper}>
				{items.map((item, index) => (
					<div key={index}
						className={styles.search__popper__item}
						onClick={() => handleItemClick(item)}
					>
					{item.title}
					</div>
				))}
			</div>)}
		</div>
	);
}

const items = [
	{ title: 'The Shawshank Redemption' },
	{ title: 'The Godfather' },
	{ title: 'The Godfather: Part II' },
	{ title: 'The Dark Knight' },
]