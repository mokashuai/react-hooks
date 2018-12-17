import webpack from 'webpack'
import config from '../webpack.base.babel.js'
import path from 'path'

const {plugins, ...others} = config
export default {
	devtool: 'cheap-module-eval-source-map',
	...others,
	mode: 'development',
	output: {
		path: path.resolve(__dirname, '..', 'dist'),
		filename: "bundle/bundle.[hash:8].js?",
		publicPath: '/'
	},
	devServer: {
		disableHostCheck: true,
		historyApiFallback: true,
		hot: true,
		inline: true,
		stats: { colors: true },
		host: '0.0.0.0',
		port: 3000,
		proxy: {
			'/api': {
				target: 'http://apps.lianziapp.com:8800',
				secure: false,
				changeOrigin: true
			}
		}
	},
	plugins: [
		...plugins,
		new webpack.HotModuleReplacementPlugin(),
	]
}
