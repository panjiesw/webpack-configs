/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

const merge = require('webpack-merge');

const createStyleConfigurator = () => {
	const methods = (rule, config) => {
		Object.defineProperties(config, {
			use: {
				value: use.bind(null, rule, config),
			},
			extract: {
				value: extract.bind(null, rule, config),
			}
		})
	}

	const style = ({ test, include, exclude }) => {
		const config = {
			module: {
				rules: [{
					test, include, exclude, use: ['style-loader']
				}]
			},
			plugins: []
		};

		methods({ test, include, exclude }, config);
		return config;
	}

	const use = (rule, config, loader, options) => {
		let use = [{ loader, options }];
		if (typeof loader === 'object') {
			use = loader;
		}
		const _config = merge.smart(config, {
			module: {
				rules: [{
					test: rule.test,
					include: rule.include,
					exclude: rule.exclude,
					use
				}]
			}
		});

		methods(rule, _config);
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

	const css = (options) => [{ loader: 'css-loader', options }];
	const less = (options) => [{ loader: 'less-loader', options }];
	const sass = (options) => [{ loader: 'sass-loader', options }];
	const post = (options) => [{ loader: 'postcss-loader', options }];

	Object.defineProperties(style, {
		css: { value: css },
		less: { value: less },
		sass: { value: sass },
		post: { value: post },
	})

	return style;
}

module.exports = createStyleConfigurator();
