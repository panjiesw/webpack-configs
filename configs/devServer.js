/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

const webpack = require('webpack');
const merge = require('webpack-merge');
const utils = require('./utils');

module.exports = (options = {}) => {
	const {
		host = process.env.HOST || 'localhost',
		port = process.env.PORT || 8080,
		historyApiFallback = true,
		stats = 'errors-only',
		publicPath = '/',
		contentBase = utils.resolve(['public']),
		hotOnly = false,
		hot = false
	} = options;
	return merge({ devServer: options }, {
		devServer: {
			host,
			port,
			historyApiFallback,
			stats,
			publicPath,
			contentBase,
			hotOnly,
			hot,
		},
		plugins: [
			new webpack.HotModuleReplacementPlugin(),
		],
	})
}
