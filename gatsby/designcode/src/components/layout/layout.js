import React from "react"
import { GlobalStyle } from "../styles/GlobalStyle"
import Navbar from "./Navbar"
import "./layout.css"

function Layout({ children }) {
  return (
    <>
      <GlobalStyle />
      <Navbar />
      <main>{children}</main>
    </>
  )
}

export default Layout
