import { usePatchArticleMutation, usePostArticleMutation, useUploadFileMutation } from "@/pages/documentationPage/api/docApi";
import { ExtendedArticlesTypes, ServerFile } from "@/shared/types/articlesTypes";
import { preparePayloadForPatch, preparePayloadForPost } from "./preparePayload";
import { getDirtyValues } from "@/shared/model";

interface SubmitDeps {
	values: ExtendedArticlesTypes;
	isEditMode: boolean;
	id?: number;
	existingArticle?: ExtendedArticlesTypes;
	createArticle: ReturnType<typeof usePostArticleMutation>[0];
	patchArticle: ReturnType<typeof usePatchArticleMutation>[0];
	uploadFile: ReturnType<typeof useUploadFileMutation>[0];
}

interface SubmitResult {
	articleId: number;
}


export const handleSubmit = async ({
	values,
	isEditMode,
	id,
	existingArticle,
	createArticle,
	patchArticle,
	uploadFile,
}: SubmitDeps): Promise<SubmitResult> => {
	try {
		let response;

		if (isEditMode) {
			if (!id || !existingArticle) {
				throw new Error("Для редактирования нужны `id` и `existingArticle`");
			}

			const dirty = getDirtyValues(existingArticle, values);
			const payload = preparePayloadForPatch(dirty);
			response = await patchArticle({ id, changes: payload }).unwrap();
		} else {
			const payload = preparePayloadForPost(values);
			response = await createArticle(payload).unwrap();
		}

		const filesToUpload: Promise<any>[] = [];

		response.subscriptions?.forEach((srvSub, subIdx) => {
			const localSub = values.subscriptions?.[subIdx];
			const originalSub = existingArticle?.subscriptions?.[subIdx];

			srvSub.elements?.forEach((srvEl, elIdx) => {
				const localEl = localSub?.elements?.[elIdx];
				const originalEl = originalSub?.elements?.[elIdx];

				srvEl.files?.forEach((srvFile, fileIdx) => {
					const fileToUpload = localEl?.files?.[fileIdx];
					const originalFile = originalEl?.files?.[fileIdx];

					const isChanged = !isEditMode || (
						fileToUpload instanceof File &&
						!(
							originalFile instanceof File &&
							fileToUpload.name === originalFile.name &&
							fileToUpload.size === originalFile.size &&
							fileToUpload.lastModified === originalFile.lastModified
						)
					);

					if (fileToUpload instanceof File && srvFile.url && isChanged) {
						filesToUpload.push(
							uploadFile({
								uploadUrl: srvFile.url,
								file: fileToUpload,
							}).unwrap()
						);
					}
				});
			});
		});

		await Promise.all(filesToUpload);
		return { articleId: response.id };
	} catch (err) {
		console.error('Error during submission:', err);
		throw err;
	}
};
