import { useEffect, useState } from "react";
import { Graph } from "@/entities/graph";
import { DataSeries } from "@/entities/graph/model/types";
import { parseGraphCSV } from "@/entities/graph/model/parseGraphCSV";
import { FileUploadInput } from "@/shared/ui/components/fileUploadInput";
import { LocalServerFile, ServerFile } from "@/shared/types";
import { showAlert } from "@/shared/ui/components/alert/model/alertSlice";
import { useDispatch } from "react-redux";

interface GraphUploaderProps {
	fieldName: string;
	setFieldValue: (field: string, value: unknown) => void;
	initialValues?: ServerFile[];
}

export const GraphUploader: React.FC<GraphUploaderProps> = ({ fieldName, setFieldValue, initialValues }) => {
		const [graphFiles, setGraphFiles] = useState<ServerFile[]>(initialValues || []);
	const [data, setData] = useState<DataSeries[]>([]);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!initialValues?.length) return;

		const loadGraphs = async () => {
			try {
				const res = await fetch(initialValues[0].url);
				const text = await res.text();
				const parsed = parseGraphCSV(text);
				setData(parsed);
				setFieldValue(fieldName, initialValues);
			} catch (e) {
				console.error("Ошибка загрузки CSV", e);
				setData([]);
				setFieldValue(fieldName, []);
			}
		};

		loadGraphs();
	}, [initialValues]);

	const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const MAX_FILE_SIZE = 1.5 * 1024 * 1024;
		const file = e.target.files?.[0];
		if (!file) return;

		if (file.size > MAX_FILE_SIZE) {
			dispatch(showAlert({
				message: "Файл превышает максимальный размер (1.5 МБ)",
				severity: "error",
			}));
			return;
		}

		try {
			const text = await file.text();
			const parsed = parseGraphCSV(text);
			setData(parsed);

			const fileUrl = URL.createObjectURL(file);
			const newServerFile: LocalServerFile = {
				file,
				format: "csv",
				url: fileUrl,
			};

			const updated = [newServerFile];
			setGraphFiles(updated);
			setFieldValue(fieldName, updated);
		} catch (e) {
			console.error("Ошибка парсинга CSV", e);
			setData([]);
			setGraphFiles([]);
			setFieldValue(fieldName, []);
		}
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
