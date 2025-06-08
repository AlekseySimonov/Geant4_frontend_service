import { getDirtyValues } from "@/shared/model";
import { ExtendedArticlesTypes, ServerFile, Subscription, SubscriptionElement } from "@/shared/types/articlesTypes";

export const preparePayloadForPatch = (
	values: Partial<ExtendedArticlesTypes>,
	existing: ExtendedArticlesTypes
): Partial<ExtendedArticlesTypes> => {
	const dirty = getDirtyValues(existing, values);

	if (dirty.subscriptions) {
		const patchedSubscriptions = dirty.subscriptions.map((sub, subIdx) => {
			const existingSub = existing.subscriptions?.[subIdx];

			return {
				...sub,
				id: existingSub?.id,
				elements: sub.elements?.map((el, elIdx) => {
					const existingEl = existingSub?.elements?.[elIdx];

					return {
						...el,
						id: existingEl?.id,
						files: el.files?.map((file, fileIdx) => {
							const existingFile = existingEl?.files?.[fileIdx];

							if (!('uuid' in file) || !file.uuid) {
								return {
									format: file.format
								};
							}

							return {
								...file,
								id: existingFile?.id
							};
						}) || []
					};
				}) || []
			};
		});

		dirty.subscriptions = patchedSubscriptions;
	}

	return dirty;
};


export const preparePayloadForPost = (
	values: ExtendedArticlesTypes
): ExtendedArticlesTypes => {
	return {
		...values,
		subscriptions: values.subscriptions?.map((sub) => ({
			title: sub.title,
			subscription_order: sub.subscription_order,
			elements: sub.elements.map((el) => ({
				text: el.text,
				element_order: el.element_order,
				type: el.type,
				files: el.files.map((f) => {
					if (f instanceof File) {
						return { format: el.type === "csv" ? "csv" : "webp" };
					}
					return f;
				}),
			})),
		})),
	};
};