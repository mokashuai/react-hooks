import webpack from 'webpack';
import path from 'path';
const ROOT = path.resolve(__dirname, 'src');

import HtmlWebpackPlugin from 'html-webpack-plugin';
const alias = [
	'pages', 'components', 'actions', 'utils',
].reduce((prev, cur) => ({...prev, [cur]: path.resolve(ROOT, cur)}), {});

export default {
	entry: ['babel-polyfill', './src/main.js'],
	resolve: {
		alias: {
			...alias,
		},
		extensions: ['.js', '.jsx', '.json']
	},
	output: {
		path: path.resolve(__dirname, 'dist'),//打包后的文件存放的地方
		filename: "bundle.js?",//打包后输出文件的文件名
		publicPath: '/',
		chunkFilename: '[name].[chunkhash:5].chunk.js',
	},
	module: {
		rules: [{
			test: /\.jsx?$/,
			exclude: /node_modules/,
			include: ROOT,
			use: [{
				loader: 'babel-loader'
			}]
		}, {
			test: /\.css$/,
			use: ['style-loader', 'css-loader']
		}]
	},
	plugins: [
		new HtmlWebpackPlugin({
//			favicon:'./src/images/logo_CofC.png',
			filename: 'index.html',
			template:'./src/index.html',
			inject: true,
			hash: false,
			minify: {
				removeComments: true,
				collapseWhitespace: true,
				removeAttributeQuotes: true,
			}
		})
	]
}
