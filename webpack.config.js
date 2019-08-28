var path = require('path');
var webpack = require("webpack");
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: "./app/src/server.ts",
	output: {
		filename: "bundle.js"
	},
	module: {
		rules: [
			// note that babel-loader is configured to run after ts-loader
			{
				test: /\.ts(x?)$/,
				loader: "babel-loader?presets[]=es2015!ts-loader"
			},
			{
				test: /\.js$/,
				loader: "babel-loader"
			}
		]
	},
	plugins: [],
	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".js"]
	},
	target: "node",
	mode: "production",
	externals: [nodeExternals()],
	optimization: {
		minimize: true
	}
}
