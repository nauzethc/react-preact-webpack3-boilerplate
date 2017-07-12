const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const ENV = process.env.NODE_ENV || 'development'
const DEV = ENV === 'development'

module.exports = {

  // Dev
  watch: DEV,
  cache: true,
  devtool: DEV ? 'cheap-module-eval-source-map' : 'source-map',
  devServer: {
    contentBase: path.join(__dirname, 'src'),
    compress: true,
    hot: true,
    historyApiFallback: true,
  },

  // Input
  context: path.join(__dirname, 'src'),
  entry: './app.js',
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: ['node_modules'],
    alias: {
      'react': DEV ? 'react' : 'preact-compat',
      'react-dom': DEV ? 'react-dom' : 'preact-compat',
      'react-redux': DEV ? 'react-redux' : 'preact-redux',
      'components': path.join(__dirname, 'src/components'),
    },
  },

  // Transform
  module: {
    rules: [{
      test: /\.jsx?/,
      loader: 'babel-loader',
      options: {
        presets: ['env', 'react'],
        plugins: [
          'transform-class-properties',
          'transform-object-rest-spread'
        ],
      }
    }, {
      test: /\.css/,
      loaders: ['style-loader', 'css-loader']
    }]
  },

  // Plugins
  plugins: ([
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(ENV) }),
    new HtmlWebpackPlugin()
  ]).concat(DEV ? [
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    new webpack.optimize.UglifyJsPlugin({ output: { comments: false } })
  ]),

  // Output
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },

}