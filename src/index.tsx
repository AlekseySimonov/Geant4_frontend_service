import { createRoot } from 'react-dom/client'
import {App} from './app/App'
import { BrowserRouter } from 'react-router'

const root = document.getElementById('root')

if (!root) {
	throw new Error('root not found')
}

const container = createRoot(root)

container.render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
)