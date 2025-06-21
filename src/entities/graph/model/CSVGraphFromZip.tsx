import { Graph, parseGraphCSV } from "@/entities/graph";
import { DataSeries } from "@/entities/graph/model/types";
import { useEffect, useState } from "react";
import JSZip from "jszip";

interface CsvGraphFromZipProps {
	zipBlob: Blob;
	filename?: string;
}

export const CsvGraphFromZip: React.FC<CsvGraphFromZipProps> = ({ zipBlob, filename }) => {
	const [data, setData] = useState<DataSeries[]>([]);
	const [graphTitle, setGraphTitle] = useState<string>();
	const [parseError, setParseError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const extractCSV = async () => {
			try {
				const zip = await JSZip.loadAsync(zipBlob);

				const targetFile = filename
					? zip.file(filename)
					: zip.filter((relPath) => relPath.endsWith(".csv"))[0];

				if (!targetFile) {
					throw new Error("CSV-файл не найден в архиве");
				}

				const csvText = await targetFile.async("text");
				const parsed = parseGraphCSV(csvText);
				setData(parsed.series);
				setGraphTitle(parsed.title);
				setParseError(null);
			} catch (e) {
				setParseError(e instanceof Error ? e.message : "Ошибка чтения ZIP-файла");
				setData([]);
				setGraphTitle("");
			} finally {
				setLoading(false);
			}
		};

		extractCSV();
	}, [zipBlob, filename]);

	if (loading) return <p>Загрузка графика...</p>;
	if (!data.length) return <p>Нет данных для графика</p>;

	return <Graph data={data} title={graphTitle} />;
};
