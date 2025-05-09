import { FormField, Loader } from "@/shared"
import styles from "./_articleEditor.module.scss"
import { FieldArray, Form, Formik } from 'formik';
import { ArticlesTypes } from '@/shared/types';
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";
import { useState } from "react";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useNavigate } from "react-router";
import { SortableEditorBlocks } from "../../sortableEditorBlocks";
import { useGetCategoriesQuery, useGetChaptersQuery } from "@/pages/documentationPage/api/docApi";
import { useFilter } from "@/shared/ui/components/filter";
import { ArticleFilters } from "./ArticleFilters";
import { ModalWindow } from "@/shared/ui/components/modal";
import { usePopup } from "@/shared/hooks";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";

const initialValues: ArticlesTypes = {
	title: '',
	description: '',
	subscriptions: [],
};

const ArticleEditor: React.FC = () => {
	const { isLoading: globalLoading } = useSelector((state: RootState) => state.globalLoading)

	const [blocks, setBlocks] = useState<number[]>([]);
	const [blockCounter, setBlockCounter] = useState(0);
	const navigate = useNavigate()
	const { data: categories } = useGetCategoriesQuery()
	const { data: chapters } = useGetChaptersQuery()

	const addCategory = usePopup()
	const addChapter = usePopup()

	const { selectedOption: selectedCategory, handleChange: handleCategoryChange } = useFilter();
	const { selectedOption: selectedChapter, handleChange: handleChapterChange } = useFilter();

	return (
		<div className={styles.editor}>
			<Formik
				initialValues={initialValues}
				onSubmit={(values) => {
					console.log("Submitted values:", values);
				}}
			>
				{({ values, setFieldValue }) => (
					<Form className={styles.editor__form}>
						<div className={styles.editor__form__title}>
							<ArrowBackIosRoundedIcon style={{ fontSize: 30 }} onClick={() => navigate('/documentation/articles')} />
							<h2>Редактор статьи</h2>
						</div>

						<FormField name="title" placeholder="Название статьи" />

						<ArticleFilters
							categories={categories}
							chapters={chapters}
							selectedCategory={selectedCategory}
							selectedChapter={selectedChapter}
							onCategoryChange={handleCategoryChange}
							onChapterChange={handleChapterChange}
							onAddCategoryClick={addCategory.openPopup}
							onAddChapterClick={addChapter.openPopup}
						/>

						<FormField name="description" placeholder="Описание" isMultiline />

						<FieldArray name="subscriptions">
							{({ push, remove }) => (
								<>
									<SortableEditorBlocks
										subscriptions={values.subscriptions}
										setFieldValue={setFieldValue}
										push={push}
										remove={remove}
									/>

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
						<PrimaryButton label="Опубликовать" fullWidth type="submit" />
					</Form>
				)}

			</Formik>
			<ModalWindow open={addCategory.isVisible} onClose={addCategory.closePopup}>
				{globalLoading && <Loader />}
			</ModalWindow>
			<ModalWindow open={addChapter.isVisible} onClose={addChapter.closePopup}>
				{globalLoading && <Loader />}
			</ModalWindow>
		</div>
	);
};

export default ArticleEditor;