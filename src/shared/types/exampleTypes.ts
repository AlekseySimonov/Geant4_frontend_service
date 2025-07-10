export interface Tag {
	title: string;
}

export interface CommandList {
	id: number;
	title: string;
	command_values: (string | number)[];
}

export interface Command {
	title: string;
	default: string | number;
	order_index: number;
	min: number | null;
	max: number | null;
	command_list: CommandList | null;
	signature: string | null;
}


export interface ExampleBaseTypes {
	id: number;
	title_verbose?: string;
	title_not_verbose?: string;
	description: string;
	creation_date: string;
	tags?: Tag[];
	category?: string;
	example_id?: number;
}

export interface Example extends ExampleBaseTypes {
	commands: Command[];
}

export interface RawExamplePage {
	pages_count: number;
}

export type RawExampleResponse = (Example | RawExamplePage)[];

