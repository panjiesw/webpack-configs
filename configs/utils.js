// Copyright (c) 2017 Panjie Setiawan Wicaksono
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

const path = require('path');

exports.resolve = (root, paths = []) => {
	if (Array.isArray(root)) {
		paths = root;
		root = process.cwd();
	}
	return path.resolve(root, ...paths);
}
