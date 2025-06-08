import { usePatchArticleMutation, usePostArticleMutation, useUploadFileMutation } from "@/pages/documentationPage/api/docApi";
import { ExtendedArticlesTypes, LocalServerFile, ServerFile } from "@/shared/types/articlesTypes";
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

		const response = isEditMode
			? await patchArticle({ id: id!, changes: preparePayloadForPatch(values, existingArticle!) }).unwrap()
			: await createArticle(preparePayloadForPost(values)).unwrap();

		const uploads: Promise<any>[] = [];

		const existingFileUuids = new Set<string>();

		if (isEditMode && existingArticle?.subscriptions) {
			existingArticle.subscriptions.forEach((sub) => {
				sub.elements?.forEach((el) => {
					el.files?.forEach((f) => {
						if (f.uuid) existingFileUuids.add(f.uuid);
					});
				});
			});
		}

		response.subscriptions?.forEach((srvSub: any, subIdx: number) => {
			srvSub.elements?.forEach((srvEl: any, elIdx: number) => {
				srvEl.files?.forEach((srvFile: ServerFile, fileIdx: number) => {
					const fileObj = values.subscriptions?.[subIdx]?.elements?.[elIdx]?.files?.[fileIdx];
					const localFile = (fileObj as LocalServerFile)?.file;

					const shouldUpload =
						localFile instanceof File &&
						(!srvFile.uuid || !existingFileUuids.has(srvFile.uuid)) && !!srvFile.url;

					if (shouldUpload) {
						uploads.push(uploadFile({ uploadUrl: srvFile.url, file: localFile }).unwrap());
					}
				});
			});
		});

		await Promise.all(uploads);
		return { articleId: response.id };
	} catch (err) {
		console.error("Error during submission:", err);
		throw err;
	}
};
