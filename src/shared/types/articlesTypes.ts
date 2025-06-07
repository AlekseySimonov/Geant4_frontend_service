export interface ArticlesTypes {
	id?: number;
	category?: string;
	subscriptions?: {
		title: string;
		subscription_order: number;
		elements: {
			text: string;
			element_order: number;
			type: 'text' | 'webp' | 'csv';
			files: ServerFile[];
		}[];
	}[];
	chapter?: string;
	description?: string;
	title?: string;
	chosen?: true;
	pages_count?: number;
}

export type ExtendedArticlesTypes = Omit<ArticlesTypes, 'category' | 'chapter'> & {
	category?: number | null;
	chapter?: number | null;
};

export interface FileFormat {
	format: 'csv' | 'webp' | 'text';
}

export interface SubscriptionElement {
	text?: string;
	element_order?: number;
	type?: 'text' | 'webp' | 'csv';
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
	text?: string;
	element_order?: number;
	type?: string;
	files?: ServerFile[];
}

export interface ServerFile extends FileFormat {
	id?: number;
	uuid?: string;
	url?: string;
}

export interface LocalServerFile extends ServerFile {
	file?: File;
}