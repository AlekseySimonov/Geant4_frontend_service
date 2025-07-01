import { Components, Theme } from '@mui/material';

export const outlinedInputOverride: Components['MuiOutlinedInput'] = {
	styleOverrides: {
		root: (props) => {
			const { theme } = props as { theme: Theme };

			return {
				fontSize: '1rem',
				borderRadius: theme.shape.borderRadius,
				color: 'inherit',

				'&:hover .MuiOutlinedInput-notchedOutline': {
					borderColor: 'inherit',
				},
				'&.Mui-focused .MuiOutlinedInput-notchedOutline': {
					borderColor: 'inherit',
					borderWidth: '2px',
				},
				'&.Mui-error .MuiOutlinedInput-notchedOutline': {
					borderColor: theme.palette.error.main,
				},
			};
		},
		input: (props) => {
			const { theme } = props as { theme: Theme };

			return {
				color: 'inherit',
				padding: "16px 20px",
				fontSize: '1rem',
				"&::placeholder": {
					color: theme.palette.info.main,
					opacity: 1,
					fontSize: '1rem',
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
				color: 'inherit',
				borderColor: 'inherit',
				borderWidth: "1px",
				fontSize: '1rem',
				borderRadius: theme.shape.borderRadius,
			};
		},
	},
};