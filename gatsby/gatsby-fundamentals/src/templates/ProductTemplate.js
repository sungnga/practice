import React from "react"
import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"

function ProductTemplate({ data }) {
  const {
    title,
    price,
    image,
    info: { info },
  } = data.product

  return (
    <Layout>
      <div style={{ textAlign: "center" }}>
        <Link to="/products">Back to products</Link>
        <h1>Product detail: {title}</h1>
      </div>
      <section className="single-product">
        <article>
          <GatsbyImage image={image.gatsbyImageData} alt={title} />
        </article>
        <article>
          <h1>{title}</h1>
          <h3>${price}</h3>
          <p>{info}</p>
          <button>Add to cart</button>
        </article>
      </section>
    </Layout>
  )
}

export const getSingleProduct = graphql`
  query getProduct($slug: String) {
    product: contentfulProduct(slug: { eq: $slug }) {
      title
      price
      image {
        gatsbyImageData(layout: FIXED, width: 300)
      }
      info {
        info
      }
    }
  }
`

export default ProductTemplate
