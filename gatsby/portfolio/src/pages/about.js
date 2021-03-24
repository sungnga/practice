import React from "react"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import Title from "../components/Title"
import SEO from "../components/SEO"

const About = ({ data }) => {
  const { info, stack, title, image } = data.allStrapiAbout.nodes[0]
  const aboutImg = getImage(image)

  return (
    <Layout>
      <SEO title="About" description="about webDev" />
      <section className="about-page">
        <div className="section-center about-center">
          <GatsbyImage image={aboutImg} alt="about" className="about-img" />
          <article className="about-text">
            <Title title={title} />
            <p>{info}</p>
            <div className="about-stack">
              {stack.map(item => (
                <span key={item.id}>{item.title}</span>
              ))}
            </div>
          </article>
        </div>
      </section>
    </Layout>
  )
}

export const query = graphql`
  {
    allStrapiAbout {
      nodes {
        title
        info
        stack {
          id
          title
        }
        image {
          childImageSharp {
            gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
          }
        }
      }
    }
  }
`

export default About
