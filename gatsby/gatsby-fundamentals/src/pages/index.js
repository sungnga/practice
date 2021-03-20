import React from "react"
import { Link } from "gatsby"
import Navbar from "../components/Navbar"

export default function Home() {
  return (
    <div>
      <Navbar />
      Hello beautiful people!
      <div>
        <Link to="/blog/">Blog page</Link>
      </div>
      <a href="https://www.gatsbyjs.org/">Gatsby docs</a>
    </div>
  )
}
