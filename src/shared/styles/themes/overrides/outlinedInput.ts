import { Components, Theme } from '@mui/material';

export const outlinedInputOverride: Components['MuiOutlinedInput'] = {
	styleOverrides: {
		root: (props) => {
			const { theme } = props as { theme: Theme };

			return {
				borderRadius: theme.shape.borderRadius,
				backgroundColor: theme.palette.secondary.main,
				"&.Mui-error .MuiOutlinedInput-notchedOutline": {
					borderColor: theme.palette.error.main,
				},
				"&:hover .MuiOutlinedInput-notchedOutline": {
					borderColor: theme.palette.primary.main,
				},
				"&.Mui-focused .MuiOutlinedInput-notchedOutline": {
					borderColor: theme.palette.primary.main,
					borderWidth: "2px",
				},
			};
		},
		input: (props) => {
			const { theme } = props as { theme: Theme };

			return {
				color: theme.palette.primary.main,
				padding: "16px 20px",
				"&::placeholder": {
					color: theme.palette.info.main,
					opacity: 1,
				},
				"&:-webkit-autofill": {
					boxShadow: `0 0 0 100px ${theme.palette.secondary.main} inset`,
					WebkitTextFillColor: theme.palette.primary.main,
				},
			};
		},
		notchedOutline: (props) => {
			const { theme } = props as { theme: Theme };

			return {
				borderColor: theme.palette.primary.main,
				borderWidth: "1px",
				borderRadius: theme.shape.borderRadius,
			};
		},
	},
};