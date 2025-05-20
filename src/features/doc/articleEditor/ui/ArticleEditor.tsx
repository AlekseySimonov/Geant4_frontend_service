import { FormField, Loader } from "@/shared"
import styles from "./_articleEditor.module.scss"
import { FieldArray, Form, Formik } from 'formik';
import { ArticlesTypes } from '@/shared/types';
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useNavigate } from "react-router";
import { SortableEditorBlocks } from "../../sortableEditorBlocks";
import { useGetCategoriesQuery, useGetChaptersQuery, usePostArticleMutation, useUploadFileMutation } from "@/pages/documentationPage/api/docApi";
import { useFilter } from "@/shared/ui/components/filter";
import { ArticleFilters } from "./ArticleFilters";
import { ModalWindow } from "@/shared/ui/components/modal";
import { usePopup } from "@/shared/hooks";
import { RootState } from "@/app/store";
import { useSelector } from "react-redux";
import { EditOptions } from "../../editOptions";
import { handleSubmit } from "../model/handleSubmit";
import { articleValidationSchema } from "../model/validationSchemas";

const initialValues: ArticlesTypes = {
	title: '',
	description: '',
	subscriptions: [],
	category: 0,
	chapter: 0
};

const ArticleEditor: React.FC = () => {
	const { isLoading: globalLoading } = useSelector((state: RootState) => state.globalLoading)

	const navigate = useNavigate()
	const { data: categories } = useGetCategoriesQuery()
	const { data: chapters } = useGetChaptersQuery()

	const [createArticle] = usePostArticleMutation();
	const [uploadFile] = useUploadFileMutation();

	const editCategory = usePopup()
	const editChapter = usePopup()

	const { selectedOption: selectedCategory, handleChange: handleCategoryChange } = useFilter();
	const { selectedOption: selectedChapter, handleChange: handleChapterChange } = useFilter();

	return (
		<div className={styles.editor}>
			<Formik
				initialValues={initialValues}
				validationSchema={articleValidationSchema}
				onSubmit={async (values, { setSubmitting, setStatus }) => {
					try {
						await handleSubmit({
							values,
							createArticle,
							uploadFile,
							selectedCategory: { id: selectedCategory?.id ?? 0 },
							selectedChapter: { id: selectedChapter?.id ?? 0 },
						});
						setSubmitting(false);
						navigate('/documentation/articles');
					} catch (err) {
						setSubmitting(false);
						setStatus({ submitError: 'Ошибка при сохранении статьи' });
					}
				}}
			>
				{({ values, setFieldValue, dirty, isValid, isSubmitting, status, errors, touched }) => (
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
							onCategoryChange={(option) => {
								handleCategoryChange(option);
								setFieldValue('category', option?.id ?? 0);
							}}
							onChapterChange={(option) => {
								handleChapterChange(option);
								setFieldValue('chapter', option?.id ?? 0);
							}}
							onEditCategoryClick={editCategory.openPopup}
							onEditChapterClick={editChapter.openPopup}
							categoryError={!!(errors.category)}
							chapterError={!!(errors.chapter)}
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
												elements: [],
												subscription_order: values.subscriptions.length,
											})
										}
									/>
								</>
							)}
						</FieldArray>
						{status?.submitError && (
							<div className={styles.errorMessage}>{status.submitError}</div>
						)}
						<PrimaryButton
							label="Опубликовать"
							fullWidth
							type="submit"
							disabled={!dirty || !isValid || isSubmitting}
						/>
					</Form>
				)}

			</Formik>
			<ModalWindow open={editCategory.isVisible} onClose={editCategory.closePopup}>
				<EditOptions type="category" existingOptions={categories} onClose={editCategory.closePopup} />
				{globalLoading && <Loader />}
			</ModalWindow>
			<ModalWindow open={editChapter.isVisible} onClose={editChapter.closePopup}>
				<EditOptions type="chapter" existingOptions={chapters} onClose={editChapter.closePopup} />
				{globalLoading && <Loader />}
			</ModalWindow>
		</div>
	);
};

export default ArticleEditor;