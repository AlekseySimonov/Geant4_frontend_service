import { createTheme, Shadows } from "@mui/material";
import commonSettings from "./commonSettings";
import { backdropOverride, outlinedInputOverride, paperOverride } from "./overrides";

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
			main: "#FCFDFF",
			light: "rgba(29, 43, 100, 0.5)"
		},
		background: {
			default: '#F1F6FF',
			paper: '#FCFDFF',
		},
		info: {
			main: 'rgba(74,85,131, 0.8)'
		},
		text: {
			primary: "#FCFDFF",
			secondary: "rgba(74,85,131, 0.8)"
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
	shape: {
		borderRadius: 8,
	},
	components: {
		...commonSettings.components,
		MuiBackdrop: backdropOverride,
		MuiPaper: paperOverride,
		MuiOutlinedInput: outlinedInputOverride,
	}
})

export default lightTheme