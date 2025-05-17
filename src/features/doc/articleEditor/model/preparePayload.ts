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
						const extension = f.name.split('.').pop()?.toLowerCase() || 'other';
						return { format:  getAllowedFormat(extension) };
					}
					return f;
				}),
			})),
		})),
	};
};

const getAllowedFormat = (ext: string): "csv" | "webp" | "other" => {
	switch (ext) {
		case "csv":
			return "csv";
		case "webp":
			return "webp";
		default:
			return "other";
	}
};