import { Components, Theme } from '@mui/material';

export const alertOverride: Components['MuiAlert'] = {
	styleOverrides: {
		root: (props) => {
			const { theme } = props as { theme: Theme };

			return {
				borderRadius: 12,
				boxShadow: theme.shadows[1],
				fontSize: '0.95rem',
				alignItems: 'center',
				transition: 'all 0.3s ease',
				color: 'white',
				paddingInline: '40px',
				paddingBlock: '24px',

				'&.MuiAlert-standardError': {
					backgroundColor: theme.palette.error.light,
					color:  theme.palette.info.contrastText,
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