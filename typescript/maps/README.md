### Installing parcel-bundler parcelV2
- Install: `npm install -D parcel@next`
- Tool to help us run Typescript in the browser

### Setup Parcel
- At the root of project directory, create an index.htm file
  ```js
  <!DOCTYPE html>
  <html lang="en">
    <head> </head>
    <body>
      <script src="./src/index.ts"></script>
    </body>
  </html>
  ```
- The src/index.ts file is the entry point to our application
- In the terminal, run: `npx parcel serve index.html`
- Or setup an npm script:
  ```js
  "scripts": {
    "start": "parcel serve index.html",
    "build": "parcel build index.html",
    "test": "echo \"Error: no test specified\" && exit 1"
  }
  ```
- Then run: `npm start`
