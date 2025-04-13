import { RouterProvider } from 'react-router';
import { appRouter } from './providers';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme } from '@/shared/styles/themes';

export const App = () => {
	return ((
			<ThemeProvider theme={lightTheme}>
				<CssBaseline />
				<RouterProvider router={appRouter} />
			</ThemeProvider>
	))
}
