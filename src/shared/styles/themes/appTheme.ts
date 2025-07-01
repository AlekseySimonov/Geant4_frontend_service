import { extendTheme, Shadows } from '@mui/material/styles';
import commonSettings from './commonSettings';
import {
	backdropOverride,
	outlinedInputOverride,
	paperOverride,
	inputLabelOverride,
	iconButtonOverride,
	alertOverride,
	cssBaselineOverride,
	typographyOverride,
} from './overrides';

export const appTheme = extendTheme({
	cssVarPrefix: 'mui',
	colorSchemeSelector: 'class',
	colorSchemes: {
		light: {
			palette: {
				mode: 'light',
				primary: {
					main: '#1D2B64',
					light: '#7889C4',
				},
				secondary: {
					main: '#FCFDFF',
					light: 'rgba(29, 43, 100, 0.5)',
				},
				background: {
					default: '#F1F6FF',
					paper: '#FCFDFF',
				},
				info: {
					main: '#CCD6FF',
					light: '#CADDFF',
					dark: '#929EC7',
				},
				text: {
					primary: '#1D2B64',
					secondary: 'rgba(74,85,131, 0.8)',
				},
				error: {
					main: '#B5003F',
					light: '#E09B9C',
				},
				success: {
					main: '#4F834A',
					light: '#87AB89',
				},
				action: {
					disabled: '#DEE3ED',
				},
			},
		},
		dark: {
			palette: {
				mode: 'dark',
				primary: {
					main: '#EFF3FF',
					light: '#333F6C',
				},
				secondary: {
					main: '#010101',
					light: 'rgba(23, 35, 85, 0.7)',
				},
				background: {
					default: '#19203C',
					paper: '#0C1124',
				},
				info: {
					main: '#CCD6FF',
					light: '#61698A',
					dark: '#162045',
				},
				text: {
					primary: '#EFF3FF',
					secondary: 'rgba(23, 35, 85, 0.7)',
				},
				error: {
					main: '#B5003F',
					light: '#AF0F12',
				},
				success: {
					main: '#87AB89',
					light: '#3E6446',
				},
				action: {
					disabled: '#202845',
				},
			},
		},
	},
	...commonSettings,
	shadows: [
		'none',
		'4px 4px 16px rgba(29, 43, 100, 0.25)',
		'4px 4px 8px rgba(0, 0, 0, 0.25)',
		'4px -4px 16px rgba(77, 96, 173, 0.25)',
		'4px 4px 8px rgba(29, 43, 100, 0.5)',
		...Array(20).fill('0px 6px 20px rgba(0,0,0,0.1)'),
	] as Shadows,
	components: {
		...commonSettings.components,
		MuiTypography: typographyOverride,
		MuiBackdrop: backdropOverride,
		MuiPaper: paperOverride,
		MuiOutlinedInput: outlinedInputOverride,
		MuiInputLabel: inputLabelOverride,
		MuiIconButton: iconButtonOverride,
		MuiAlert: alertOverride,
		MuiCssBaseline: cssBaselineOverride,
	},
});
