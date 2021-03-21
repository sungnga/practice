import React from "react"
import { graphql, useStaticQuery } from "gatsby"
import img from "../images/desert-1.jpeg"
import { GatsbyImage } from "gatsby-plugin-image"

const getImages = graphql`
  {
    fixed: file(relativePath: { eq: "desert-1.jpeg" }) {
      childImageSharp {
        gatsbyImageData(width: 200, height: 200, layout: FIXED)
      }
    }
    constrained: file(relativePath: { eq: "desert-1.jpeg" }) {
      childImageSharp {
        gatsbyImageData(
          layout: CONSTRAINED
          transformOptions: { grayscale: true }
        )
      }
    }
    fullWidth: file(relativePath: { eq: "desert-1.jpeg" }) {
      childImageSharp {
        gatsbyImageData(layout: FULL_WIDTH)
      }
    }
  }
`

function Images() {
  const data = useStaticQuery(getImages)
  console.log(data)

  return (
    <section className="images">
      <article className="single-image">
        <h3>Static image</h3>
        <img src={img} width="100%" alt="static img" />
      </article>
      <article className="single-image">
        <h3>Fixed image/blur</h3>
        <GatsbyImage
          image={data.fixed.childImageSharp.gatsbyImageData}
          alt="fixed image"
        />
      </article>
      <article className="single-image">
        <h3>Constrained image</h3>
        <GatsbyImage
          image={data.constrained.childImageSharp.gatsbyImageData}
          alt="constrained image"
        />
      </article>
      <article className="single-image">
        <h3>Full width image</h3>
        <GatsbyImage
          image={data.fullWidth.childImageSharp.gatsbyImageData}
          alt="full width image"
        />
        <div className="small">
          <GatsbyImage
            image={data.fullWidth.childImageSharp.gatsbyImageData}
            alt="parent full width image"
          />
        </div>
      </article>
    </section>
  )
}

export default Images
