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
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					margin: 0,
					padding: 0,
					fontFamily: '"Inter", sans-serif',
					backgroundColor: '#F1F6FF',
					color: '#1D2B64',
					fontSize: 16,
				},
				h1: { fontFamily: '"Manrope", sans-serif', fontSize: '4rem', lineHeight: '4rem', fontWeight: 600, },
				h2: { fontFamily: '"Manrope", sans-serif', fontSize: '2rem', lineHeight: '2rem', fontWeight: 600, },
				h3: { fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 400},
				p: { fontSize: '1.5rem', lineHeight: '2rem', fontWeight: 400, },
				'#root': { height: '100vh' },
			},
		},
		MuiTypography: {
			styleOverrides: {
				root: {
					fontFamily: '"Inter", sans-serif',
					fontSize: '1rem',
					color: '#1D2B64',
				},
			},
		},
	},
});

export default commonSettings;