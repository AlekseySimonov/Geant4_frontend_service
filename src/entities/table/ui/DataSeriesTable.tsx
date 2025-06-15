import { DataSeries } from "@/entities/graph/model/types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";

type DataSeriesTableProps = {
	data: DataSeries[];
};
export const DataSeriesTable: React.FC<DataSeriesTableProps> = ({ data }) => {
	if (data.length === 0) return null;

	const maxLength = Math.max(...data.map((series) => series.data.length));

	return (
		<TableContainer component={Paper}>
			<Table stickyHeader size="small">
				<TableHead>
					<TableRow>
						<TableCell>
							{data[0].xUnit}
						</TableCell>
						{data.map((series) => (
							<TableCell key={series.id}>
								<strong>{series.id}</strong> ({series.yUnit})
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
					{Array.from({ length: maxLength }).map((_, i) => (
						<TableRow key={i}>
							<TableCell>
								{data[0].data[i]?.x ?? '—'}
							</TableCell>
							{data.map((series) => (
								<TableCell key={series.id} sx={{ color: series.color }}>
									{series.data[i]?.y ?? '—'}
								</TableCell>
							))}
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
};