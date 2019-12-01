/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const packagejson = require('./package.json')
const defaultSettings = require('./cfg/defaults');

const rules = [
	{
    test: /\.css$/,
    loader: 'style-loader!css-loader'
  },
  {
    test: /\.s[ac]ss$/i,
    use: [
      'style-loader',
      'css-loader',
      {
        loader: 'sass-loader',
        options: {
          sassOptions: {
            indentWidth: 4,
            includePaths: [
              path.resolve(__dirname, './node_modules/compass-mixins/lib'),
              path.resolve(__dirname, './node_modules/bootstrap-sass/assets/stylesheets'),
              path.resolve(__dirname, './node_modules')
            ]
          }
        }
      }
    ]
  },
  {
    test: /\.less/,
    loader: 'style-loader!css-loader!less-loader'
  },
  {
    test: /\.styl/,
    loader: 'style-loader!css-loader!stylus-loader'
  },
  {
    test: /\.(png|jpg|gif|svg|woff|woff2|ttf|eot)$/,
    loader: 'url-loader'
  },
  {
    test: /\.(mp4|ogg)$/,
    loader: 'file-loader'
  },
  {
    test: /\.(js|jsx)$/,
    loader: 'babel-loader',
    include: [].concat(
      [ path.join(__dirname, './src') ],
      [ path.join(__dirname, './node_modules/glslCanvas') ]
    )
  }
]


const plugins = [
	new webpack.DefinePlugin({
		'process.env': {
      CLIENT_ENV: JSON.stringify('development'),
			API_HOST: JSON.stringify(process.env.API_HOST || 'http://0.0.0.0:8888'),
			VERSION: JSON.stringify(packagejson.version)
		}
	}),
	new webpack.ProvidePlugin({
		fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
	}),
	new webpack.HotModuleReplacementPlugin()
	// new HtmlWebpackPlugin({
	// 	template: path.resolve(__dirname, './src/index.html'),
	// 	inject: 'body',
	// 	hash: true,
	// 	filename: 'index.html'
	// })
]

const webpackConf = {
  entry: {
    app: ['./src/index'],
    hub: ['./src/hub']
    // If we decide to make a separate mini-app for login functionality only (for third party apps)
    // login: ['./src/login', 'webpack-dev-server/client?http://localhost:8000', 'webpack/hot/only-dev-server']
  },

	output: {
		path: path.resolve(__dirname, './dist'),
		publicPath: '/',
		filename: 'bundle.js'
	},

	devtool: 'inline-source-map',

	devServer: {
    publicPath: '/',
		contentBase: path.resolve(__dirname, './dist'),
		disableHostCheck: true,
		historyApiFallback: true,
		hot: true,
		inline: true,
		watchContentBase: true,
    progress: true,
    port: 8080,
		host: '0.0.0.0'
	},

	// resolve: {
	// 	extensions: ['.js', '.jsx'],
	// 	modules: [
	// 		path.resolve(__dirname, './src'),
	// 		'node_modules'
	// 	]
  // },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      actions: `${defaultSettings.srcPath}/actions/`,
      components: `${defaultSettings.srcPath}/components/`,
      sources: `${defaultSettings.srcPath}/sources/`,
      stores: `${defaultSettings.srcPath}/stores/`,
      styles: `${defaultSettings.srcPath}/styles/`,
      config: `${defaultSettings.srcPath}/config/dev`
    }
  },

	module: {
		rules
	},

	plugins
}

module.exports = webpackConf
