const path = require('path');
const merge = require('webpack-merge');
const webpack = require('webpack');

const TARGET = process.env.npm_lifecycle_event;
const PATHS = {
  app: path.join(__dirname, 'src'),
  build: path.join(__dirname, 'build'),
};

process.env.BABEL_ENV = TARGET;

const common = {
  context: PATHS.app,
  entry: [
      './index.js',
      './index.html',
  ],
  output: {
    path: PATHS.build,
    filename: 'bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app,
      },
      {
        test: /\.html$/,
        loader: 'file?name=[name].[ext]',
        include: PATHS.app,
      },
      {
        test: /\.jsx?$/,
        loaders: ['babel?cacheDirectory'],
        include: PATHS.app,
      },
    ],
  },
};

if (TARGET === 'start') {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      contentBase: PATHS.build,

      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // display only errors to reduce the amount of output
      stats: 'errors-only',

      // parse host and port from env so this is easy
      // to customize
      host: process.env.HOST,
      port: process.env.PORT,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
    ],
  });
} else {
  module.exports = merge(common, {
    plugins: [
        new webpack.optimize.OccurenceOrderPlugin(true),

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        }),

        // Search for equal or similar files and deduplicate them in the output
        // https://webpack.github.io/docs/list-of-plugins.html#dedupeplugin
        new webpack.optimize.DedupePlugin(),

        // Minimize all JavaScript output of chunks
        // https://github.com/mishoo/UglifyJS2#compressor-options
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            screw_ie8: true, // jscs:ignore requireCamelCaseOrUpperCaseIdentifiers
            warnings: false,
          },
        }),

        // A plugin for a more aggressive chunk merging strategy
        // https://webpack.github.io/docs/list-of-plugins.html#aggressivemergingplugin
        new webpack.optimize.AggressiveMergingPlugin(),
    ],
  });
}
