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
- **PROPERTY:** A type may have relationship and association with other types. This relationship is called property

### GraphQL Queries
- GraphQL Playground Tool: https://graphql-demo.mead.io
- There are three major operations we can perform on any graphQL API
  - The query allows us to fetch data
  - The mutation allows us to change data
  - The subscription allows us to watch data for changes, which is great for real time applications
- **GraphQL Query Operation**
  - The query syntax allows the client to describle exactly what data it would like back. The operation name followed by curly braces
  ```
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
    ```
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

- **Configuring Babel for Node.js**
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

### Creating Your Own GraphQL API
- **Picking a Server: graphql-yoga**
  - Install graphql-yoga: `npm i graphql-yoga`
  - GraphQL is nothing more than a specification for how GraphQL works. It's not an implementation. Before we can use GraphQL, we need to pick an implementation that works with the language/stack we're using. With Node.js, graphql-yoga is a great option. It supoorts the entire GraphQL spec
  - Now we can use graphql-yoga to create our GraphQL API server. Here's the barebone implementation
    - In index.js file:
    ```javascript
    import { GraphQLServer } from 'graphql-yoga'

    // Type definitions (schema)
    // Describes the operations and data structures
    // The schema also defines what the data looks like
    const typeDefs = `
      type Query {
        hello: String!
      }
    `

    // Resolvers (functions)
    const resolvers = {
      Query: {
        hello() {
          return 'This is my first query!'
        }
      }
    }

    const server = new GraphQLServer({
      typeDefs,
      resolvers
    })

    server.start(() => {
      console.log('The server is up!')
    })
    ```
- **Schema**
  - Type definitions or schema describes the operations and data structures. The schema also defines what the data looks like
  - The typeDefs varibale is where we define the types that make up our application schema. This is where we'll define all the operations we want the server to support. It's also where we'll define any custom typs our app needs
  - All the queries need to be defined in the `Query` type. The query definition is made up of 2 parts: a query name and query type
    - The query name can be anything
    - The query type is what type of data is coming back
  ```javascript
  const typeDefs = `
    type Query {
      hello: String!
      name: String!
    }
  `
  ```
- **Resolvers**
  - While `typeDefs` allows us to define the operatoins, it's the resolvers that contain the code that runs when an operation is executed
  - Notice that the `resolvers` object mirrors the structure of `typeDefs`
  - When query hello, the hello function inside the resolvers object, inside the Query object will execute
  ```javascript
  const resolvers = {
    Query: {
      hello() {
        return 'This is my first query!'
      },
      name() {
        return 'Nga La'
      }
      }
  }
  ```
- **Create a server**
  ```javascript
  const server = new GraphQLServer({
    typeDefs,
    resolvers
  })
  ```
- **To run the server**
  - By default, the server will run on port 4000: http://localhost:4000/
  - Go to GraphQL Playground and use this localhost port 4000. We should be able to make the hello query from above
  ```javascript
  server.start(() => {
    console.log('The server is up!')
  })
  ```

### GraphQL Scalar Types
- **Scalar Types**
  - A scalar value is a single discrete value. A scalar type is a type that stores a single value. There are five built-in scalar types in GraphQL
    1. ID - Used to store unique identifier
    2. String - Used to store string data as UTF-8 characters
    3. Boolean - Use to store true or false
    4. Int - Used to store 32-but integer numbers
    5. Float - Used to store double-precision floating-point numbers
  - The opposite of a scalar value is a non-scalar value. This would include arrays and objects, which are collection of values as opposed to a single discrete value
- **Nullable & Non-Nullable Types**
  - If the type value does not have a `!` at the end of it, it's a nullable type. A nullable type could return either the value or a null
  - A non-nullable type has a `!` at the end of it and it must return a value
  ```javascript
  const typeDefs = `
    type Query {
      title: String!
      price: Float!
      releaseYear: Int
      rating: Float
      inStock: Boolean!
    }
  `;

  const resolvers = {
    Query: {
      title() {
        return 'The War of Art';
      },
      price() {
        return 12.99;
      },
      releaseYear() {
        return null;
      },
      rating() {
        return 5;
      },
      inStock() {
        return true;
      }
    }
  };
  ```











## NPM MODULES USED
- Babel Javascript compiler
  - Install: `npm i babel-cli babel-preset-env`
  - Configure Babel in .babelrc file. This file sits at root of project directory
  ```javascript
  {
    "presets": [
  "env"
  ]
  }
  ```
- graphql-yoga
  - Website: https://github.com/prisma-labs/graphql-yoga
  - Install: `npm i graphql-yoga`
