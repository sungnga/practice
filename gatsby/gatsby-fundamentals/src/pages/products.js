import React from "react"
import Layout from "../components/Layout"
import * as productsStyles from "../components/products.module.css"

function products() {
  return (
    <Layout>
      <div className={productsStyles.page}>
        <h1>Products page</h1>
        <p className={productsStyles.text}>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aliquam ab
          laudantium nam, autem nulla quas sint error doloribus aperiam magnam
          id deserunt ex est. Iure.
        </p>
      </div>
    </Layout>
  )
}

export default products
