import { RouterProvider } from 'react-router';
import { appRouter } from './providers';
import { CssBaseline, CssVarsProvider, InitColorSchemeScript } from '@mui/material';
import { appTheme } from '@/shared/styles/themes';

export const App = () => {
	return ((
		<>
			<InitColorSchemeScript attribute="class" />
			<CssVarsProvider theme={appTheme}>
				<CssBaseline />
				<RouterProvider router={appRouter} />
			</CssVarsProvider>
		</>
	))
}
