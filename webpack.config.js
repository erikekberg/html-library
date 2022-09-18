//Webpack requires this to work with directories
const path = require("path");

// This is main configuration object that tells Webpackw what to do.
module.exports = {
  devtool: "source-map",
  //path to entry paint
  entry: "./src/index.js",
  //path and filename of the final output
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
  },

  //default mode is production
  mode: "development",
};
