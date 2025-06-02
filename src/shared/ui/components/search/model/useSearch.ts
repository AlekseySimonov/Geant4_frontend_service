import { useRef, useEffect, useState } from "react";
import { useClickOutside, useDebounce } from "@/shared/hooks";
import { ArticlesTypes } from "@/shared/types";
import { SearchProps } from "./types";

interface UseSearchProps extends SearchProps {}

export const useSearch = ({ onSearch, onOptionSelect, searchValue }: UseSearchProps) => {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<readonly ArticlesTypes[]>([]);
	const [loading, setLoading] = useState(false);
	const [searchText, setSearchText] = useState(searchValue ?? "");

	const searchRef = useRef<HTMLDivElement | null>(null);
	const debouncedSearchText = useDebounce(searchText, 500);

	const didMountRef = useRef(false);
	const suppressNextSearchRef = useRef(false);

	useClickOutside(searchRef, () => setOpen(false));

	useEffect(() => {
		if (!didMountRef.current) {
			setOpen(false);
			didMountRef.current = true;
			return;
		}

		if (suppressNextSearchRef.current) {
			suppressNextSearchRef.current = false;
			return;
		}

		if (debouncedSearchText.length <= 2) {
			setOpen(false);
			setOptions([]);
			return;
		}

		const fetchData = async () => {
			setLoading(true);
			setOpen(true);

			try {
				const results = await onSearch?.(debouncedSearchText);
				if (!results || !Array.isArray(results)) {
					setOptions([]);
					return;
				}

				setOptions(
					results.filter(
						(article) =>
							article &&
							typeof article.title === "string" &&
							typeof article.id === "number"
					)
				);
			} catch (error) {
				console.error("Error fetching search results:", error);
				setOptions([]);
				setOpen(false);
			} finally {
				setLoading(false);
			}
		};

		fetchData();
	}, [debouncedSearchText]);

	const handleSearchClick = () => {
		searchRef.current?.querySelector("input")?.focus();
	};

	const handleOptionClick = (option: ArticlesTypes) => {
		if (!option || typeof option.title !== "string") {
			console.error("Invalid option:", option);
			return;
		}

		suppressNextSearchRef.current = true;
		setSearchText(option.title);
		setOpen(false);

		try {
			onOptionSelect?.(option.title);
		} catch (error) {
			console.error("Error in onOptionSelect:", error);
		}
	};

	return {
		searchRef,
		open,
		searchText,
		setSearchText,
		handleSearchClick,
		handleOptionClick,
		loading,
		options,
	};
};

