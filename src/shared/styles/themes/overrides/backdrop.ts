import { Components, Theme } from '@mui/material';

export const backdropOverride: Components['MuiBackdrop'] = {
	styleOverrides: {
		root: (props) => {
			const { theme } = props as { theme: Theme };

			return {
				backgroundColor: theme.palette.primary.main + '80',
			}
		},
	},
};