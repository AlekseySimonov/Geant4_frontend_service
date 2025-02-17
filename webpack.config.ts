import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import type { Configuration as DevServerConfiguration } from "webpack-dev-server";

type Node = 'production' | 'development';

interface EnvVariables {
	node: Node;
	port: number;
}

export default (env: any) => {

	const isDev = env.mode === 'development';

	const config: webpack.Configuration = {
		mode: env.mode ?? 'development',
		entry: path.resolve(__dirname, 'src', 'index.tsx'),
		output: {
			path: path.resolve(__dirname, 'build'),
			filename: '[name].[contenthash].js',
			clean: true,
			publicPath: "/",
		},
		plugins: [
			new HtmlWebpackPlugin({ template: path.resolve(__dirname, 'public', 'index.html'), favicon: path.resolve(__dirname, 'public', 'favicon.svg') }),
			isDev && new webpack.ProgressPlugin(),
			!isDev && new MiniCssExtractPlugin({
				filename: "css/[name].[contenthash:8].css",
				chunkFilename: "css/[name].[contenthash:8].css",
			}),
			isDev && new ForkTsCheckerWebpackPlugin(),
		].filter(Boolean),
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						isDev ? "style-loader" : MiniCssExtractPlugin.loader,
						"css-loader",
					],
				},
				{
					test: /\.module\.scss$/i,
					use: [
						isDev ? "style-loader" : MiniCssExtractPlugin.loader,
						{
							loader: "css-loader",
							options: {
								modules: {
									localIdentName: "[local]__[hash:base64:5]",
									auto: true,
								},
								esModule: true,
							},
						},
						"sass-loader",
					],
				},
				{
					test: /\.s[ac]ss$/i,
					exclude: /\.module\.scss$/,
					use: [
						isDev ? "style-loader" : MiniCssExtractPlugin.loader,
						"css-loader",
						{
							loader: "sass-loader",
							options: { sourceMap: true },
						},
					],
				},
				{
					test: /\.tsx?$/,
					use: [
						{
							loader: 'ts-loader',
							options: {
								transpileOnly: true
							}
						}
					],
					exclude: /node_modules/,
				},
				{
					test: /\.(png|jpe?g|gif|svg)$/i,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[path][name].[hash].[ext]',
							},
						},
					],
				},
			],
		},
		resolve: {
			extensions: ['.tsx', '.ts', '.js'],
			alias: {
				'@': path.resolve(__dirname, 'src'),
			},
		},
		devtool: isDev && 'inline-source-map',
		devServer: isDev ? {
			hot: true,
			port: env.port ?? 5800,
			open: true,
			historyApiFallback:true,
		} : undefined,
	}
	return config
}