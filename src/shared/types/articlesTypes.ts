export interface ArticlesTypes {
	id?: number;
	category?: string;
	subscriptions?: Subscription[];
	chapter?: string;
	description?: string;
	title?: string;
	chosen?: true;
	pages_count?: number;
}

export interface SubscriptionElement {
	text: string;
	element_order: number;
	type: 'text' | 'image' |'graph';
	files: Array<{
		format: 'webp' | 'jpg' | 'png' | 'pdf' |'csv' | 'other';
	}>;
}

export interface Subscription {
	title: string;
	subscription_order: number;
	elements: SubscriptionElement[];
}