import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

function NowTemplate({ data, location }) {
    const post = data.markdownRemark
    const siteTitle = data.site.siteMetadata.title

    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title={post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
                keywords={post.frontmatter.keywords || []}
                pathname={location.pathname}
                type="website"
            />
            <div style={{ marginBottom: rhythm(1) }}>
                <h1>{post.frontmatter.title}</h1>
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <hr style={{ marginBottom: rhythm(1) }} />
            <Bio />
            <p>
                <Link to="/">← Home</Link>
            </p>
        </Layout>
    )
}

export default NowTemplate

export const pageQuery = graphql`
    query NowPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            frontmatter {
                title
                description
                keywords
            }
        }
    }
`
