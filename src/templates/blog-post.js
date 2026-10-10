import React from "react"
import { Link, graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import SEO from "../components/seo"
import Pills from "../components/pills"
import { rhythm, scale } from "../utils/typography"

function BlogPostTemplate({ data, pageContext, location }) {
    const post = data.markdownRemark
    const siteTitle = data.site.siteMetadata.title
    const { previous, next, linkableCategories } = pageContext
    const url = `${data.site.siteMetadata.siteUrl}${location.pathname}`
    const imageSrc =
        post.frontmatter.image?.childImageSharp?.gatsbyImageData?.images?.fallback?.src
    const socialImage = imageSrc
        ? new URL(imageSrc, data.site.siteMetadata.siteUrl).href
        : undefined

    return (
        <Layout location={location} title={siteTitle}>
            <SEO
                title={post.frontmatter.seoTitle || post.frontmatter.title}
                description={post.frontmatter.description || post.excerpt}
                keywords={post.frontmatter.keywords || []}
                pathname={location.pathname}
                image={socialImage}
                type="article"
                jsonLd={{
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    headline: post.frontmatter.title,
                    description:
                        post.frontmatter.description || post.excerpt,
                    datePublished: post.frontmatter.isoDate,
                    url,
                    image: socialImage,
                    author: {
                        "@type": "Person",
                        name: data.site.siteMetadata.author,
                        url: data.site.siteMetadata.siteUrl,
                    },
                    publisher: {
                        "@type": "Person",
                        name: data.site.siteMetadata.author,
                        url: data.site.siteMetadata.siteUrl,
                    },
                    mainEntityOfPage: url,
                    keywords: (post.frontmatter.keywords || []).join(`, `),
                }}
            />
            <div style={{ marginBottom: rhythm(1) }}>
                <h1>{post.frontmatter.title}</h1>
                <p
                    style={{
                        ...scale(-1 / 5),
                        display: `block`,
                        marginTop: rhythm(-1),
                        marginBottom: 0,
                    }}
                >
                    {post.frontmatter.date}
                    {post.timeToRead ? ` · ${post.timeToRead} min read` : null}
                    {post.frontmatter.draft ? ` · Draft` : null}
                </p>
                {post.frontmatter.categories && (
                    <Pills
                        items={post.frontmatter.categories}
                        linkableItems={linkableCategories}
                    />
                )}
            </div>
            <div dangerouslySetInnerHTML={{ __html: post.html }} />
            <hr
                style={{
                    marginBottom: rhythm(1),
                }}
            />
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
                    {previous && (
                        <Link to={previous.fields.slug} rel="prev">
                            ← {previous.frontmatter.title}
                        </Link>
                    )}
                </li>
                <li>
                    {next && (
                        <Link to={next.fields.slug} rel="next">
                            {next.frontmatter.title} →
                        </Link>
                    )}
                </li>
            </ul>
        </Layout>
    )
}

export default BlogPostTemplate

export const pageQuery = graphql`
    query BlogPostBySlug($slug: String!) {
        site {
            siteMetadata {
                title
                author
                siteUrl
            }
        }
        markdownRemark(fields: { slug: { eq: $slug } }) {
            id
            excerpt(pruneLength: 160)
            html
            timeToRead
            frontmatter {
                categories
                title
                seoTitle
                date(formatString: "MMMM DD, YYYY")
                isoDate: date
                description
                keywords
                draft
                image {
                    childImageSharp {
                        gatsbyImageData(
                            width: 1200
                            height: 630
                            layout: FIXED
                            transformOptions: { fit: COVER }
                        )
                    }
                }
            }
        }
    }
`
