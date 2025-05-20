import { ArticlesTypes } from "@/shared/types";

export const preparePayload = (values: ArticlesTypes, selectedCategory: number, selectedChapter: number): ArticlesTypes => {
		return {
		...values,
		category: selectedCategory,
		chapter: selectedChapter,
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