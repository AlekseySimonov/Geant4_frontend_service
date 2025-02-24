import path from 'path';
import webpack from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
export default (function (env) {
    var _a, _b;
    var isDev = env.mode === 'development';
    var config = {
        mode: (_a = env.mode) !== null && _a !== void 0 ? _a : 'development',
        entry: path.resolve(__dirname, 'src', 'index.tsx'),
        output: {
            path: path.resolve(__dirname, 'build'),
            filename: '[name].[contenthash].js',
            clean: true,
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
            port: (_b = env.port) !== null && _b !== void 0 ? _b : 5800,
            open: true,
        } : undefined,
    };
    return config;
});
