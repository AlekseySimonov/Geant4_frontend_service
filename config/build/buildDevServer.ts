import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";
import path from "path";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		hot: true,
		port: options.port ?? 5800,
		open: true,
		historyApiFallback: {
			disableDotRule: true
		},
		server: 'spdy',
	}
}
