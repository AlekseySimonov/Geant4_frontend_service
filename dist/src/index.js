import { jsx as _jsx } from "react/jsx-runtime";
import { createRoot } from 'react-dom/client';
import { App } from './app/App';
import { BrowserRouter } from 'react-router';
import './index.css';
var root = document.getElementById('root');
if (!root) {
    throw new Error('root not found');
}
var container = createRoot(root);
container.render(_jsx(BrowserRouter, { children: _jsx(App, {}) }));
