import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { rhythm } from "../utils/typography"

class NowTemplate extends React.Component {
    render() {
        const post = this.props.data.markdownRemark
        const siteTitle = this.props.data.site.siteMetadata.title

        return (
            <Layout location={this.props.location} title={siteTitle}>
                <SEO
                    title={post.frontmatter.title}
                    description={post.frontmatter.description || post.excerpt}
                    keywords={post.frontmatter.keywords}
                />
                <div style={{ marginBottom: rhythm(1) }}>
                    <h1>{post.frontmatter.title}</h1>
                </div>
                <div dangerouslySetInnerHTML={{ __html: post.html }} />
                <hr style={{ marginBottom: rhythm(1), }} />
                <Bio />
                <ul
                    style={{
                        display: `flex`,
                        flexWrap: `wrap`,
                        justifyContent: `space-between`,
                        listStyle: `none`,
                        padding: 0,
                    }}
                >
                    <li>
											<Link to={'/'}>Home</Link>
                    </li>
                    <li>

                    </li>
                </ul>
            </Layout>
        )
    }
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
                categories
                title
                date(formatString: "MMMM DD, YYYY")
                description
            }
        }
    }
`
