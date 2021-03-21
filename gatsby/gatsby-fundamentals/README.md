# Gatsby Fundamentals

## TOPICS

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

