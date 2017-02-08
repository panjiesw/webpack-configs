// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

class StyleConfigurator {
	constructor({include, exclude, test}) {
		this.module = {
			rules: [
				{
					test,
					include,
					exclude,
					use: ['style-loader']
				}
			]
		}
		this.plugins = [];
	}

	withCss(options) {
		const [styleLoader, whatLoader, ...rest] = this.module.rules[0].use;
		let use;
		if (whatLoader) {
			if (whatLoader.loader === 'css-loader') {
				return this;
			} else {
				use = [styleLoader, {
					loader: 'css-loader',
					options
				}, whatLoader, ...rest];
			}
		} else {
			use = [styleLoader, {
				loader: 'css-loader',
				options
			}, ...rest];
		}
		this.module.rules[0].use = use;
		return this;
	}

	withSass(options) {
		const exists = this.module.rules[0].use.find(rule => typeof rule !== 'string' && rule.loader === 'sass-loader');
		if (!exists) {
			const css = this.module.rules[0].use.find((rule, i) => typeof rule !== 'string' && rule.loader === 'css-loader' && i === 1);
			if (!css) {
				throw new Error('Invalid style configuration for `sass`: no `css` config is defined');
			}
			const [styleLoader, cssLoader, ...]
		}
		return this;
	}
}

const style = () => {
	console.log(new StyleConfigurator({ include: 'anu' }).withCss());
}

style();
