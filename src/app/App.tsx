import '@/shared/styles/_globals.scss'
import { RouterProvider } from 'react-router';
import { appRouter, AuthProvider } from './providers';

export const App = () => {
	return ((
		<AuthProvider>
			<RouterProvider router={appRouter} />
		</AuthProvider>
	))
}
