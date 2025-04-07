import { createTheme, Shadows } from "@mui/material";
import commonSettings from "./commonSettings";

const lightTheme = createTheme({
	...commonSettings,
	cssVariables: true,
	palette: {
		mode: 'light',
		primary: {
			main: '#1D2B64',
			light: '#7889C4'
		},
		secondary: {
			main: "#FCFDFF"
		},
		background: {
			default: '#F1F6FF',
			paper: '#FCFDFF',
		},
		info: {
			main: 'rgba(74,85,131, 0.8)'
		},
		error: {
			main: '#B5003F'
		},
		action: {
			disabled: '#DEE3ED'
		}
	},
	shadows: [
		"none",
		"4px 4px 16px rgba(29, 43, 100, 0.25)",
		"4px 4px 8px rgba(0, 0, 0, 0.25)",
		"4px -4px 16px rgba(29, 43, 100, 0.25)",
		"4px 4px 8px rgba(29, 43, 100, 0.5)",
		...Array(20).fill("0px 6px 20px rgba(0,0,0,0.1)"),
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