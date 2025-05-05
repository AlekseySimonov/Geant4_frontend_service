import { Components, Theme } from '@mui/material';

export const alertOverride: Components['MuiAlert'] = {
	styleOverrides: {
		root: (props) => {
			const { theme } = props as { theme: Theme };

			return {
				borderRadius: 12,
				boxShadow: theme.shadows[3],
				fontSize: '0.95rem',
				alignItems: 'center',
				transition: 'all 0.3s ease',
				color: 'white',
				'&.MuiAlert-standardSuccess': {
					backgroundColor: theme.palette.success.light,
				},

				'&.MuiAlert-standardError': {
					backgroundColor: theme.palette.error.main,
				},

				'&.MuiAlert-standardInfo': {
					backgroundColor: theme.palette.info.light,
					color: theme.palette.primary.main,
				},

				'& .MuiAlert-icon': {
					color: 'inherit',
				},

				'& .MuiAlert-message': {
					fontWeight: 500,
				},
			};
		},
	},
};