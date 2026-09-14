import React from "react"
import { graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

function NotFoundPage({ data, location }) {
    const siteTitle = data.site.siteMetadata.title

    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title="404: Not Found"
                description="This page does not exist."
                pathname={location.pathname}
            />
            <h1>Not Found</h1>
            <p>
                That page doesn't exist. Head back to the{` `}
                <Link to="/">blog</Link>.
            </p>
        </Layout>
    )
}

export default NotFoundPage

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
    }
`
