/**
 * Copyright (c) 2017 Panjie Setiawan Wicaksono <panjie@panjiesw.com>
 *
 * This software is released under the MIT License.
 * https://panjiesw.mit-license.org
 */

const path = require('path');

exports.resolve = (root, paths = []) => {
	if (Array.isArray(root)) {
		paths = root;
		root = process.cwd();
	}
	return path.resolve(root, ...paths);
}
