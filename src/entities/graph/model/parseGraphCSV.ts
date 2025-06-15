import { colorPalette } from "../lib/colors";
import { DataSeries, ParsedCSV } from "./types";

function parseHeader(header: string): { name: string; unit?: string; label: string } {
	const match = header.match(/^([^\[]+)(\[(.+?)\])?$/);
	if (!match) return { name: header.trim(), label: header.trim() };
	
	const name = match[1].trim();
	const unit = match[3]?.trim();
	const label = unit ? `${name} (${unit})` : name;

	return { name, unit, label };
}


export function parseGraphCSV(content: string): ParsedCSV {
	const lines = content
		.split(/\r?\n/)
		.map(line => line.trim())
		.filter(Boolean);

	if (lines.length < 2) {
		throw new Error('CSV содержит недостаточно строк');
	}

	const title = lines[0];
	const headerLineIndex = 1;
	const headerLine = lines[headerLineIndex];
	const fullHeaders = headerLine.split(/\s+/);
	const parsedHeaders = fullHeaders.map(parseHeader);

	const dataLines = lines.slice(headerLineIndex + 1).filter(line => !/^[-]+$/.test(line));
	const rows: Record<string, number>[] = [];

	for (const line of dataLines) {
		const parts = line.split(/\s+/);
		if (parts.length !== fullHeaders.length) continue;

		const row: Record<string, number> = {};
		fullHeaders.forEach((header, i) => {
			row[parsedHeaders[i].name] = parseFloat(parts[i]);
		});
		rows.push(row);
	}

	const xHeader = parsedHeaders[1];
	const xKey = xHeader.name;
	const xUnit = xHeader.label;

	const series: DataSeries[] = [];

	for (let i = 2; i < parsedHeaders.length; i++) {
		const yHeader = parsedHeaders[i];
		const yKey = yHeader.name;
		const yUnit = parsedHeaders[2].unit;

		if (i - 2 >= colorPalette.length) {
			throw new Error(`Слишком много графиков (${parsedHeaders.length - 2}), максимум ${colorPalette.length}`);
		}

		const data = rows.map(row => ({
			x: row[xKey],
			y: row[yKey],
		}));

		series.push({
			id: yKey,
			data,
			xUnit,
			yUnit,
			color: colorPalette[(i - 2) % colorPalette.length],
		});
	}

	return {
		title,
		series,
	};
}
