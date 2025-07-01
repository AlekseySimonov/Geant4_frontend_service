import { createTheme } from '@mui/material/styles';

const commonSettings = createTheme({

	breakpoints: {
		values: {
			xs: 0,
			sm: 600,
			md: 900,
			lg: 1120,
			xl: 1368,
		}
	},
	typography: {
		fontFamily: '"Inter", "Manrope", sans-serif',
		fontSize: 16,
	},
});

export default commonSettings;