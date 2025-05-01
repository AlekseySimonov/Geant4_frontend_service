import { FormField } from "@/shared"
import styles from "./_articleEditor.module.scss"
import { FieldArray, Form, Formik } from 'formik';
import { ArticlesTypes } from '@/shared/types';
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";
import { EditorBlock } from "@/entities";
import { useState } from "react";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useNavigate } from "react-router";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import {restrictToVerticalAxis, restrictToWindowEdges} from '@dnd-kit/modifiers';

const initialValues: ArticlesTypes = {
	title: '',
	description: '',
	subscriptions: [],
};

const ArticleEditor: React.FC = () => {
	const [blocks, setBlocks] = useState<number[]>([]);
	const [blockCounter, setBlockCounter] = useState(0);
	const navigate = useNavigate()

	return (
		<div className={styles.editor}>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					console.log("Submitted values:", values);
				}}
			>
				{({ values, setFieldValue  }) => (
					<Form className={styles.editor__form}>
						<div className={styles.editor__form__title}>
							<ArrowBackIosRoundedIcon style={{ fontSize: 30 }} onClick={()=> navigate('/documentation/articles')}/>
							<h2>Редактор статьи</h2>
						</div>

						<FormField name="title" placeholder="Название статьи" />
						<FormField name="description" placeholder="Описание" isMultiline />

						<FieldArray name="subscriptions">
							{({ push, remove }) => (
								<>
									<DndContext
										collisionDetection={closestCenter}
										modifiers={[restrictToVerticalAxis, restrictToWindowEdges]}
										onDragEnd={({ active, over }) => {
											if (active.id !== over?.id) {
												const oldIndex = values.subscriptions.findIndex((_, i) => `block-${i}` === active.id);
												const newIndex = values.subscriptions.findIndex((_, i) => `block-${i}` === over?.id);

												if (oldIndex !== -1 && newIndex !== -1) {
													const newItems = arrayMove(values.subscriptions, oldIndex, newIndex);
													setFieldValue("subscriptions", newItems);
												}
											}
										}}
									>
										<SortableContext
											items={values.subscriptions.map((_, i) => `block-${i}`)}
											strategy={verticalListSortingStrategy}
										>
											{values.subscriptions.map((_, index) => (
												<EditorBlock
													key={`block-${index}`}
													id={`block-${index}`}
													index={index}
													onRemove={() => remove(index)}
												/>
											))}
										</SortableContext>
									</DndContext>
									
									<SecondaryButton
										label="Добавить блок"
										fullWidth
										onClick={() =>
											push({
												title: '',
												elements: [{ text: '', }]
											})
										}
									/>
								</>
							)}
						</FieldArray>
						<PrimaryButton label="Опубликовать" fullWidth type = "submit"/>
					</Form>
				)}

			</Formik>
		</div>
	);
};

export default ArticleEditor;