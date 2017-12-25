const path = require('path');
const root = __dirname
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')

module.exports = {
	entry: [
		'react-hot-loader/patch',
		'webpack/hot/only-dev-server',
		'webpack-dev-server/client',
		path.resolve(root, 'src/index.js'),
	],
	output: {
		path: path.resolve(root, 'build'),
		filename: 'bundle.js',
		publicPath: '/',
	},
	module: {
		rules: [
			{
				test:/\.js|jsx$/,
				exclude:/node_modules/,
				use:'babel-loader'
			},
			{ 
				test: /\.css$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'style-loader',
					},
					{
						loader: 'css-loader',
						options: {
								importLoaders: 1,
						}
					},
					{
						loader: 'postcss-loader'
					}
				]
			},
			{
				test: /\.(png|jpg|gif)$/,
				loader: 'url-loader',
				options: {
					limit: 2000,
					mimetype: 'image/svg+xml',
					name: 'images/[name].[ext]'
				}
			}
		]
	},
	resolve: {
		extensions: ['.js', '.json'] 
	},
	plugins: [
    new HtmlWebpackPlugin({
      title: 'React Game',
      template: path.resolve(root, 'template.html')
		}),
		new webpack.HotModuleReplacementPlugin(), // hot replacement
    new webpack.NamedModulesPlugin() // print module when doing hot replacement
  ],
	devtool: 'inline-sourcemap',
	devServer: {
		port: '3000',
		hot: true,
		publicPath: '/',
		contentBase: path.resolve(root, 'build'),
		historyApiFallback: true
	}
}