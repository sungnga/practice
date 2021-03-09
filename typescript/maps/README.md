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


### STEPS TO BUILDING THIS MINI APP

#### 1. Generating random User data with faker library
- faker allows us to randomly generate a bunch of different types of information that we need for our project
- Manually install @types/faker module, a type definition file
- Using faker type definition file in User.ts file
- Export the User.ts class and import it in index.ts file
  - NOTE: When working with typescript files, try to name export the file instead of using default export

#### 2. Defining a Company class with faker library
- Import the Company.ts class in index.ts file