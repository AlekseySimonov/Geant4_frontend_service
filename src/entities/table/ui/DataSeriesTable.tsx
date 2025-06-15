import { DataSeries } from "@/entities/graph/model/types";
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import katex from "katex";
import "katex/dist/katex.min.css";
type DataSeriesTableProps = {
	data: DataSeries[];
};
export const DataSeriesTable: React.FC<DataSeriesTableProps> = ({ data }) => {

	const renderLaTeX = (text: string) => {
		text = text.replace(/(?<!\$)\$([^\$]+?)\$(?!\$)/g, (_, formula) => {
			try {
				return katex.renderToString(formula.trim(), {
					displayMode: false,
					throwOnError: false,
				});
			} catch {
				return `<code>$${formula}$</code>`;
			}
		});

		return text;
	};
	if (data.length === 0) return null;

	const maxLength = Math.max(...data.map((series) => series.data.length));

	return (
		<TableContainer component={Paper}>
			<Table stickyHeader size="small">
				<TableHead>
					<TableRow>
						<TableCell
							dangerouslySetInnerHTML={{
								__html: renderLaTeX(data[0]?.xUnit.toString() ?? "—"),
							}}
						/>
						{data.map((series) => (
							<TableCell
								key={series.id}
								sx={{ color: series.color }}
								dangerouslySetInnerHTML={{
									__html: renderLaTeX((`${series.id} (${series?.yUnit ?? ''})`).toString()),
								}}
							/>
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