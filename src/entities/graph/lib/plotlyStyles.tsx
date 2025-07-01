import { useMemo } from "react";
import { useMediaQuery, useTheme } from "@mui/material";

export const usePlotlyStyles = (): Partial<Plotly.Layout> => {
	const theme = useTheme();
	const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

	return useMemo(() => ({
		margin: isMobile
			? { l: 50, r: 50, t: 40, b: 20 }
			: { l: 80, r: 80, t: 40, b: 20 },
		font: {
			family: "'Inter', sans-serif",
			size: isMobile ? 14 : 16,
			color: theme.palette.primary.main,
		},
		hoverlabel: {
			bgcolor: theme.palette.background.paper,
			bordercolor: theme.palette.primary.main,
			font: {
				family: "'Inter', sans-serif",
				size: 18,
				color: theme.palette.primary.main,
			},
			align: "left",
		},
		xaxis: {
			color: theme.palette.primary.main,
		},
		yaxis: {
			color: theme.palette.primary.main,
		},
		plot_bgcolor: theme.palette.background.paper,
		paper_bgcolor: theme.palette.background.default,
	}), [theme.palette.mode, isMobile]);
};
