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
		<TableContainer
			sx={{
				backgroundColor: 'background.paper',
				maxHeight: 630,
				overflowY: 'auto',
				borderRadius: 2,
				boxShadow: 2,
			}}
		>
			<Table
				stickyHeader
				size="small"
				sx={{
					backgroundColor: 'background.paper',
					fontSize: '1rem',
				}}
			>
				<TableHead>
					<TableRow
						sx={{
							backgroundColor: 'background.paper',
							'&:hover': {
								backgroundColor: 'action.hover',
							},
						}}
					>
						<TableCell
							sx={{
								backgroundColor: 'background.paper',
								fontWeight: 600,
								fontSize: '0.875rem',
								color: 'primary.main',
								borderBottom: '1px solid',
								borderColor: 'divider',
							}}
							dangerouslySetInnerHTML={{
								__html: renderLaTeX(data[0]?.xUnit.toString() ?? '—'),
							}}
						/>
						{data.map((series) => (
							<TableCell
								key={series.id}
								sx={{
									backgroundColor: 'background.paper',
									fontWeight: 600,
									fontSize: '0.875rem',
									color: series.color,
									borderBottom: '1px solid',
									borderColor: 'divider',
								}}
								dangerouslySetInnerHTML={{
									__html: renderLaTeX(`${series.id} ${series?.yUnit ?? ''}`),
								}}
							/>
						))}
					</TableRow>
				</TableHead>

				<TableBody>
					{Array.from({ length: maxLength }).map((_, i) => (
						<TableRow
							key={i}
							sx={{
								backgroundColor: 'background.paper',
								'&:hover': {
									backgroundColor: 'action.hover',
								},
							}}
						>
							<TableCell
								sx={{
									fontSize: '0.875rem',
									borderBottom: '1px solid',
									borderColor: 'divider',
									backgroundColor: 'background.paper',
									color: 'inherit',
								}}
							>
								{data[0].data[i]?.x ?? '—'}
							</TableCell>
							{data.map((series) => (
								<TableCell
									key={series.id}
									sx={{
										fontSize: '0.875rem',
										borderBottom: '1px solid',
										borderColor: 'divider',
										backgroundColor: 'background.paper',
										color: series.color,
									}}
								>
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