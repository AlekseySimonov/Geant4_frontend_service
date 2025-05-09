import { FC } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove,} from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";
import { EditorBlock } from "@/entities";
import { FieldArrayRenderProps } from "formik";

interface SortableEditorBlocksProps {
	subscriptions: { title: string; elements: { text: string }[] }[];
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
			<DndContext
				collisionDetection={closestCenter}
				modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
				onDragEnd={({ active, over }) => {
					if (active.id !== over?.id) {
						const oldIndex = subscriptions.findIndex((_, i) => `block-${i}` === active.id);
						const newIndex = subscriptions.findIndex((_, i) => `block-${i}` === over?.id);

						if (oldIndex !== -1 && newIndex !== -1) {
							const newItems = arrayMove(subscriptions, oldIndex, newIndex);
							setFieldValue("subscriptions", newItems);
						}
					}
				}}
			>
				<SortableContext
					items={subscriptions.map((_, i) => `block-${i}`)}
					strategy={verticalListSortingStrategy}
				>
					{subscriptions.map((_, index) => (
						<EditorBlock
							key={`block-${index}`}
							id={`block-${index}`}
							index={index}
							onRemove={() => remove(index)}
						/>
					))}
				</SortableContext>
			</DndContext>
		</>
	);
};

export default SortableEditorBlocks