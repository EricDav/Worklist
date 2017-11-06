import path from 'path';
import webpack from 'webpack';

module.exports = {
  entry: './client/index.js',
  output: {
    path: path.join(__dirname, 'client/dist/'),
    publicPath: '/client/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './client/dist',
    hot: true
  },
  externals: {
    Materialize: 'Materialize'
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery'
    })
  ],
  module: {
    rules: [
      {
        test: /.jsx?$/,
        enforce: 'pre',
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        include: path.join(__dirname, '/client'),
        exclude: /node_modules/,
      },
      { test: /(\.s?css)$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'file-loader'

      },
      { test: /\.woff2(\?\S*)?$/,
        loader: 'url-loader?limit=100000'
      },
      { test: /\.woff(\?\S*)?$/,
        loader: 'url-loader?limit=100000'
      },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        loader: 'url-loader?limit=100000&mimetype=application/octet-stream'
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: ['file-loader?name=/assets/images/[name].[ext]', {
          loader: 'image-webpack-loader',
        }],
        exclude: /node_modules/,
        include: __dirname,
      },
      {
        test: /materialize-css\/bin\//,
        loader: 'imports-loader?jQuery=jquery,$=jquery,hammerjs'
      },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,

        loader: 'url-loader?limit=10000&mimetype=image/svg+xml'
      },
    ]
  },
  resolve: { extensions: ['.js', '.jsx', '.css'] },
  node: {
    dns: 'empty',
    net: 'empty',
    fs: 'empty'
  }
};
