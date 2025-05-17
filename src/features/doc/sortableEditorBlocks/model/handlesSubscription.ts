import { Subscription } from "@/shared/types";
import { arrayMove } from "@dnd-kit/sortable";

export const handleRemoveSubscription = (
	subscriptions: Subscription[],
	indexToRemove: number,
	setFieldValue: (field: string, value: any) => void
) => {
	if (!subscriptions || !Array.isArray(subscriptions)) {
		console.error("Invalid subscriptions array");
		return;
	}

	if (typeof indexToRemove !== 'number' || indexToRemove < 0 || indexToRemove >= subscriptions.length) {
		console.error("Invalid index to remove");
		return;
	}

	const updated = subscriptions
		.filter((_, i) => i !== indexToRemove)
		.map((sub, i) => ({
			...sub,
			subscription_order: i,
		}));

	try {
		setFieldValue('subscriptions', updated);
	} catch (error) {
		console.error("Error setting field value", error);
	}
};

export const handleSubscriptionDragEnd = (
	activeId: string,
	overId: string,
	subscriptions: Subscription[],
	setFieldValue: (field: string, value: any) => void
): void => {
	if (activeId === overId) return;

	const oldIndex = subscriptions.findIndex((_, i) => `block-${i}` === activeId);
	const newIndex = subscriptions.findIndex((_, i) => `block-${i}` === overId);

	if (oldIndex === -1 || newIndex === -1) {
		console.error(
			`SortableEditorBlocks: handleSubscriptionDragEnd: unable to find oldIndex or newIndex.`
		);
		return;
	}

	const reordered = arrayMove(subscriptions, oldIndex, newIndex).map((sub, i) => ({
		...sub,
		subscription_order: i,
	}));

	try {
		setFieldValue('subscriptions', reordered);
	} catch (error) {
		console.error(
			`SortableEditorBlocks: handleSubscriptionDragEnd: error calling setFieldValue. ${error}`
		);
	}
};