import React from "react"
import { Helmet } from "react-helmet"
import { useStaticQuery, graphql } from "gatsby"

const query = graphql`
  {
    site {
      siteMetadata {
        author
        siteDesc: description
        image
        siteUrl
        siteTitle: title
        twitterUsername
      }
    }
  }
`

const SEO = ({ title, description }) => {
  const { site } = useStaticQuery(query)
  const {
    siteDesc,
    author,
    image,
    siteUrl,
    siteTitle,
    twitterUsername,
  } = site.siteMetadata

  return (
    <Helmet title={`${title} | ${siteTitle}`} htmlAttributes={{ lang: "en" }}>
      <meta name="description" content={description || siteDesc} />
      <meta name="image" content={image} />
      {/* twitter cards */}
    </Helmet>
  )
}

export default SEO
