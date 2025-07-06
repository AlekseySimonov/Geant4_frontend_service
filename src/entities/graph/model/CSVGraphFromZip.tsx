import { Graph, parseGraphCSV } from "@/entities/graph";
import { DataSeries } from "@/entities/graph/model/types";
import { lazy, Suspense, useEffect, useState } from "react";
import JSZip from "jszip";
import { List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography, useColorScheme, useTheme } from "@mui/material";
import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
import { usePopup } from "@/shared/hooks/usePopup";
import { ModalWindow } from "@/shared/ui/components/modal";
import styles from "./_csvGraphFromZip.module.scss"

interface CsvGraphFromZipProps {
	zipBlob: Blob;
}

type GraphFile = {
	filename: string;
	data: DataSeries[];
	title?: string;
};

const LazyGraph = lazy(() => import("@/entities/graph/ui/Graph"));

export const CsvGraphFromZip: React.FC<CsvGraphFromZipProps> = ({ zipBlob }) => {
	const [mainFile, setMainFile] = useState<GraphFile | null>(null)
	const [files, setFiles] = useState<GraphFile[]>([]);
	const [parseError, setParseError] = useState<string | null>(null);
	const [loading, setLoading] = useState(true);
	const [selectedFile, setSelectedFile] = useState<GraphFile | null>(null);

	const modal = usePopup();
	const theme = useTheme()

	useEffect(() => {
		const extractAllCSV = async () => {
			try {
				const zip = await JSZip.loadAsync(zipBlob);
				const csvFiles = zip.file(/\.csv$/i);

				if (csvFiles.length === 0) throw new Error("CSV-файлы не найдены в архиве");

				const parsedFiles: GraphFile[] = [];

				for (const file of csvFiles) {
					const csvText = await file.async("text");
					const parsed = parseGraphCSV(csvText, theme.palette.mode);
					parsedFiles.push({
						filename: file.name,
						data: parsed.series,
						title: parsed.title,
					});
				}

				setMainFile(parsedFiles[0] || null);
				setFiles(parsedFiles.slice(1));
				setParseError(null);
			} catch (e) {
				setParseError(e instanceof Error ? e.message : "Ошибка чтения ZIP-файла");
				setFiles([]);
			} finally {
				setLoading(false);
			}
		};

		extractAllCSV();
	}, [zipBlob]);

	const handleFileClick = (file: GraphFile) => {
		setSelectedFile(file);
		modal.openPopup();
	};

	if (loading) return <Typography>Загрузка графиков...</Typography>;
	if (!mainFile && files.length === 0) return <Typography>Нет CSV-файлов для отображения</Typography>;

	return (
		<>
			{mainFile && (
				<div className={styles.graphMain}>
					<Suspense fallback={<Typography>Загрузка графика…</Typography>}>
						<LazyGraph data={mainFile.data} title={mainFile.title} />
					</Suspense>
				</div>
			)}

			{files.length > 0 && (
				<List>
					{files.map((file) => (
						<ListItem key={file.filename} disablePadding>
							<ListItemButton onClick={() => handleFileClick(file)}>
								<ListItemIcon>
									<InsertDriveFileIcon color="inherit" />
								</ListItemIcon>
								<ListItemText
									primary={file.filename}
									primaryTypographyProps={{ color: 'primary.main' }}
								/>
							</ListItemButton>
						</ListItem>
					))}
				</List>
			)}

			<ModalWindow open={modal.isVisible} onClose={modal.closePopup} width="80%">
				{selectedFile &&
					<div className={styles.graphModal}>
						<Suspense fallback={<div>Загрузка…</div>}>
							<LazyGraph data={selectedFile.data} title={selectedFile.title} />
						</Suspense>
					</div>
				}
			</ModalWindow>
		</>
	);
};

