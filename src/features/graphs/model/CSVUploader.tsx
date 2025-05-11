import { useState } from "react";
import { DataSeries } from "../types/types";
import { parseGraphCSV } from "./parseGraphCsv";
import { VictoryAxis, VictoryChart, VictoryLegend, VictoryLine, VictoryScatter, VictoryTheme, VictoryTooltip, VictoryZoomContainer, ZoomDomain } from "victory";
import { useTheme } from "@mui/material";
import { victoryStyles } from "./victoryStyles";

export const CSVUploader = () => {
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
			<div style={{ width: '100%', height: 'max-content',  padding: '10px' }}>
				<Graph data={data} />
			</div>
		</div>
	);
};

type GraphProps = { data: DataSeries[]; };

export const Graph: React.FC<GraphProps> = ({ data }) => {

	const theme = useTheme();
	const graphStyles = victoryStyles(theme);

	const [zoomDomain, setZoomDomain] = useState<ZoomDomain>({
		x: [0.1, 1000],
		y: [0, 500],
	});

	const handleZoomDomainChange = (domain: ZoomDomain, props: any) => {
		setZoomDomain(domain);
	};

	return (
		<VictoryChart
			theme={VictoryTheme.material}
			width={1000}
			height={500}
			padding={{ top: 50, bottom: 60, left: 70, right: 50 }}
			containerComponent={
				<VictoryZoomContainer
					downsample={true}
					minimumZoom={{ x: 1e-4, y: 1 }}
					onZoomDomainChange={handleZoomDomainChange}
					zoomDomain={zoomDomain}
					allowPan={true}
				/>
			}
			scale={{ x: "linear", y: "linear" }}
		>
			<VictoryAxis label = {data[0]?.yUnit || ''} crossAxis {...graphStyles.axis} />
			<VictoryAxis label = {data[0]?.xUnit || ''} dependentAxis {...graphStyles.axis}/>
			<VictoryLegend
				x={50}
				y={10}
				orientation="horizontal"
				gutter={20}
				data={data.map(series => ({
					name: series.id,
					symbol: { fill:series.color }
				}))}
			/>
			{data.map(series => (
				<VictoryLine
					key={series.id}
					data={series.data}
					style={{ data: { stroke: series.color} }}
					interpolation="natural"
				/>
			))}
			{data.map(series => (
				<VictoryScatter
					key={`scatter-${series.id}`}
					data={series.data}
					size={2}
					style={{
						...graphStyles.scatter?.style,
						data: {
						...graphStyles.scatter?.style?.data,
						fill: series.color
						}
					}}
					labels={({ datum }) => `x: ${datum.x.toFixed(3)}\ny: ${datum.y.toExponential(2)}`}
					labelComponent={
						<VictoryTooltip
							flyoutStyle={{ fill: "white" }}
							{...graphStyles.tooltip}
						/>
					}
				/>
			))}
		</VictoryChart>
	);
}