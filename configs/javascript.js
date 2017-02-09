// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const createJsConfigurator = () => {
	const javascript = ({include, exclude, options} = {}) => ({
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

	const lint = ({include, exclude, options} = {}) => ({
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

	Object.defineProperty(javascript, 'lint', {value: lint});

	return javascript;
}

module.exports = createJsConfigurator();
