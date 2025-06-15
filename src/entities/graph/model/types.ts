export type DataPoint = {
	x: number;
	y: number;
};

export type DataSeries = {
	id: string;
	data: DataPoint[];
	xUnit: string;
	yUnit: string;
	color: string;
};

export type ParsedCSV = {
	title: string;
	series: DataSeries[];
}