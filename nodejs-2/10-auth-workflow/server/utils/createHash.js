const crypto = require('crypto');

// this function accepts a token string as an argument
const hashString = (string) =>
	crypto.createHash('md5').update(string).digest('hex');

module.exports = hashString;
