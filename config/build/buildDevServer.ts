import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";
import path from 'path';

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		hot: true,
		port: options.port ?? 5800,
		open: true,
		historyApiFallback: true,
		server: 'spdy',
		// server: {
		// 	type: 'https',
		// 	options: {
		// 		ca: path.resolve(__dirname, '../../nginx/ssl/myCA.crt'),
		// 		key: path.resolve(__dirname, '../../nginx/ssl/server.key'),
		// 		cert: path.resolve(__dirname, '../../nginx/ssl/server.crt'),
		// 	},
		// }
	}
}
