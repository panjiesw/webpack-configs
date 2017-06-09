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

	// See https://webpack.js.org/guides/webpack-and-typescript/#enabling-source-maps
	const sourcemap = () => ({
		module: {
			rules: [{
				test: /\.js(x?)$/,
				enforce: 'pre',
				use: 'source-map-loader'
			}]
		}
	});

	Object.defineProperty(javascript, 'lint', { value: lint });
	Object.defineProperty(javascript, 'sourcemap', { value: sourcemap });

	return javascript;
}

module.exports = createJsConfigurator();
