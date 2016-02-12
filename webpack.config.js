var path = require("path");
var webpack = require("webpack");

module.exports = {
  cache: true,
  entry: './index.webpack.js',
  output: {
    path: path.join(__dirname, "dist"),
    publicPath: "dist/",
    filename: "psd-webpack.js"
  },
  node: {
    fs: "empty"
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" },
      { test: /\.json$/, loader: "json-loader" }
    ]
  }
};
