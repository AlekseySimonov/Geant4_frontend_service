import styles from "./_editorBlock.module.scss"
import { ArticlesTypes } from "@/shared/types";
import { FormField } from "@/shared";
import ClearRoundedIcon from '@mui/icons-material/ClearRounded';
import { useSortable } from "@dnd-kit/sortable";
import DragIndicatorRoundedIcon from '@mui/icons-material/DragIndicatorRounded';
import AddchartOutlinedIcon from '@mui/icons-material/AddchartOutlined';
import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import ArticleOutlinedIcon from '@mui/icons-material/ArticleOutlined';
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
				switch (type) {
					case 'text':
						return (
							<FormField
								key={i}
								name={`${fieldName}.text`}
								placeholder="Текстовый элемент"
								isMultiline
							/>
						);
					case 'image':
						return (
							<OutlinedBox sx={{ position: 'relative', marginTop: 2 }}>
								<InputLabel shrink htmlFor="custom-box">
									Название поля
								</InputLabel>

								<Box id="custom-box">
									<div>Hello</div>
								</Box>
							</OutlinedBox>
						);
					case 'graph':
						return (
								<OutlinedBox sx={{ position: 'relative', marginTop: 2 }}>
									<InputLabel shrink htmlFor="custom-box">
										Редактирование графика
									</InputLabel>
									<Box id="custom-box">
										<GraphUploader />
									</Box>
								</OutlinedBox>
							);
					default:
						return null;
				}
			})}
			<div className={styles.block__addElement}>
				Добавить элемент
				<div className={styles.block__addElement__icons}>
					<div className={styles.block__addElement__icons}>
						<IconButton color="primary" onClick={() => addElement('text')}>
							<ArticleOutlinedIcon style={{ fontSize: 30 }} />
						</IconButton>
						<IconButton color="primary" onClick={() => addElement('image')}>
							<AddPhotoAlternateOutlinedIcon style={{ fontSize: 30 }} />
						</IconButton>
						<IconButton color="primary" onClick={() => addElement('graph')}>
							<AddchartOutlinedIcon style={{ fontSize: 30 }} />
						</IconButton>
					</div>
				</div>
			</div>
		</div>
	);
};

export default EditorBlock