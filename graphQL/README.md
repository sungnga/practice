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
- Publish the comment to subscribers
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
- Subscribing to comment on client-side
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










## VSCODE EXTENSIONS
- GraphQL for VSCode - Kumar Harsh