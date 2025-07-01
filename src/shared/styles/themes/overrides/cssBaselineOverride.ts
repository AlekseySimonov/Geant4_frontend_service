import { Components, Theme } from '@mui/material';

export const cssBaselineOverride: Components['MuiCssBaseline'] = {
	styleOverrides: {
		root: (props: { theme: Theme }) => {
			const { theme } = props as { theme: Theme };

			return {
				body: {
					margin: 0,
					padding: 0,
					fontFamily: '"Inter", sans-serif',
					backgroundColor: theme.palette.background.default,
					color: theme.palette.primary.main,
					fontSize: 16,
					overflowX: 'hidden',
					height: 'auto',
					scrollbarWidth: 'thin',
					'&::-webkit-scrollbar-thumb': {
						backgroundColor: '#1D2B64',
					},
				},
				h1: {
					fontFamily: '"Manrope", sans-serif',
					fontSize: '4rem',
					lineHeight: '4rem',
					fontWeight: 600,
				},
				h2: {
					fontFamily: '"Manrope", sans-serif',
					fontSize: '2rem',
					lineHeight: '2rem',
					fontWeight: 600,
				},
				h3: {
					fontFamily: '"Manrope", sans-serif',
					fontSize: '1.5rem',
					lineHeight: '2rem',
					fontWeight: 400,
				},
				h4: {
					fontFamily: '"Manrope", sans-serif',
					fontSize: '1.5rem',
					lineHeight: '2rem',
					fontWeight: 600,
				},
				p: {
					fontSize: '1rem',
					lineHeight: '1.2rem',
					fontWeight: 400,
				},
				'#root': {
					height: '100vh',
				},
			};
		},
	},
};
