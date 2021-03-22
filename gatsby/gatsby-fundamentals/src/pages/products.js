import { graphql, Link } from "gatsby"
import { GatsbyImage } from "gatsby-plugin-image"
import React from "react"
import Layout from "../components/Layout"
import * as styles from "../components/products.module.css"

function products({ data }) {
  const products = data.allContentfulProduct.nodes
  products.shift()
  console.log(products)

  return (
    <Layout>
      <section className={styles.page}>
        {products.map(product => (
          <article key={product.id}>
            <GatsbyImage
              image={product.image.gatsbyImageData}
              alt={product.title}
            />
            <h3>
              {product.title} <span>${product.price}</span>
            </h3>
            <Link to={`/products/${product.slug}`}>More details</Link>
          </article>
        ))}
      </section>
    </Layout>
  )
}

export const getProducts = graphql`
  query {
    allContentfulProduct {
      nodes {
        id
        title
        price
        slug
        image {
          gatsbyImageData(layout: FULL_WIDTH)
        }
      }
    }
  }
`

export default products
