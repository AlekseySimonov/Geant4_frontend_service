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
				'&:-webkit-autofill': {
					WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
					WebkitTextFillColor: 'inherit !important',
					transition: 'background-color 5000s ease-in-out 0s',
					caretColor: 'inherit',
				},
				'&:-webkit-autofill:hover, &:-webkit-autofill:focus': {
					WebkitBoxShadow: `0 0 0 1000px transparent inset !important`,
					WebkitTextFillColor: 'inherit !important',
					caretColor: 'inherit',
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