import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import webpack, { Configuration } from "webpack";
import { BuildOptions } from "./types/types";
import path from "path";
import dotenv from 'dotenv';

export function buildPlugins({mode,paths}: BuildOptions): Configuration['plugins'] {

	const isDev = mode === 'development';
	const isProd = mode === 'production';

	const env = dotenv.config().parsed || {};

	const envKeys = Object.keys(env).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(env[next]);
		return prev;
	}, {} as Record<string, string>);

	const plugins: Configuration['plugins'] = [
		new HtmlWebpackPlugin({
			template: paths.html,
			favicon: path.resolve(paths.public, 'favicon.png')
		}),
		new webpack.DefinePlugin(envKeys),
	]

	if (isDev) {
		plugins.push(
			new webpack.ProgressPlugin(),
			new ForkTsCheckerWebpackPlugin()
		)
	}

	if (isProd) {
		plugins.push(
			new MiniCssExtractPlugin({
			filename: "css/[name].[contenthash:8].css",
			chunkFilename: "css/[name].[contenthash:8].css",
		}))
	}

	return plugins
}