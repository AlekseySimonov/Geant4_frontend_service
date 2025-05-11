import { DataSeries } from "../types/types";
export function parseGraphCSV(content: string): DataSeries[] {
	const lines = content.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
	const headerLineIndex = lines.findIndex(line => line.includes('E(MeV)'));

	if (headerLineIndex === -1) throw new Error('Заголовок с колонками не найден');

	const fullHeaders = lines[headerLineIndex].split(/\s+/);
	const headers = fullHeaders.slice(1);

	const parsedHeaders = headers.map(parseHeader);

	const dataLines = lines.slice(headerLineIndex + 1).filter(line => !/^[-]+$/.test(line));
	const rows: Record<string, number>[] = [];

	for (const line of dataLines) {
		const parts = line.split(/\s+/);
		if (parts.length !== fullHeaders.length) continue;

		const obj: Record<string, number> = {};
		headers.forEach((header, i) => {
			const key = parseHeader(header).name;
			obj[key] = parseFloat(parts[i + 1]);
		});

		rows.push(obj);
	}

	if (parsedHeaders.length - 1 > colorPalette.length) {
		throw new Error(`Слишком много графиков (${parsedHeaders.length - 1}), максимум поддерживается ${colorPalette.length}`);
	}

	return parsedHeaders.slice(1).map((field, index) => ({
		id: field.name,
		data: rows.map(row => ({
			x: row[parsedHeaders[0].name],
			y: row[field.name],
		})),
		xUnit: parsedHeaders[0].unit,
		yUnit: field.unit,
		color: colorPalette[index % colorPalette.length],
	}));
}

const parseHeader = (header: string) => {
	const match = header.match(/([^(]+)(?:\(([^)]+)\))?/);
	return {
		name: match?.[1].trim() || header,
		unit: match?.[2] || '',
	};
};
const colorPalette = [
    '#1f77b4', '#ff7f0e', '#2ca02c', '#d62728',
    '#9467bd', '#8c564b'
];

export function extractUnit(label: string): string {
	const match = label.match(/\(([^)]+)\)/);
	return match ? match[1] : '';
}