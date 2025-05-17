import styles from "./_editorBlock.module.scss"
import { FormField } from "@/shared";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useSortable } from "@dnd-kit/sortable";
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import TimelineRoundedIcon from '@mui/icons-material/TimelineRounded';
import PhotoSizeSelectActualOutlinedIcon from '@mui/icons-material/PhotoSizeSelectActualOutlined';
import NotesRoundedIcon from '@mui/icons-material/NotesRounded';
import { Box, IconButton, InputLabel } from "@mui/material";
import { GraphUploader } from "@/features/doc/graphUploader";
import { OutlinedBox } from "@/shared/styles/themes/overrides";
import LatexTextField from "@/entities/latexTextField";
import { EditorBlockProps, ElementType } from "../model/types";
import { SubscriptionElement } from "@/shared/types";

const EditorBlock: React.FC<EditorBlockProps> = ({ id, index, data, setFieldValue, onRemove }) => {
	const { attributes, listeners, setNodeRef, transform, isDragging } = useSortable({ id });
	const style = {
		transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
		opacity: isDragging ? 0.5 : 1,
		border: '1px solid #ccc',
	};

	const elements = data?.elements || [];

	const addElement = (type: ElementType) => {
		if (!setFieldValue) return;
		const newElement: SubscriptionElement = {
			text: "",
			element_order: elements.length,
			type,
			files: [],
		};
		setFieldValue(
			`subscriptions.${index}.elements`,
			[...elements, newElement]
		);
	};

	const removeElement = (i: number) => {
		if (!setFieldValue) return;
		const updated = elements
			.filter((_, idx) => idx !== i)
			.map((el, idx) => ({ ...el, element_order: idx }));
		setFieldValue(`subscriptions.${index}.elements`, updated);
	};

	return (
		<div
			className={styles.block}
			ref={setNodeRef}
			style={style}
			{...attributes}
		>
			<div className={styles.block__buttons}>
				<DragIndicatorRoundedIcon style={{ fontSize: 25, cursor: 'grab' }} {...listeners} />
				<ClearRoundedIcon onClick={onRemove} style={{ fontSize: 25 }} />
			</div>
			<FormField name={`subscriptions.${index}.title`} placeholder="Заголовок блока" />
			{elements.map((element, i) => {
				return (
					<div className={styles.block__element} key={i}>
						<ClearRoundedIcon
							onClick={() => removeElement(i)}
							sx={{
								position: 'absolute',
								top: 4,
								right: 4,
								cursor: 'pointer',
								fontSize: 20,
								zIndex: 1,
							}}
						/>
						{element.type === 'text' && (
							<LatexTextField name={`subscriptions.${index}.elements[${i}].text`} />
						)}

						{element.type === 'image' && (
							<OutlinedBox sx={{ position: 'relative', mt: 2 }}>
								<InputLabel shrink htmlFor={`custom-image-${i}`}>
									Редактирование изображения
								</InputLabel>
								<Box id={`custom-image-${i}`}>
									<div>Редактирование изображения</div>
								</Box>
							</OutlinedBox>
						)}

						{element.type === 'csv' && (
							<OutlinedBox sx={{ position: 'relative', mt: 2 }}>
								<InputLabel shrink htmlFor={`custom-graph-${i}`}>
									Редактирование графика
								</InputLabel>
								<Box id={`custom-graph-${i}`}>
									<GraphUploader
									fieldName={`subscriptions.${index}.elements[${i}].files`}
									setFieldValue={setFieldValue}
								/>
								</Box>
							</OutlinedBox>
						)}
					</div>
				);
			})}
			<div className={styles.block__addElement}>
				Добавить элемент
				<div className={styles.block__addElement__icons}>
					<IconButton color="primary" onClick={() => addElement('text')}>
						<NotesRoundedIcon style={{ fontSize: 30 }} />
					</IconButton>
					<IconButton color="primary" onClick={() => addElement('image')}>
						<PhotoSizeSelectActualOutlinedIcon style={{ fontSize: 30 }} />
					</IconButton>
					<IconButton color="primary" onClick={() => addElement('csv')}>
						<TimelineRoundedIcon style={{ fontSize: 30 }} />
					</IconButton>
				</div>
			</div>
		</div>
	);
};

export default EditorBlock