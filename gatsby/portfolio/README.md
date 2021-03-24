# Steps to building this portfolio project
The codebase for each step can be found in the commit link

### TECHNOLOGY STACK:
- Gatsby.js, Strapi CMS, Cloudinary

### To start up Gatsby dev server:
- In the terminal, run: `gatsby develop`

### To start up Strapi app dev server:
- In Strapi app project, run: `npm run develop`

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

### 12. Creating single blog pages programmatically with blog template
- First, query for blog slugs in BlogTemplate component to use as nested pages
- Second, setup a gatsby-node.js file to create a page template
- Create the BlogTemplate component and render the blog info
  - Install the `react-markdown` library to translate the markdown 'content' data. We get back a ReactMarkdown component that we can use to render the blog's content property
  - We're going to store the blog images in Cloudinary media storage service

**Setup Strapi-Cloudinary plugin:**
- Whenever we upload a media file using the Strapi Admin console, we can use a plugin to store the files to Cloudinary instead of Strapi server
- Install the strapi-provider-upload-cloudinary plugin **in the Strapi application** and configure it in ./config/plugins.js file
  - Install: `npm i strapi-provider-upload-cloudinary`
  - Create plugins.js file in config folder and setup plugin config. Use env variables for cloudinary credentials
  - Once done, start up Strapi dev server: `npm run develop`
- Back in Strapi Admin console, upload any media file and it will be stored in Cloudinary

### 13. Building the Footer section
- The Footer component renders the SocialLinks component
- The SocialLinks component iterates over the data array and displays a list of social links

### 14. Building the Sidebar, toggling the Sidebar
- Create a piece of isOpen state in the Layout component. This state keeps track of whether the SideBar is open or not
- Write a toggleSidebar function that toggles the boolean value of isOpen state
- Pass down the toggleSidebar function as props to the both the Navbar and Sidebar components. And pass down the isOpen state as props to the Sidebar component
- Only animate the Sidebar if isOpen state is true

### 15. Building the error 404 page

### 16. Building the About page
- Create an about content-type in Strapi Admin console. This is going to be a Single Type
- Add contents to an about content-type
- Add `about` content-type to `singleTypes` array in gatsby-config.js file
- Use PageQuery to query the about data in the About component and render the data onto the page

### 17. Building the Contact page
- The service that we're going to use to collect the form data from contact page is Formspree
- Signup for an account at formspree.io
  - Create a project, then create a form
  - Copy the form's endpoint link
  - In the form element, set the `action` property to this endpoint. set the `method` property to POST
  - Then for each input field, make sure that there's a `name` property
- If a form is submitted, a copy of the form values will be sent to the email that was provided when signed up for the project

### 18. Pre-fetching fonts
- For users with slow internet connection, it's a better experience to fetch fonts before the page loads
- Install gatsby-plugin-webfonts plugin and configure in gatsby-config.js file
  - Install: `npm i gatsby-plugin-webfonts`
  - In config file, list the web-fonts and font-weights we want to pre-fetch

### 19. Setting up SEO
- We will add a head element to all of our pages where it will provide information about our project such as page title and page description
- We will use react-helmet library to create a component that will control or add meta tag in the page head element. And then we'll add this component to all of our pages. Adding that metadata will help search engines to better understand our content

**Install and configure react-helmet:**
- Install and configure gatsby-plugin-react-helmet plugin
  - Install: `npm i gatsby-plugin-react-helmet react-helmet`
- In gatsby-config.js file:
  - Setup the siteMetadata object with project title, description, author, siteUrl
    - NOTE: make sure to remove the last `/` at the end of siteUrl
  - Add `gatsby-plugin-react-helmet` to the `plugins` array

**SEO basic setup:**
- Create an SEO component and in it:
  - Import Helmet component from react-helmet
  - This component receives a title (page title) and description (page description) as props
  - Render the Helmet component and pass down to it a `title` and `htmlAttributes` props
    - Inside the Helmet component, add a `meta` tags and specify the attributes
- Import the SEO component in index.js home page and render the `<SEO />` component inside of the Layout component. Specify the values for title and description props

**SEO querying siteMetadata:**
- In SEO component:
  - Use staticQuery to query project site with graphql. The data that we get back comes from the siteMetadata object that we set up in gatsby-config.js file
  - Pass the data from SiteMetadata to the Helmet component

**SEO all pages:**
- In each project pages, import the SEO component
- Render the `<SEO />` component inside of the Layout component. Specify the values for title and description props

### 20. Adding a sitemap plugin
- Sitemap plugin generates XML sitemap, which is raw document that lists all important pages of our site. It helps search engines to learn about the structures of our site and crawl them as well
- Install and configure gatsby-plugin-sitemap plugin
  - Install: `npm i gatsby-plugin-sitemap`
  - In gatsby-config.js file:
    - Add the `gatsby-plugin-sitemap` to the `plugins` array
    - In the siteMetadata object, make sure to specify a `siteUrl` property
    - Can also add options to exclude certain sites