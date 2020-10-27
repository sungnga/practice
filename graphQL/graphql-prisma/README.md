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
      ```js
      import jwt from 'jsonwebtoken';

      const generateToken = (userId) => {
        return jwt.sign({ userId }, 'thisisasecret', { expiresIn: '7 days' });
      };

      export { generateToken as default };
      ```
  - In graphql-prisma/src/resolvers/Mutation.js file:
    - Import the generateToken utility function
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
  - Add first and skip as arguments to the the users query. Set its value type to nullable integer
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














## NPM MODULES USED
- Hashing Algorithm - bcrypt.js
  - Install: `npm i bcryptjs`
  - Import in Mutation.js file: `import bcrypt from 'bcryptjs';`
- JSON Web Token - jsonwebtoken
  - Install: `npm i jsonwebtoken`
  - Import in Mutation.js file: `import jwt from 'jsonwebtoken';`
