import { useState } from 'react';

export const useFilter = (initialValue: string = '') => {
	const [selectedOption, setSelectedOption] = useState(initialValue);

	const handleChange = (option: string) => {
		setSelectedOption(option);
	};

	const resetFilter = () => {
		setSelectedOption('');
	};

	return {
		selectedOption,
		handleChange,
		resetFilter,
	};
};