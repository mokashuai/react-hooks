import webpack from 'webpack'
import config from '../webpack.base.babel.js'
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'
import path from 'path'
import CopyWebpackPlugin from 'copy-webpack-plugin'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
import CleanWebpackPlugin from 'clean-webpack-plugin'
const { plugins, ...others } = config
export default {
	...others,
	mode: 'production',
	entry: [path.resolve(__dirname, '..', 'src/main.js')],
	output: {
		path: path.resolve(__dirname, '..', 'package', 'prod'),
		filename: "bundle/bundle.[hash:8].js?",
		publicPath: '/',
		chunkFilename:'chunk/[name].[chunkhash:8].chunk.js'
	},
	plugins: [
		...plugins,
		new CleanWebpackPlugin(['prod'], {
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
			to: path.resolve(__dirname, '..', 'package', 'prod', 'bundle')
		}]),
		new UglifyJSPlugin({
			uglifyOptions: {
				comments: false,
				compress: {
					warnings: false,
					drop_debugger: true,
					drop_console: true
				},
				warnings: false
			}
		}),
		new BundleAnalyzerPlugin(),
	]
}