/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

const createJsConfigurator = () => {
	const javascript = ({ include, exclude, options } = {}) => ({
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

	const lint = ({ include, exclude, options } = {}) => ({
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
	});

	Object.defineProperty(javascript, 'lint', { value: lint });

	return javascript;
}

module.exports = createJsConfigurator();
