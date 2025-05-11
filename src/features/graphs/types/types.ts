export type DataSeries = {
	id: string;
	data: { x: number; y: number }[];
	xUnit: string;
	yUnit: string;
	color: string;
};