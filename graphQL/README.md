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
    "scripts": {
      "start": "babel-node src/index.js",
      "test": "echo \"Error: no test specified\" && exit 1"
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
  - This relationship requires a new resolver method. This new method is responsible for returning the user for a given post. Notice that the `author` method lives on a new `Post` property at the root proprty of `resolvers` contant, not on `Query` property
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
**Part I**
  1. Set up a "Comment" type with id and text fields. Both non-nullable
  2. Set up a "comments" array with 4 comments
  3. Set up a "comments" query with a resolver that returns all of the comment
  4. Run a query to get all 4 comments with both id and text fields
**Part II**
  - Goal: Set up a relationship between Comment and User
  1. Set up an author field on Comment
  2. Update all comments in an array to have a new author field (use one of the user ids as value)
  3. Create a resolver for the Comment author field that returns the user who wrote the comment
  4. Run a sample query that gets all comments and gets the author's name
  5. Set up a comments field on User
  6. Set up a resolver for the User comments field that returns all comments belonging to that user
  7. Run a sample query that gets all users and all their comments
**Part III**
  - Goal: Set up a relationship between Comment and User
  1. Set up a post field on Comment
  2. Update all comments in the array to have a new post field (use one of the post ids as value)
  3. Create a resolver for the Comment post field that returns the post that the comment belongs to
  4. Run a sample query that gets all comments and gets the post name
  5. Set up a comments field on Post
  6. Set up a resolver for the Post comments field that returns all comments belonging to that post
  7. Run a sample query that gets all posts and all their comments


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
  - A resolver for createUser Mutation. In resolvers:
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
- **Muations and Data Associations**
  - createPost Mutation definition
  - In typeDefs:
    ```javascript
    type Mutation {
      createPost(title: String!, body: String!, published: Boolean!, author: ID!): Post!
    }
    ```
  - The resolver for createPost Mutation. In resolvers:
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
- **createComment Mutation Challenge**
  - Define createComment Mutation
  - In typeDefs:
    ```javascript
    type Mutation {
      createComment(text: String, author: ID!, post: ID!): Comment!
    }
    ```
  - The resolver for createComment Mutation. In resolvers:
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


### The Input Type


### Deleting Data with Mutations: Part I


### Deleting Data with Mutations: Part II


### A Pro GraphQL Project Structure


### Updating Data with Mutations








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