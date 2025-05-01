import { FormField } from "@/shared"
import styles from "./_articleEditor.module.scss"
import { FieldArray, Form, Formik } from 'formik';
import { ArticlesTypes } from '@/shared/types';
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";
import { EditorBlock } from "@/entities";
import { useState } from "react";

const initialValues: ArticlesTypes = {
	title: '',
	description: '',
	subscriptions: [],
};

const ArticleEditor: React.FC = () => {
	const [blocks, setBlocks] = useState<number[]>([]);
	const [blockCounter, setBlockCounter] = useState(0);

	return (
		<div className={styles.editor}>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					console.log("Submitted values:", values);
				}}
			>
				{({ values }) => (
					<Form className={styles.editor__form}>
						<h2>Редактор статьи</h2>
						<FormField name="title" placeholder="Название статьи" />
						<FormField name="description" placeholder="Описание" isMultiline />

						<FieldArray name="subscriptions">
							{({ push, remove }) => (
								<>
									{values.subscriptions.map((_, index) => (
										<EditorBlock
											key={index}
											index={index}
											onRemove={() => remove(index)}
										/>
									))}
									<SecondaryButton
										label="Добавить блок"
										fullWidth
										onClick={() =>
											push({
												title: '',
												elements: [{text: '',}]
											})
										}
									/>
								</>
							)}
						</FieldArray>
						<PrimaryButton label="Опубликовать" fullWidth />
					</Form>
				)}

			</Formik>
		</div>
	);
};

export default ArticleEditor;