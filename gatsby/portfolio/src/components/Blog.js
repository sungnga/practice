import React from "react"
import { Link } from "gatsby"
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const Blog = ({ blog }) => {
  const { id, title, date, category, image, desc, slug } = blog
  const blogImg = getImage(image)

  return (
    <Link to={`/blogs/${slug}`} key={id} className="blog">
      <article>
        <GatsbyImage image={blogImg} alt="blog-image" className="blog-img" />
        <div className="blog-card">
          <h4>{title}</h4>
          <p>{desc}</p>
          <div className="blog-footer">
            <p>{category}</p>
            <p>{date}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}

Blog.propTypes = {}

export default Blog
