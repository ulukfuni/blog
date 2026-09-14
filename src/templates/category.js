import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Pills from "../components/pills"
import { rhythm } from "../utils/typography"
import { categorySlug, isListedPost } from "../utils/posts"

function CategoryTemplate({ data, pageContext, location }) {
    const siteTitle = data.site.siteMetadata.title
    const { category } = pageContext
    const posts = data.allMarkdownRemark.edges.filter(({ node }) => {
        if (!isListedPost(node)) {
            return false
        }
        return (node.frontmatter.categories || []).some(
            name => categorySlug(name) === category
        )
    })

    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title={`${category} posts`}
                description={`Posts about ${category} on ${siteTitle}.`}
                keywords={[category]}
                pathname={location.pathname}
                type="website"
            />
            <h1
                style={{
                    marginBottom: rhythm(1 / 4),
                    textTransform: `capitalize`,
                }}
            >
                {category}
            </h1>
            <p style={{ marginBottom: rhythm(1.5) }}>
                {posts.length} {posts.length === 1 ? `post` : `posts`}
            </p>
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
                    </div>
                )
            })}
            <Link to="/">← All posts</Link>
        </Layout>
    )
}

export default CategoryTemplate

export const pageQuery = graphql`
    query CategoryPage {
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
