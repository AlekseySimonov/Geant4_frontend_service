import { SubscriptionElement } from "@/shared/types";

export type ElementType = SubscriptionElement["type"];
export interface EditorBlockProps {
	index: number;
	id: string;
	data: {
		title: string;
		elements: SubscriptionElement[];
	};
	setFieldValue: (field: string, value: any, shouldValidate?: boolean) => void;
	onRemove: () => void;
}