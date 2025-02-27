import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { BuildOptions } from "./types/types";

export function buildDevServer(options: BuildOptions): DevServerConfiguration {
	return {
		hot: true,
		port: options.port ?? 5800,
		open: true,
		historyApiFallback:true,
	}
}