const path = require('path');
const rootPath = path.normalize(__dirname + '/../../');

module.exports = {
	development: {
		rootPath: rootPath,
		db: 'mongodb://localhost:27017/emojoy',
		port: process.env.PORT || 3000
	}
};