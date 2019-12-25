/* eslint-disable import/no-extraneous-dependencies */
const path = require('path')
const webpack = require('webpack')
// const HtmlWebpackPlugin = require('html-webpack-plugin')
const packagejson = require('./package.json')
const defaultSettings = require('./cfg/defaults');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = (env, argv) => {

  const devMode = argv.mode === 'development'

  return {
    entry: {
      app: ['./src/index'],
      hub: ['./src/hub']
      // If we decide to make a separate mini-app for login functionality only (for third party apps)
      // login: ['./src/login', 'webpack-dev-server/client?http://localhost:8000', 'webpack/hot/only-dev-server']
    },

    output: {
      path: path.join(__dirname, './dist'),
      filename: devMode ? '[name].js' : '[name].[hash].js',
      publicPath: '/'
    },

    devtool: devMode ? 'eval' : 'source-map',
    // optimization: {
    //   // We no not want to minimize our code.
    //   minimize: true
    // },

    devServer: {
      // publicPath: path.resolve(__dirname, './dist/assets'),
      // publicPath: '/assets/',
      contentBase: path.resolve(__dirname, './dist'),
      disableHostCheck: true,
      historyApiFallback: true,
      hot: true,
      inline: true,
      // watchContentBase: true,
      progress: true,
      port: 8080,
      host: '0.0.0.0'
    },

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
      rules: [
        {
          test: /\.(sa|sc|c)ss$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader,
              options: {
                hmr: devMode,
              },
            },
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
          test: /\.(mp4|ogg|png|jpg|gif|woff|woff2|ttf|eot|ico)$/,
          loader: 'file-loader?name=[name].[ext]'
        },
        {
          test: /\.(svg)$/,
          loader: 'url-loader'
        },
        // {
        //   test: /\.(mp4|ogg)$/,
        //   loader: 'file-loader'
        // },
        {
          test: /\.(js|jsx)$/,
          loader: 'babel-loader',
          include: [].concat(
            [path.join(__dirname, './src')],
            [path.join(__dirname, './node_modules/glslCanvas')]
          )
        }
      ]
    },

    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          CLIENT_ENV: JSON.stringify('development'),
          // API_HOST: JSON.stringify(process.env.API_HOST || 'http://0.0.0.0:8888'),
          API_HOST: JSON.stringify(process.env.API_HOST || 'https://api.openframe.io/v0/'),
          VERSION: JSON.stringify(packagejson.version)
        }
      }),
      new webpack.ProvidePlugin({
        fetch: 'imports-loader?this=>global!exports-loader?global.fetch!whatwg-fetch'
      }),
      new MiniCssExtractPlugin({
        // Options similar to the same options in webpackOptions.output
        // both options are optional
        filename: devMode ? '[name].css' : '[name].[hash].css',
        chunkFilename: devMode ? '[id].css' : '[id].[hash].css',
      }),
      new webpack.HotModuleReplacementPlugin(),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/index.html'),
        favicon: 'src/images/favicon.ico',
        inject: 'body',
        hash: true,
        filename: 'index.html'
      }),
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, './src/hub.html'),
        inject: 'body',
        hash: true,
        filename: 'hub.html'
      })
    ]
  }
}
