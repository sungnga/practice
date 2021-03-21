import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Header from "../examples/Header"
import HeaderStatic from "../examples/HeaderStatic"

// Destructure data from page props
function examples({ data }) {
  // console.log(props)

  // destructure from data object
  const {
    site: {
      info: { author },
    },
  } = data

  return (
    <Layout>
      <p>Examples Page</p>
      <Header />
      <HeaderStatic />
      <h5>Author: {author}</h5>
    </Layout>
  )
}

// With export, data will be added to the page props
export const data = graphql`
  query secondQuery {
    site {
      info: siteMetadata {
        title
        description
        data
        author
        person {
          age
          name
        }
      }
    }
  }
`

export default examples
