// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const utils = require('./utils');
const webpack = require('webpack');

module.exports = ({
	host = process.env.HOST,
	port = process.env.PORT,
	historyApiFallback = true,
	stats = 'errors-only',
	publicPath = '/',
	contentBase = utils.resolve('public'),
	hotOnly = true,
	hot = false
}) => ({
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
