# Steps to building this project

The codebase for each step can be found in the commit link

### Starting up Gatsby dev server:
- In the terminal, run: `gatsby develop`

### 1. Building the Navbar
- The Layout component renders the Navbar, Sidebar, and Footer components

### 2. Building the Hero section, querying for hero image

### 3. Adding the Services section, Title component

### 4. Setting up Strapi
- Create a Strapi app. This is creating a database for a project
- In the terminal, run: `npx create-strapi-app <my-project> --quickstart`
- A Strapi app project is generated on the local machine
- Open the Strapi app in a code editor, and start up the dev server: `npm run develop`
  - The Strapi admin dashboard serves at: http://localhost:1337/admin/
  - Login with credentials

### 5. Creating content-type in Strapi admin
- **Adding a content-type (table):**
  - In Strapi dashboard, click on the Content-Types Builder on the left menu
  - Click on Create new collection type (collection type is a table)
  - When naming a type, Strapi will make it plural
  - Then add fields to the collection type
  - Can create a component that can be reused in different content-types
    - Name the component
    - Add fields to the component
  - Can add a component as a field in a collection type
  - Then configure the content-type's User Permissions & Roles under Settings menu
    - The roles are either Authenticated or Public. List the action types that can perform for a role. For example, for Public role, only `find` and `findone` action types are assigned
- **Adding contents:**
  - Can add data to a content-type in the Strapi Admin console
  - Under the Collection Types menu, select the name of the collection type
  - A form appears in a window and can enter the contents for each fields
  - Don't forget to Save and Publish the content
  - To view the data, to go: `http://localhost:1337/<content-type-name>`

### 6. Connecting Strapi to Gatsby
- Install gatsby-source-strapi plugin and configure in gatsby-config.js
  - Install: `npm install gatsby-source-strapi`
  - In config file, add the name of the content-type that was created in Strapi Admin to the `contentTypes` array
- Restart Gatsby dev server

### 7. Building the Experience section
- Querying for jobs data with graphql inside of the Jobs component
- Dynamically displaying the job info when clicking on a company name

### 8. Building the Featured Projects section in home page
- Define a projects content-type (and fields) in Strapi Admin console
- Add the projects contents to projects content-type
- Add roles and permissions for projects content-type in Settings menu
- Add projects content-type to `contentTypes` array in gatsby-config.js file
- Query for featured projects data with graphql in index.js page
  - Pass down the projects array as projects props to the Projects child component
  - In the Projects component, iterate over the projects array and render each project in a Project component. Pass down the project data as project props to the Project child component
  - In the Project component, render the project data
- A list of 'featured projects' is displayed in the index.js home page

### 9. Building the Projects page
- The projects page will list out all of the projects
- Query for projects data in the ProjectsPage component and pass down the projects array as props to the Projects child component

### 10. Building the Latest Articles section in home page
- Define a blogs content-type (and fields) in Strapi Admin console
- Add blog contents to blogs content-type
- Add blogs content-type to `contentTypes` array in gatsby-config.js file
- Query for blogs data with graphql in index.js page
  - Pass down the blogs array as blogs props to the Blogs child component
  - In the Blogs component, iterate over the blogs array and render each blog in a Blog component. Pass down the blog data as blog props to the Blog child component
  - In the Blog component, render the blog data
- A list of blogs is displayed in the index.js home page

### 11. Building the Blog page
- The BlogPage will list out all of the blogs
- Use PageQuery to query for blogs data in the BlogPage component and pass down the blogs array as props to the Blogs child component