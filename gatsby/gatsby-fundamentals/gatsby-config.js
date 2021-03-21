/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/gatsby-config/
 */

module.exports = {
  siteMetadata: {
    title: 'Gatsby Fundamentals',
    description: 'Foundation of Gatsby',
    author: '@NgaLa',
    data: ['item 1', 'item 2', 'item 3', 'item 4'],
    person: {name: 'Sarah', age: 24}
  },
  plugins: [`gatsby-plugin-styled-components`],
}
