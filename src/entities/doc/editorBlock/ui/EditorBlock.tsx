import styles from "./_editorBlock.module.scss"
import { ArticlesTypes } from "@/shared/types";
import { FormField } from "@/shared";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useSortable } from "@dnd-kit/sortable";
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';

const initialValues: ArticlesTypes = {
	title: '',
	description: '',
};

interface EditorBlockProps {
	index: number;
	id: string;
	onRemove: () => void;
}

const EditorBlock: React.FC<EditorBlockProps> = ({ id, index, onRemove }) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id })
	const style = {
		transform: transform
			? `translate3d(${transform.x}px, ${transform.y}px, 0)`
			: undefined,
		opacity: isDragging ? 0.5 : 1,
		border: '1px solid #ccc',
	};

	return (
		<div
			className={styles.block}
			ref={setNodeRef}
			style={style}
			{...attributes}
		>	
			<div className={styles.block__buttons} >
				<DragIndicatorRoundedIcon style={{ fontSize: 25, cursor: 'grab' }} {...listeners}/>
				<ClearRoundedIcon onClick={onRemove} style={{ fontSize: 25 }}/>
			</div>
			<FormField name={`subscriptions.${index}.title`} placeholder="Заголовок блока" />
			<FormField
				name={`subscriptions.${index}.elements[0].text`}
				placeholder="Текстовый элемент"
				isMultiline
			/>
		</div>
	);
};

export default EditorBlock