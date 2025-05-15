export type Option = { id?: number; title: string };

type OptionType = "category" | "chapter";

export interface AddingOptionProps {
	type: OptionType;
	existingOptions: { id?: number; title: string }[];
	onClose: () => void;
}

export interface FormValues {
	options: Option[];
	title: string;
}

export interface UseEditOptionsSubmitProps {
	type: OptionType;
	options: Option[];
	deletedIds: number[];
	onSuccess: () => void;
	onError: (message: string) => void;
}