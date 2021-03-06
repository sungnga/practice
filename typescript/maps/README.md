### Installing parcel-bundler parcelV2
- Install: `npm install -D parcel@next` parcelV2 is in beta
- Or install: `npm i -D parcel-bundler@1.12.3`
- Install globally: `sudo npm i -g parcel-bundler@1.12.3`
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
- Or with parcel CLI: `parcel index.html`


### STEPS TO BUILDING THIS MINI APP

#### 1. Generating random User data with faker library
- faker allows us to randomly generate a bunch of different types of information that we need for our project
- Manually install @types/faker module, a type definition file
- Create a User class with faker type definition in User.ts file
- Export the User.ts class and import it in index.ts file
  - NOTE: When working with typescript files, try to name export the file instead of using default export

#### 2. Creating a Company class with faker type definition
- Import the Company.ts class in index.ts file

#### 3. Integrating Google Maps with TypeScript
- Google maps with typescript examples: https://developers.google.com/maps/documentation/javascript/examples
- Generate a Google Dev Project in Google Developer console
  - Select Maps Javascript API service
  - Enable Google Maps support inside the project
  - Generate an API key
- Add the google maps script tag to index.html file
- Install @types/googlemaps type definition file: `npm i -D @types/googlemaps`
- Using the google.maps type definition in index.ts
- In index.html file, add a div tag with an id of 'map'
- Create an index.css file and insert it into index.html file

**Ideal things we can do in the index.ts file:**
- Company class
  - Create a new Company instance
  - Reference name/slogan/lat/lng properties
- User class
  - Create a new User instance
  - Reference name/age/lat/lng properties
- CustomMap class
  - Create a new CustomMap instance
  - addMarker

#### 4. Creating a CustomMap class with googlemaps type definition
- Mark the `google.maps.Map` instance as private
- Import CustomMap class in index.ts file

#### 5. Adding user and company markers on a map (bad code)
- Create a addUserMarker and a addCompanyMarker method in CustomMap class
- The reason why it's bad code is code duplication. Code in both methods are almost identical
- Call these two methods in index.ts file to display both markers on a map

#### 6. Adding markers on a map with interfaces
- In CustomMap.ts, define a Mappable interface and use it as an argument check/gatekeeper to addMaker() method

#### 7. Showing pop-up windows with infoWindow
- Create an instance of `google.maps.InfoWindow` that displays a piece of content when a marker is clicked on

#### 8. Updating interface definitions to include markerContent method
- Since the Mappable interface now has a markerContent method, any instance that wants to call the addMarker method must have a markerContent method as well
- Add a markerContent method to both User and Company classes

#### 9. Adding implements clauses
- To help us further detect errors in the right location that's caused by implementing an interface, we can add an implements clause to the class/instance that is implementing the interface
- Add `implements Mappable` interface to User and Company classes