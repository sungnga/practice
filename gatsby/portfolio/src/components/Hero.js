import React from "react"
import { Link } from "gatsby"
import { graphql, useStaticQuery } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"
import SocialLinks from "../constants/socialLinks"

const query = graphql`
  query {
    file(relativePath: { eq: "hero-img.png" }) {
      childImageSharp {
        gatsbyImageData(layout: CONSTRAINED, placeholder: BLURRED)
      }
    }
  }
`
const Hero = () => {
  const data = useStaticQuery(query)
  const heroImg = getImage(data.file.childImageSharp)
  // console.log(heroImg)

  return (
    <header className="hero">
      <div className="section-center hero-center">
        <article className="hero-info">
          <div>
            <div className="underline"></div>
            <h1>I'm John</h1>
            <h4>Freelance web and mobile UI/UX designer</h4>
            <Link to="/contact" className="btn">
              Contact me
            </Link>
          </div>
          <SocialLinks />
        </article>
        <GatsbyImage image={heroImg} alt="hero" className="hero-img" />
      </div>
    </header>
  )
}

export default Hero
