/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

const createTsConfigurator = () => {
	const typescript = ({ include, exclude, options } = {}) => {
		const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');

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

	const hmr = ({ include, exclude, options, tsOptions } = {}) => {
		const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');

		return {
			module: {
				rules: [{
					include,
					exclude,
					options,
					test: /\.ts(x?)$/,
					use: [
						'react-hot-loader/webpack',
						{
							loader: 'awesome-typescript-loader',
							options: tsOptions,
						}
					],
				}]
			}
		};
	}

	// Enable sourcemap
	// See https://webpack.js.org/guides/webpack-and-typescript/#enabling-source-maps
	const sourcemap = () => ({
		module: {
			rules: [{
				test: /\.ts(x?)$/,
				enforce: 'pre',
				use: 'source-map-loader'
			}]
		}
	});

	Object.defineProperty(typescript, 'sourcemap', { value: sourcemap });
	Object.defineProperty(typescript, 'hmr', { value: hmr });

	return typescript;
}

module.exports = createTsConfigurator();
