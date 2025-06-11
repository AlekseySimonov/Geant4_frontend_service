import { FormField, Loader } from "@/shared"
import styles from "./_articleEditor.module.scss"
import { FieldArray, Form, Formik } from 'formik';
import { PrimaryButton, SecondaryButton } from "@/shared/ui/components/buttons";
import ArrowBackIosRoundedIcon from '@mui/icons-material/ArrowBackIosRounded';
import { useNavigate, useParams } from "react-router";
import { useGetArticleQuery, useGetCategoriesQuery, useGetChaptersQuery, usePatchArticleMutation, usePostArticleMutation, useUploadFileMutation } from "@/pages/documentationPage/api/docApi";
import { useFilter } from "@/shared/ui/components/filter";
import { ArticleFilters } from "./ArticleFilters";
import { ModalWindow } from "@/shared/ui/components/modal";
import { usePopup } from "@/shared/hooks";
import { RootState } from "@/app/store";
import { useDispatch, useSelector } from "react-redux";
import { handleSubmit } from "../model/handleSubmit";
import { articleValidationSchema } from "../model/validationSchemas";
import { EditOptions, SortableEditorBlocks } from "@/features";
import { initialValues } from "../model/initialValues";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";
import { addRequest, removeRequest } from "@/shared/model/slices";

const ArticleEditor: React.FC = () => {

	const dispatch = useDispatch()

	const { id } = useParams();
	const isEditMode = !!id;
	const { data: existingArticle } = useGetArticleQuery(Number(id), {
		skip: !isEditMode,
	});
	const { isLoading: globalLoading } = useSelector((state: RootState) => state.globalLoading)

	const navigate = useNavigate()
	const { data: categories } = useGetCategoriesQuery()
	const { data: chapters } = useGetChaptersQuery()

	const [createArticle] = usePostArticleMutation();
	const [patchArticle] = usePatchArticleMutation()
	const [uploadFile] = useUploadFileMutation();

	const editCategory = usePopup()
	const editChapter = usePopup()

	const {
		selectedOption: selectedCategory,
		handleChange: handleCategoryChange,
		resetFilter: resetCategory,
	} = useFilter(existingArticle?.category ?? null, categories);

	const {
		selectedOption: selectedChapter,
		handleChange: handleChapterChange,
		resetFilter: resetChapter,
	} = useFilter(existingArticle?.chapter ?? null, chapters);

	if (isEditMode && (!categories || !chapters || !existingArticle)) {
		return undefined;
	}

	return (
		<div className={styles.editor}>
			<Formik
				initialValues={initialValues({ isEditMode, existingArticle })}
				validationSchema={articleValidationSchema}
				onSubmit={async (values, { setSubmitting, setStatus }) => {
					const requestId = `submit-article-${Date.now()}`
					try {
						const { articleId } = await handleSubmit({
							values,
							isEditMode,
							id: Number(id),
							existingArticle: initialValues({ isEditMode, existingArticle }),
							createArticle,
							patchArticle,
							uploadFile,
						});
						dispatch(addRequest(requestId))
						await new Promise(resolve => setTimeout(resolve, 3000))
						setSubmitting(false);
						dispatch(
							showAlert({
								message: `Статья успешно ${isEditMode ? "обновлена" : "опубликована"}`,
								severity: 'info',
							})
						);
						dispatch(removeRequest(requestId))
						navigate(`/documentation/articles/view/${articleId}`)
					} catch (err) {
						setSubmitting(false);
						dispatch(removeRequest(requestId))
						setStatus('Ошибка при сохранении статьи');
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
						{status && (
							<div className={styles.errorMessage}>{status}</div>
						)}
						<PrimaryButton
							label={isEditMode ? "Сохранить" : "Опубликовать"}
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