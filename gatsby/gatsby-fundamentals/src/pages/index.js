import React from "react"
import { Link } from "gatsby"

export default function Home() {
  return (
    <div>
      Hello beautiful people!
      <div>
        <Link to="/blog/">Blog page</Link>
      </div>
      <a href="https://www.gatsbyjs.org/">Gatsby docs</a>
    </div>
  )
}
