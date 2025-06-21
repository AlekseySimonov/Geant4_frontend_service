export interface Tag {
	title: string;
}

export interface Command {
	title: string;
	default: string;
	order_index: number;
	min: number;
	max: number;
	values: number[];
}

export interface ExampleBaseTypes {
	id: number;
	title_verbose?: string;
	title_not_verbose?: string;
	description: string;
	date_to_update: string;
	tags?: Tag[];
	category?: string;
}

export interface Example extends ExampleBaseTypes {
	commands?: Command[];
}

export type RawExampleResponse = (Example | { pages_count: number })[];
