const path = require('path');

// returns a back-slash
console.log(path.sep); // /(slash)

// get the normalized path
const filePath = path.join('/content', 'subfolder', 'test.txt');
console.log(filePath); // /content/subfolder/test.txt

// returns base filename
const base = path.basename(filePath);
console.log(base); // test.txt

// returns an absolute path
const absolute = path.resolve(__dirname, 'content', 'subfolder', 'test.txt');
console.log(absolute); // /Users/nga/Desktop/practice/nodejs-2/01-node-tutorial/content/subfolder/test.txt
