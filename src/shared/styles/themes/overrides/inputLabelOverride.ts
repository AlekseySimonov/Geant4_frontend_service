import { Components, Theme } from '@mui/material';

export const inputLabelOverride: Components['MuiInputLabel'] = {
	styleOverrides: {
		root: (props) => {
			const { theme } = props as { theme: Theme };

			return {
				fontSize: '1rem',
				color: theme.palette.primary.main,

				'&.MuiAutocomplete-inputFocused': {
					color: theme.palette.info.main,
				},
				'&.MuiInputLabel-shrink': {
					fontSize: '1rem',
					transform: 'translate(14px, -6px) scale(0.75)',
					color: theme.palette.info.main,
				},

				'&.Mui-error': {
					color: theme.palette.error.main,
				},

				'&.Mui-focused': {
					color: theme.palette.primary.main,
				},
			}
		},
	}
}