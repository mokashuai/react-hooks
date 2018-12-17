import path from 'path'
import webpack from'webpack'
import UglifyJSPlugin from 'uglifyjs-webpack-plugin'
export default {
	mode: 'production',
	entry: {
		vendor: [
			'axios',
			'react',
			'react-dom',
			'redux',
			'react-redux',
			'react-router',
			'react-router-dom',
			'redux-thunk',
			'babel-polyfill',
			'redux-promise-middleware'
		]
	},
	output: {
		path: path.resolve(__dirname, '..', 'package'),
		filename: '[name].dll.js',
		library: '[name]_library'
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 1,
					enforce: true
				}
			}
		}
	},
	plugins: [
		new webpack.DllPlugin({
			path: path.resolve(__dirname, '..', '[name]-manifest.json'),
			name: '[name]_library',
			context: __dirname
		}),
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
	]
}