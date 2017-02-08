// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const atl = require('awesome-typescript-loader');

const CheckerPlugin = atl.CheckerPlugin;
const TsConfigPathsPlugin = atl.TsConfigPathsPlugin;

module.exports = ({include, exclude, options}) => ({
	module: {
		rules: [{
			test: /\.ts(x?)$/,
			loader: 'awesome-typescript-loader',
			include,
			exclude,
			options,
		}]
	},
	plugins: [
		new CheckerPlugin(),
		new TsConfigPathsPlugin()
	]
});
