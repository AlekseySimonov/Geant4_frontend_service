import { useEffect, useState } from "react";
import { useDebounce } from "@/shared/hooks";
import { ArticlesTypes } from "@/shared/types";

interface UseSearchLogicProps {
	searchText: string;
	onSearch: (query: string) => Promise<ArticlesTypes[]>;
}

export const useSearchLogic = ({ searchText, onSearch }: UseSearchLogicProps) => {
	const [open, setOpen] = useState(false);
	const [options, setOptions] = useState<readonly ArticlesTypes[]>([]);
	const [loading, setLoading] = useState(false);
	const debouncedSearchText = useDebounce(searchText, 500);

	useEffect(() => {
		if (debouncedSearchText.length <= 3) {
			setOpen(false);
			return;
		}

		const fetchData = async () => {
			setLoading(true);
			setOpen(true);
			const results = await onSearch(debouncedSearchText);
			setOptions(results);
			setLoading(false);
		};

		fetchData();
	}, [debouncedSearchText, onSearch]);

	const handleOptionClick = (option: ArticlesTypes) => {
		setOpen(false);
		return option;
	};

	return {
		open,
		setOpen,
		options,
		loading,
		handleOptionClick,
	};
};