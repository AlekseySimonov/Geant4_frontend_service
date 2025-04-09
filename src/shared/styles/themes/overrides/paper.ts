import { Components, Theme } from '@mui/material';

export const paperOverride: Components['MuiPaper'] = {
	styleOverrides: {
		root: (props) => {
			const { theme } = props as { theme: Theme };

			return {
				boxShadow: `0px 10px 30px ${theme.palette.primary.main}33`,
			}
		}
	},
}