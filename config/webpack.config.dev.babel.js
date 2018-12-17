import webpack from 'webpack'
import config from '../webpack.base.babel.js'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'
const { plugins, ...others } = config
import CleanWebpackPlugin from 'clean-webpack-plugin'
export default {
	...others,
	mode: 'development',
	entry: [path.resolve(__dirname, '..', 'src/main.js')],
	output: {
		path: path.resolve(__dirname, '..', 'package', 'dev'),
		filename: "bundle/bundle.[hash:8].js?",
		publicPath: '/',
		chunkFilename:'chunk/[name].[chunkhash:8].chunk.js'
	},
	plugins: [
		...plugins,
		new CleanWebpackPlugin(['dev'], {
			root: path.resolve(__dirname, '..', 'package'),
			verbose: true,
			dry: false
		}),
		new webpack.DllReferencePlugin({
			context: __dirname,
			manifest: require('../vendor-manifest.json')
		}),
		new CopyWebpackPlugin([{
			from: path.resolve(__dirname, '..', 'package', 'vendor.dll.js'),
			to: path.resolve(__dirname, '..', 'package', 'dev', 'bundle')
		}]),
		new BundleAnalyzerPlugin(),
	]
}