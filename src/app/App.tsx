import '@/shared/styles/_globals.scss'
import { RouterProvider } from 'react-router';
import { appRouter } from './providers';

export const App = () => {
	return ( (<RouterProvider router={appRouter}/>))
}
