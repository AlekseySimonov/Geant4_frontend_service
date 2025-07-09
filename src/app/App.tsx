import { RouterProvider } from 'react-router';
import { appRouter } from './providers';
import { CssBaseline, CssVarsProvider, InitColorSchemeScript } from '@mui/material';
import { appTheme } from '@/shared/styles/themes';
import { HelmetProvider } from 'react-helmet-async';

export const App = () => {

	return ((
		<>
			<HelmetProvider>
				<InitColorSchemeScript attribute="class" />
				<CssVarsProvider defaultMode="light" theme={appTheme} forceThemeRerender>
					<CssBaseline />
					<RouterProvider router={appRouter} />
				</CssVarsProvider>
			</HelmetProvider>
		</>
	))
}
