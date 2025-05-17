import {
	usePostCategoriesMutation,
	usePostChaptersMutation,
	useDeleteCategoriesMutation,
	useDeleteChaptersMutation,
} from "@/pages/documentationPage/api/docApi";
import { UseEditOptionsSubmitProps } from "./types";

export const useEditOptionsSubmit = () => {
	const [postCategories] = usePostCategoriesMutation();
	const [postChapters] = usePostChaptersMutation();
	const [deleteCategories] = useDeleteCategoriesMutation();
	const [deleteChapters] = useDeleteChaptersMutation();

	const editOptionsSubmit = async ({
		type,
		options,
		deletedIds,
		onSuccess,
		onError,
	}: UseEditOptionsSubmitProps) => {
		try {
			if (deletedIds.length > 0) {
				if (type === 'category') {
					await deleteCategories(deletedIds).unwrap();
				} else {
					await deleteChapters(deletedIds).unwrap();
				}
			}

			const newOptions = options.filter((opt) => opt.id === undefined);
			if (newOptions.length > 0) {
				const payload = newOptions.map((opt) => ({ title: opt.title }));
				if (type === 'category') {
					await postCategories(payload).unwrap();
				} else {
					await postChapters(payload).unwrap();
				}
			}

			onSuccess();
		} catch (error) {
			onError("Не удалось сохранить изменения. Попробуйте позже.");
		}
	};

	return { editOptionsSubmit };
};