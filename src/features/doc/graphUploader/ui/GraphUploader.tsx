import { useState } from "react";
import { Graph } from "@/entities/graph";
import { DataSeries } from "@/entities/graph/model/types";
import { parseGraphCSV } from "@/entities/graph/model/parseGraphCSV";

export const GraphUploader = () => {
	const [data, setData] = useState<DataSeries[]>([]);

	const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		const reader = new FileReader();
		reader.onload = () => {
			const text = reader.result as string;
			const parsed = parseGraphCSV(text);
			setData(parsed);
		};
		reader.readAsText(file);
	};

	return (
		<div>
			<input type="file" accept=".csv" onChange={handleFileUpload} />
			{data.length > 0 &&
				<div style={{ width: '100%', padding: '10px' }}>
					<Graph data={data} />
				</div>
			}
		</div>
	);
};