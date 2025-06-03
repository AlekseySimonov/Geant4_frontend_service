import { useDeleteArticleMutation } from "@/pages/documentationPage/api/docApi";
import { PrimaryButton } from "@/shared/ui/components/buttons";
import styles from "./_deleteArticle.module.scss";
import { useNavigate } from "react-router";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";
import { useDispatch } from "react-redux";

interface DeleteArticleProps {
	articleId: number;
	onClose: () => void;
}

export const DeleteArticle: React.FC<DeleteArticleProps> = ({ articleId, onClose }) => {
	const [deleteArticle, { isError }] = useDeleteArticleMutation();

	const navigate = useNavigate();
	const dispatch = useDispatch()

	const handleSubmit = async () => {
		try {
			await deleteArticle(articleId).unwrap();
			onClose()
			dispatch(
				showAlert({
					message: 'Статья успешно удалена',
					severity: 'info',
				})
			);
			navigate('/documentation/articles')
		} catch (error) {
			console.error("Ошибка при удалении статьи:", error);
		}
	};

	return (
		<div className={styles.delete}>
			<h3>Удаление статьи</h3>
			<p>Вы уверены, что хотите удалить статью?</p>
			{isError && (
				<div className={styles.delete__errorMessage}>
					Не удалось удалить статью. Попробуйте ещё раз.
				</div>
			)}
			<PrimaryButton
				label="Удалить"
				fullWidth
				onClick={handleSubmit}
			/>
		</div>
	);
};
