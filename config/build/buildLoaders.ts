import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { ModuleOptions } from "webpack";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

    const assetLoader = {
        test: /\.(png|jpe?g|gif|svg)$/i,
        use: [
            {
                loader: 'file-loader',
                options: {
                    name: '[path][name].[hash].[ext]',
                },
            },
        ],
    };

    const cssLoaderModules = {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: isDev ? "[local]__[hash:base64:5]" : '[hash:base64:8]',
                exportLocalsConvention: "asIs",
                namedExport: false,
            },
        },
    };

    const cssLoaderNoModules = {
        loader: "css-loader",
        options: {
            modules: false,
        },
    };

    const cssModuleLoader = {
        test: /\.module\.css$/i,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, cssLoaderModules],
    };

    const cssGlobalLoader = {
        test: /\.css$/i,
        exclude: /\.module\.css$/i,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, cssLoaderNoModules],
    };

    const scssModuleLoader = {
        test: /\.module\.s[ac]ss$/i,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, cssLoaderModules, "sass-loader"],
    };

    const scssGlobalLoader = {
        test: /\.s[ac]ss$/i,
        exclude: /\.module\.s[ac]ss$/i,
        use: [isDev ? "style-loader" : MiniCssExtractPlugin.loader, cssLoaderNoModules, "sass-loader"],
    };

    const tsLoader = {
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
    };

    return [
        assetLoader,
        cssModuleLoader,
        cssGlobalLoader,
        scssModuleLoader,
        scssGlobalLoader,
        tsLoader,
    ];
}

