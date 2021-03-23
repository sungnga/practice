# Steps to building this project

The codebase for each step can be found in the commit link

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