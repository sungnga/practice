import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Services from "../components/Services"
import Jobs from "../components/Jobs"
import Projects from "../components/Projects"
import Blogs from "../components/Blogs"
import SEO from "../components/SEO"

export default function Home({ data }) {
  const projects = data.allStrapiProjects.nodes
  const blogs = data.allStrapiBlogs.nodes

  return (
    <Layout>
      <SEO title="Home" description="home page" />
      <Hero />
      <Services />
      <Jobs />
      <Projects projects={projects} title="featured projects" showLink />
      <Blogs blogs={blogs} title="Latest Articles" showLink />
    </Layout>
  )
}

export const query = graphql`
  query {
    allStrapiProjects(filter: { featured: { eq: true } }) {
      nodes {
        id
        description
        title
        github
        url
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
        stack {
          id
          title
        }
      }
    }
    allStrapiBlogs(sort: { fields: date, order: DESC }, limit: 3) {
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
