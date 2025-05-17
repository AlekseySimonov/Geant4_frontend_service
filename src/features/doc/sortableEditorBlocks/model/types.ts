import { Subscription } from "@/shared/types";

export interface SortableEditorBlocksProps {
	subscriptions?: Subscription[];
	setFieldValue: (field: string, value: any) => void;
	push: (obj: any) => void;
	remove: (index: number) => void;
}