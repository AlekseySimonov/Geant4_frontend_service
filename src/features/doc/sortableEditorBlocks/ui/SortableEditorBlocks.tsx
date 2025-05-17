import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { restrictToVerticalAxis, restrictToWindowEdges } from "@dnd-kit/modifiers";
import { EditorBlock } from "@/entities";
import { handleRemoveSubscription, handleSubscriptionDragEnd } from "../model/handlesSubscription";
import { SortableEditorBlocksProps } from "../model/types";

const SortableEditorBlocks: React.FC<SortableEditorBlocksProps> = ({
	subscriptions,
	setFieldValue
}) => {
	return (
		<>
			{subscriptions ? (
				<DndContext
					collisionDetection={closestCenter}
					modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
					onDragEnd={({ active, over }) => {
						if (active && over) {
							handleSubscriptionDragEnd(active.id as string, over.id as string, subscriptions, setFieldValue);
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
								onRemove={() => handleRemoveSubscription(subscriptions, index, setFieldValue)}
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