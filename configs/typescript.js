// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = ({include, exclude, options} = {}) => ({
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
		new require('awesome-typescript-loader').CheckerPlugin(),
		new require('awesome-typescript-loader').TsConfigPathsPlugin()
	]
});
