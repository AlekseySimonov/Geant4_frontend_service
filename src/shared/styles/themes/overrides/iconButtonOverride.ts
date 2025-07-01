import { alpha, Components, Theme } from '@mui/material';

export const iconButtonOverride: Components['MuiIconButton'] = {
	styleOverrides: {
		root: (props) => {
			const { theme } = props as { theme: Theme };

			return {
				transition: 'background-color 0.3s ease',
				color: 'inherit',
				padding: 4,
				'&:hover': {
					backgroundColor: alpha(theme.palette.primary.light, 0.2),
				},

				'&.Mui-disabled': {
					color: theme.palette.text.disabled,
				},
			};
		},
	},
};