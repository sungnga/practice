#!/usr/bin/env node

//telling the computer to use node to execute the file as suppose to executing this file directly
//change file permission with chmod +x index.js
//run npm init -y to generate the package.js file
//run sudo npm link to link the nls command

//standard library modules
const fs = require('fs'); //when working with local file system
const util = require('util');
const chalk = require('chalk'); //to give a style to filenames
const path = require('path');

// Method #2: using the promisify() function
// const lstat = util.promisify(fs.lstat);

// Method #3: make use of a submodule to get access to a promise-based version of a given function directly. This is not always available. So either use Method #1 or #2
const { lstat } = fs.promises;

//argv at index 2 is when a user types in additional argument
const targetDir = process.argv[2] || process.cwd();

fs.readdir(targetDir, async (err, filenames) => {
  //EITHER
  //err === an error object, which means something went wrong
  //OR
  //err === null, which means everything is OK
  if (err) {
    //error handling code here
    console.log(err);
  }

  const statPromises = filenames.map(filename => {
    return lstat(path.join(targetDir, filename));
  });

  const allStats = await Promise.all(statPromises);

  for (let stats of allStats) {
    const index = allStats.indexOf(stats);

    //check to see if the item is a file. If not a file, apply a style to it
    if (stats.isFile()) {
      console.log(filenames[index]);
    } else {
      console.log(chalk.blueBright(filenames[index]));
    }
  }
});

// Method #1: wrap the callback function in a promise manually
// const lstat = filename => {
//   return new Promise((resolve, reject) => {
//     fs.lstat(filename, (err, stats) => {
//       if (err) {
//         reject(err);
//       }

//       resolve(stats);
//     });
//   });
// };