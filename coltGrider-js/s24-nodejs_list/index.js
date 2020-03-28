#!/usr/bin/env node

//telling the computer to use node to execute the file as suppose to executing this file directly
//change file permission with chmod +x index.js
//run npm init -y to generate the package.js file
//run sudo npm link to link the nls command

const fs = require('fs');

fs.readdir(process.cwd(), (err, filenames) => {
  //EITHER
  //err === an error object, which means something went wrong
  //OR
  //err === null, which means everything is OK
  if (null) {
    //error handling code here
    console.log(err);
  }

  console.log(filenames);
});