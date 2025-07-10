import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from 'copy-webpack-plugin';
import webpack, { Configuration } from "webpack";
import { BuildOptions } from "./types/types";
import path from "path";
import dotenv from 'dotenv';

export function buildPlugins({ mode, paths }: BuildOptions): Configuration['plugins'] {

	const isDev = mode === 'development';
	const isProd = mode === 'production';

	const env = dotenv.config().parsed || {};

	const envKeys = Object.keys(env).reduce((prev, next) => {
		prev[`process.env.${next}`] = JSON.stringify(env[next]);
		return prev;
	}, {} as Record<string, string>);

	const plugins: Configuration['plugins'] = [
		new webpack.DefinePlugin(envKeys),
	];

	if (isProd) {
		plugins.push(
			new HtmlWebpackPlugin({
				template: paths.html,
				favicon: path.resolve(paths.public, 'favicon.png'),
				inject: true,
			}),
			new MiniCssExtractPlugin({
				filename: "css/[name].[contenthash:8].css",
				chunkFilename: "css/[name].[contenthash:8].css",
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve(paths.public, 'yandex_e5b3494182c44b3d.html'),
						to: path.resolve(paths.output, 'yandex_e5b3494182c44b3d.html'),
					},
				],
			}),
		);
	}

	if (isDev) {
		plugins.push(
			new HtmlWebpackPlugin({
				template: paths.html,
				favicon: path.resolve(paths.public, 'favicon.png'),
			}),
			new webpack.ProgressPlugin(),
			new ForkTsCheckerWebpackPlugin(),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve(paths.public, 'yandex_e5b3494182c44b3d.html'),
						to: path.resolve(paths.output, 'yandex_e5b3494182c44b3d.html'),
					},
				],
			}),
		);
	}

	return plugins
}