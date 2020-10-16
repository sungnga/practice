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
    - datamodel.prisma file - contains the schema
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