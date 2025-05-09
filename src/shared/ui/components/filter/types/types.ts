export interface FilterTypes {
	id?: number;
	title: string;
}

export interface FilterProps {
	options: FilterTypes[];
	onOptionSelect?: (title: string) => void;
	label: string;
	selectedOption?: string | null;
	width?: string;
	addButtonText?: string;
	onAddButtonClick?: () => void;
}