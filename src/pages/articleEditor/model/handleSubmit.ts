import { usePostArticleMutation, useUploadFileMutation } from "@/pages/documentationPage/api/docApi";
import { ArticlesTypes } from "@/shared/types";
import { ServerFile } from "@/shared/types/articlesTypes";
import { preparePayload } from "./preparePayload";

interface SubmitDeps {
	values: ArticlesTypes;
	createArticle: ReturnType<typeof usePostArticleMutation>[0];
	uploadFile: ReturnType<typeof useUploadFileMutation>[0];
}


export const handleSubmit = async ({
	values,
	createArticle,
	uploadFile,
}: SubmitDeps): Promise<void> => {
	try {
		const payload = preparePayload( values)

		const response = await createArticle(payload).unwrap();

		if (!Array.isArray(response.subscriptions)) {
			throw new Error('Invalid response: subscriptions missing');
		}

		const uploadTasks: Promise<any>[] = [];

		response.subscriptions.forEach((srvSub, subIdx) => {
			const localSub = values.subscriptions?.[subIdx];
			if (!localSub) return;

			srvSub.elements.forEach((srvEl, elIdx) => {
				const localEl = localSub.elements[elIdx];
				if (!localEl) return;

				srvEl.files.forEach((srvFile: ServerFile, fileIdx) => {
					const fileToUpload = localEl.files[fileIdx];
					if (fileToUpload instanceof File && srvFile.url) {
						uploadTasks.push(
							uploadFile({
								uploadUrl: srvFile.url,
								file: fileToUpload,
							}).unwrap()
						);
					}
				});
			});
		});

		await Promise.all(uploadTasks);

	} catch (err) {
		console.error('Error during submission:', err);
		throw err;
	}
};
