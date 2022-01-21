## SECTION 1: NODE TUTORIAL

### 01. Using the CLI
- File: 01-cli.js
- We can use the integrated VSCode terminal to execute our node files
- Create an 01-cli.js file in this 01-node-tutorial directory
- In the terminal, cd into 01-node-tutorial folder. Then run: `node 01-cli.js`
- We should be able to see messages printed out in the terminal

### 02. Globals - no window!
- File: 02-globals.js. Run: `node 02-globals.js`
- In vanilla JS, we have access to the Window object from the browser and this gives us built-in methods to use. In Node.js, there's no Window object. There is, however, global variables that we have access to 
- Here are some examples of global variables:
  - __dirname - path to current directory
  - __filename - file name
  - require - function to use modules (CommonJS)
  - module - info about current module (file)
  - process - info about env where the problem is being executed

  