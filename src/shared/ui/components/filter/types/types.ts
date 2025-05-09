export interface FilterTypes {
	id?: number;
	title: string;
}

export interface FilterProps {
	onOptionSelect?: (option: FilterTypes) => void;
	label: string;
	options: FilterTypes[];
	width?: string;
	selectedOption: FilterTypes | null;
	addButtonText?: string;
	onAddButtonClick?: () => void;
}