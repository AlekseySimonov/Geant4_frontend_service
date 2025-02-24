import '@/shared/styles/_globals.scss'
import { RouterProvider } from 'react-router';
import { appRouter } from './providers/router';

export const App = () => {
	console.log('Test log')
	return ( (<RouterProvider router={appRouter}/>))
}
