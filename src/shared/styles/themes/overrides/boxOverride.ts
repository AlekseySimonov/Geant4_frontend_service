import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';

export const OutlinedBox = styled(Box)(({ theme }) => ({
	position: 'relative',
	fontSize: '1rem',
	borderRadius: theme.shape.borderRadius,
	border: `1px solid ${theme.palette.primary.main}`,
	padding: '24px 20px 16px',
	color: theme.palette.primary.main,
	'&:hover': {
		borderColor: theme.palette.primary.dark,
	},
	'&.MuiBox-root': {
		margin: 0,
	},
	'&.Mui-error': {
		borderColor: theme.palette.error.main,
	},
	'&.Mui-focused': {
		borderColor: theme.palette.primary.main,
		borderWidth: '2px',
	},
	'& .MuiInputLabel-root': {
		position: 'absolute',
		top: -2,
		left: 6,
		backgroundColor: 'white',
		padding: '0 4px',
		fontSize: 12,
	},
}));