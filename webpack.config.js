var path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
	entry: "./app/src/server.ts",
	output: {
		filename: "app/dist/bundle.js"
	},
	module: {
		loaders: [
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
	resolve: {
		extensions: [".webpack.js", ".web.js", ".ts", ".js"]
	},
	target: "node",
	externals: [nodeExternals()]
}
