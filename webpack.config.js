var path = require("path"),
  webpack = require("webpack"),
  glob = require("glob"),
  BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
  cache: true,
  entry: "./src/app.js",
  output: {
    path: __dirname + "/dist/web-client",
    filename: "bundle.js"
  },
  node: {
    fs: "empty"
  },
  plugins: [
    new BrowserSyncPlugin({
      host: 'localhost',
      port: 3000,
      server: {
        baseDir: ['dist/web-client'],
        index: "default.html"
      }
    })
  ],
  module: {
    loaders: [{
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel?optional[]=runtime'
    }, {
      test: /\.(json|resjson)$/,
      loader: "json-loader"
    }, {
      test: /\.css$/,
      loader: "style-loader!css-loader"
    }, {
      test: /\.png$/,
      loader: "url-loader",
      query: {
        mimetype: "image/png"
      }
    }, {
      test: /\.woff?$/,
      loader: "url-loader?limit=10000&minetype=application/font-woff"
    }, {
      test: /\.(ttf|eot|svg|html|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      loader: "file-loader"
    }, {
      test: /\.less$/,
      loader: 'style!css!less'
    }, {
      test: /\.scss$/,
      loader: 'style!css!sass'
    }]
  }
};
