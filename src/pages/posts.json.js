import React from "react"
import { graphql } from "gatsby"

// Gatsby will render the JSON returned from this page component.
// This is meant as a lightweight index for agents and tools to consume.

function PostsJsonPage({ data }) {
    const posts = data.allMarkdownRemark.edges.map(({ node }) => ({
        slug: node.fields.slug,
        title: node.frontmatter.title,
        date: node.frontmatter.date,
        categories: node.frontmatter.categories || [],
        description: node.frontmatter.description || node.excerpt,
        keywords: node.frontmatter.keywords || [],
    }))

    // Gatsby serializes the return value to JSON.
    return <pre>{JSON.stringify(posts, null, 2)}</pre>
}

export default PostsJsonPage

export const query = graphql`
    query PostsJsonIndex {
        allMarkdownRemark(sort: { frontmatter: { date: DESC } }) {
            edges {
                node {
                    excerpt(pruneLength: 160)
                    fields {
                        slug
                    }
                    frontmatter {
                        title
                        date(formatString: "YYYY-MM-DD")
                        categories
                        description
                        keywords
                    }
                }
            }
        }
    }
`

