// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = ({include, exclude, options} = {}) => {
	const {CheckerPlugin, TsConfigPathsPlugin} = require('awesome-typescript-loader');

	return {
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
	}
};
