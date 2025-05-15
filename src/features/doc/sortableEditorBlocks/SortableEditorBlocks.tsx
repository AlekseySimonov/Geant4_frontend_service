import { FC } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove, } from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";
import { EditorBlock } from "@/entities";
import { Subscription } from "@/shared/types";

interface SortableEditorBlocksProps {
	subscriptions: Subscription[];
	setFieldValue: (field: string, value: any) => void;
	push: (obj: any) => void;
	remove: (index: number) => void;
}

const SortableEditorBlocks: FC<SortableEditorBlocksProps> = ({
	subscriptions,
	setFieldValue,
	push,
	remove,
}) => {
	return (
		<>
			{subscriptions ? (
				<DndContext
					collisionDetection={closestCenter}
					modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
					onDragEnd={({ active, over }) => {
						if (active && over && active.id !== over?.id) {
							const oldIndex = subscriptions.findIndex((_, i) => `block-${i}` === active.id);
							const newIndex = subscriptions.findIndex((_, i) => `block-${i}` === over.id);

							if (oldIndex !== -1 && newIndex !== -1) {
								const newItems = arrayMove( subscriptions, oldIndex, newIndex);
								setFieldValue("subscriptions", newItems);
							}
						}
					}}
				>
					<SortableContext
						items={subscriptions.map((_, i) => `block-${i}`)}
						strategy={verticalListSortingStrategy}
					>
						{subscriptions.map((subscription, index) => (
							<EditorBlock
								key={`block-${index}`}
								id={`block-${index}`}
								index={index}
								data={subscription}
								onRemove={() => remove(index)}
								setFieldValue={setFieldValue}
							/>
						))}
					</SortableContext>
				</DndContext>
			) : null}
		</>
	);
};

export default SortableEditorBlocks