import { createTheme } from "@mui/material";
import commonSettings from "./commonSettings";

const lightTheme = createTheme({
	...commonSettings,
	palette: {
		mode: 'light',
		primary: {
			main: '#1D2B64',
		},
		background: {
			default: '#F1F6FF', 
			paper: '#FCFDFF',
			// floor:'rgba(29, 43, 100, 0.5)',
		}
	},
});

export default lightTheme