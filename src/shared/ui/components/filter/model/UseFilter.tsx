import { useState } from "react";
import { FilterTypes } from "./types";

export const useFilter = (initialValue: FilterTypes | null = null) => {
	const [selectedOption, setSelectedOption] = useState<FilterTypes | null>(initialValue);

	const handleChange = (option: FilterTypes) => {
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