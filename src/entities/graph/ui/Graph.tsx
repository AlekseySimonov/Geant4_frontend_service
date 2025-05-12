import {
	VictoryAxis,
	VictoryChart,
	VictoryLine,
	VictoryScatter,
	VictoryTheme,
	VictoryTooltip,
	VictoryZoomContainer,
	ZoomDomain,
} from "victory";
import { Checkbox, useMediaQuery, useTheme } from "@mui/material";
import { DataSeries } from "../model/types";
import { useEffect, useState } from "react";
import { victoryStyles } from "../lib/victoryStyles";
import styles from "./_graph.module.scss"

type Props = { data: DataSeries[] };

export const Graph = ({ data }: Props) => {
	const theme = useTheme();
	const graphStyles = victoryStyles(theme);

	const [visibleSeries, setVisibleSeries] = useState<Record<string, boolean>>({});

	useEffect(() => {
		if (data.length) {
			setVisibleSeries(prev => {
				const updated = { ...prev };
				data.forEach(series => {
					if (!(series.id in updated)) {
						updated[series.id] = true;
					}
				});
				return updated;
			});
		}
	}, [data]);

	const toggleSeries = (id: string) => {
		setVisibleSeries(prev => ({ ...prev, [id]: !prev[id] }));
	};

	const [zoomDomain, setZoomDomain] = useState<ZoomDomain>({
		x: [0.1, 1000],
		y: [0, 500],
	});

	const isSmallScreen = useMediaQuery('(max-width:600px)');

	return (
		<div className={styles.graph}>
			<div className={styles.graph__legend}>
				{data.map(series => (
					<label key={series.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
						<Checkbox
							checked={visibleSeries[series.id] ?? true}
							onChange={() => toggleSeries(series.id)}
							sx={{
								padding: 0,
								'& .MuiSvgIcon-root': {
									fontSize: 'clamp(14px, 1.5vw, 24px)'
								},
							}}
						/>
						<span style={{ color: series.color }}>{series.id}</span>
					</label>
				))}
			</div>

			<VictoryChart
				theme={VictoryTheme.material}
				width={isSmallScreen ? 500 : 1000}
				height={isSmallScreen ? 500 : 500}
				padding={{ top: 50, bottom: 60, left: 70, right: 50 }}
				containerComponent={
					<VictoryZoomContainer
						responsive={true}
						downsample
						minimumZoom={{ x: 1e-4, y: 1 }}
						onZoomDomainChange={setZoomDomain}
						zoomDomain={zoomDomain}
						allowPan
					/>
				}
				scale={{ x: "linear", y: "linear" }}
			>
				<VictoryAxis label={data[0]?.yUnit || ''} {...graphStyles.axis} />
				<VictoryAxis label={data[0]?.xUnit || ''} dependentAxis {...graphStyles.axis} />

				{data.map(series =>
					visibleSeries[series.id] && (
						<VictoryLine
							key={series.id}
							data={series.data}
							style={{ data: { stroke: series.color } }}
							interpolation="natural"
						/>
					)
				)}

				{data.map(series =>
					visibleSeries[series.id] && (
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
							labels={({ datum }) =>
								`x: ${datum.x.toFixed(3)}\ny: ${datum.y.toExponential(2)}`
							}
							labelComponent={
								<VictoryTooltip flyoutStyle={{ fill: "white" }} {...graphStyles.tooltip} />
							}
						/>
					)
				)}
			</VictoryChart>
		</div>
	);
};