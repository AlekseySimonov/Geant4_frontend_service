import { useState } from "react";
import { Graph } from "@/entities/graph";
import { DataSeries } from "@/entities/graph/model/types";
import { parseGraphCSV } from "@/entities/graph/model/parseGraphCSV";
import { FileUploadInput } from "@/shared/ui/components/fileUploadInput";

interface GraphUploaderProps {
	fieldName: string;
	setFieldValue: (field: string, value: any) => void;
}

export const GraphUploader: React.FC<GraphUploaderProps> = ({ fieldName, setFieldValue }) => {
	const [data, setData] = useState<DataSeries[]>([]);

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setFieldValue(fieldName, [file]);

		const text = await file.text();
		setData(parseGraphCSV(text));
	};

	return (
		<div>
			<FileUploadInput accept=".csv" onChange={handleFileUpload} />
			{data.length > 0 &&
				<div style={{ width: '100%', padding: '10px' }}>
					<Graph data={data} />
				</div>
			}
		</div>
	);
};