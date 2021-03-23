import React from "react"
import { graphql } from "gatsby"
import Layout from "../components/Layout"
import Hero from "../components/Hero"
import Services from "../components/Services"
import Jobs from "../components/Jobs"
import Projects from "../components/Projects"
import Blogs from "../components/Blogs"

export default ({ data }) => {
  const projects = data.allStrapiProjects.nodes

  return (
    <Layout>
      <Hero />
      <Services />
      <Jobs />
      <Projects projects={projects} title="featured projects" showLink />
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
  }
`
