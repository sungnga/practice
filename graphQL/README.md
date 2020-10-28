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
  - **The query** allows us to fetch data
  - **The mutation** allows us to change data**
  - **The subscription** allows us to watch data for changes, which is great for real time applications
- **GraphQL Query Operation**
  - The query syntax allows the client to describe exactly what data it would like back. The operation name followed by curly braces
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
  - Another great feature of GraphQL is that it's self-documenting. GraphQL APIs expose a schema that describes exactly what operations could be performed on the API and what data could be requested. If the field does not exist, it will give an error message
  - With REST APIs, someone needs to manually write and update documentation. Sometimes these documentations may be outdated or doesn't exist. This makes it hard to locate the data we need
  - It enables tools like GraphQL Playground to validate the structure of your operation before ever sending the operation to the server

### Nested GraphQL Queries
- When querying on an object, we must specify which fields from that object we want
- **Custom Types:**
  - GraphQL allows you to define custom types specific to your application. A custom type is nothing more than a template for an object
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
- **Arrays of Custom Types:**
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
    "scripts": {
      "start": "babel-node src/index.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    }
    ```
  - Then run: `npm start`

### Creating Your Own GraphQL API
- **Picking a Server: graphql-yoga**
  - Install graphql-yoga: `npm i graphql-yoga`
  - GraphQL is nothing more than a specification for how GraphQL works. It's not an implementation. Before we can use GraphQL, we need to pick an implementation that works with the language/stack we're using. With Node.js, graphql-yoga is a great option. It supports the entire GraphQL spec
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
  - The typeDefs variable is where we define the types that make up our application schema. This is where we'll define all the operations we want the server to support. It's also where we'll define any custom types our app needs
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
  - While `typeDefs` allows us to define the operations, it's the resolvers that contain the code that runs when an operation is executed
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
    - ID - Used to store unique identifier
    - String - Used to store string data as UTF-8 characters
    - Boolean - Use to store true or false
    - Int - Used to store 32-but integer numbers
    - Float - Used to store double-precision floating-point numbers
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

### Live Reload for GraphQL-Yoga
- Nodemon will automatically restart the server after we make any changes, allowing us to speed up development
- **Setting up Nodemon**
  - Install: `npm i nodemon --save-dev`
  - In package.json file, include this:
    ```javascript
    "scripts": {
      "start": "nodemon --exec babel-node src/index.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    }
    ```
  - Then run: `npm start`

### Creating Custom Types
- **Creating a Custom Object Type**
  - An empty object type definition for a product might look like this and notice the uppercase first letter:
    ```
    type User {

    }
    ```
  - All the fields for a 'User' get defined in the curly braces. The syntax for this looks very similar to how queries are defined in the "Query" type. For each field, you pick a field name and set up the type definition for each
    ```javascript
    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }
    ```
- **Setting up a Resolver for a Custom Object Type**
  ```javascript
  const resolvers = {
    Query: {
      me() {
        return {
          id: '11233455',
          name: 'Mike',
          email: 'maike@example.com',
          age: 99
        };
      }
    }
  };
  ```
- **Using an Object Type**
  - This can now be used as the type for a query
  - The `me` query has `User!` as its type 
  ```javascript
  const typeDefs = `
    type Query {
      me: User!
    }

    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }
  `;
  ```
- **Querying an Object Type**
  ```
  query {
    me {
      id
      name
      email
    }
  }
  ```
  - The response we get back
    ```
    {
      "data": {
        "me": {
          "id": "11233455",
          "name": "Mike",
          "email": "maike@example.com"
        }
      }
    }
    ```

### Operation Arguments
- Operation arguments allows us to pass data from the client to the GraphQL server
- **Defining Operational Arguments**
  - Operational arguments are similar to function arguments. It's a way to pass data along with our GraphQL query
  - Arguments can be of any type including all of the scalar types as well as any object types we create
  - Arguments can also be required or optional
  - Here, the `greeting` query has one optional argument `name` of type String
    ```javascript
    type Query {
      greeting(name: String, position: String): String!
      add(a: Float!, b: Float!): Float!
    }
    ```
- **Setting up the Resolver Method**
  - There are 4 arguments that get passed to all resolvers functions: parent, args, context, and info 
    - The args is an object and it contains all of the argument values provided
    ```javascript
    greeting(parent, args, ctx, info) {
      if (args.name && args.position) {
        return `Hello, ${args.name}! You are my favorite ${args.position}.`
      } else {
        return 'Hello!'
      }
    },
    add(parent, args, ctx, info) {
      return args.a + args.b
    },
    ```
- **Querying Operational Arguments**
  ```
  query {
    greeting(name: "Nga", position: "designer")
    add(a: 8, b: 2)
  }
  ```

### Working with Arrays and Array of Objects
- Array elements can be scalar values such as string, number, or boolean
- **Array Type Definition**
  - Remember that GraphQL is a strongly typed language. That means if a fields value should be an array, the type definition needs to reflect that
  - There are 2 parts to the type definition:
    - `[]!` - signifies the value is going to be a non-nullable array. Event if there's no element in the array, it'll return an empty array
    - `Int!` - the inner type definition defines the type for the elements in the array
    ```javascript
    type Query {
      grades: [Int!]!
      add(numbers: [Float!]!): Float!
    }
    ```
- **Set up a Resolver for an Array**
  - Set up for all of the arguments in the resolver function, even if we don't use them. This is a good habit to do
  ```javascript
  grades(parent, args, ctx, info) {
    return [99, 80, 93];
  },
  add(parent, args, ctx, info) {
    if (args.numbers.length === 0) {
      return 0
    }

    return args.numbers.reduce((accumulator, currentValue) => {
      return accumulator + currentValue
    })      
  }
  ```
- **Querying for an Array**
  - Queryng for an array of scalar values is just like querying for a scalar value.
    ```
    query {
      grades
      add(numbers: [1, 5, 6, 8])
    }
    ```
  - The JSON response we get back
    ```
    {
      "data": {
        "grades": [99, 80, 93],
        "add": 20
      }
    }
    ```
- **Array of Objects Type Definition**
  - The type definition for an array of objects is almost identical to the type definition for an array of scalar values. This example schema sets up a users query which returns an array of User objects and it accepts query argument of String type
    ```javascript
    const typeDefs = `
      type Query {
        users(query: String): [User!]!
        posts(query: String): [Post!]!
        me: User!
        post: Post!
      }

      type User {
        id: ID!
        name: String!
        email: String!
        age: Int
      }
      
      type Post {
        id: ID!
        title: String!
        body: String!
        published: Boolean!
      }
      `;
    ```
  - Define the users array data outside of typeDefs query definition
    ```javascript
    const users = [
      {
        id: '1',
        name: 'Nga',
        email: 'nga@example.com',
        age: 66
      },
      {
        id: '2',
        name: 'Sarah',
        email: 'sarah@example.com'
      },
      {
        id: '3',
        name: 'Mike',
        email: 'mike@example.com'
      }
    ];
    ```
- **Set up a Resolver for an Array of Objects**
  - The resolver function is now responsible for returning an array of objects, where each object matches the `User` type
    ```javascript
		users(parent, args, ctx, info) {
      // If no query argument provided, just return regular users array of objects
      if (!args.query) {
        return users
      }

      // If query arg is provided, use .filter() method on users array to filter users based on given query arg
      return users.filter((user) => {
        return user.name.toLowerCase().includes(args.query.toLowerCase())
      })
		},
		post(parent, args, ctx, info) {
      if (!args.query) {
        return posts
      }

      return posts.filter((post) => {
        const isTitleMatch = post.title.toLowerCase().includes(args.query.toLowerCase())
        const isBodyMatch = post.body.toLowerCase().includes(args.query.toLowerCase())
        return isTitleMatch || isBodyMatch
      })
		}
    ```
- **Querying for an Array of Objects**
  - When querying an object type, we've seen that it's necessary to provide a selection type where we describe all the fields we want. This same is true when working with an array of object types. It's necessary to explicitly list out what fields we need from each object in the array. Pass in the "query" argument is optional, but if provided, it must be of String type
    ```
    query {
      users(query: "A") {
        name
        age
      }
      posts(query: "book") {
        title
        published
        body
      }
    }
    ```
  - Note the JSON response we get back for "users" and "posts" query is an array of objects
    ```
    {
      "data": {
        "users": [
          {
            "name": "Nga",
            "age": 66
          },
          {
            "name": "Sarah",
            "age": null
          }
        ],
        "posts": [
          {
            "title": "GraphQL 101",
            "published": false,
            "body": "A book about GraphQL"
          },
          {
            "title": "Javascript",
            "published": true,
            "body": "A book about Javascript"
          }
        ]
      }
    }
    ```

### Relational Data: Basics
- **Setting up Associations**
  - Associations get set up in the object type definition. The type definition below sets up both `User` and `Post`, where every post has an `author` field that links to a user
    ```javascript
    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
    }
    
    type Post {
      id: ID!
      title: String!
      body: String!
      published: Boolean!
      author: User!
    }
    ```
  - In the posts data array, add another property called `author` to each object/post element and set it to the value of a user's id property which is found in the users data array. This creates a relationship that each post in the posts array has an author property that is linked to a user in the users array
    ```javascript
    {
      id: '10',
      title: 'GraphQL 101',
      body: 'A book about GraphQL',
      published: false,
      author: '1'
    } 
    ```
  - This relationship requires a new resolver method. This new method is responsible for returning the user for a given post. Notice that the `author` method lives on a new `Post` property at the root property of `resolvers` constant, not on `Query` property
  - For associations, the root property name needs to match up with the object type name. The method name needs to match up with a new field name
  - The data post is provided via the 1st argument, which is typically named `parent`. This means `parent.author` is where the author id can be accessed and used to determine which user is the author for the post
    ```javascript
    const resolvers = {
      Query: { ... },
      Post: {
        author(parent, args, ctx, info) {
          // Return the correct author for the post
          // parent arg is the element in the posts array. parent arg is post data
          // Looping over elements in users array to find and return the user with matching id
          return users.find((user) => {
            return user.id === parent.author
          })
        }
      }
    };
    ```
- **Querying Relational Data**
  - To query posts to get a post's id, title, and name of author
    ```
    query {
      posts {
        id
        title
        author {
          name
        }
      }
    }
    ```
  - The JSON response we get back. Note that the author field is an object because we defined the author property type of User type and User type is an object
    ```
    {
      "data": {
        "posts": [
          {
            "id": "10",
            "title": "GraphQL 101",
            "author": {
              "name": "Nga"
            }
          },
          {
            "id": "11",
            "title": "Nodejs Mastery",
            "author": {
              "name": "Nga"
            }
          },
          {
            "id": "12",
            "title": "Javascript",
            "author": {
              "name": "Sarah"
            }
          }
        ]
      }
    }
    ```

### Relational Data: Arrays
- **Setting up an Array-Based Associations**
  - A link already exists for getting the author of a given post. The goal now is to create a link that lets us get all the posts that belong to a given user
  - Add a `posts` property on to `User` with the type of `[Post!]!`
    ```javascript
    type User {
      id: ID!
      name: String!
      email: String!
      age: Int
      posts: [Post!]!
    }
    ```
  - If a field is not a scalar type, we need to set up a custom resolver function. When GraphQL API runs the query and it finds that a field is requesting for a relational data and not scalar value data, then it's going to call the type method of that field/property
  - Once again, we need to write a new resolver method. The job of this method is to return an array of posts that belong to the given user. The user's data is accessible via `parent`, so the function can use the user's id to determine if a given post belongs to them
    ```javascript
    const resolvers = {
      Query: { ... },
      Post: { ... },
      User: {
        posts(parent, args, ctx, info) {
          return posts.filter((post) => {
            return post.author === parent.id;
          });
        }
      }
    };
    ```
- **Querying Array-Based Relational Data**
  ```
  query {
    users {
      id
      name
      posts {
        id
        title
      }
    }
  }
  ```
  - The JSON response we get back
    ```
    {
      "data": {
        "users": [
          {
            "id": "1",
            "name": "Nga",
            "posts": [
              {
                "id": "10",
                "title": "GraphQL 101"
              },
              {
                "id": "11",
                "title": "Nodejs Mastery"
              }
            ]
          },
          { ... }
        ]
      }
    }
    ```

### Comment Challenge
- **Part I - Goal: Set up Comment Type definition**
  - Set up a "Comment" type with id and text fields. Both non-nullable
  - Set up a "comments" array with 4 comments
  - Set up a "comments" query with a resolver that returns all of the comment
  - Run a query to get all 4 comments with both id and text fields
- **Part II - Goal: Set up a relationship between Comment and User**
  - Set up an author field on Comment
  - Update all comments in an array to have a new author field (use one of the user ids as value)
  - Create a resolver for the Comment author field that returns the user who wrote the comment
  - Run a sample query that gets all comments and gets the author's name
  - Set up a comments field on User
  - Set up a resolver for the User comments field that returns all comments belonging to that user
  - Run a sample query that gets all users and all their comments
- **Part III - Goal: Set up a relationship between Comment and User**
  - Set up a post field on Comment
  - Update all comments in the array to have a new post field (use one of the post ids as value)
  - Create a resolver for the Comment post field that returns the post that the comment belongs to
  - Run a sample query that gets all comments and gets the post name
  - Set up a comments field on Post
  - Set up a resolver for the Post comments field that returns all comments belonging to that post
  - Run a sample query that gets all posts and all their comments


## S3: GRAPHQL BASICS: MUTATIONS

### Creating Data with Mutations: Part I
- Install cuid: `npm i cuid`
- Import in index.js file: `import cuid from 'cuid';`
- **Defining a Mutation**
  - createUser Mutation definition
  - In typeDefs:
    ```javascript
    type Mutation {
      createUser(name: String!, email: String!, age: Int): User!
    }
    ```
  - A resolver method for createUser Mutation. In resolvers:
    ```javascript
    Mutation: {
      createUser(parent, args, ctx, info) {
        // The some method will return true if some users have this email. False if no user has this email
        const emailTaken = users.some((user) => user.email === args.email);

        // Send an error message to the client
        if (emailTaken) {
          throw new Error('Email taken.');
        }

        // Create a user
        const user = {
          id: cuid(),
          name: args.name,
          email: args.email,
          age: args.age
        };

        // Add the new user to the users array using .push method
        users.push(user);

        // Return user so the client can get values off of it
        return user;
      }
    }
    ```
- **Performing a Mutation on Client side**
  ```
  mutation {
    createUser(name: "Nga", email: "nga2@example.com") {
      id
      name
      email
      age
    }
  }
  ```
  - JSON response:
    ```
    {
      "data": {
        "createUser": {
          "id": "ckg7ggj9900013mi2hvw998dl",
          "name": "Nga",
          "email": "nga2@example.com",
          "age": null
        }
      }
    }
    ```

### Creating Data with Mutations: Part II
- **Mutations and Data Associations**
  - createPost Mutation definition
  - In typeDefs:
    ```javascript
    type Mutation {
      createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    }
    ```
  - The resolver method for createPost Mutation. In resolvers:
    ```javascript
    Mutation: {
      createPost(parent, args, ctx, info) {
        const userExists = users.some((user) => user.id === args.author);

        if (!userExists) {
          throw new Error('User not found');
        }

        // Create a post
        const post = {
          id: cuid(),
          title: args.title,
          body: args.body,
          published: args.published,
          author: args.author
        };

        // Add the new post to the posts array
        posts.push(post);

        return post;
      }
    }
    ```
- **Performing a Mutation on Client Side**
  ```
  mutation {
    createPost(
      title: "My new post",
      body: "something",
      published: false,
      author: "ckg7hz7sw000195i2hidj4j3b"
    ) {
      id
      title
      body
      published
      author {
        name
      }
    }
  }
  ```
- **Challenge - Goal: Allow clients to create a new comment**
  - Define a new createComment Mutation
    - Should take text, author, and post
    - Should return a comment
  - Define a resolver method for createComment
    - Confirm that the user exists, else throw error
    - Confirm that the post exists and is published, else throw error
    - If they do exist, create the comment and return it
  - Run the mutation and add a comment
  - Use the comments query to verify the comment was added

  **Solution:**
  - Define createComment Mutation
  - In typeDefs:
    ```javascript
    type Mutation {
      createComment(text: String, author: ID!, post: ID!): Comment!
    }
    ```
  - The resolver method for createComment Mutation. In resolvers:
    ```javascript
    Mutation: {
      createComment(parent, args, ctx, info) {
        const userExists = users.some((user) => user.id === args.author);
        const postExists = posts.some(
          (post) => post.id === args.post && post.published
        );

        if (!userExists || !postExists) {
          throw new Error('Unable to find user and post');
        }

        // Create a comment
        const comment = {
          id: cuid(),
          text: args.text,
          author: args.author,
          post: args.post
        };

        comments.push(comment);

        return comment;
      }
    }
    ```
  - Performing a Mutation on Client Side
    ```
    mutation {
      createComment(
        text: "Check out Dido music"
        author: "2"
        post: "12"
      ) {
        id
        text
        author {
          name
        }
        post {
          title
        }
      }
    }
    ```

### The Object Spread Operator with Node.js
- npm module: babel-plugin-transform-object-rest-spread
  - This plugin allows Babel to transform rest properties for object destructuring assignment and spread properties for object literals
- Source: https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread
- Install: `npm i babel-plugin-transform-object-rest-spread`
- In .babelrc file:
  ```javascript
  {
    "presets": [
      "env"
    ],
    "plugins": [
      "transform-object-rest-spread"
    ]
  }
  ```
- To use:
  ```javascript
  const post = {
    id: cuid(),
    title: args.title,
    body: args.body,
    published: args.published,
    author: args.author
  };

  const post = {
    id: cuid(),
    // Using the args object spread operator
    // - spreading the properties in args object to post object
    ...args
  };
  ```

### The Input Type
- Define an input type and then reference it in the arguments list
- Inside the curly braces is where we define all of the properties that could exist on an object input/arguments
- NOTE: everything inside an input type must be scalar values. Cannot have custom object type
- Inside typeDefs:
  ```javascript
  input CreateUserInput {
    name: String!
    email: String!
    age: Int
  }

  type Mutation {
    createUser(data: CreateUserInput): User!
  }
  ```
- Performing a createUse Mutation:
  - Note that data is an object input type
  ```
  mutation {
    createUser(
      data: {
        name: "Jess",
        email: "jess@example.com",
        age: 11
      }
    ) {
      id
      posts {
        id
      }
    }
  }
  ```
- **Challenge - Goal: Create input types for createPost and createComment**
  - Create an input type for createPost with the same fields. Use "data" as arg name
  - Update createPost resolver to use this new object
  - Verify application still works by creating a post and then fetching it
  - Create an input type for createComment with the same fields. Use "data" as arg name
  - Update createComment resolver to use this new object
  - Verify application still works by creating a comment and then fetching it

### Deleting Data with Mutations: deleteUser Mutation
- **Define a Delete Mutation for deleting a User**
  - Inside typeDefs:
    ```javascript
    type Mutation {
      deleteUser(id: ID!): User!
    }
    ```
  - Create a resolver for deleteUser Mutation. In resolvers object:
    ```javascript
    Mutation: {
      deleteUser(parent, args, ctx, info) {
        // Find the user we want to delete
        // .find method returns the actual element in the array
        // .findIndex method returns the index of that element in the array
        // Return true if the user id matches the args id and store the user index in userIndex
        const userIndex = users.findIndex((user) => user.id === args.id);

        if (userIndex === -1) {
          throw new Error('User not found');
        }

        // The .splice method removes a certain number of element, start at a specific index
        // - 1st arg is the index to start the remove
        // - 2nd arg is how many elements to remove
        // - it returns the removed items in an array
        const deletedUsers = users.splice(userIndex, 1);

        // Updating the posts array by deleting all associated posts and comments made by this user
        posts = posts.filter((post) => {
          const match = post.author === args.id;

          if (match) {
            comments = comments.filter((comment) => comment.post !== post.id);
          }

          return !match;
        });
        // Updating the comments array by removing all the comments made by this user
        comments = comments.filter((comment) => comment.author !== args.id);

        // Return the deleted users
        return deletedUsers[0];
      }
    }
    ```
- **Performing a Delete Mutation**
  ```
  mutation {
    deleteUser(id: "1") {
      id
    }
  }
  ```

### Deleting Data with Mutations: deletePost and deleteComment Mutations
**Challenge - Goal: Set up a mutation for deleting a post**
- Define a mutation. It should take a post id. It should return the deleted post
- Define the resolver for the mutation
  - Check if the post exists, else throw error
  - Remove and return the post
  - Remove all comments belonging to that post
- Test by running query to delete a post. Verify post/comments are removed

**Challenge - Goal: Set up a mutation for deleting a comment**
- Define a mutation. It should take a comment id. It should return the deleted comment
- Define the resolver for the mutation
  - Check if the comment exists, else throw error
  - Remove and return the comment
  - Remove all comments belonging to that post
- Test by running query to delete a comment. Verify comment was removed

### A Pro GraphQL Project Structure
- In src folder, create a file called schema.graphql. In schema.graphql file:
  - This file contains all of the type definitions
- In src folder, create a file called db.js. In db.js file:
  - This file contains the database that's being shared across the application. For now, it contains the static data for users, posts, and comments arrays
- Set up context for the application
  - Context contains values that are universal and shared across the application
  - Database/db will be one of the contexts
- In index.js file:
  - Import db: `import db from './db';`
  - When setting up the server:
    - Load in the schema.graphql file by providing the path as the value for typeDefs property
    - Set up the context property to the server. This context is an object and list db as a property of context
    ```javascript
    const server = new GraphQLServer({
      typeDefs: './src/schema.graphql',
      resolvers,
      context: {
        db
      }
    });
    ```
- Next, we're going to break up the resolvers object into its own separate files based on the root property. These root properties are the type definitions we have defined in the schema.graphql file. For example, our resolvers object has the Query, Mutation, User, Post, and Comment properties. They will have their own files inside the resolvers folder
- In src folder, create a folder called resolvers. Inside this resolvers folder, create the following files:
  - Query.js - contains Query object
  - Mutation.js - contains Mutation object
  - User.js - contains User object
  - Post.js - contains Post object
  - Comment.js - contains object object
- In index.js file:
  - Import all the above resolver function files
  - In the server setup:
    - Add a resolvers property and this property is an object. Pass in the above resolvers as properties of resolvers object
      ```javascript
      const server = new GraphQLServer({
        typeDefs: './src/schema.graphql',
        resolvers: {
          Query,
          Mutation,
          User,
          Post,
          Comment
        },
        context: {
          db
        }
      });
      ```
- Final code in index.js file:
  ```javascript
  import { GraphQLServer } from 'graphql-yoga';
  import db from './db';
  import Query from './resolvers/Query';
  import Mutation from './resolvers/Mutation';
  import User from './resolvers/User';
  import Post from './resolvers/Post';
  import Comment from './resolvers/Comment';

  const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
      Query,
      Mutation,
      User,
      Post,
      Comment
    },
    context: {
      db
    }
  });

  server.start(() => {
    console.log('The server is up!');
  });
  ```
- In package.json file:
  - Modify the Nodemon script to listen for changes in files with js and graphql extensions
  ```javascript
  "scripts": {
    "start": "nodemon -e js,graphql --exec babel-node src/index.js"
  }
  ```

### Updating Data with Mutations
- **Defining updateUser Mutation**
  - In schema.graphql file:
    ```javascript
    type Mutation {
      updateUser(id: ID!, data: UpdateUserInput!): User!
    }

    input UpdateUserInput {
      name: String
      email: String
      age: Int
    }
    ```
- **Create resolver method**
  - In Mutation.js file:
    - Write a resolver method for updateUser Mutation
    ```javascript
    updateUser(parent, args, { db }, info) {
      // Destructure id and data properties from args
      const { id, data } = args;
      // Find the user
      const user = db.users.find((user) => user.id === id);

      if (!user) {
        throw new Error('User not found');
      }

      if (typeof data.email === 'string') {
        const emailTaken = db.users.some((user) => user.email === data.email);

        if (emailTaken) {
          throw new Error('Email taken');
        }

        user.email = data.email;
      }

      if (typeof data.name === 'string') {
        user.name = data.name;
      }

      if (typeof data.age !== 'undefined') {
        user.age === data.age;
      }

      // Return the updated user
      return user;
    }
    ```
- **Performing the updateUser Mutation on Client Side**
  ```
  mutation {
    updateUser(id: "1", data:{name: "Mike", age: null, email: "mike22@example.com"}) {
      id
      name
      email
      age
    }
  }
  ```
- **Challenge - Goal: Set up a mutation for updating a post**
  - Define mutation
    - Add id/data for arguments. Setup data to support title, body, and published
    - Return the updated post
  - Create resolver method
    - Verify post exists, else throw error
    - Update post properties one at a time
  - Verify by updating all properties for a given post
- **Challenge - Goal: Set up a mutation for updating a comment**
  - Define mutation
    - Add id/data for arguments. Setup data to support text
    - Return the updated comment
  - Create resolver method
    - Verify comment exists, else throw error
    - Update comment properties one at a time
  - Verify by updating all properties for a given comment


## S4: GRAPHQL BASICS: SUBSCRIPTIONS

### GraphQL Subscription Basics
- Subscriptions give clients a way to subscribe to data changes and get notified by the server when data changes
- Subscriptions make it possible to create real-time applications where the client renders data changes in real-time
- The subscription operation is similar to the Query operation. The difference is how the data is fetched. With the subscription, we use web sockets to keep an open connection between the client and the server. That allows the server to transmit data direct to the client
- The subscriptions are defined in the type definition, in schema.graphql file
- graphql-yoga uses the graphql-subscriptions library, which we will use to create our subscription. The graphql-subscriptions provides a simple pubsub utility. Use Pub(publish) Sub(subscribe) features to allow us to communicate around our application

**Configure subscription**
- In index.js file:
  - Import PubSub: `import { GraphQLServer, PubSub } from 'graphql-yoga';`
  - Create a new pubsub instance using the `new PubSub()` method
    - `const pubsub = new PubSub();`
  - Add the pubsub instance to the context property in the server 
    ```javascript
    context: {
      db,
      pubsub
    }
    ```

**Define Subscription type**
- This is the third type of operator we can define in the type definition
- In schema.graphql file:
  - To define a subscription, give the subscription name in the type Subscription and define the value type this subscription returns
  ```javascript
  type Subscription {
    count: Int!
  }
  ```

**Create a resolver function for subscription**
- In Subscription.js file:
  - Inside the Subscription object:
    ```js
    const Subscription = {
      // The property name needs to match up with the name of the subscription defined in type definition
      // Unlike Query and Mutation, the value for count is not a method, it's an object
      // On this object, setup a subscribe() method
      // - The subscribe method runs every time someone tries to subscribe to count
      // - It's a resolver method, so has all the regular arguments a resolver method gets
      // - Destructure the pubsub property from context argument
      // - This function returns something from pubsub and call the .asyncIterator() method on pubsub
      // - asyncIterator method takes a string channel name as an argument. The asyncIterator method sets up the channel
      // - The .publish() method publishes the data to all the subscribers
      // - The publish method takes 2 args: 
      //  - 1st arg is the channel name
      //  - 2nd arg is an object which contains the data that get sent to the client
      count: {
        subscribe(parent, args, { pubsub }, info) {
          let count = 0;

          setInterval(() => {
            count++;
            pubsub.publish('count', {
              count
            });
          }, 2000);

          return pubsub.asyncIterator('count');
        }
      }
    };

    export { Subscription as default };
    ```

**Performing the Subscription on client side**
  - This subscription returns an integer, a scalar value
  ```
  subscription {
    count
  }
  ```

### Setting up a Comments Subscription
- Defining the comment subscription
  - In schema.graphql file:
    ```js
    type Subscription {
      comment(postId: ID!): Comment!
    }
    ```
- Create a resolver method for the comment subscription
  - In Subscription.js file:
    ```js
    const Subscription = {
      comment: {
        subscribe(parent, { postId }, { db, pubsub }, info) {
          const post = db.posts.find((post) => post.id === postId && post.published)

          if (!post) {
            throw new Error('Post not found')
          }

          // Setup and return the channel
          return pubsub.asyncIterator(`comment ${postId}`) // "comment 22"
        }
      }
    }
    ```
- Publish the new comment data to subscribers
  - In Mutation.js file:
    ```js
    createComment(parent, args, { db, pubsub }, info) {
      const userExists = db.users.some((user) => user.id === args.data.author);
      const postExists = db.posts.some(
        (post) => post.id === args.data.post && post.published
      );

      if (!userExists || !postExists) {
        throw new Error('Unable to find user and post');
      }

      // Create a comment
      const comment = {
        id: cuid(),
        ...args.data
      };

      db.comments.push(comment);
      // Publish the comment to subscribers using the .publish() method on pubsub
      // This method takes 2 arguments
      // - 1st arg is a string channel name
      // - 2nd arg is an object of the data being sent
      pubsub.publish(`comment ${args.data.post}`, {comment})

      return comment;
    }
    ```
- Subscribing to a comment on client-side
  ```
  subscription {
    comment(postId: "10") {
      id
      text
      author {
        name
      }
    }
  }
  ```

### Setting up a Posts Subscription
**Goal: Create a subscription for new posts**
- Define "post" subscription. No arguments are necessary. Response should be a post object
- Setup the resolver for post. Since there are no args, a channel name like "post" is fine
- Modify the mutation for creating a post to publish the new post data
  - Only call pubsub.publish if the post had "published" set to true
  - Don't worry about updatePost or deletePost
- Test it

### Expanding the Posts Subscription for Edits and Deletions
- Notify subscribers when a post is updated or deleted
- Modify the post subscription structure. In schema.graphql.js file:
  - We need to restructure the post subscription type definition to let the client know about the data they are receiving. For example, did they receive this post because it's a new post, an updated post, or a deleted post?
  - The value type assigned to post subscription is PostSubscriptionPayload type
  - The PostSubscriptionPayload type is an object with 2 properties:
    - The mutation property is of String type and it's an ACTION type performed on data the client received. For example, this data/post was CREATED, UPDATED, or DELETED
    - The data property is the data they're receiving, the Post object
    ```js
    type PostSubscriptionPayload {
      mutation: String!
      data: Post!
    }

    type Subscription {
      comment(postId: ID!): Comment!
      post: PostSubscriptionPayload!
    }
    ```
- Nothing is changed in the Subscription.js for post resolver method
- In Mutation.js file:
  - In createPost() method and inside the .publish() method:
    - The data we publish is a post object, instead of a plain post, that contains the 2 properties that we defined in the PostSubscriptionPayload type definition
    - The mutation property is a string describing the ACTION type that was performed on data they're receiving. For example, this data/post was CREATED, UPDATED, or DELETED
    ```js
    if (args.data.published) {
      pubsub.publish('post', { 
        post: {
          mutation: 'CREATED',
          data: post
        }
        });
    }
    ```
  - In deletePost() method:
    - Destructure pubsub
    - Check to see if the deleted post is published. If it is, call pubsub.publish to notify the subscribers 
    ```javascript
    deletePost(parent, args, { db, pubsub }, info) {
      const postIndex = db.posts.findIndex((post) => post.id === args.id);

      // If post.id and the given post id doesn't match, it'll return -1
      if (postIndex === -1) {
        throw new Error('Post not found');
      }

      const deletedPosts = db.posts.splice(postIndex, 1);

      db.comments = db.comments.filter((comment) => comment.post !== args.id);

      if (deletedPosts[0].published) {
        pubsub.publish('post', {
          post: {
            mutation: 'DELETED',
            data: deletedPosts[0]
          }
        });
      }

      return deletedPosts[0];
    }
    ```
  - In updatePost() method:
    ```js
    updatePost(parent, args, { db, pubsub }, info) {
      const { id, data } = args;
      const post = db.posts.find((post) => post.id === id);
      const originalPost = { ...post };

      if (!post) {
        throw new Error('Post not found');
      }

      if (typeof data.title === 'string') {
        post.title = data.title;
      }

      if (typeof data.body === 'string') {
        post.body = data.body;
      }

      if (typeof data.published === 'boolean') {
        post.published = data.published;

        if (originalPost.published && !post.published) {
          // deleted
          pubsub.publish('post', {
            post: {
              mutation: 'DELETED',
              data: originalPost
            }
          });
        } else if (!originalPost.published && post.published) {
          // created
          pubsub.publish('post', {
            post: {
              mutation: 'CREATED',
              data: post
            }
          });
        }
      } else if (post.published) {
        // updated
        pubsub.publish('post', {
          post: {
            mutation: 'UPDATED',
            data: post
          }
        });
      }

      return post;
    }
    ```
- Subscribe to a post on client-side. Try to create, update, and delete a post
  ```
  subscription {
    post {
      mutation
      data {
        id
        title
        author {
          name
        }
      }
    }
  }
  ```

### Expanding the Comments Subscription for Edits and Deletions
**Goal: Setup CREATED, UPDATED, and DELETED for comment description**
- Set up a custom payload type for comment subscription with "mutation" and "data"
- Update publish call in createComment to send back CREATED with the data
- Add publish call in deleteComment using DELETED event. Destructure pubsub
- Add publish call in updateComment using UPDATED event. Destructure pubsub
- Test by creating, updating, and deleting a comment
  ```
  subscription {
    comment(postId: "10") {
      mutation
      data {
        id
        text
        author {
          name
        }
      }
    }
  }
  ```

### Enums (enumerations) in GraphQL
- Enum:
  - A special type that defines a set of constants
  - This type can then be used as the type for a field (similar to scalar and custom object types)
  - Values for the field must be one of the constants for the type
- In schema.graphql file:
  - Use enum for mutation type
  ```js
  enum MutationType {
    CREATED
    UPDATED
    DELETED
  }

  type PostSubscriptionPayload {
    mutation: MutationType!
    data: Post!
  }

  type CommentSubscriptionPayload {
    mutation: MutationType!
    data: Comment!
  }
  ```


## S5: DATABASE STORAGE WITH PRISMA

### What is Prisma?
- Website: https://www.prisma.io/
- Prisma is a GraphQL ORM (Object Relational Model)
- It is database agnostic
- It makes it easy to expose access to the database to a client in a secure and efficient way
- Prisma sits in between Nodejs and the database of choice
- The Nodejs backend can read and write from the database using GraphQL
- GraphQL provides communication between different layers
  - communication between the client and Nodejs
  - communication between Nodejs and database
  - if Nodejs wants to read data from the database, it sends off a GraphQL query
  - if Nodejs wants to write data to the database, it sends off a mutation
  - if Nodejs wants to watch the database for changes, it sets up a subscription
  - Nodejs acts as a thin layer between the client and the database, though Node server is still very important for things like authentication and data authorization. 

### Prisma Setup
**Setup Heroku Postgres Database**
- Go to heroku website: www.heroku.com
- Create a new app. Give it a name: ngala-prisma-dev-server
- In this new app dashboard:
  - Click on the Resources tab at the top. In Add-ons section, search for "Heroku Postgres" and select the Free plan
  - This will create the Heroku Postgres Database and it should show up on the Add-ons list
  - Click on it and it'll take you to the database dashboard page
- In heroku postgres database dashboard:
  - Click on the Settings tab at the top
  - The Database Credentials section contains the information you need to connect this database to the outside world. This info will be used to setup the server with pgAdmin Tools
  ```
  App name: ngala-prisma-dev-server
  Database: heroku-postgresql
  ```

**Install pgAdmin - PostgreSQL Tools**
- Website: https://www.pgadmin.org/
- pgAdmin allows us to manage the PostgreSQL database via a GUI
- Download to install the latest version
- Launch the pgAdmin application in the browser
- Click on the Add New Server icon. This will allow us to setup the connection to the database we just created
- **Connect to the database**
  - In the Create-Server window:
    - In the General tab, the name should match with the app name we gave when creating the database: ngala-prisma-dev-server
    - In the Connection tab, fill in the info for Host name, Port, Maintenance database, Username, and password from the Heroku Database Credentials. Check Save Password
- There will be many database listed on the pgAdmin page. To find the database that belongs to us, use Find tool and paste in the database name provided by Heroku Postgres in Database Credentials section

**Install Docker**
- Website: www.docker.com
- Download and install Docker Desktop
- Launch the docker application and a docker desktop icon should appear at the top of the monitor and running

### Prisma 101: Create Project with Prisma and Docker
- Prisma website: https://www.prisma.io/
- A blog post on how to create project with Prisma: https://medium.com/better-programming/prisma-graphql-how-to-9a3d09419e93
- Install the Prisma module globally: `sudo npm i -g prisma`

**1. Set Up Prisma**
- Create a new directory and call it graphql-prisma
- Cd into this directory and create an empty folder called prisma
- Inside the prisma directory:
  - Run: `prisma init --endpoint http://localhost:4466`
  - This process will create 2 files inside the prisma directory
    - datamodel.prisma file - This defines the GraphQL API for Prisma. That would be what we access at localhost:4466 and Prisma is what we interact with from our Node.js application. This file also determines what the data in our database is going to look like
    - prisma.yml file - contains the endpoint and datamodel

**2. Set Up Docker**
- Inside the prisma directory:
  - Create a file called docker.compose.yml and fill in the Postgres database credentials and port setup
    - Follow the setup in the blog tutorial
    - docker-compose.yml file - contains the Postgres database credentials
    - Add a ssl property and set to true
    - Add a database property and set to the database name
- Make sure you're still in the prisma directory, and run: `docker-compose up -d`. This will start up the Prisma service
- Then run: `prisma deploy`. This will deploy the datamodel.prisma file to the Prisma service
- If the deployment is successful, visit http://localhost:4466/_admin in the browser. This is the GraphQL Playground that is connected to the GraphQL API provided by Prisma

### Adding Post Type to Prisma
- **The functions of the datamodel.prisma file:**
  - This file is used by Prisma to determine the database structure
  - This file is used to generate the graphQL API schema
- Whenever making changes to the datamodel.graphql file, run `prisma deploy` to send the schema to Prisma
- **Attributes**
  - Attributes modify the behavior of a field or block (e.g models). There are two ways to add attributes to your data model:
    - Field attributes are prefixed with `@`
    - Block attributes are prefixed with `@@`
  - `@id` - Defines a single-field ID on the model
  - `@unique` - Defines a unique constraint for this field
- In datamodel.prisma file:
  - Add email field to the User type
  - Set up Post type
  - Set up the relationship between the Post and User. Prisma will generate a PostToUser (Relation) table
  ```graphql
  type User {
    id: ID! @id
    name: String!
    email: String! @unique
    posts: [Post!]!
  }

  type Post {
    id: ID! @id
    title: String!
    body: String!
    published: Boolean!
    author: User!
  }
  ```
- In GraphQL Playground: createUser mutation
  ```
  mutation{
    createUser(data: {
      name: "Nga"
      email: "nga@example.com"
    }){
      id
      name
      email
    }
  }
  ```
- In GraphQL Playground: createPost mutation
  ```
  mutation {
    createPost(
      data: {
        title: "Prisma post"
        body: ""
        published: false
        author: {
          connect: {
            id: "ckgckdkee003y0807rfr971c3"
          }
        }
      }
    ){
      id
      title
      published
      author {
        id
        name
      }
    }
  }
  ```

### Adding Comment Type to Prisma
- **Goal: Add comments to Prisma API**
  - Copy the comment type definition and mark the id as unique
  - Redeploy the Prisma app
  - Work with the comment API in GraphQL Playground
    - Update our only post to be published
    - Create a new user
    - Have a new user comment on the one existing post (refer to schema for usage)
    - Fetch all comments (include comment text and author name)
- In datamodel.prisma file:
  ```graphql
  type Comment {
    id: ID! @id
    text: String!
    author: User!
    post: Post!
  }
  ```
- In GraphQL Playground: query users
  ```
  query {
    users{
      id
      name
      email
      posts {
        id
        title
      }
    }
  }
  ```
- In GraphQL Playground: updatePost mutation
  ```
  mutation {
    updatePost(
      where: {
        id: "ckgcm1sd700680807waza8p97"
      },
      data: {
        published: true
      }
    ){
      id
      title
      body
      published
    }
  }
  ```
- In GraphQL Playground: createComment mutation
  ```
  mutation {
    createComment(
      data: {
        text: "A comment from Prisma GraphQL"
        author: {
          connect: {
            id: "ckgcn8djy008b0807zznc12ld"
          }
        }
        post: {
          connect: {
            id: "ckgcm1sd700680807waza8p97"
          }
        }
      }
    ){
      id
      text
      author {
        name
      }
    }
  }
  ```
- In GraphQL Playground: fetch all comments
  ```
  {
    comments {
      id
      text
      author {
        id
        name
      }
      post {
        id
        title
      }
    }
  }
  ```

### Integrating Prisma into a Node.js Project
- Integrate Nodejs and Prisma together. Our goal is to allow our Nodejs application to read and write from the Postgres database. Currently, the Prisma GraphQL API can read and write from the Postgres database. Now we need to configure Nodejs to interact with this API, then Nodejs will be able to read and write from the Postgres database
- **Configure Node.js**
  - Copy and paste the following files/folders from graphql-basics directory to graphql-prisma directory
    - node_modules folder
    - src folder
    - .babelrc file
    - package-loc.json file
    - package.json file
  - Install prisma-binding library:
    - cd into graphql-prisma directory and run: `npm i prisma-binding`
    - Gives us bindings for Node.js. It gives us a set of Nodejs methods that we can use to interact with Prisma GraphQL API
  - Inside src folder, create a file called prisma.js. In this file:
    - Import the Prisma constructor function: `import { Prisma } from 'prisma-binding';`
    - Create a connection to a Prisma endpoint using the Prisma constructor function. Store the value in a prisma constant
      - This constructor function takes an object argument. This is the options object and this is where we configure Nodejs to the correct Prisma endpoint
      - We have two provide 2 things in this object:
        - The typeDefs property. The type definitions for the endpoint that we're connecting to. This is necessary so the the prisma-binding library can generate all of the various methods needed
        - The endpoint property. It specifies the actual URL where the Prisma GraphQL API lives
      ```javascript
      import { Prisma } from 'prisma-binding';

      const prisma = new Prisma({
        typeDefs: 'src/generated/prisma.graphql',
        endpoint: 'localhost:4466'
      });
      ```
  - Install graphql-cli (command line interface) tool library:
    - The `graphql get-schema` command. This command allows us to fetch the schema and save it as a file in our project
    - In graphql-prisma directory, run: `npm i graphql-cli @graphql-cli/codegen @graphql-codegen/schema-ast`
  - At the root of the project directory, create a file called .graphqlrc.yml
    - This file contains 2 pieces of information for the configuration: where does the schema live and where should it be saved
    - The name of our project is called prisma and the schema property is where we specify the URL protocol we're using
    - The codegen property is the path where the file should be saved. It is a common practice to create a folder called generated inside the src folder. And inside this generated folder, have a file called prisma.graphql. When we run the script `npm run get-schema`, it'll connect to that endpoint and fetch the schema and store it in our application, in generated/prisma.graphql file. Everything necessary for the Prisma GraphQL API to work lives inside of this file
    ```js
    projects:
        prisma:
          schema:
            - http://localhost:4466
          extensions:
            codegen:
              generates:
                ./src/generated/prisma.graphql:
                  plugins:
                    - schema-ast
    ```
  - Last step to the configuration is creating a get-schema script in package.json file:
    - Install: `npm i fetch-graphql-schema`
    ```js
    "scripts": {
      "get-schema": "fetch-graphql-schema http://localhost:4466 -o src/generated/prisma.graphql -r"
    },
    ```
    - Run: `npm run get-schema`
    - This will generate the generated/prisma.graphql file containing the long-version of the type definitions for Prisma graphQL API
    - If we want to make a change to a field or add another type to the datamodel.graphql, we would deploy to Docker container using `prisma deploy` and then fetch the updated schema by running the graphql-cli script`npm run get-schema`

### Using Prisma Bindings
- Querying data inside Node.js
- Now that we have Prisma bindings set up, we're going to read and write from the database inside of Node.js. We will see what comes back from the prisma object and how we're going to use that to perform all of the graphQL operations
- In prisma.js file:
  ```js
  import { Prisma } from 'prisma-binding';

  const prisma = new Prisma({
    typeDefs: 'src/generated/prisma.graphql',
    endpoint: 'http://localhost:4466'
  });

  // prisma.query prisma.mutation prisma.subscription prisma.exists

  // prisma.query is an object and there are a set of methods we can use on this object
  // The method name matches with the query name
  // All of Prisma methods take 2 arguments:
  // - 1st arg is the operation arg
  // - 2nd arg is the selection set
  // When using a Prisma method, what comes back is a promise. We need to use the then/catch method to wait for the promise to resolve
  // This is an asynchronous operation. It takes time to make a request to the Prisma graphQL API and it takes time for Prisma to make a request to the underlying database
  // Use the .then() method on the Prisma method and pass in a callback to handle the data that comes back
  prisma.query.users(null, '{ id name email posts { id title } }').then((data) => {
    console.log(JSON.stringify(data, undefined, 2));
  });

  prisma.query.comments(null, '{ id, text, post {title} author {id name}}').then((data) => {
		console.log(JSON.stringify(data, undefined, 2));
	});
  ```

### Mutations with Prisma Bindings
- Use prisma.mutation to perform mutations inside Nodejs that allows us to create, update, delete data stored in the database
- In prisma.js file:
  - Promise chaining
    ```js
    prisma.mutation.createPost({
      data: {
        title: "A post from James",
        body: "",
        published: false,
        author: {
          connect: {
            id: "ckgckdkee003y0807rfr971c3"
          }
        }
      }
    }, '{id title body published author {name}}').then((data) => {
      console.log(data)
      return prisma.query.users(null, '{id name}')
    }).then((data) => {
      console.log(JSON.stringify(data, undefined, 2))
    })
    ```
  - **Goal: update a post with mutations**
    - Update the newly created post changing its body and marking it as published
    - Fetch all posts (id, title, body, published) and print them to the console
    - View the list of posts and confirm that post did have its body and published values updated
    ```js
    prisma.mutation.updatePost({
      where: {
        id: "ckgiu6ozv00l008075f5tpn81"
      },
      data: {
        title: "Updated title from James",
        body: "Updated body",
        published: true
      }
    }, '{id body published}').then((data) => {
      console.log(data)
      return prisma.query.posts(null, '{id title body published}')
    }).then((data) => {
      console.log(JSON.stringify(data, undefined, 2))
    }).catch(error => {
      console.log(error)
    })
    ```

### Using Async/Await with Prisma Bindings
- Async/Await function
  ```js
  // 1. Create a new post
  // 2. Fetch all of the info about the user (author)

  // Async/await function
  const createPostForUser = async (authorId, data) => {
    const post = await prisma.mutation.createPost(
      {
        data: {
          ...data,
          author: {
            connect: {
              id: authorId
            }
          }
        }
      },
      '{id}'
    );
    const user = await prisma.query.user(
      {
        where: {
          id: authorId
        }
      },
      '{id name email posts {id title published}}'
    );
    return user;
  };

  // Calling the method
  createPostForUser('ckgcn8djy008b0807zznc12ld', {
    title: 'Great books to read',
    body: 'The War of Art',
    published: true
  }).then((user) => {
    console.log(JSON.stringify(user, undefined, 2));
  });
  ```
- **Goal: Use async/await with prisma bindings**
  - Create "updatePostForUser" that accepts the post id and data to update
  - Update the post (get author id back)
  - Fetch the user associated with the updated post and return the user data
	  - Grab the same fields grabbed for createPostForUser
  - Call the function with the id and data and use a then method call to get the user info
  - Print the user info to the console and test your work
  ```js
  // Async/await function
  const updatePostForUser = async (postId, data) => {
    const updatedPost = await prisma.mutation.updatePost(
      {
        where: {
          id: postId
        },
        data
      },
      '{author {id}}'
    );
    const user = await prisma.query.user(
      {
        where: {
          id: updatedPost.author.id
        }
      },
      '{id name email posts {id title published}}'
    );
    return user;
  };

  // Calling the method
  updatePostForUser('ckgcm1sd700680807waza8p97', {
    published: true,
    title: 'Current books I am reading'
  }).then((user) => {
    console.log(JSON.stringify(user, undefined, 2));
  });
  ```

### Checking If Data Exists Using Prisma Bindings
- Use prisma.exists to verify if data exists
  ```js
  // prisma.exists has one method for every type
  // The name of the method is the name of the type. For example, User, Comment, Post
  // These exists methods take a single object argument
  // These exists methods return a promise and that promise resolves to a boolean value, true or false
  prisma.exists.Comment({
    id: "ckgcnocva009o0807duxn01lj"
  }).then((exists) => {
    console.log(exists)
  })
  ```
- **Improve the createPostForUser function**
  - Use prisma.exists to verify that the user exists before creating a post
  - If user doesn't exist, throw an error
  - Note that the 2nd arg we're specifying the author info as the selection set we want to get back, we want to return `post.author`
  ```js
  const createPostForUser = async (authorId, data) => {
    const userExists = await prisma.exists.User({ id: authorId });

    if (!userExists) {
      throw new Error('User not found');
    }

    const post = await prisma.mutation.createPost(
      {
        data: {
          ...data,
          author: {
            connect: {
              id: authorId
            }
          }
        }
      },
      '{author {id name email posts {id title published}}}'
    );
    return post.author;
  };
  ```
- **Goal: Improve the updatePostForUser function**
  - Use prisma.exists to verify that the post exists
	  - If there is no post with that id, throw an error
  - Remove the unnecessary user query by updating the selection set for updatePost
  - Add a catch method call to catch and print errors
  - Test by updating an existing post and a non-existent post
  ```js
  const updatePostForUser = async (postId, data) => {
    const postExists = await prisma.exists.Post({ id: postId });

    if (!postExists) {
      throw new Error('Post not found');
    }

    const updatedPost = await prisma.mutation.updatePost(
      {
        where: {
          id: postId
        },
        data
      },
      '{author {id name email posts {id title body published}}}'
    );
    return updatedPost.author;
  };

  // Calling the method
  updatePostForUser('ckgcm1sd700680807waza8p97', {
    published: true,
    title: 'Books I enjoy reading',
    body: 'LiveWired'
  })
    .then((user) => {
      console.log(JSON.stringify(user, undefined, 2));
    })
    .catch((error) => {
      console.log(error.message);
    });
  ```

### Customizing Type Relationships
- If we try to delete a user, we will get an error because in the Post and Comment type, we made the author field of non-nullable value type. We can't delete a user because the User type has a relationship with the Post and Comment types
- We can customize type relationships using the `@relation` directive
  - The @relation directive allows us to modify the default behavior when there's a relationship between two types
  - The name property can be whatever we want to specify it
  - By default, the value of onDelete property of a given field is `SET_NULL`
  - Set it to `CASCADE` to overwrite the default behavior
- In datamodel.prisma file:
  ```
  # SET_NULL (default) - CASCADE

  type User {
    id: ID! @id
    name: String!
    email: String! @unique
    posts: [Post!]! @relation(name: "PostToUser", onDelete: CASCADE)
    comments: [Comment!]! @relation(name: "CommentToUser", onDelete: CASCADE)
  }

  type Post {
    id: ID! @id
    title: String!
    body: String!
    published: Boolean!
    author: User! @relation(name: "PostToUser", onDelete: SET_NULL)
    comments: [Comment!]! @relation(name: "CommentToPost", onDelete: CASCADE)
  }

  type Comment {
    id: ID! @id
    text: String!
    author: User! @relation(name: "CommentToUser", onDelete: SET_NULL)
    post: Post! @relation(name: "CommentToPost", onDelete: SET_NULL)
  }
  ```
- Since we've updated the type definitions in datamodel.prisma file, we need to deploy this to the Docker container to update the Prisma GraphQL API service
  - cd into graphql-prisma/prisma directory and run: `prisma deploy`

### Modeling a Review System with Prisma
- **Steps to creating a new Prisma project**
  - Create a new Prisma directory. Name it whatever we like. This directory contains:
    - A datamodel.prisma file: all type definitions are defined in here 
    - A prisma.yml file: contains the endpoint and datamodel properties
      - Make the endpoint be descriptive to the prisma project
    - Does not need another docker-compose.yml file: only need to set up once
  - Deploy the prisma project to Docker container using `prisma deploy`. Make sure to tbe in this project directory when deploying
  - If successfully deployed, the endpoint URL will be provided to the Prisma graphQL API Playground
- **Goal: Model a review website using prisma**
  - Define Book, User, and Review with their scalar fields
  - Configure the relationships between the types
    - Deleting a book should delete its reviews
    - Deleting a user should delete its reviews
  - Deploy the application
  - Test your work from the prisma playground
    - Create a book
    - Crate two users
    - Have each user leave a review for the book
    - Delete a user and ensure its review goes away
    - Delete the book and ensure the other review goes away
  - In datamodel.prisma file:
    ```
    type User {
      id: ID! @id
      username: String! @unique
      reviews: [Review]! @relation(name: "ReviewToUser", onDelete: CASCADE)
    }

    type Review {
      id: ID! @id
      text: String
      rating: Int!
      book: Book! @relation(name: "BookToReview", onDelete: SET_NULL)
      author: User! @relation(name: "ReviewToUser", onDelete: SET_NULL)
    }

    type Book {
      id: ID! @id
      title: String!
      author: String!
      isbn: String!
      reviews: [Review!]! @relation(name: "BookToReview", onDelete: CASCADE)
    }
    ```


## S6: AUTHENTICATION WITH GRAPHQL

### Adding Prisma into GraphQL Queries
- We don't want any users to be able to directly interact with the Prisma GraphQL API because they can read and write from the database like deleting other users' data. So we want Node.js to be the middleman. This is going to allow us to set up things like authentication and data validation. This can be customized to our needs
- Put Node.js between the public users and the Prisma GraphQL API
- In graphql-prisma/src/prisma.js file:
  - Export as default the prisma instance. This way, other files can use the prisma instance
  - `export { prisma as default };`
- In graphql-prisma/src/index.js file:
  - Import the prisma instance: `import prisma from './prisma';`
  - Add the prisma instance to the context object when initializing the server
  - This way, prisma object is accessible to all of resolver functions
  ```js
	context: {
		db,
		pubsub,
		prisma
	}
  ```
- In graphql-prisma/src/resolvers/Query.js file:
  - In the end, we want to use prisma.query, prisma.mutation, prisma.exists etc inside these methods to interact with the Postgres database
  - In users resolve method, destructure the prisma instance from context param
  - Use the .users() query method on prisma.query to fetch the users from the database based on the info object param
  - The return value is the value we get back from the promise
    ```js
    const Query = {
      users(parent, args, { prisma }, info) {
        // prisma.query is an object
        // .users() is one of the prisma query methods
        // The 2nd arg to a query method can be nothing/null, string, or an object
        // We're going to provide an object as a 2nd arg and this object is provided by the client when they make a query operation and it is stored inside the info object param
        // So we pass in the info object as a 2nd arg here
        // What we get back from this query method is a promise
        // A resolver method, like users(), can return the value from the data we get back
        return prisma.query.users(null, info)
      }
    }
    ```
  - Test out this method by querying all users in the GraphQL Playground for Node.js: `http://localhost:4000/`
  - graphql-yoga uses port 4000 as the default port
  - **Goal: Modify posts query to return posts from the database**
    - Comment out existing code
    - User the correct prisma method
      - Ignore operation arguments for now
    - Run the posts query on the Node.js GraphQL API to verify it works
      - Just ask for scalar fields
    ```js
    posts(parent, args, { prisma }, info) {
      return prisma.query.posts(null, info)
    }
    ```

### Integrating Operation Arguments
- In graphql-prisma/src/resolvers/Query.js file:
  ```js
  const Query = {
    users(parent, args, { prisma }, info) {
      // Provide operation arguments to prisma
      // An empty object is equivalent to null
      const opArgs = {};

      // Check if the client provides a query argument in query operation
      // To know which operation arguments to provide, refer to the schema tab in the GraphQL Playground
      // We are looking for the 'where' argument
      if (args.query) {
        opArgs.where = {
          OR: [
            {
              name_contains: args.query
            },
            {
              email_contains: args.query
            }
          ]
        };
      }

      // Pass in the operation arguments as 1st arg
      return prisma.query.users(opArgs, info);
    }
  }
  ```
  - **Goal: Modify posts to support the query argument**
    - Set up an object for operation arguments
    - If query is provided, modify object to return only posts that have string in title or body
    - Test your work by performing a few different queries
    ```js
    posts(parent, args, { prisma }, info) {
      const opArgs = {};

      if (args.query) {
        opArgs.where = {
          OR: [
            {
              title_contains: args.query
            },
            {
              body_contains: args.query
            }
          ]
        };
      }

      return prisma.query.posts(opArgs, info);
    }  
    ```
- Perform the query operation for users and posts with query argument
  ```
  query {
    users (
      query: "s@example.com"
    ) {
      id
      name
      email
    }
  }

  query {
    posts (
      query: "enjoy"
    ) {
      id
      title
      body
      published
    }
  }
  ```

### Refactoring Custom Type Resolvers
- **Goal: Convert the comments query over to Prisma**
  - Modify the comments query to fetch data from prisma
  - Modify code to allow for relational requests when using comments query
  - Test your work by performing a few different queries
  - In graphql-prisma/src/resolvers/Query.js file:
    ```js
    const Query = {
      // Destructure prisma instance from context param
      comments(parent, args, { prisma }, info) {
        // Use the .comments() query method on prisma.query to fetch comments from the database based on the provided info object by the client
        // The return value is the data we get back from the resolved promise of the query method
        return prisma.query.comments(null, info)
      },
    }
    ```
  - In graphql-prisma/src/resolvers/Comment.js file:
    - By leaving the Comment type empty, this allows prisma to handle all the work for relational requests when using comments query
    ```js
    const Comment = {

    };

    export { Comment as default };
    ```
- Convert the users and posts query over to Prisma by following the same steps above
- In GraphQL Playground:
  ```
  query {
    users {
      id
      name
      email
      posts {
        id
        title
      }
    }
  }

  query {
    posts {
      id
      title
      body
      published
      author {
        name
      }
    }
  }

  query {
    comments {
      id
      text
      author {
        name
      }
    }
  }
  ```

### Adding Prisma into GraphQL Mutations
- In graphql-prisma/src/resolvers/Mutation.js file:
  - Integrate prisma in Node.js resolver functions so it can interact with the database
  - In the createUser mutation resolver function:
    ```js
    const Mutation = {
      // This function is an async operation
      // Destructure the prisma instance from context param
      async createUser(parent, args, { prisma }, info) {
        // This method takes 2 args:
        // - 1st arg is the data the client provides when they try to create a user
        // - 2nd arg is the info object, what the client wants in return
        // This prisma .createUser() method returns a promise
        // Our createUser() resolve function can return the value coming back from the promise
        // Since we're returning the value, we can leave off the await keyword in front of the method and add the return keyword
        return prisma.mutation.createUser({ data: args.data }, info)
      }
    }
    ```
  - **Goal: Wire up deleteUser to work with the Prisma database**
    - Refactor the deleteUser mutation resolver to use prisma instead of the array data
      - Check that a user exists with that id, else throw error. Delete and return the user
      - Don't worry about removing posts or comments. That was configured with @relation
    - Test your work by removing a user and verifying they were delete from the database
      ```js
      const Mutation = {
        async deleteUser(parent, args, { prisma }, info) {
          // 1st arg is the operation arguments
          // 2nd arg is the info object, what the client wants back in return
          return prisma.mutation.deleteUser({where: {id: args.id}}, info)
        }
      }
      ```
- In GraphQL API Playground for Node.js:
  ```
  mutation {
    createUser(
      data: {
        name: "Jess"
        email: "jess@example.com"
      }
    ) {
      id
      name
      email
    }
  }

  mutation {
    deleteUser(id: "ckgckdkee003y0807rfr971c3") {
      id
      name
      email
    }
  }
  ```

### Adding Prisma into GraphQL Update, Delete, and Create Mutations
- In graphql-prisma/src/resolvers/Mutation.js file:
  - In the updateUser mutation resolver function:
    ```js
    const Mutation = {
      // Mark this resolver function an async function
      async updateUser(parent, args, { prisma }, info) {
        // 1st arg is the operation arguments. The where property is the user that we want to update. The data property is what we want to update
        // 2nd arg is the info object
        // Return the value from the promise
        return prisma.mutation.updateUser(
          {
            where: {
              id: args.id
            },
            data: args.data
          },
          info
        );
      }
    }
    ```
  - **Goal: Refactor the createPost mutation to use Prisma**
    - Refactor createPost mutation resolver to use prisma instead of the array data
      - Don't worry about pubsub or subscriptions
    - Test the mutation from localhost:4000
    ```js
    const Mutation = {
      async createPost(parent, args, { prisma }, info) {
        return prisma.mutation.createPost(
          {
            data: {
              title: args.data.title,
              body: args.data.body,
              published: args.data.published,
              author: {
                connect: {
                  id: args.data.author
                }
              }
            }
          },
          info
        );
      }
    }
    ```
  - **Goal: Refactor the deletePost mutation to use Prisma**
    - Refactor deletePost mutation resolver to use prisma instead of the array data
      - Don't worry about pubsub or subscriptions
    - Test the mutation from localhost:4000
    ```js
    const Mutation = {
      // Mark this is an async function
      // Destructure the prisma instance from context param
      async deletePost(parent, args, { prisma }, info) {
        return prisma.mutation.deletePost({ where: { id: args.id } }, info);
      }
    }
    ```
  - **Goal: Refactor the updatePost, createComment, deleteComment, updateComment mutations to use Prisma**
    ```js
    const Mutation = {
      updatePost(parent, args, { prisma }, info) {
        return prisma.mutation.updatePost(
          {
            where: {
              id: args.id
            },
            data: args.data
          },
          info
        );
      },
      createComment(parent, args, { prisma }, info) {
        return prisma.mutation.createComment(
          {
            data: {
              text: args.data.text,
              author: {
                connect: {
                  id: args.data.author
                }
              },
              post: {
                connect: {
                  id: args.data.post
                }
              }
            }
          },
          info
        );
      },
      updateComment(parent, args, { prisma }, info) {
        return prisma.mutation.updateComment(
          {
            where: {
              id: args.id
            },
            data: args.data
          },
          info
        );
      },
      deleteComment(parent, args, { prisma }, info) {
        return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
      }
    }
    ```
- Perform the updateUser mutation in GraphQL Playground:
  ```
  mutation {
    updateUser(
      id: "ckgl7yrdm04hz08074kfa39s7"
      data: {
        name: "Jesse James"
        
      }
    ) {
      id
      name
      email
    }
  }

  mutation {
    createPost(data: {
      title: "A great new book"
      body: "I highly recommend this book"
      published: true
      author: "ckgl7yrdm04hz08074kfa39s7"
    }) {
      id
      title
      body
      published
      author {
        name
      }
    }
  }

  mutation {
    deletePost(id: "ckgivpphc00m30807c3bka757") {
      id
      title
      body
      author {
        name
      }
    }
  }

  mutation {
    updatePost(
      id: "ckglbhwqt04jk0807qbadz46h"
      data: {
        title: "An updated title"
        body: "..."
        published: false
    }) {
      id
      title
      body
      published
      author {
        name
      }
    }
  }
  ```

### Adding Prisma into GraphQL Subscriptions
- In graphql-prisma/src/resolvers/Subscription.js file:
  - **Goal: Set up the post subscription to work with prisma**
    - Update schema.graphql to use "node" as nullable instead of "data" for post
    - Update the subscribe method to use the correct prisma method
      - Limit the subscription to posts that are published using "where" argument
    - Test your work. Subscribe to posts and then create a published and unpublished post
  ```js
  const Subscription = {
    comment: {
      subscribe(parent, { postId }, { prisma }, info) {
        return prisma.subscription.comment(
          {
            where: {
              node: {
                post: {
                  id: postId
                }
              }
            }
          },
          info
        );
      }
    },
    post: {
      subscribe(parent, args, { prisma }, info) {
        return prisma.subscription.post(
          {
            where: {
              node: {
                published: true
              }
            }
          },
          info
        );
      }
    }
  };

  export { Subscription as default };
  ```
- In graphql-prisma/src/schema.graphql file:
  ```
  type PostSubscriptionPayload {
    mutation: MutationType!
    node: Post
  }

  type CommentSubscriptionPayload {
    mutation: MutationType!
    node: Comment
  }
  ```
- Subscribe to a post in GraphQL Playground:
  ```
  subscription {
    post {
      mutation
      node {
        id
        title
        body
        author {
          name
        }
      }
    }
  }

  mutation {
    createPost(data: {
      title: "Secret Stories by Samantha"
      body: "..."
      published: true
      author: "ckgcn8djy008b0807zznc12ld"
    }) {
      id
      title
      body
      published
      author {
        name
      }
    }
  }
  ```

### Closing Prisma to the Outside World
- Right now, the Prisma API is open to the public, allowing anyone to read and write from the database without needing to authenticate. That's a problem. We need to lock down access to the Prisma API. What we want is have the client pass all the requests through Node to get the data. What we need to set up is a Prisma secret, a password in order to communicate with Prisma API. So we set up the password in the Nodejs backend and the Prisma backend
- **Configuring a Prisma Secret:**
  - To restrict access to the database, Prisma allows a secret to be configured. The secret, similar to a password, is required in order to read or write from the database using the Prisma API
  - That can be done by adding a single line to prisma.yml file:
    ```yml
    endpoint: http://localhost:4466
    datamodel: datamodel.graphql
    secret: secrettexthere
    ```
  - Then redeploy the Prisma app
    - cd into graphql-prisma/prisma directory and run: `prisma deploy`
  - We don't want to lock everyone out of Prisma. The secret should be shared with the Node.js application, giving it exclusive rights to interact with the Prisma API. That can be done by adding `secret` onto the options object for the `prisma-binding` constructor functions
  - In graphql-prisma/src/prisma.js file:
    ```js
    import { Prisma } from 'prisma-binding';

    const prisma = new Prisma({
      typeDefs: 'src/generated/prisma.graphql',
      endpoint: 'http://localhost:4466',
      secret: 'secrettexthere'
    });

    export { prisma as default };
    ```
- **Generating Access Tokens:**
  - We can still access the Prisma API from GraphQL playground for development purposes by setting up an authorization token. First, generate a token
    - cd into graphql-prisma/prisma directory and run: `prisma token`
    - Copy this token
  - From there, we'll want to set up an HTTP authorization header that uses the generated token
    - In the GraphQL API playground for Prisma (port 4466), click on the "HTTP HEADERS" tab and provide the authorization token:
      ```
      {
        "Authorization":"Bearer PasteTheGeneratedTokenHere"
      }
      ```
    - Now we can use the GraphQL playground to interact with the database

### Allowing for Generated Schemas
- In graphql-prisma/prisma/datamodel.prisma file:
  - Add a password field of non-nullable String type to the User type
  ```
  type User {
    id: ID! @id
    name: String!
    email: String! @unique
    password: String!
    posts: [Post!]! @relation(name: "PostToUser", onDelete: CASCADE)
    comments: [Comment!]! @relation(name: "CommentToUser", onDelete: CASCADE)
  }
  ```
- In graphql-prisma/src/schema.graphql file:
  - Add a password field of non-nullable String type to the User type
  ```
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    posts: [Post!]!
    comments: [Comment!]!
  }
  ```
- What we want to do next is wipe out our database and redeploy to add this new field to Postgres database
  - cd into graphql-prisma/prisma directory and run: `prisma delete`
  - Then run: `prisma deploy`
- Since we made a change to the datamodel.prisma file, we need to re-generate the prisma.graphql file by running the `prisma generate` command
  - cd into graphql-prisma/prisma directory and run: `prisma generate`
  - However, before running this command, in prisma.yml file:
    - Add this code to the file
    ```yml
    generate:
      - generator: graphql-schema
        output: ../src/generated/prisma.graphql
    ```
  - NOTE: the `prisma generate` command replaces the `npm run get-schema` script

### Storing Passwords
- **STEPS: Take in password -> Validate password -> Hash password -> Generate auth token**
- **Step 1: Take in password**
  - In graphql-prisma/src/schema.graphql file:
    - Add the password field to the CreateUserInput input. This input is used as value type of data argument for createUser mutation
      ```
      type Mutation {
        createUser(data: CreateUserInput): User!
      }

      input CreateUserInput {
        name: String!
        email: String!
        password: String!
      }
      ```
    - Now, whenever someone runs the createUser mutation operation, they must provide a password
- **Step 2: Validate password**
  - We're going to validate the password's length. Must be at least 8 chars long
  - In graphql-prisma/src/resolvers/Mutation.js file:
    ```js
    const Mutation = {
      async createUser(parent, args, { prisma }, info) {
        // Password validation
        if (args.data.password.length < 8) {
          throw new Error('Password must be 8 characters or longer')
        }

        return prisma.mutation.createUser({ data: args.data }, info);
      }
    }
    ```
- **Step 3: Hash password**
  - It's not a good idea to store plain text passwords in the database. Instead, we're going to pass the plain text passwords through a hashing algorithm. We're going to use the bcrypt algorithm, an npm module
  - Install bcrypt.js: `npm i bcryptjs`
  - In graphql-prisma/src/resolvers/Mutation.js file:
    - Import bcrypt.js: `import bcrypt from 'bcryptjs';`
    - In createUser resolver function:
      - Use the bcrypt.hash() method to hash the plain-text password
      ```js
      const Mutation = {
        async createUser(parent, args, { prisma }, info) {
          // Password validation
          if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer');
          }

          // The bcrypt.hash() method takes in plain text and returns the hashed version
          // It takes 2 arguments:
          //	- 1st arg is the plain text password
          //	- 2nd arg is a salt, we provide the length of salt we want to use
          // A salt is a random series of chars that are hashed along with the string being hashed, making the hash password more secure
          // This method returns a promise. That promise resolves with the hash value
          // We're going to await that promise
          // Store the hash value in a password variable
          const password = await bcrypt.hash(args.data.password, 10);

          // This method takes 2 args:
          // - 1st arg is the data the client provides when they try to create a user
          // - Here, we use the spread operator to spread the existing data the client provides
          // - But for the password property, we take its value and pass it through the bcrypt.hash() method and return the hashed version here
          // - 2nd arg is the info object, what the client wants in return
          // This prisma .createUser() method returns a promise
          // Our createUser() resolve function can return the value coming back from the promise
          // Since we're returning the value, we can leave off the await keyword in front of the method and add the return keyword
          return prisma.mutation.createUser(
            {
              data: {
                ...args.data,
                password
              }
            },
            info
          );
        }
      }
      ```
- Perform a createUser mutation in GraphQL playground for Node.js localhost:4000:
  ```
  mutation {
    createUser(
      data: {
        name: "Jess"
        email: "jess@example.com"
        password: "jess1234"
      }
    ) {
      id
      name
      email
    }
  }
  ```
  - Go to pgAdmin browser and see that a hash password has been generated for the new user

### Creating Auth Tokens with JSON Web Tokens
- JSON Web Tokens, also known as JWTs, provide us with a secure way to create authentication tokens for our application
- A JWT is nothing more than a string. When a user signs up or logs in to the application, a JWT will be generated and provided to them. The client can then store this token and send it along with future requests to authenticate itself
- **Creating a token:**
  ```js
  // The jwt.sign() method creates a new token
  // It takes 2 arguments:
  // 	- 1st arg is a payload object and it can have anything we want in it
  // 	- 2nd arg is a secret and it's used to verify the integrity of a token. It's only going to live on the Node.js server. The secret can be anything
  // What's returned from this method is a token. Save it to a token variable
  const token = jwt.sign({ id: 46 }, 'mysecret')
  console.log(token)
  ```
- **Decoding a token:**
  ```js
  // The jwt.verify() method verifies that a token was created by a particular server
  // This method decodes the token and also verifies that the token was created with a specific secret. This is how we ensure that the tokens we're reading are tokens created by that particular server
  // This method takes 2 arguments:
  //	- 1st arg is the token we want to verify
  //  - 2nd arg is the secret
  // If the token wasn't created with the same secret, this verify method will fail
  // This method returns the token string, the decoded data object, and the decoded and verified data object
  // The decoded data contains the payload when the token was created and the 'issued at' timestamp
  // The client cannot tamper with the token because the client won't ever know that secret, therefore they can never be able to generate the same token. Only the server that generated the token knows the secret
  const decoded = jwt.verify(token, 'mysecret')
  console.log(decoded)
  ```
- **Step 4: Generate auth token**
  - Install JSON Web Token: `npm i jsonwebtoken`
  - In graphql-prisma/src/resolvers/Mutation.js file:
    - Import jwt: `import jwt from 'jsonwebtoken';`
    ```js
    const Mutation = {
      async createUser(parent, args, { prisma }, info) {
        if (args.data.password.length < 8) {
          throw new Error('Password must be 8 characters or longer');
        }

        const password = await bcrypt.hash(args.data.password, 10);
        const user = await prisma.mutation.createUser(
          {
            data: {
              ...args.data,
              password
            }
          },
          info
        )

        // What we want to return from this function is an object that contains the user information and the generated auth token
        return {
          user,
          token: jwt.sign({userId: user.id}, 'thisisasecret')
        }
      }
    }
    ```
  - When someone runs the createUser mutation, we no longer just returning a User model, we're returning an auth token as well. We need to modify our createUser mutation type in schema.graphql file
  - In graphql-prisma/src/schema.graphql file:
    ```
    type Mutation {
      createUser(data: CreateUserInput): AuthPayload!
    }

    type AuthPayload {
      token: String!
      user: User!
    }
    ```
- Perform a createUser mutation in GraphQL Playground:
  ```
  mutation {
    createUser(
      data: {
        name: "Andrew"
        email: "andrew@example.com"
        password: "andrew1234"
      }
    ) {
      user {
        id
        name
        email
      }
      token
    }
  }
  ```

### Logging in Existing Users
- **Comparing passwords:**
  - When a user logs into our application, they're going to give their email and  password. We need to compare that email and password with the email and hashed password in the database
  - The bcrypt.compare() method compares the plain-text password with the hashed password
  - This method takes 2 arguments:
    - 1st arg is the password
    - 2nd arg is the hashed password
  - This is an async operation. The resolved value that comes back is either true or false
  ```js
  const dummy = async () => {
    const email = 'andrew@example.com'
    const password = 'andrew1234'

    const hashedPassword = '$2a$10$Z7l3Wlk/aqkN7qe/80VJveonARgvta29YNjZiggssttwsrhIkcFhS'
    
    const isMatch = await bcrypt.compare(password, hashedPassword)
    console.log(isMatch)
  }
  dummy()
  ```

**Goal: Create a login mutation**
- Part I: Create the mutation:
  - Define the mutation in schema.graphql
    - It should accept email/password as arguments
    - It should return AuthPayload
  - Define the mutation resolver method in Mutation.js with 4 arguments 
- Part II: Verify email and password:
  - Query for user by email. Just need scalar fields
    - If no user, throw an error
  - Verify hashed user password by the plain text password argument
    - If not a match, throw an error
- Part III: Send back the user with a new token:
  - Send back an object that match up with AuthPayload
    - Generate a new JWT using the same secret used in createUser
  - Login with existing user and get back user details and auth token
- In graphql-prisma/src/schema.graphql file:
  ```
  type Mutation {
    login(data: LoginUserInput): AuthPayload!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input LoginUserInput {
    email: String!
    password: String!
  }
  ```  
- In graphql-prisma/src/resolvers/Mutation.js file:
  - Import bcrypt.js: `import bcrypt from 'bcryptjs';`
  - Import jwt: `import jwt from 'jsonwebtoken';`
  ```js
  const Mutation = {
    async login(parent, args, { prisma }, info) {
      const user = await prisma.query.user({
        where: {
          email: args.data.email
        }
      });

      if (!user) {
        throw new Error('Unable to login');
      }

      const isMatch = await bcrypt.compare(args.data.password, user.password);

      if (!isMatch) {
        throw new Error('Unable to login');
      }

      const token = jwt.sign({ userId: user.id }, 'thisisasecret');

      return { user, token };
    }
  }
  ```
- Perform login mutation as existing user in GraphQL Playground (port 4000):
  ```
  mutation {
    login (
      data: {
        email: "nga@example.com"
        password: "nga12345"
      }
    ) {
      user {
        id
        name
      }
      token
    }
  }
  ```

### Validating Auth Tokens
- **Providing the token with the request:**
  - To authenticate a user in the Node.js GraphQL API, the client will send along an authentication header that includes the auth token provided when either signing up or logging in
  - In the 'HTTP HEADERS' tab in the GraphQL Playground when making an operation:
    ```
    {
      "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJja2dtc3Rnc3kwYzlvMDgwN3F0bnhod2hpIiwiaWF0IjoxNjAzNTc0NjUzfQ.GV4jq-FhQ4h5noDdOjhzSquXJRzaVogIy-ER50QWubA"
    }
    ```
- **Validating the token:**
  - In the Node.js application, the goal is to get the head into the resolver methods by adding it onto the application context. The `context` property can be set equal to an object or a function. This function is called with a single argument which contains information about the request. That's where the authorization header lives
  - In graphql-prisma/src/index.js file:
    ```js
    const server = new GraphQLServer({
      typeDefs: './src/schema.graphql',
      resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
      },
      context(request) {
        return {
          db,
          pubsub,
          prisma,
          request
        };
      }
    });
    ```
  - With `request` being added onto the context, it can now be used inside the resolver methods
  - In graphql-prisma/src/resolvers/Mutation.js file:
    - Import the getUserId function: `import getUserId from '../utils/getUserId';`
    - Implement user authentication in createPost resolver function
      ```js
      const Mutation = {
        // Destructure request from context param
        createPost(parent, args, { prisma, request }, info) {
          // Call the getUserId function and pass in the request
          // This method validates the client token. If it's successful, it'll return the user id
          const userId = getUserId(request);

          // This code only runs if there's a userId, which means, the user is an authenticated user
          return prisma.mutation.createPost(
            {
              data: {
                title: args.data.title,
                body: args.data.body,
                published: args.data.published,
                author: {
                  connect: {
                    id: userId
                  }
                }
              }
            },
            info
          );
        }
      }
      ```
  - When making a createPost mutation, the client no longer required to provide an author id. Only an authenticated user can create a post
  - In schema.graphql file:
    - In the CreatePostInput input, remove the author field
    ```
    input CreatePostInput {
      title: String!
      body: String!
      published: Boolean!
    }
    ```
- **Create a getUserId utility function:**
  - This getUserId function extracts the token from the authorization headers, verifying the token, and returning the authenticated user id. This function will throw an error if authentication fails for any reason
  - In src/utils folder, create a file called getUserId.js
  - In getUserId.js file:
    ```js
    import jwt from 'jsonwebtoken';

    const getUserId = (request) => {
      const header = request.request.headers.authorization;

      if (!header) {
        throw new Error('Authentication required');
      }

      const token = header.replace('Bearer ', '');
      // This method returns the token and the data object (contains the payload and issued time)
      const decoded = jwt.verify(token, 'thisisasecret');

      // userId is the payload
      return decoded.userId;
    };

    export { getUserId as default };
    ```

### Locking Down Mutations (Users): updateUser, deleteUser, and deletePost
- Only an authenticated user can update their own profile or delete their own account. So when someone is requesting an updateUser or deleteUser mutation, they no longer need to provide a user id. The user id will come from the authentication. To update a user, they just need to provide the data they want to update and the token. To delete a user, they need to provide a token. To delete a post, they need to provide the post id and the token
- In schema.graphql file:
  - Remove the required id argument from the updateUser mutation
  - Remove the required id argument from the deleteUser mutation
  ```
  type Mutation {
    updateUser(data: UpdateUserInput!): User!
    deleteUser: User!
    deletePost(id: ID!): Post!
  }
  ```
- In graphql-prisma/src/resolvers/Mutation.js file:
  ```js
  const Mutation = {
    // Destructure request from context param
    async updateUser(parent, args, { prisma, request }, info) {
      // Call the getUserId function and pass in the request
      const userId = getUserId(request)

      // The userId comes from authentication
      return prisma.mutation.updateUser(
        {
          where: {
            id: userId
          },
          data: args.data
        },
        info
      );
    },
    async deleteUser(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);

      // 1st arg is the operation arguments
      // 2nd arg is the info object, what the client wants back in return
      return prisma.mutation.deleteUser({ where: { id: userId } }, info);
    },
    // Mark this as an async function
    async deletePost(parent, args, { prisma, request }, info) {
      // Check to see if this is an authenticated user
      const userId = getUserId(request);
      // Check to see if there is a post created by this authenticated user
      // Only the author of the post can delete the post
      // prisma.exists returns a promise, which resolves in a boolean value
      const postExists = await prisma.exists.Post({
        id: args.id,
        author: {
          id: userId
        }
      });

      if (!postExists) {
        throw new Error('Unable to delete post');
      }

      // This code only runs if postExists is true, meaning that this post can be deleted by this authorized user
      return prisma.mutation.deletePost({ where: { id: args.id } }, info);
    }
  }
  ```

### Locking Down Mutations (Posts and Comments)
- **Goal: Lock down updatePost**
  - Validate the authentication token
  - Check if that post exists with the post id and the correct author id
    - Else throw an error
- **Goal: Lock down createComment**
  - Validate the authentication token
  - Update mutation to no longer accept author id
  - Create comment with the authenticated user as the author
- **Goal: Lock down deleteComment and updateComment**
- In schema.graphql file:
  - In the CreateCommentInput input, remove the author field
    ```
    type Mutation {
      createComment(data: CreateCommentInput): Comment!
    }
    input CreateCommentInput {
      text: String!
      post: ID!
    }
    ```
- In graphql-prisma/src/resolvers/Mutation.js file:
  ```js
  const Mutation = {
    async updatePost(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);

      const postExists = await prisma.exists.Post({
        id: args.id,
        author: {
          id: userId
        }
      });

      if (!postExists) {
        throw new Error('Unable to update post');
      }

      return prisma.mutation.updatePost(
        {
          where: {
            id: args.id
          },
          data: args.data
        },
        info
      );
    },
    createComment(parent, args, { prisma, request }, info) {
      const userId = getUserId(request)

      return prisma.mutation.createComment(
        {
          data: {
            text: args.data.text,
            author: {
              connect: {
                id: userId
              }
            },
            post: {
              connect: {
                id: args.data.post
              }
            }
          }
        },
        info
      );
    },
    async deleteComment(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);
      const commentExists = await prisma.exists.Comment({
        id: args.id,
        author: {
          id: userId
        }
      });

      if (!commentExists) {
        throw new Error('Unable to delete comment');
      }

      return prisma.mutation.deleteComment({ where: { id: args.id } }, info);
    },
    async updateComment(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);
      const commentExists = await prisma.exists.Comment({
        id: args.id,
        author: {
          id: userId
        }
      });

      if (!commentExists) {
        throw new Error('Unable to update comment');
      }

      return prisma.mutation.updateComment(
        {
          where: {
            id: args.id
          },
          data: args.data
        },
        info
      );
    }
  }
  ```

### Locking Down Queries: post, me, posts, myPosts
- In graphql-prisma/src/schema.graphql file:
  - Add a post id as a required argument for post query
  ```
  type Query {
    users(query: String): [User!]!
    posts(query: String): [Post!]!
    comments: [Comment!]!
    me: User!
    post(id: ID!): Post!
  }
  ```
- In graphql-prisma/src/resolvers/Query.js file:
  - Import the getUserId function: `import getUserId from '../utils/getUserId';`
  - Make user authentication optional for post query
    ```js
    const Query = {
      // Mark this as an async function
      async post(parent, args, { prisma, request }, info) {
        // Check if the user is an authenticated user
        // If the user is authenticated, userId will get set to their string id
        // If the user is not authenticated, userId will get set to null
        const userId = getUserId(request, false);

        // Get the post by id. It also makes sure that the post is either published or owned by the authenticated user
        const posts = await prisma.query.posts(
          {
            where: {
              id: args.id,
              OR: [
                {
                  published: true
                },
                {
                  author: {
                    id: userId
                  }
                }
              ]
            }
          },
          info
        );

        if (posts.length === 0) {
          throw new Error('Post not found');
        }

        return posts[0];
      }
    }
    ```
- In graphql-prisma/src/utils/getUserId.js file:
  - Modify this function so that authentication can be optional
  - Add a 2nd argument, requireAuth, to getUserId function and set its default value to true. By default, authentication is required
  - This 2nd arg determines if authentication is required or optional. If authentication is marked as optional and the user isn't authenticated, null will be returned instead of the user id
    ```js
    import jwt from 'jsonwebtoken';

    const getUserId = (request, requireAuth = true) => {
      const header = request.request.headers.authorization;

      // If there is a header, get the token, verify the token, and return the user id
      if (header) {
        const token = header.replace('Bearer ', '');
        // This method returns the token and the data object (contains the payload and issued time)
        const decoded = jwt.verify(token, 'thisisasecret');

        // userId is the payload
        return decoded.userId;
      }

      // If a resolver requires authentication and the user is not authenticated, throw an error
      if (requireAuth) {
        throw new Error('Authentication required');
      }

      // If authentication is marked optional and the user isn't authenticated, return null instead of the user id
      return null;
    };

    export { getUserId as default };
    ```
- **Goal: Lock down me query**
  - Require authentication
  - Use correct prisma query to get/return user by their id
  - In graphql-prisma/src/resolvers/Query.js file:
    ```js
    const Query = {
      async me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        return prisma.query.user({
          where: {
            id: userId
          }
        });
      }
    }
    ```
- For the posts query, we only want to send back published posts
  ```js
  const Query = {
    posts(parent, args, { prisma }, info) {
      // We're only getting posts where published is true
      const opArgs = {
        where: {
          published: true
        }
      };

      // If query argument is provided
      if (args.query) {
        opArgs.where.OR = [
          {
            title_contains: args.query
          },
          {
            body_contains: args.query
          }
        ];
      }

      return prisma.query.posts(opArgs, info);
    }
  }
  ```
- **Goal: Create a query for accessing your posts (myPosts)**
  - Define the query in schema.graphql
    - Accept optional query string. Return array of posts
  - Require authentication
  - Setup opArgs to just fetch posts by the authenticated user
  - Setup support for query argument list with posts
  - Use correct prisma query to get/return data
  - In graphql-prisma/src/schema.graphql file:
    ```
    type Query {
      myPosts(query: String): [Post!]!
    }
    ```
  - In graphql-prisma/src/resolvers/Query.js file:
    ```js
    const Query = {
      async myPosts(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);
        const opArgs = {
          where: {
            author: {
              id: userId
            }
          }
        };

        if (args.query) {
          opArgs.where.OR = [
            {
              title_contains: args.query
            },
            {
              body_contains: args.query
            }
          ];
        }

        return prisma.query.posts(opArgs, info);
      }
    }
    ```
  - In GraphQL Playground:
    ```
    query {
      myPosts(query: "post") {
        id
        title
        body
        published
      }
    }

    // HTTP HEADERS
    {
      "Authorization": "user_token_here"
    }
    ```

### Locking Down Individual Type Fields
- In graphql-prisma/src/schema.graphql file:
  - If a field will be hidden from unauthenticated users, it should be marked as nullable in schema.graphql. If the users email will be hidden from unauthenticated users, its type should be changed from `String!` to `String`
    ```
    type User {
      id: ID!
      name: String!
      email: String
      password: String!
      posts: [Post!]!
      comments: [Comment!]!
    }
    ```
- In graphql-prisma/src/resolvers/User.js file:
  - The email address isn't something that should always be hidden. A user should be able to see their own email address. To set that up, a resolver is required for `User.email`
  - Notice that `getUserId` is called with `requireAuth` set to false. If the user is authenticated and they're fetching their own profile, the email address will be returned. If the user is unauthenticated or they're fetching someone else's profile, `null` will be returned instead of the user's email
    ```js
    import getUserId from '../utils/getUserId';

    const User = {
      // email resolver function
      // This function returns either a string, an email, or null
      // parent arg is the user object
      email(parent, args, { request }, info) {
        // Check if the user is authenticated
        // Authentication is optional here. If a user is not authenticated, it'll return null
        const userId = getUserId(request, false);

        // console.log(parent)

        // Check to see if the authenticated user id matches up with parent.id
        // If it does, then the user is trying to select their own email
        // If it doesn't, then they're trying to select a different user's email. So return null
        if (userId && userId === parent.id) {
          return parent.email;
        } else {
          return null;
        }
      }
    };

    export { User as default };
    ```

### Fragments
- Fragments give us a reusable way to define a selection set. No longer will we have to list out all the fields for a user, post, or comment every time we define our selection sets
- **Fragments in GraphQL Playground**
  - Fragments are a GraphQL feature and are not specific to Prisma. They can be used on the client to define reuseable selection sets
  - Fragments can be used anywhere we would normally define a selection set. This could be for a query, mutation, or subscription
  - Define a userFields fragment for the User type. The fragment lists out all of the fields from User that it wants
  - GraphQL Playground:
    ```
    query {
      users {
        ...userFields
        email
      }
    }

    // fragment name can be anything we want to call it
    // provide the type we are selecting from
    // then list the selection set
    fragment userFields on User {
      id
      name
      posts {
        title
      }
    }
    ```
- **Integrating Fragments into Prisma**
  - First, build the resolvers object in a separate file and import it into the main index.js file
    - Create a src/resolvers/index.js file: 
      ```js
      import Query from './Query';
      import Mutation from './Mutation';
      import User from './User';
      import Post from './Post';
      import Comment from './Comment';
      import Subscription from './Subscription';

      const resolvers = {
        Query,
        Mutation,
        Subscription,
        User,
        Post,
        Comment
      };

      export { resolvers };
      ```
  - In src/index.js file:
    - Import the resolvers: `import { resolvers } from './resolvers/index';`
    - List the resolvers object in server object
      ```js
      const server = new GraphQLServer({
        typeDefs: './src/schema.graphql',
        resolvers,
        context(request) {
          return {
            db,
            pubsub,
            prisma,
            request
          };
        }
      });
      ```
  - Fragments can also be used when interacting with Prisma. To configure this, we need to use `extractFragmentReplacements` from `prisma-binding`. We call that function with the resolver object and it returns the extracted fragments. From there, we set a `extractFragmentReplacements` property on the option object for both `Prisma` and `GraphQLServer`. The value for `extractFragmentReplacements` should be the extracted fragments from `extractFragmentReplacements`
  - In src/resolvers/index.js file:
    - Import the extractFragmentReplacements function from prisma-binding library
    - Call the extractFragmentReplacements() function and pass in the resolvers object
    - Export the fragmentReplacements
      ```js
      import { extractFragmentReplacements } from 'prisma-binding';

      // fragmentReplacements contains a list of all the graphQL fragment definitions
      // It goes through all of the resolvers and extracts all of the fragments and returns them in fragmentReplacements
      // This allows us to specify the fields that are required for the resolver function to run correctly
      const fragmentReplacements = extractFragmentReplacements(resolvers);

      export { resolvers, fragmentReplacements };
      ```
  - **Configure both the server and Prisma to use the fragmentReplacements:**
  - In graphql-prisma/src/prisma.js file:
    - Import the fragmentReplacements
    - Pass in the fragmentReplacements to the prisma instance
      ```js
      import { fragmentReplacements } from './resolvers/index';

      const prisma = new Prisma({
        typeDefs: 'src/generated/prisma.graphql',
        endpoint: 'http://localhost:4466',
        secret: 'myveryverysecrettext',
        fragmentReplacements
      });
      ```
  - In graphql-prisma/src/index.js file:
    - Import the fragmentReplacements
    - Pass in the fragmentReplacements in the server instance
      ```js
      import { resolvers, fragmentReplacements } from './resolvers/index';

      const server = new GraphQLServer({
        typeDefs: './src/schema.graphql',
        resolvers,
        context(request) {
          return {
            db,
            pubsub,
            prisma,
            request
          };
        },
        fragmentReplacements
      });
      ```
- **Goal: Limit User.posts to showing just published posts**
  - Set up a field resolver for User posts
  - Set up a fragment to ensure you have the user's id
  - Use the correct prisma method to fetch published posts where the user is the author
  - In graphql-prisma/src/resolvers/User.js file:
    ```js
    const User = {
      posts: {
        // Ensure that we always have access to the user id
        fragment: 'fragment userId on User { id }',
        resolve(parent, args, { prisma }, info) {
          return prisma.query.posts({
            where: {
              published: true,
              author: {
                id: parent.id
              }
            }
          });
        }
      }
    }
    ```

### Cleaning Up Some Edge Cases
- In src/resolvers/Query.js:
  - When querying for a user, we only want them to be able to search by name and not by email
  - Remove the ability to query users by email
    ```js
    const Query = {
      users(parent, args, { prisma }, info) {
        // Provide operation arguments to prisma
        const opArgs = {};

        if (args.query) {
          opArgs.where = {
            OR: [
              {
                name_contains: args.query
              }
            ]
          };
        }

        return prisma.query.users(opArgs, info);
      }
    }
    ```
- In src/resolvers/Mutation.js:
  - Allow comments on published post only
  - Check if the post is published
  - Throw an error if it's not published
    ```js
    async createComment(parent, args, { prisma, request }, info) {
      const userId = getUserId(request);
      // Check if the post is published
      const postExists = await prisma.exists.Post({
        id: args.data.post,
        published: true
      })

      if (!postExists) {
        throw new Error('Unable to find post')
      }

      return prisma.mutation.createComment(
        {
          data: {
            text: args.data.text,
            author: {
              connect: {
                id: userId
              }
            },
            post: {
              connect: {
                id: args.data.post
              }
            }
          }
        },
        info
      );
    }
    ```
- In src/resolvers/Mutation.js file:
  - **Goal: Delete all comments when unpublishing a post**
    - Use exists to determine if the post is published or not
    - If published, but about to be unpublished, delete all post comments
      - Check out the deleteManyComments mutation in the schema tab for Prisma
    ```js
    async updatePost(parent, args, { prisma, request }, info) {
        const userId = getUserId(request);

        const postExists = await prisma.exists.Post({
          id: args.id,
          author: {
            id: userId
          }
        });
        // Check if this is a published post
        const isPublished = await prisma.exists.Post({
          id: args.id,
          published: true
        });

        if (!postExists) {
          throw new Error('Unable to update post');
        }

        // If published post exists and the post is about to be unpublished
        if (isPublished && args.data.published === false) {
          await prisma.mutation.deleteManyComments({
            where: {
              post: {
                id: args.id
              }
            }
          });
        }

        return prisma.mutation.updatePost(
          {
            where: {
              id: args.id
            },
            data: args.data
          },
          info
        );
      }
    ```

### Locking Down Subscriptions
- In graphql-prisma/src/utils/getUserId.js file:
  - We need to make a small change to the getUserId method, because the authorization header for subscriptions lives on a different property than it does for queries and mutations
  ```js
  const getUserId = (request, requireAuth = true) => {
    // For queries and mutations, we're using standard http requests. The authorization comes from http headers
    // For subscriptions, we're using web sockets. The data lives somewhere else on request
    const header = request.request
      ? request.request.headers.authorization
      : request.connection.context.Authorization;

    // The rest of the code remains the same
  }
  ```
- In graphql-prisma/src/resolvers/Subscription.js file:
  - Create a subscription for myPost which requires authentication
  - Once authenticated, it will notify this user about changes to any posts that this user authored
  - Use correct prisma method to subscribe to posts
    - Limit to posts by a particular author using "where"
  - Import the getUserId utility method
    ```js
    import getUserId from '../utils/getUserId';

    const Subscription = {
      myPost: {
        subscribe(parent, args, { prisma, request }, info) {
          const userId = getUserId(request);

          return prisma.subscription.post(
            {
              where: {
                node: {
                  author: {
                    id: userId
                  }
                }
              }
            },
            info
          );
        }
      }
    }

    ```
- In graphql-prisma/src/schema.graphql file:
  - Define a subscription for myPost
    ```
    type Subscription {
      comment(postId: ID!): CommentSubscriptionPayload!
      post: PostSubscriptionPayload!
      myPost: PostSubscriptionPayload!
    }

    type PostSubscriptionPayload {
      mutation: MutationType!
      node: Post
    }
    ```
- Subscribe to myPost in GraphQL Playground:
  - Perform an updatePost mutation to see the change
    ```
    subscription {
      myPost {
        mutation
        node {
          id
          title
          body
          author {
            name
          }
        }
      }
    }

    // HTTP HEADERS
    {
      "Authorization": "Bearer user_token_here"
    }
    ```

### Token Expiration
- **Creating tokens that expire:**
  - To create a toke that expires, we need to set up a single option when signing the token. `jwt.sign()` accepts a third argument, an options object. This object can be configured with an `expiredIn` value to expire the token after a specific period of time
  - `jwt.verify()` will automatically check if a given token is expired. If the token is expired, it will throw an error
  - `jwt.sign({ userId: user.id }, 'thisisasecret', { expiresIn: '7 days' })`
- **Goal: Create a utility function for generating JWTs**
  - Create a new generateToken.js file in the utils directory
  - Create the function that takes in the user id and returns a token
  - Replace the two jwt.sign() calls with calls to generateToken instead
  - In graphql-prisma/src/utils folder, create a file called generateToken.js
  - In generateToken.js file:
    - Import jwt
    - Write a generateToken utility function that takes in a user id and returns a token
      - Call the jwt.sign() method to generate the token. It takes 3 arguments
        - 1st arg is a userId object
        - 2nd arg is the secret
        - 3rd arg is the options object. Here, specify the token expiration using the expiresIn property
      ```js
      import jwt from 'jsonwebtoken';

      const generateToken = (userId) => {
        return jwt.sign({ userId }, 'thisisasecret', { expiresIn: '7 days' });
      };

      export { generateToken as default };
      ```
  - In graphql-prisma/src/resolvers/Mutation.js file:
    - Import the generateToken utility function
    - Call the generateToken function and pass in the user id to generate a token
      ```js
      import generateToken from '../utils/generateToken';

      const Mutation = {
        async createUser(parent, args, { prisma }, info) {
          if (args.data.password.length < 8) {
            throw new Error('Password must be 8 characters or longer');
          }

          const password = await bcrypt.hash(args.data.password, 10);
          const user = await prisma.mutation.createUser({
            data: {
              ...args.data,
              password
            }
          });
          const token = generateToken(user.id);

          return { user, token };
        },
        async login(parent, args, { prisma }, info) {
          const user = await prisma.query.user({
            where: {
              email: args.data.email
            }
          });

          if (!user) {
            throw new Error('Unable to login');
          }

          const isMatch = await bcrypt.compare(args.data.password, user.password);

          if (!isMatch) {
            throw new Error('Unable to login');
          }

          const token = generateToken(user.id);

          return { user, token };
        }
      }
      ```

### Password Updates
- When a user wants to update their user info, we want them to be able to update their password as well. We're going to create a utility function to hash a password
- In graphql-prisma/src/schema.graphql file:
  - Add a password field to UpdateUserInput input and set its value type to nullable String
    ```
    input UpdateUserInput {
      name: String
      email: String
      password: String
    }
    ```
- In graphql-prisma/src/utils folder, create a file called hashPassword.js
- In hashPassword.js file:
  - Create a utility function for validating and hashing a password
    - Import bcrypt
    - This function takes plain text password as an argument
    - Validate the password
    - Call the bcrypt.hash() method to hash the password
    - Return the hash value
    ```js
    import bcrypt from 'bcryptjs';

    const hashPassword = (password) => {
      // Password validation
      if (password.length < 8) {
        throw new Error('Password must be 8 characters or longer');
      }

      // The bcrypt.hash() method takes in plain text and returns the hashed version
      // It takes 2 arguments:
      //	- 1st arg is the plain text password
      //	- 2nd arg is a salt, we provide the length of salt we want to use
      // A salt is a random series of chars that are hashed along with the string being hashed, making the hash password more secure
      // This method returns a promise. That promise resolves with the hash value
      // Return the hash value. We don't need to use the 'await' keyword since we're returning it
      return bcrypt.hash(password, 10);
    };

    export { hashPassword as default };
    ```
- In graphql-prisma/src/resolvers/Mutation.js file:
  - Import the hashPassword utility function
  - Call the hashPassword function in createUser and updateUser mutations
    ```js
    import hashPassword from '../utils/hashPassword';

    const Mutation = {
      async createUser(parent, args, { prisma }, info) {
        // Call the hashPassword method to hash the plain text password
        // Store the hashed value in password variable
        const password = await hashPassword(args.data.password)

        // The rest of the code remains the same
      },
      async updateUser(parent, args, { prisma, request }, info) {
        // Check if the password is a string
        // If it is, we're going to hash the password
        if (typeof args.data.password === 'string') {
          args.data.password = await hashPassword(args.data.password)
        }

        // The rest of the code remains the same
      }
    }
    ```


## PAGINATION AND SORTING WITH GRAPHQL

### Support Pagination for Users and Posts Queries
- **Pagination**
  - There are 2 new arguments that will be added to queries that need to support pagination: `first` and `skip`
  - `first` can be used to determine how many records should be fetched. Set `first` to `10` would give us the first 10 records
  - `skip` can be used to skip a number of records
- In graphql-prisma/src/schema.graphql file:
  - Prisma has built-in support for `first` and `skip`. Pagination can be set up by first adding the arguments to the query
  - Add first and skip as arguments to users query. Set its value type to nullable integer
    ```
    type Query {
      users(query: String, first: Int, skip: Int): [User!]!
    }
    ```
- In graphql-prisma/src/resolvers/Query.js file:
  ```js
    const Query = {
      users(parent, args, { prisma }, info) {
        // Provide operation arguments to prisma
        const opArgs = {
          first: args.first,
          skip: args.skip
        };
      }
    }
  ```
- Perform a users query with pagination in GraphQL Playground:
  ```
  query {
    users(first: 2, skip: 3) {
      id
      name
      email
    }
  }
  ```
- **Goal: Add pagination for posts query**
  - Add necessary arguments to posts query in schema.graphql
  - Pass arguments through to prisma in posts resolver
  - In graphql-prisma/src/schema.graphql file:
    ```
    type Query {
      posts(query: String, first: Int, skip: Int): [Post!]!
    }
    ```
  - In graphql-prisma/src/resolvers/Query.js file:
  ```js
    const Query = {
      posts(parent, args, { prisma }, info) {
        // We're only getting posts where published is true
        const opArgs = {
          first: args.first,
          skip: args.skip,
          where: {
            published: true
          }
        };
      }
    }
  ```

### Pagination Using Cursors
- Pagination using cursors requires a new argument named `after`. The value for `after` will be the id of the record we want to start fetching from
- `after` allows use to fetch data after a specific record
- In graphql-prisma/src/schema.graphql file:
  - Add the after argument to users and posts query. Its value type is nullable string
  ```
  type Query {
    users(query: String, first: Int, skip: Int, after: String): [User!]!
    posts(query: String, first: Int, skip: Int, after: String): [Post!]!
  }
  ```
- In graphql-prisma/src/resolvers/Query.js file:
  - Pass the argument through to prisma in users and posts resolvers
  ```js
  const Query = {
    users(parent, args, { prisma }, info) {
      // Provide operation arguments to prisma
      const opArgs = {
        first: args.first,
        skip: args.skip,
        after: args.after
      };
    },
    posts(parent, args, { prisma }, info) {
      // We're only getting posts where published is true
      const opArgs = {
        first: args.first,
        skip: args.skip,
        after: args.after,
        where: {
          published: true
        }
      };
    }
   }
  ```
- Perform users and posts query using pagination in GraphQL Playground:
  ```
  query {
    users(
      first: 4, 
      skip: 0, 
      after: "ckgmstgsy0c9o0807qtnxhwhi"
    ) {
      id
      name
      email
    }
  }

  query {
    posts(
      first: 5, 
      skip: 0
      after: "ckgpejne30dd70807ctlsjboc"
    ) {
      id
      title
      body
      published
    }
  }
  ```
- **Goal: Add pagination for myPosts and comments query**
  - Add 3 necessary arguments to query definition
  - Pass arguments through to prisma in resolvers
  - In graphql-prisma/src/schema.graphql file:
    ```
    type Query {
      comments(first: Int, skip: Int, after: String): [Comment!]!
      myPosts(query: String, first: Int, skip: Int, after: String): [Post!]!
    }
    ```

### Adding createdAt and updatedAt Fields to Schema
- There are 3 properties Prisma manages: id, updatedAt, and createdAt
- updatedAt and createdAt can be exposed by updating the prisma datamodel to include those fields. The type for both should be `DateTime!`, which is a Prisma provided type for these fields
- Next, the model (User, Comment, Post) in schema.graphql can be updated to support both properties. In this case, both fields should have the type `String!`
- Now, clients can add createAt and updatedAt to their selection sets
- In graphql-prisma/prisma/datamodel.prisma file:
  - Add updatedAt and createdAt fields to User type. Set its value type to non-nullable DateTime and add the directives
    ```
    type User {
      id: ID! @id
      name: String!
      email: String! @unique
      password: String!
      posts: [Post!]! @relation(name: "PostToUser", onDelete: CASCADE)
      comments: [Comment!]! @relation(name: "CommentToUser", onDelete: CASCADE)
      updatedAt: DateTime! @updatedAt
      createdAt: DateTime! @createdAt
    }
    ```
- Redeploy the changes to prisma. cd into the prisma directory and run: `prisma deploy --force`
- Still in prisma directory, run: `prisma generate`. This will generate a new schema in prisma.graphql file for Node.js server
- In graphql-prisma/src/schema.graphql file:
  - Add the updatedAt and createdAt fields to User type. Its value type is non-nullable string
    ```
    type User {
      id: ID!
      name: String!
      email: String
      password: String!
      posts: [Post!]!
      comments: [Comment!]!
      updatedAt: String!
      createdAt: String!
    }
    ```
- Perform users query in GraphQL Playground:
  ```
  query {
    users(
      first: 8
      skip: 0
    ) {
      id
      name
      email
      updatedAt
      createdAt
    }
  }
  ```
- **Goal: Configure updatedAt and createdAt for posts and comments**
  - Update prisma models (in datamodel.prisma file) with those fields
  - Redeploy and fetch/generate new schema
  - Update the Comment and Post models in schema.graphql with those fields

### Sorting Data
- Prisma exposes an `orderBy` argument for all operations that respond with an array of items. Records of a given type can be sorted by any of their field values in either ascending or descending fashion. Like with our pagination arguments, `orderBy` should be accepted by our operations and passed through to Prisma
- To find out the available input type definition for a particular query, go to GraphQL Playground and click on the DOCS schema tab or search in the generated prisma.graphql file. This type definition comes directly from Prisma
  - Click on the query type
  - A list of available arguments and its input type that can be used for that query type is found here
  - One of the arguments should be orderBy and the name of its input type is what we want to import from prisma.graphql file
  - For example, for users query, the input type of orderBy argument is  UserOrderByInput. We import this name from prisma.graphql file to have access to the enum of that input
- We can always use the import syntax to import definitions from other GraphQL files. To import multiple definitions, just separate them by a comma
- **Goal: Set up sorting for users, posts, myPosts, and comments**
  - Set up the orderBy argument with the correct imported enum
  - Update resolvers to pass the argument through to Prisma
- In graphql-prisma/src/schema.graphql file:
  - Modify users, posts, myPosts, and comments query definitions that support orderBy argument
    - Set the input type, and as nullable type, that corresponds to that query type 
    - These input type definitions come directly from Prisma
    - Use the import syntax to import these from generated prisma.graphql file
    ```
    # import UserOrderByInput, PostOrderByInput, CommentOrderByInput from './generated/prisma.graphql'

    type Query {
      users(
        query: String
        first: Int
        skip: Int
        after: String
        orderBy: UserOrderByInput
      ): [User!]!
      posts(
        query: String
        first: Int
        skip: Int
        after: String
        orderBy: PostOrderByInput
      ): [Post!]!
      comments(
        first: Int
        skip: Int
        after: String
        orderBy: CommentOrderByInput
      ): [Comment!]!
      me: User!
      myPosts(
        query: String
        first: Int
        skip: Int
        after: String
        orderBy: PostOrderByInput
      ): [Post!]!
      post(id: ID!): Post!
    }
    ```
- In graphql-prisma/src/resolvers/Query.js file:
  - Update the users, posts, myPosts, and comments resolvers to pass the arguments through to Prisma
    ```js
		const opArgs = {
			first: args.first,
			skip: args.skip,
			after: args.after,
			orderBy: args.orderBy
		};
    ```
- Perform users, posts, myPosts, or comments query in GraphQL Playground:
  ```
  query {
    myPosts(
      orderBy: title_DESC
    ) {
      id
      title
      body
      published
    }
  }
  ```


## PRODUCTION DEPLOYMENT

### Creating a Prisma Service with Prisma Cloud
- We're going to use Heroku service to host our production database, the Prisma Docker container, and our Node.js application
- We're going to use Prisma Cloud service to manage the Heroku Prisma instances
- Prisma Cloud website and click on Prisma Cloud 1 product: https://app.prisma.io/
- Login to account and in the Prisma Cloud dashboard:
  - It has Servers and Services tabs
  - We're going to create a single Prisma server and we can have as many services as we like
- **Creating a Prisma server**
  - Click on the Servers tab at the top
  - Click on the 'ADD SERVER' button to create our server
  - Fill out the Server name (graphql-blog) and Server description (GraphQL blogging app) and click the 'CREATE A SERVER' button
  - Choose Heroku for as a database provider and connect to Heroku account
  - Select the free tier plan and click the 'CREATE DATABASE' button
  - Once the database successfully created, click the 'SET UP A SERVER' button
  - Select Heroku as a server provider
  - Select the free tier as Server plan and then click the 'CREATE SERVER' button
  - Once the server is successfully created, we can view the server in the Servers tab
  - Both the server and the database are hosted on Heroku
    - The server will host our Prisma Docker container
    - The database will host our production database
- **Connect to production database via pgAdmin**
  - Go to pgAdmin browser page where we get to see our database
  - On the left menu tree, and at the very top of the tree, right click on the 'Servers' directory. Select the 'create' and then select 'server'
  - In the Create Server pop-up window, click on the Connection tab at the top
    - Name this database: Heroku Production Database
    - Fill in the database credentials. These credentials can be found on the Heroku website under settings and database credentials section
    - If successful, a new database is listed on the left menu tree by the name we just gave it
    - It will show many databases under databases directory. Use the find tool and paste in the name of our database (given by Heroku) to find ours
    - Once we found our database, under the Schemas directory, we see our two Prisma schemas we created - blogging and review

### Prisma Configuration and Deployment
- **Creating configuration files**
  - Our Prisma project is going to run in multiple environments. This includes a development environment and a production environment. The development environment is on our local machine, and the production environment is on Heroku
  - Supporting multiple environments will require a few small changes to the project. For example, prisma.yml has hardcoded endpoint value. The endpoint value is used to determine where to deploy the application, and right now it's always getting deployed to http://localhost:4466
  - To address this, prisma.yml will rely on environmental variables instead of hardcoded values
  - In graphql-prisma/config folder, create 2 files: dev.env and prod.env
  - In dev.env file:
    - Create a PRISMA_ENDPOINT environment variable and set it to the prisma localhost 
      ```
      PRISMA_ENDPOINT=http://localhost:4466
      ```
  - Next, update the prisma.yml file to rely on that variable's value as opposed to relying on the hardcoded endpoint
  - In graphql-prisma/prisma/prisma.yml file:
    - Set the endpoint property to the environment variable we created
    - Use `${}` to inject env variable
      - `endpoint: ${env:PRISMA_ENDPOINT}`
  - Now we need to deploy to multiple environments
- **Deploying to development**
  - cd into graphql-prisma/prisma directory and run: `prisma deploy -e ../config/dev.env`
  - The -e flag allows us to specify the path to the config file we want to use
  - It will first load in the environmental variables from dev.env file and then it will inject the env variable into the prisma.yml file 
- **Deploying to production**
  - We're not going to provide any values in the prod.env file. We're going to let Prisma inject the URL for us
  - First step is we need to login to Prisma to confirm who we are before we have access to the Prisma server
    - In the terminal, run: `prisma login`. And then click grant permission to be authenticated
    - cd into graphql-prisma/prisma directory and run: `prisma deploy -e ../config/prod.env`
    - Since there's nothing in the prod.env file, it will ask us to select a server from a list of servers. Choose the 'graphql-blog' server
    - Choose a name for your service: graphql-blogging-app
    - Choose a name for your stage: prod
    - What this does is, 
      - it first writes an endpoint (a URL) to the prisma.yml file
      - it then tries to deploy to the server that Prisma Cloud created
  - Second step is to move this URL endpoint in prisma.yml file to the prod.env file
    - In prod.env file:
      - `PRISMA_ENDPOINT=url_goes_here`
    - In prisma.yml file, the endpoint looks like this:
      - `endpoint: ${env:PRISMA_ENDPOINT}`
- Now we can deploy to different environments by specifying the endpoint we want to use from the config files
  - To development: `prisma deploy -e ../config/dev.env`
  - To production: `prisma deploy -e ../config/prod.env`











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
  - In package.json file, include this:
    ```javascript
    "scripts": {
      "start": "babel-node src/index.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    }
    ```
- graphql-yoga
  - Website: https://github.com/prisma-labs/graphql-yoga
  - Install: `npm i graphql-yoga`
  - Import in index.js file: `import { GraphQLServer } from 'graphql-yoga';`
- Nodemon
  - Install: `npm i nodemon --save-dev`
  - In package.json file, include this:
    ```javascript
    "scripts": {
      "start": "nodemon --exec babel-node src/index.js",
      "test": "echo \"Error: no test specified\" && exit 1"
    }
    ```
  - Then run `npm start`
- cuid
  - Install: `npm i cuid`
  - Import: `import cuid from 'cuid';`
- babel-plugin-transform-object-rest-spread
  - This plugin allows Babel to transform rest properties for object destructuring assignment and spread properties for object literals
  - Source: https://www.npmjs.com/package/babel-plugin-transform-object-rest-spread
  - Install: `npm i babel-plugin-transform-object-rest-spread`
  - Set up babel plugin in .babelrc file:
    ```javascript
    {
      "presets": [
        "env"
      ],
      "plugins": [
        "transform-object-rest-spread"
      ]
    }
    ```
- Hashing Algorithm - bcrypt.js
  - Install: `npm i bcryptjs`
  - Import in Mutation.js file: `import bcrypt from 'bcryptjs';`
- JSON Web Token - jsonwebtoken
  - Install: `npm i jsonwebtoken`
  - Import in Mutation.js file: `import jwt from 'jsonwebtoken';`
- Prisma
  - Install the Prisma module globally: `sudo npm i -g prisma`
- prisma-binding
  - Install: `npm i prisma-binding`
  - Import in prisma.js file: `import { Prisma } from 'prisma-binding';`
- graphql-cli
  - Install: `npm i graphql-cli`







## VSCODE EXTENSIONS
- GraphQL for VSCode - Kumar Harsh
- Docker - Microsoft