import { Graph } from "@/entities/graph";
import { parseGraphCSV } from "@/entities/graph/model/parseGraphCSV";
import { DataSeries } from "@/entities/graph/model/types";
import { useGetGraphQuery } from "@/pages/documentationPage/api/docApi";
import { useState, useEffect } from "react";

interface CsvGraphProps {
	url: string;
}

export const CsvGraph: React.FC<CsvGraphProps> = ({ url }) => {
	const { data: csvText, error, isLoading } = useGetGraphQuery(url);

	const [data, setData] = useState<DataSeries[]>([]);
	const [parseError, setParseError] = useState<string | null>(null);

	useEffect(() => {
		if (csvText) {
			try {
				const parsed = parseGraphCSV(csvText);
				setData(parsed);
				setParseError(null);
			} catch (e) {
				setData([]);
				setParseError(e instanceof Error ? e.message : "Ошибка парсинга CSV");
			}
		} else {
			setData([]);
		}
	}, [csvText]);

	if (!isLoading  && !parseError && !error && data)return <Graph data={data} />;
};