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
  - Goal: update a post with mutations
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
- Goal: Use async/await with prisma bindings
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