import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Blogs from "../components/Blogs"
import SEO from "../components/SEO"

const BlogPage = ({ data }) => {
  const blogs = data.allStrapiBlogs.nodes

  return (
    <Layout>
      <SEO title="Blog" description="List of blogs" />
      <section className="blog-page">
        <Blogs blogs={blogs} title="blog" />
      </section>
    </Layout>
  )
}

export const query = graphql`
  {
    allStrapiBlogs {
      nodes {
        desc
        title
        date(formatString: "MMMM Do, YYYY")
        id
        slug
        category
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
    }
  }
`

export default BlogPage
