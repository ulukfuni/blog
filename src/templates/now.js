import React from 'react'
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

export default (props) => {
	const post = props.data.markdownRemark
	const siteTitle = props.data.site.siteMetadata.title

	return (
		<Layout location={props.location} title={siteTitle}>
			<SEO
				title={post.frontmatter.title}
				description={post.frontmatter.description || post.excerpt}
				keywords={post.frontmatter.keywords}
			/>
		</Layout>
	)
}

export const pageQuery = graphql`
    query NowPageBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            html
            frontmatter {
                title
                date(formatString: "MMMM DD, YYYY")
                description
            }
        }
    }
`