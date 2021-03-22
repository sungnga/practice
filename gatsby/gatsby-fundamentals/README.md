# Gatsby Fundamentals

## TOPICS

### Running Gatsby development server:
- Run in the terminal: `gatsby develop`
- Must restart the server whenever updating the gatsby-config.js file

### Creating pages

### Linking components
- Using Gatsby's Link component

### Setting up a Navbar component

### Adding a Layout component
- This component accepts children props
- This component renders the Navbar, children components, and Footer components

### Using CSS modules
- A CSS module is a CSS file in which all class names and animation names are scoped locally by default

### Styled components
- Install gatsby-plugin-styled-components plugin
- Add the plugin in the `plugins` array in gatsby.config.js file

### GraphQL: useStaticQuery hook
- Query keyword: `query`
- Query name: `firstQuery`. This name must be unique
- Field alias: `info: siteMetadata`
- Destructuring data

### GraphQL: StaticQuery component
- Old way of writing static query
- In GraphiQL console, click on Code Exporter and select StaticQuery in the dropdown menu. It will generate the StaticQuery code
- Render the `<StaticQuery />` component and it has a query and render props
- The query props is set to the graphql string template literal that has the query in it
- The render props calls a function that has the data result passed to it

### GraphQL: PageQuery component
- Cannot set up PageQuery component in a regular component
- Note the the query name must be unique

### Working with images and filesystem
- Docs: https://www.gatsbyjs.com/plugins/gatsby-plugin-image
- Install gatsby-plugin-image plugin and gatsby-plugin-sharp for image optimization
- Install gatsby-source-filesystem plugin to access our local files and working with static images
- Install gatsby-transformer-sharp if working with dynamic images
- Install: `npm install gatsby-plugin-image gatsby-plugin-sharp gatsby-source-filesystem gatsby-transformer-sharp`
- Configure the 4 plugins in gatsby-config.js file:
  ```js
  module.exports = {
    plugins: [
      `gatsby-plugin-image`,
      `gatsby-plugin-sharp`,
      `gatsby-transformer-sharp`, // Needed for dynamic images
      {
        resolve: `gatsby-source-filesystem`,
        options: {
          name: `images`,
          path: `${__dirname}/src/images/`,
        }
      },
    ],
  }
  ```

### Working with CMS Contentful and rendering contents
- Docs: https://www.gatsbyjs.com/plugins/gatsby-source-contentful/?=gatsby-source-contentful
- Install Contentful plugin and configure in gatsby-config.js file:
  - `npm install gatsby-source-contentful`
- Querying data in Contentful and display contents onto the page
- After install and configure contentful plugin, query data using GraphiQL console
- Use pageQuery component to query the data inside of a page component and render the contents onto the page

### Creating nested pages using page templates
- If we have nested pages that have the same page layout but with different contents, we can create a page template and use pageQuery to dynamically fetch the data and display it on each individual page
- A slug is the part of a URL which identifies a particular page on a website in an easy to read form; It's the part of the URL that explains the page's content
- Use Gatsby-Node to create the page template
  - We will make use of a slug to generate the names of the nested pages
- Use graphql to query the data for a single page and render the contents. Do this in the page template (component) file

### Gatsby build
- If using any env variables in the project, must create an `.env.production` file at the root of the project before running a production-ready build
- So we should have a `.env.development` and a `.env.production` file
- Then run: `gatsby build`
- The production build will be in the `public` directory