const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const autoprefixer = require('autoprefixer');
var CopyWebpackPlugin = require('copy-webpack-plugin');

const ip = process.env.IP || '0.0.0.0'
const port = process.env.PORT || 3000
const DEBUG = process.env.NODE_ENV !== 'production'

const config = {
  devtool: DEBUG ? 'eval' : false,
  entry: [
    path.join(__dirname, 'src')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'app.[hash].js',
    publicPath: '/'
  },
  resolve: {
    modulesDirectories: ['src', 'node_modules']
  },
  postcss (webpackInstance) {
    return [
      /*require('postcss-import')({
        addDependencyTo: webpackInstance,
        root: path.join(__dirname, './../'),
        path: [
          path.join(__dirname, './app'),
          path.join(__dirname, './../components')
        ]
      }),*/
      require('postcss-mixins')(),
      require('postcss-each')(),
      require('postcss-cssnext')({
      }),
      require('postcss-reporter')({ clearMessages: true })
    ];
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': `'${process.env.NODE_ENV}'`
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.join(__dirname, '/public/index.html')
    }),
    new ExtractTextPlugin("app.css"),
    new CopyWebpackPlugin([
        {
          context:  path.join(__dirname, '/public/'),
          from: 'api/albums.json',
          to: 'api/albums.json',
        },
        {
          context: path.join(__dirname, '/public/'),
          from: 'api/albums/',
          to: 'api/albums/',
        }
    ])
  ],
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.png$/, loader: 'url?prefix=images/&limit=8000&mimetype=image/png' },
      { test: /\.jpg$/, loader: 'url?prefix=images/&limit=8000&mimetype=image/jpeg' },
      { test: /\.woff$/, loader: 'url?prefix=fonts/&limit=8000&mimetype=application/font-woff' },
      { test: /\.ttf$/, loader: 'file?prefix=fonts/' },
      { test: /\.eot$/, loader: 'file?prefix=fonts/' },
      { test: /\.json$/, loader: 'json' },
      {
        include: path.join(__dirname, '/node_modules/react-toolbox/'),
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss')
      },
      {
        exclude: path.join(__dirname, '/node_modules/react-toolbox/'),
        test: /(\.css)$/,
        loader: ExtractTextPlugin.extract('style','css')
      },
      {
        test: /(\.scss)$/,
        loader: ExtractTextPlugin.extract('style','css!sass')
      }
    ]
  }
}

if (DEBUG) {
  config.entry.unshift(
    `webpack-dev-server/client?http://${ip}:${port}/`,
    'webpack/hot/only-dev-server',
    'react-hot-loader/patch'
  )

  config.plugins = config.plugins.concat([
    new webpack.HotModuleReplacementPlugin()
  ])
} else {
  config.plugins = config.plugins.concat([
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({ compress: { warnings: false } })
  ])
}

module.exports = config
