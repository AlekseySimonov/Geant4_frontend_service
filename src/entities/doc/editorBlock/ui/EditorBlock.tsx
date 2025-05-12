import styles from "./_editorBlock.module.scss"
import { ArticlesTypes } from "@/shared/types";
import { FormField } from "@/shared";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useSortable } from "@dnd-kit/sortable";
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import { Box, IconButton, InputLabel } from "@mui/material";
import { useState } from "react";
import { GraphUploader } from "@/features/doc/graphUploader";
import { OutlinedBox } from "@/shared/styles/themes/overrides";

const initialValues: ArticlesTypes = {
	title: '',
	description: '',
};

type ElementType = 'text' | 'image' | 'graph';

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

	const [elements, setElements] = useState<ElementType[]>(['text']);
	const addElement = (type: ElementType) => {
		setElements((prev) => [...prev, type]);
	};
	const handleRemoveElement = (i: number) => {
		setElements((prev) => prev.filter((_, idx) => idx !== i));
	};

	return (
		<div
			className={styles.block}
			ref={setNodeRef}
			style={style}
			{...attributes}
		>
			<div className={styles.block__buttons} >
				<DragIndicatorRoundedIcon style={{ fontSize: 25, cursor: 'grab' }} {...listeners} />
				<ClearRoundedIcon onClick={onRemove} style={{ fontSize: 25 }} />
			</div>
			<FormField name={`subscriptions.${index}.title`} placeholder="Заголовок блока" />
			{elements.map((type, i) => {
				const fieldName = `subscriptions.${index}.elements[${i}]`;
				return (
					<div className={styles.block__element} key={i}>
						<ClearRoundedIcon
							onClick={() => handleRemoveElement(i)}
							sx={{
								position: 'absolute',
								top: 4,
								right: 4,
								cursor: 'pointer',
								fontSize: 20,
								zIndex: 1,
							}}
						/>
						{type === 'text' && (
							<FormField
								name={`${fieldName}.text`}
								placeholder="Текстовый элемент"
								isMultiline
							/>
						)}

						{type === 'image' && (
							<OutlinedBox sx={{ position: 'relative', mt: 2 }}>
								<InputLabel shrink htmlFor={`custom-image-${i}`}>
									Редактирование изображения
								</InputLabel>
								<Box id={`custom-image-${i}`}>
									<div>Редактирование изображения</div>
								</Box>
							</OutlinedBox>
						)}

						{type === 'graph' && (
							<OutlinedBox sx={{ position: 'relative', mt: 2 }}>
								<InputLabel shrink htmlFor={`custom-graph-${i}`}>
									Редактирование графика
								</InputLabel>
								<Box id={`custom-graph-${i}`}>
									<GraphUploader />
								</Box>
							</OutlinedBox>
						)}
					</div>
				);
			})}
			<div className={styles.block__addElement}>
				Добавить элемент
				<div className={styles.block__addElement__icons}>
					<div className={styles.block__addElement__icons}>
						<IconButton color="primary" onClick={() => addElement('text')}>
							<NotesRoundedIcon style={{ fontSize: 30 }} />
						</IconButton>
						<IconButton color="primary" onClick={() => addElement('image')}>
							<PhotoSizeSelectActualOutlinedIcon style={{ fontSize: 30 }} />
						</IconButton>
						<IconButton color="primary" onClick={() => addElement('graph')}>
							<TimelineRoundedIcon style={{ fontSize: 30 }} />
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditorBlock