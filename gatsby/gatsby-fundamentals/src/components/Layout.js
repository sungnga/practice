import React, { Fragment } from "react"
import Footer from "./Footer"
import Navbar from "./Navbar"

function Layout({ children }) {
  return (
    <Fragment>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </Fragment>
  )
}

export default Layout
