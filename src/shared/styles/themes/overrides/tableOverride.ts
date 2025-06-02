import { Components, Theme } from '@mui/material';

export const tableOverride: Components['MuiTableContainer'] = {
	styleOverrides: {
		root: (props) => {
			const { theme } = props as { theme: Theme };

			return {
				position: 'relative',
				fontSize: '1rem',
				maxHeight: 630,
				overflowY: 'auto',
				borderRadius: theme.shape.borderRadius,
				color: theme.palette.primary.main,
				backgroundColor: theme.palette.background.paper,
				transition: 'border-color 0.2s ease-in-out',

				'&.Mui-error': {
					borderColor: theme.palette.error.main,
				},

				'&.Mui-focused': {
					borderColor: theme.palette.primary.main,
					borderWidth: '2px',
				},

				'& .MuiTableRow-root': {
					'&hover': {
						backgroundColor: theme.palette.secondary.main,
					}
				},

				'& .MuiTableHead-root .MuiTableCell-root': {
					backgroundColor: theme.palette.secondary.main,
					fontWeight: 600,
					fontSize: '0.875rem',
					color: theme.palette.primary.main,
				},
			};
		},
	},
};
