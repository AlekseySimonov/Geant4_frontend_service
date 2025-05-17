export interface ArticlesTypes {
	id?: number;
	category?: number;
	subscriptions?: {
		title: string;
		subscription_order: number;
		elements: {
			text: string;
			element_order: number;
			type: 'text' | 'image' | 'csv';
			files: ServerFile[];
		}[];
	}[];
	chapter?: number;
	description?: string;
	title?: string;
	chosen?: true;
	pages_count?: number;
}

export interface FileFormat {
	format: 'csv' | 'webp' | 'other';
}

export interface SubscriptionElement {
	text: string;
	element_order: number;
	type: 'text' | 'image' | 'csv';
	files: FileFormat[];
}

export interface Subscription {
	title: string;
	subscription_order: number;
	elements: SubscriptionElement[];
}

export interface ArticleResponse {
	id: number;
	chapter: number;
	category: number;
	subscriptions: ServerSubscription[];
	title: string;
	description: string;
	chosen: boolean;
}

export interface ServerSubscription {
	id: number;
	title: string;
	subscription_order: number;
	elements: ServerSubscriptionElement[];
}

export interface ServerSubscriptionElement {
	id?: number;
	text: string;
	element_order: number;
	type: string;
	files: ServerFile[];
}

export interface ServerFile extends FileFormat {
	id?: number;
	uuid?: string;
	url?: string;
}