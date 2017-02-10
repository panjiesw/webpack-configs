// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const test = require('tape');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./common');
const configs = require('..');

test('devServer', (t) => {
	process.env.HOST = 'localhost';
	process.env.PORT = '9090';
	const config = merge(common(), configs.devServer());
	const errors = webpack.validate(config);
	t.equal(errors.length, 0, 'must pass validation');
	t.true(config.devServer != null, 'must be defined');
	t.isEquivalent(config.devServer, {
		host: 'localhost',
		port: '9090',
		historyApiFallback: true,
		stats: 'errors-only',
		publicPath: '/',
		contentBase: `${process.cwd()}/public`,
		hotOnly: true,
		hot: false,
	}, 'must define default config');
	t.true(config.plugins[0] instanceof webpack.HotModuleReplacementPlugin,
		'must include HotModuleReplacementPlugin');

	t.end();
});

test('javascript', (t) => {
	const config = merge(common(), configs.javascript());
	const errors = webpack.validate(config);
	t.equal(errors.length, 0, 'must pass validation');
	t.fail('TODO javascript:returned config check');

	t.end();
});

test('javascript:lint', (t) => {
	const config = merge(common(), configs.javascript.lint());
	const errors = webpack.validate(config);
	t.equal(errors.length, 0, 'must pass validation');
	t.fail('TODO javascript:lint:returned config check');

	t.end();
});

test('style', (t) => {
	const style = configs.style({ test: /\.css$/ });
	let config = merge(common(), style);
	let errors = webpack.validate(config);
	t.equal(errors.length, 0, 'style: must pass validation');
	t.fail('TODO style:returned config check');

	config = merge(common(), style.use(configs.style.css()))
	errors = webpack.validate(config);
	t.equal(errors.length, 0, 'css: must pass validation');
	t.fail('TODO style:css:returned config check');

	config = merge(common(), style.use(configs.style.less()))
	errors = webpack.validate(config);
	t.equal(errors.length, 0, 'less: must pass validation');
	t.fail('TODO style:less:returned config check');

	config = merge(common(), style.use(configs.style.sass()))
	errors = webpack.validate(config);
	t.equal(errors.length, 0, 'sass: must pass validation');
	t.fail('TODO style:sass:returned config check');

	config = merge(common(), style.use(configs.style.post()))
	errors = webpack.validate(config);
	t.equal(errors.length, 0, 'post: must pass validation');
	t.fail('TODO style:post:returned config check');

	config = merge(common(), style
		.use(configs.style.css())
		.use(configs.style.post()));
	errors = webpack.validate(config);
	t.equal(errors.length, 0, 'chain: must pass validation');
	t.fail('TODO style:chain:returned config check');

	t.end();
});

test('typescript', (t) => {
	const config = merge(common(), configs.typescript())
	const errors = webpack.validate(config);
	t.equal(errors.length, 0, 'must pass validation');
	t.fail('TODO typescript:returned config check');

	t.end();
});
