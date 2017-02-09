// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const merge = require('webpack-merge');

const style = ({test, include, exclude}) => {
	const config = {
		module: {
			rules: [{
				test, include, exclude, use: ['style-loader']
			}]
		},
		plugins: []
	};

	config.use = use.bind(null, { include, exclude, test }, config);
	config.extract = extract.bind(null, { include, exclude, test }, config);
	return config;
}

const use = (rule, config, loader, options) => {
	const _config = merge.smart(config, {
		module: {
			rules: [{
				test: rule.test,
				include: rule.include,
				exclude: rule.exclude,
				use: [{ loader, options }]
			}]
		}
	});
	return _config;
}

const extract = (rule, config, options = {}) => {
	let ExtractTextPlugin;
	try {
		ExtractTextPlugin = require('extract-text-webpack-plugin');
	} catch (error) {
		throw new Error(`Can't find "extract-text-webpack-plugin"`);
	}
	const [fallback, ...others] = config.module.rules[0].use;
	const _config = merge.smart(config, {
		module: {
			rules: [{
				test: rule.test,
				include: rule.include,
				exclude: rule.exclude,
				loader: ExtractTextPlugin.extract({
					fallback,
					use: others
				})
			}]
		},
		plugins: [
			new ExtractTextPlugin(options)
		]
	});
	return _config;
}

const css = (options) => [{loader: 'css-loader', options}];
const less = (options) => [{loader: 'less-loader', options}];
const sass = (options) => [{loader: 'sass-loader', options}];
const post = (options) => [{loader: 'postcss-loader', options}];

module.exports = style;
exports.css = css;
exports.less = less;
exports.sass = sass;
exports.post = post;
