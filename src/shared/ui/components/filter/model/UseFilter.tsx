import { useEffect, useState } from "react";
import { FilterTypes } from "./types";

export const useFilter = (
	initialId: number | null,
	options: FilterTypes[] | undefined
) => {
	const [selectedOption, setSelectedOption] = useState<FilterTypes | null>(null);

	useEffect(() => {
		if (initialId && options) {
			const match = options.find((opt) => opt.id === initialId) ?? null;
			setSelectedOption(match);
		}
	}, [initialId, options]);

	const handleChange = (option: FilterTypes | null) => {
		setSelectedOption(option);
	};

	const resetFilter = () => {
		setSelectedOption(null);
	};

	return {
		selectedOption,
		handleChange,
		resetFilter,
	};
};
