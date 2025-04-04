import '@/shared/styles/_globals.scss'
import { RouterProvider } from 'react-router';
import { appRouter, AuthProvider } from './providers';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '@/shared/styles/themes';

export const App = () => {
	return ((
		<AuthProvider>
			<ThemeProvider theme={lightTheme}>
				<CssBaseline />
				<RouterProvider router={appRouter} />
			</ThemeProvider>
		</AuthProvider>
	))
}
