import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import Projects from "../components/Projects"

const ProjectsPage = ({ data }) => {
  const projects = data.allStrapiProjects.nodes

  return (
    <section className="projects-page">
      <Projects projects={projects} title="all projects" />
    </section>
  )
}

export const query = graphql`
  {
    allStrapiProjects {
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

export default ProjectsPage
