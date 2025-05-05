export interface SearchProps {
	onSearch: (query: string) => Promise<{ title: string, id: number }[]>;
	onOptionSelect?: (title: string) => void;
	searchValue?: string;
}