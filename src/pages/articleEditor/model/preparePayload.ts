
import { ExtendedArticlesTypes } from "@/shared/types/articlesTypes";

export const preparePayload = (values: ExtendedArticlesTypes): ExtendedArticlesTypes => {
		return {
		...values,
		subscriptions: values.subscriptions.map((sub) => ({
			...sub,
			elements: sub.elements.map((el) => ({
				...el,
				files: el.files.map((f) => {
					if (f instanceof File) {
						return {
							format: el.type === 'csv' ? 'csv' : 'webp',
						};
					}
					return f;
				}),
			})),
		})),
	};
};