import React from "react"
import { StaticQuery, graphql } from "gatsby"

const HeaderStatic = () => (
  // render StaticQuery component
  // query and render props
  <StaticQuery
    query={graphql`
      {
        site {
          info: siteMetadata {
            title
            description
            data
            author
            person {
              age
              name
            }
          }
        }
      }
    `}
    render={data => <h4>{data.site.info.description}</h4>}
  ></StaticQuery>
)

export default HeaderStatic
