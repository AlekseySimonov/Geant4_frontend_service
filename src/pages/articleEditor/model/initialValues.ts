import { ArticlesTypes } from "@/shared/types";
import { ArticleResponse, ExtendedArticlesTypes, ServerSubscription } from "@/shared/types/articlesTypes";
interface InitialValuesProps {
	isEditMode: boolean;
	existingArticle?: ArticleResponse;
}

export const initialValues = ({
	isEditMode,
	existingArticle,
}: InitialValuesProps): ExtendedArticlesTypes => {
	if (isEditMode && existingArticle) {
		return {
			id: existingArticle.id,
			title: existingArticle.title,
			description: existingArticle.description,
			subscriptions: normalizeServerSubscriptions(existingArticle.subscriptions),
			category: existingArticle.category,
			chapter: existingArticle.chapter,
		};
	}

	return {
		title: '',
		description: '',
		subscriptions: [],
		category: null,
		chapter: null,
	};
};

function normalizeServerSubscriptions(
	subs: ServerSubscription[]
): ArticlesTypes['subscriptions'] {
	return subs.map((sub) => ({
		id: sub.id,
		title: sub.title,
		subscription_order: sub.subscription_order,
		elements: sub.elements.map((el) => ({
			id: el.id,
			text: el.text,
			element_order: el.element_order,
			type: el.type as 'text' | 'webp' | 'csv',
			files: el.files?.map((f) => ({
				...f
			})) ?? [],
		})),
	}));
}
