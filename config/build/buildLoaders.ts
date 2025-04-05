import {ModuleOptions} from "webpack";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";

export function buildLoaders(options: BuildOptions): ModuleOptions['rules'] {
    const isDev = options.mode === 'development';

	const assetLoader ={
		test: /\.(png|jpe?g|gif|svg)$/i,
		use: [
			{
				loader: 'file-loader',
				options: {
					name: '[path][name].[hash].[ext]',
				},
			},
		],
	}

    const cssLoaderWithModules = {
        loader: "css-loader",
        options: {
            modules: {
				localIdentName: isDev ? "[local]__[hash:base64:5]" : '[hash:base64:8]',
				exportLocalsConvention: "asIs",
				namedExport: false,
            },
        },
	}
	
	const cssLoader = {  
        test: /\.css$/i,  
        use: [  
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,  
            cssLoaderWithModules, 
        ],  
    };

    const scssLoader = {
        test: /\.s[ac]ss$/i,
        use: [
            isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            cssLoaderWithModules,
            "sass-loader",
        ],
    }

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
	}


    return [
        assetLoader,
		scssLoader,
		cssLoader,
        tsLoader,
    ]
}
