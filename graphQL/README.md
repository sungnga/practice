# NOTES

## S1: WHY GRAPHQL?
### REST-ful Routing
- Given a collection of records on a server, there should be a uniform URL and HTTP request method used to utilize that collection of records
- REST-ful routing is some set of conventions used in web development for manipulating a collection of data hosted on the server
- These are common rules around the type of HTTP request and the URL used to send them to that are used for reading, creating, updating or deleting data that is sitting on the server
- HTTP methods: POST to create, GET to fetch, PUT to update, and DELETE to delete

### Shortcomings for RESTful Routing
1. Deciding on a URL schema gets tough when we start to have heavily nested relationships between data
2. When fetching heavily nested data, could run into situations where we make too many HTTP requests to get the data that we need
3. We're vulnerable to over fetching data

### GraphQL
- GraphQL creates fast and flexible APIs, giving clients complete control to ask for just the data they need
- Fewer HTTP requests. Flexible data querying. Less code to manage


## S2: GRAPHQL BASICS: SCHEMAS AND QUERIES
### What is a Graph?
- Thinking and representing data in graphQL
- **TYPE:** Are things that we define when creating graphQL APIs. When we define the types that make up our applications, we also define the fields associated with each type, the individual pieces of data we want to store
- **FIELD:** Each type has its own custom set of fields. For example, a User type may have id, name, and age fields
- **PROPERTY** A type may have relationship and association with other types. This relationship is called property

### GraphQL Queries
- GraphQL Playground Tool: https://graphql-demo.mead.io
- There are three major operations we can perform on any graphQL API
  1. The query allows us to fetch data
  2. The mutation allows us to change data
  3. The subscription allows us to watch data for changes, which is great for real time applications
- **GraphQL Query Operation**
  - The query syntax allows the client to describle exactly what data it would like back. The operation name followed by curly braces
  ```javascript
  query {
    specify the field name we want from the graphQL API. One field per line
    field1
    field2
  }
  ```
  - The response getting back is in JSON format. All of the response data can be found on the 'data' property
  - The response structure will match up with the query structure
- **GraphQL Schema**
  - Anohter great feature of GraphQL is that it's self-documenting. GraphQL APIs expose a schema that describes exactly what operations could be performed on the API and what data could be requested. If the field does not exist, it will give an error message
  - With REST APIs, someone needs to manually write and update documentation. Sometimes these documentations may be outdated or doesn't exist. This makes it hard to locate the data we need
  - It enables tools like GraphQL Playground to validate the structure of your operation before ever sending the operation to the server

### Nested GraphQL Queries
- When querying on an object, we must specify which fields from that object we want
- **Custom Types**
  - GraphQL allows you to defien custom types specific to your application. A customtype is nothing more than a template for an object
  - GraphQL is strongly typed language. All the data you have access to is of a specific type which can be found in the schema. Afield like 'course' might resolve to a string value, while a field like 'me' might resolve to a custom type such as a 'User' type
  - When querying for a custom type, the resolved JSON value is an object. Your query needs to explicitly list out all the fields it wants from the object
  - Let's say that the resolved value of the 'me' query is of the 'User' type. A selection set needs to be provided for the 'me' query. The following valid query defines a selection set for 'me' by requesting the 'id', 'name', and 'email' of the User type
    ```javascript
    query {
      me {
        id
        name
        email
      }
    }
    ```
- **Arrays of Custom Types**
  - GraphQL supports array of custom types, which is nothing more than an array of objects

### Setting Up Babel
- Babel is a Javascript compiler. This will allow us to take advantage of all the latest Javascript features such as the ES6 import/export syntax

**Configuring Babel for Node.js**
- Run this at the root of project directory to create npm package
  - `npm init`
- Install: `npm i babel-cli babel-preset-env`
- Configure Babel at the root of the project directory
  - Create a directory called graphql-basics. This is the project root directory
  - In graphql-basics folder, create a file called .babelrc
  - In .babelrc file, configure Babel
    ```javascript
    {
      "presets": [
    "env"
    ]
    }
    ```
- In src folder, create a file called index.js. In this file:
  - `console.log('Hello GraphQL')`
- Next, set up a start script that allows you to run the Node app after passing it through Babel
  - In package.json file, include this:
    ```javascript
    {
      "scripts": {
    "start": "babel-node src/index.js" }
    }
    ```
  - Then run: `npm start`