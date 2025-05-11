import {
	VictoryAxis,
	VictoryChart,
	VictoryLine,
	VictoryScatter,
	VictoryTheme,
	VictoryTooltip,
	VictoryZoomContainer,
	VictoryLegend,
	ZoomDomain,
} from "victory";
import { useTheme } from "@mui/material";
import { DataSeries } from "../model/types";
import { useState } from "react";
import { victoryStyles } from "../lib/victoryStyles";

type Props = { data: DataSeries[] };

export const Graph = ({ data }: Props) => {
	const theme = useTheme();
	const graphStyles = victoryStyles(theme);

	const [zoomDomain, setZoomDomain] = useState<ZoomDomain>({
		x: [0.1, 1000],
		y: [0, 500],
	});

	return (
		<VictoryChart
			theme={VictoryTheme.material}
			width={1000}
			height={500}
			padding={{ top: 50, bottom: 60, left: 70, right: 50 }}
			containerComponent={
				<VictoryZoomContainer
					downsample
					minimumZoom={{ x: 1e-4, y: 1 }}
					onZoomDomainChange={setZoomDomain}
					zoomDomain={zoomDomain}
					allowPan
				/>
			}
			scale={{ x: "linear", y: "linear" }}
		>
			<VictoryAxis label={data[0]?.yUnit || ''} crossAxis {...graphStyles.axis} />
			<VictoryAxis label={data[0]?.xUnit || ''} dependentAxis {...graphStyles.axis} />
			<VictoryLegend
				x={50}
				y={10}
				orientation="horizontal"
				gutter={20}
				data={data.map(series => ({
					name: series.id,
					symbol: { fill: series.color },
				}))}
			/>
			{data.map(series => (
				<VictoryLine
					key={series.id}
					data={series.data}
					style={{ data: { stroke: series.color } }}
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
							fill: series.color,
						},
					}}
					labels={({ datum }) => `x: ${datum.x.toFixed(3)}\ny: ${datum.y.toExponential(2)}`}
					labelComponent={<VictoryTooltip flyoutStyle={{ fill: "white" }} {...graphStyles.tooltip} />}
				/>
			))}
		</VictoryChart>
	);
};