import React from "react"
import Layout from "../components/Layout"
import * as blogStyles from "../components/blog.module.css"

function blog() {
  return (
    <Layout>
      <div className={blogStyles.page}>
        <h1>Blog Page</h1>
        <p className={blogStyles.text}>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur odio
          tempore aliquid obcaecati expedita optio assumenda vitae esse
          accusantium quidem, iure quisquam totam praesentium eaque sunt,
          maiores magni, aut voluptate.
        </p>
      </div>
    </Layout>
  )
}

export default blog
