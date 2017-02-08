// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

module.exports = ({include, exclude, options}) => ({
	module: {
		rules: [{
			test: /\.js(x?)$/,
			loader: 'babel-loader',
			include,
			exclude,
			options,
		}]
	}
});

exports.lint = ({include, exclude, options}) => ({
	module: {
		rules: [{
			test: /\.js(x?)$/,
			loader: 'eslint-loader',
			enforce: 'pre',
			include,
			exclude,
			options,
		}]
	}
})
