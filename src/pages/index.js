import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Pills from "../components/pills"
import { rhythm } from "../utils/typography"
import { categorySlug, isListedPost, isStandalonePageSlug } from "../utils/posts"

function BlogIndex({ data, location }) {
    const siteTitle = data.site.siteMetadata.title
    const showDrafts = process.env.NODE_ENV !== `production`
    const posts = data.allMarkdownRemark.edges.filter(({ node }) => {
        if (isStandalonePageSlug(node.fields.slug)) {
            return false
        }
        if (node.frontmatter.draft && !showDrafts) {
            return false
        }
        return true
    })
    const categoryCounts = new Map()
    data.allMarkdownRemark.edges
        .filter(({ node }) => isListedPost(node))
        .forEach(({ node }) => {
            ;(node.frontmatter.categories || []).forEach(name => {
                const key = categorySlug(name)
                if (key) {
                    categoryCounts.set(key, (categoryCounts.get(key) || 0) + 1)
                }
            })
        })
    const categories = Array.from(categoryCounts.entries())
        .filter(([, count]) => count >= 2)
        .map(([name]) => name)
        .sort()

    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title="Home"
                description="Viet Nguyen's personal blog on software development, life, and stories."
                keywords={[`viet nguyen`, `blog`, `dev`, `life`, `basketball`]}
                pathname={location.pathname}
                type="website"
            />
            <Bio />
            {categories.length > 0 && (
                <div style={{ marginBottom: rhythm(1.5) }}>
                    <Pills items={categories} />
                </div>
            )}
            {posts.map(({ node }) => {
                const title = node.frontmatter.title || node.fields.slug
                return (
                    <div key={node.fields.slug}>
                        <h3
                            style={{
                                marginBottom: rhythm(1 / 4),
                            }}
                        >
                            <Link
                                style={{ boxShadow: `none` }}
                                to={node.fields.slug}
                            >
                                {title}
                            </Link>
                        </h3>
                        <small>
                            {node.frontmatter.date}
                            {node.timeToRead
                                ? ` · ${node.timeToRead} min read`
                                : null}
                            {node.frontmatter.draft ? ` · Draft` : null}
                        </small>
                        {node.frontmatter.categories && (
                            <div style={{ marginTop: rhythm(1 / 4) }}>
                                <Pills items={node.frontmatter.categories} />
                            </div>
                        )}
                        <p
                            dangerouslySetInnerHTML={{
                                __html:
                                    node.frontmatter.description ||
                                    node.excerpt,
                            }}
                        ></p>
                        <Link to={node.fields.slug}>Read More</Link>
                    </div>
                )
            })}
        </Layout>
    )
}

export default BlogIndex

export const pageQuery = graphql`
    query {
        site {
            siteMetadata {
                title
            }
        }
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
            edges {
                node {
                    excerpt
                    timeToRead
                    fields {
                        slug
                    }
                    frontmatter {
                        date(formatString: "MMMM DD, YYYY")
                        title
                        description
                        categories
                        draft
                    }
                }
            }
        }
    }
`
