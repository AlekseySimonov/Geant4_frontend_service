import { Theme } from "@mui/material/styles";

export const victoryStyles = (theme: Theme) => ({
	axis: {
		style: {
			axis: { stroke: theme.palette.primary.main },
			tickLabels: {
				fill: theme.palette.text.secondary,
				fontSize: 14,
			},
			grid: {
				stroke: theme.palette.info.light,
				strokeDasharray: "4,4",
			},
			axisLabel: {
				fill: theme.palette.primary.main,
				fontSize: 16,
				padding: 40,
			},
		},
	},
	scatter: {
		style: {
			data: {
				fill: ({ active }: { active?: boolean }) =>
					active ? "red" : "blue",
				stroke: theme.palette.primary.main,
				strokeWidth: 0.2,
			},
		},
	},
	tooltip: {
		flyoutStyle: {
			fill: theme.palette.background.paper,
			stroke: theme.palette.primary.light,
		},
		style: {
			fontSize: 16,
			fill: theme.palette.text.secondary,
		},
	},
});