import { Components, Theme } from '@mui/material';

export const typographyOverride: Components['MuiTypography'] = {
	styleOverrides: {
		root: (props) => {
			const { theme } = props as { theme: Theme };

			return {
				fontFamily: '"Inter", sans-serif',
				fontSize: '1rem',
				color: theme.palette.primary.main,
			}
		}
	},
}