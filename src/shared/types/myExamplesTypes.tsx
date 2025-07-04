import { Command } from "./exampleTypes";

export interface MyExamplesTypes{
	id: number;
	category?: string;
	title_verbose: string;
	description: string;
	creation_date: string;
	date_to_update: string;
	status: number;
	tags: string[];
	params:  Command[];
	example_id?: number;
}

export interface RawMyExamplesPage {
	pages_count: number;
}

export type RawMyExamplesResponse = (MyExamplesTypes | RawMyExamplesPage)[];