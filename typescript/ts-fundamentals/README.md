### Installing Typescript compiler:
- `sudo npm i -g typescript ts-node`
- We get a `tsc` CLI, a typescript compiler
- The command `tsc` compiles typescript code into plain Javascript
  - `tsc index.ts`
  - We get back a JS file: index.js
  - Run `node index.js` to execute the JS file
- The command `ts-node` combines the commands `tsc index.ts` and `node index.js` into one. It compiles the typescript code and automatically executes the resulting javascript code
  - `ts-node index.ts`

### VSCode setup:
- Install PATH
- Prettier by Esben Petersen
  - Go to Settings -> check Format on Save box
  - Check the Prettier: Single Quote box
  - Set Editor: Tab Size to 2