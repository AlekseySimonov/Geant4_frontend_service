import { createTheme, Shadows } from "@mui/material";
import commonSettings from "./commonSettings";

const lightTheme = createTheme({
	...commonSettings,
	cssVariables: true,
	palette: {
		mode: 'light',
		primary: {
			main: '#1D2B64',
		},
		secondary: {
			main: "#FCFDFF"
		},
		background: {
			default: '#F1F6FF',
			paper: '#FCFDFF',
		},
	},
	shadows: [
		"none",
		"0px 10px 30px rgba(29, 43, 100, 0.2)",
		"0px 4px 4px rgba(0, 0, 0, 0.25)",
		"0px -10px 30px rgba(29, 43, 100, 0.2)",
		...Array(21).fill("0px 6px 20px rgba(0,0,0,0.1)"),
	] as Shadows,
	components: {
		...commonSettings.components, 
		MuiBackdrop: {
			styleOverrides: {
				root: {
					backgroundColor: 'rgba(29, 43, 100, 0.5)',
				},
			},
		},
		MuiPaper: {
			styleOverrides: {
				root: {
					boxShadow: '0px 10px 30px rgba(29, 43, 100, 0.2)',
				},
			},
		},
	}
})

export default lightTheme